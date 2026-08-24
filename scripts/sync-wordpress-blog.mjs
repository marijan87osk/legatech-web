import { createHash } from "node:crypto";
import { access, copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { load } from "cheerio";
import sanitizeHtml from "sanitize-html";

const projectRoot = process.cwd();
const apiRoot = (process.env.WORDPRESS_API_URL ?? "https://staging2.legatech.hr/?rest_route=/wp/v2").replace(/\/$/, "");
const snapshotUrl = process.env.WORDPRESS_SNAPSHOT_URL?.trim() || null;
const snapshotFile = process.env.WORDPRESS_SNAPSHOT_FILE?.trim() || null;
const outputFile = path.join(projectRoot, "src", "generated", "blog-posts.json");
const mediaDirectory = path.join(projectRoot, "public", "blog-media");
const mediaPublicPath = "/blog-media";
const timeoutMs = 20_000;
const maxFetchAttempts = 4;
const retryBaseMs = Number(process.env.WORDPRESS_RETRY_BASE_MS ?? "1500");
const maxImageBytes = 12 * 1024 * 1024;
const wordpressHost = new URL(snapshotUrl ?? apiRoot).hostname.toLowerCase();
const allowedMediaHosts = new Set((process.env.WORDPRESS_MEDIA_HOSTS ?? wordpressHost).split(",").map((host) => host.trim().toLowerCase()).filter(Boolean));

const imageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
]);

function safeText(html) {
  return load(html ?? "", null, false).text().replace(/\s+/g, " ").trim();
}

function sanitizeArticleHtml(html) {
  return sanitizeHtml(html ?? "", {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "b", "i",
      "a", "blockquote", "figure", "figcaption", "img", "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "pre", "code", "hr", "sup", "sub", "del", "mark", "details", "summary",
    ],
    allowedAttributes: {
      "*": ["class", "id"],
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.target === "_blank") attribs.rel = "noopener noreferrer";
        return { tagName, attribs };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
    },
  });
}

