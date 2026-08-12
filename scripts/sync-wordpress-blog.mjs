import { createHash } from "node:crypto";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import sanitizeHtml from "sanitize-html";

const projectRoot = process.cwd();
const apiRoot = (process.env.WORDPRESS_API_URL ?? "https://staging2.legatech.hr/?rest_route=/wp/v2").replace(/\/$/, "");
const outputFile = path.join(projectRoot, "src", "generated", "blog-posts.json");
const mediaDirectory = path.join(projectRoot, "public", "blog-media");
const mediaPublicPath = "/blog-media";
const timeoutMs = 20_000;
const maxImageBytes = 12 * 1024 * 1024;
const wordpressHost = new URL(apiRoot).hostname.toLowerCase();
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
        if (attribs.target === "_blank") {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
    },
  });
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      headers: { "User-Agent": "Legatech static blog sync", ...(options.headers ?? {}) },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} za ${url}`);
    return response;
  } finally {
    clearTimeout(timeout);
  }
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
    const response = await fetchWithTimeout(url);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      const preview = (await response.text()).replace(/\s+/g, " ").slice(0, 160);
      throw new Error(`WordPress REST nije vratio JSON (${contentType || "bez Content-Type"}): ${preview}`);
    }
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error("WordPress REST odgovor nije popis članaka.");
    posts.push(...batch);
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? "1");
    if (page >= totalPages) break;
    page += 1;
  }
  return posts;
}

async function downloadImage(sourceUrl) {
  let url;
  try {
    url = new URL(sourceUrl);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  if (!allowedMediaHosts.has(url.hostname.toLowerCase())) return null;
  const response = await fetchWithTimeout(url);
  const contentType = (response.headers.get("content-type") ?? "").split(";")[0].toLowerCase();
  const extension = imageTypes.get(contentType);
  if (!extension) throw new Error(`Nepodržan format slike ${contentType || "bez MIME tipa"}: ${sourceUrl}`);
  const contentLength = Number(response.headers.get("content-length") ?? "0");
  if (contentLength > maxImageBytes) throw new Error(`Slika je veća od 12 MB: ${sourceUrl}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxImageBytes) throw new Error(`Slika je veća od 12 MB: ${sourceUrl}`);
  const fileName = `${createHash("sha256").update(sourceUrl).digest("hex").slice(0, 24)}${extension}`;
  await writeFile(path.join(mediaDirectory, fileName), buffer);
  return `${mediaPublicPath}/${fileName}`;
}

async function localizeContentImages(contentHtml) {
  const $ = load(contentHtml, null, false);
  for (const image of $("img").toArray()) {
    const element = $(image);
    const source = element.attr("src");
    if (!source) continue;
    const localSource = await downloadImage(source);
    if (localSource) element.attr("src", localSource);
  }
  return $.root().html() ?? "";
}

function embeddedCategories(post) {
  const terms = post?._embedded?.["wp:term"] ?? [];
  return terms.flat().filter((term) => term?.taxonomy === "category").map((term) => safeText(term.name));
}

async function normalizePost(post) {
  const sanitized = sanitizeArticleHtml(post?.content?.rendered ?? "");
  const contentHtml = await localizeContentImages(sanitized);
  const featured = post?._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const featuredSource = featured?.source_url ? await downloadImage(featured.source_url) : null;
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

async function main() {
  await mkdir(path.dirname(outputFile), { recursive: true });
  await mkdir(mediaDirectory, { recursive: true });
  for (const entry of await readdir(mediaDirectory)) {
    await rm(path.join(mediaDirectory, entry), { force: true, recursive: true });
  }
  const posts = await fetchAllPosts();
  const normalized = [];
  for (const post of posts) normalized.push(await normalizePost(post));
  await writeFile(outputFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  console.log(`Sinkronizirano WordPress članaka: ${normalized.length}`);
}

main().catch((error) => {
  console.error("Sinkronizacija WordPress bloga nije uspjela.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