function enhanceArticleStructure(html) {
  const $ = load(html, null, false);
  const paragraphs = $("p").toArray();

  for (let index = 0; index < paragraphs.length; index += 1) {
    const firstLine = $(paragraphs[index]).text().replace(/\s+/g, " ").trim();
    const nextLine = paragraphs[index + 1]
      ? $(paragraphs[index + 1]).text().replace(/\s+/g, " ").trim()
      : "";

    if (firstLine !== "Naslovna" || !/^[│├└]/u.test(nextLine)) continue;

    const group = [paragraphs[index]];
    const lines = [firstLine];
    let cursor = index + 1;

    while (cursor < paragraphs.length) {
      const line = $(paragraphs[cursor]).text().replace(/\u00a0/g, " ").trimEnd();
      if (!/^[│├└]/u.test(line.trimStart())) break;
      group.push(paragraphs[cursor]);
      lines.push(line);
      cursor += 1;
    }

    const code = $("<code></code>").text(lines.join("\n"));
    const siteMap = $("<pre></pre>").addClass("article-site-map").append(code);
    $(group[0]).before(siteMap);
    group.forEach((paragraph) => $(paragraph).remove());
    index = cursor - 1;
  }

  return $.root().html() ?? "";
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        ...(options.headers ?? {}),
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} za ${url}`);
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchWordPressJson(sourceUrl) {
  let lastError;

  for (let attempt = 1; attempt <= maxFetchAttempts; attempt += 1) {
    try {
      const url = new URL(sourceUrl);
      url.searchParams.set("sync_nonce", `${Date.now()}-${attempt}`);
      const response = await fetchWithTimeout(url);
      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.toLowerCase().includes("application/json")) {
        const preview = (await response.text()).replace(/\s+/g, " ").slice(0, 160);
        throw new Error(`WordPress REST nije vratio JSON (${contentType || "bez Content-Type"}): ${preview}`);
      }

      return { response, data: await response.json() };
    } catch (error) {
      lastError = error;
      if (attempt === maxFetchAttempts) break;
      const delay = retryBaseMs * (2 ** (attempt - 1));
      console.warn(`WordPress REST pokušaj ${attempt} nije uspio. Novi pokušaj za ${delay / 1000} s.`);
      await wait(delay);
    }
  }

  throw lastError;
}

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const url = new URL(`${apiRoot}/posts`);
    url.searchParams.set("status", "publish");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("orderby", "date");
    url.searchParams.set("order", "desc");
    url.searchParams.set("_embed", "wp:featuredmedia,wp:term,author");
    const { response, data: batch } = await fetchWordPressJson(url);
    if (!Array.isArray(batch)) throw new Error("WordPress REST odgovor nije popis članaka.");
    posts.push(...batch);
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages) break;
    page += 1;
  }
  return posts;
}

async function fetchSnapshotPosts() {
  const snapshot = snapshotFile
    ? JSON.parse(await readFile(path.resolve(projectRoot, snapshotFile), "utf8"))
    : (await fetchWordPressJson(new URL(snapshotUrl))).data;
  if (!snapshot || snapshot.version !== 1 || !Array.isArray(snapshot.posts)) {
    throw new Error("WordPress snapshot nema očekivani format.");
  }
  return snapshot.posts;
}

async function downloadImage(sourceUrl, destinationDirectory) {
  let url;
  try {
    url = new URL(sourceUrl);
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (!allowedMediaHosts.has(url.hostname.toLowerCase())) return null;
  const sourceHash = createHash("sha256").update(sourceUrl).digest("hex").slice(0, 24);
  for (const extension of imageTypes.values()) {
    const fileName = `${sourceHash}${extension}`;
    const cachedPath = path.join(mediaDirectory, fileName);
    if (await pathExists(cachedPath)) {
      await copyFile(cachedPath, path.join(destinationDirectory, fileName));
      return `${mediaPublicPath}/${fileName}`;
    }
  }
  const response = await fetchWithTimeout(url);
  const contentType = (response.headers.get("content-type") ?? "").split(";")[0].toLowerCase();
  const extension = imageTypes.get(contentType);
  if (!extension) throw new Error(`Nepodržan format slike ${contentType || "bez MIME tipa"}: ${sourceUrl}`);
  const contentLength = Number(response.headers.get("content-length") ?? "0");
  if (contentLength > maxImageBytes) throw new Error(`Slika je veća od 12 MB: ${sourceUrl}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxImageBytes) throw new Error(`Slika je veća od 12 MB: ${sourceUrl}`);
  const fileName = `${sourceHash}${extension}`;
  await writeFile(path.join(destinationDirectory, fileName), buffer);
  return `${mediaPublicPath}/${fileName}`;
}

async function localizeContentImages(contentHtml, destinationDirectory) {
  const $ = load(contentHtml, null, false);
  for (const image of $("img").toArray()) {
    const element = $(image);
    const source = element.attr("src");
    if (!source) continue;
    const localSource = await downloadImage(source, destinationDirectory);
    if (localSource) element.attr("src", localSource);
  }
  return $.root().html() ?? "";
}

function embeddedCategories(post) {
  const terms = post?._embedded?.["wp:term"] ?? [];
  return terms.flat().filter((term) => term?.taxonomy === "category").map((term) => safeText(term.name));
}

async function normalizePost(post, destinationDirectory) {
  const sanitized = sanitizeArticleHtml(post?.content?.rendered ?? "");
  const enhanced = enhanceArticleStructure(sanitized);
  const contentHtml = await localizeContentImages(enhanced, destinationDirectory);
  const featured = post?._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const featuredSource = featured?.source_url ? await downloadImage(featured.source_url, destinationDirectory) : null;
  const text = safeText(contentHtml);
  const excerpt = safeText(post?.excerpt?.rendered) || `${text.slice(0, 180).trim()}${text.length > 180 ? "…" : ""}`;
  return {
    id: Number(post.id),
    slug: String(post.slug),
    title: safeText(post?.title?.rendered),
    excerpt,
    contentHtml,
    publishedAt: String(post.date_gmt ?? post.date),
    modifiedAt: String(post.modified_gmt ?? post.modified),
    categoryLabels: embeddedCategories(post),
    featuredImage: featuredSource ? {
      src: featuredSource,
      alt: safeText(featured?.alt_text) || safeText(post?.title?.rendered),
      width: Number(featured?.media_details?.width) || null,
      height: Number(featured?.media_details?.height) || null,
    } : null,
    authorName: safeText(post?._embedded?.author?.[0]?.name) || "Legatech",
    readingMinutes: Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200)),
  };
}

async function normalizeSnapshotPost(post, destinationDirectory) {
  const sanitized = sanitizeArticleHtml(post?.contentHtml ?? "");
  const enhanced = enhanceArticleStructure(sanitized);
  const contentHtml = await localizeContentImages(enhanced, destinationDirectory);
  const featured = post?.featuredImage ?? null;
  const featuredSource = featured?.sourceUrl ? await downloadImage(featured.sourceUrl, destinationDirectory) : null;
  const text = safeText(contentHtml);
  const excerpt = safeText(post?.excerptHtml) || `${text.slice(0, 180).trim()}${text.length > 180 ? "…" : ""}`;

  return {
    id: Number(post.id),
    slug: String(post.slug),
    title: safeText(post?.titleHtml),
    excerpt,
    contentHtml,
    publishedAt: String(post.publishedAt),
    modifiedAt: String(post.modifiedAt),
    categoryLabels: Array.isArray(post.categoryLabels) ? post.categoryLabels.map((label) => safeText(label)).filter(Boolean) : [],
    featuredImage: featuredSource ? {
      src: featuredSource,
      alt: safeText(featured?.alt) || safeText(post?.titleHtml),
      width: Number(featured?.width) || null,
      height: Number(featured?.height) || null,
    } : null,
    authorName: safeText(post?.authorName) || "Legatech",
    readingMinutes: Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200)),
  };
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function activateSnapshot(stagingOutput, stagingMediaDirectory) {
  const outputBackup = `${outputFile}.previous-${process.pid}`;
  const mediaBackup = `${mediaDirectory}.previous-${process.pid}`;
  const hadOutput = await pathExists(outputFile);
  const hadMedia = await pathExists(mediaDirectory);
  let movedOutput = false;
  let movedMedia = false;

  try {
    if (hadOutput) {
      await rename(outputFile, outputBackup);
      movedOutput = true;
    }
    if (hadMedia) {
      await rename(mediaDirectory, mediaBackup);
      movedMedia = true;
    }
    await mkdir(path.dirname(outputFile), { recursive: true });
    await rename(stagingOutput, outputFile);
    await rename(stagingMediaDirectory, mediaDirectory);
    await rm(outputBackup, { force: true });
    await rm(mediaBackup, { force: true, recursive: true });
  } catch (error) {
    await rm(outputFile, { force: true });
    await rm(mediaDirectory, { force: true, recursive: true });
    if (movedOutput && await pathExists(outputBackup)) await rename(outputBackup, outputFile);
    if (movedMedia && await pathExists(mediaBackup)) await rename(mediaBackup, mediaDirectory);
    throw error;
  }
}

async function main() {
  const usesSnapshot = Boolean(snapshotFile || snapshotUrl);
  const posts = usesSnapshot ? await fetchSnapshotPosts() : await fetchAllPosts();
  const stagingRoot = await mkdtemp(path.join(tmpdir(), "legatech-blog-"));
  const stagingOutput = path.join(stagingRoot, "blog-posts.json");
  const stagingMediaDirectory = path.join(stagingRoot, "blog-media");

  try {
    await mkdir(stagingMediaDirectory, { recursive: true });
    const normalized = [];
    for (const post of posts) {
      normalized.push(usesSnapshot
        ? await normalizeSnapshotPost(post, stagingMediaDirectory)
        : await normalizePost(post, stagingMediaDirectory));
    }
    await writeFile(stagingOutput, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
    await activateSnapshot(stagingOutput, stagingMediaDirectory);
    console.log(`Sinkronizirano WordPress članaka: ${normalized.length}`);
  } finally {
    await rm(stagingRoot, { force: true, recursive: true });
  }
}

main().catch((error) => {
  console.error("Sinkronizacija WordPress bloga nije uspjela.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
