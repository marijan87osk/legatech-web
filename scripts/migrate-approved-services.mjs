import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import postcss from "postcss";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(process.argv[2] ?? path.join(repo, "..", "legatech redizajn2"));
const routes = [
  "izrada-web-stranica-cijena",
  "seo-optimizacija-cijena",
  "izrada-web-trgovina",
  "odrzavanje-web-stranica",
];
const projectImages = {
  "ducija.webp": "/projects/ducija/cover.webp",
  "barisic-plast.webp": "/projects/barisic-plast/cover.webp",
  "varmos.webp": "/projects/varmos/desktop.webp",
  "krie.webp": "/projects/krie-design/cover.webp",
  "balaz.webp": "/projects/odvjetnicki-ured-balaz/cover.webp",
};
const heroExamples = {
  "seo-optimizacija-cijena": {
    href: "/projekti/barisic-plast/",
    image: "/projects/barisic-plast/cover.webp",
    alt: "Početna stranica Barišić Plast weba s pogonom za plastifikaciju metala",
    label: "SEO optimizacija",
    client: "Barišić Plast",
    service: "Izrada web stranice i SEO optimizacija",
  },
  "odrzavanje-web-stranica": {
    href: "/projekti/varmos/",
    image: "/projects/varmos/desktop.webp",
    alt: "Početna stranica Varmos weba s prikazom instalacija podnog grijanja",
    label: "Održavanje nakon objave / 2025.",
    client: "Varmos",
    service: "Izrada web stranice i održavanje",
  },
};

const pages = {};
for (const route of routes) {
  const html = await readFile(path.join(source, route, "index.html"), "utf8");
  const $ = load(html);
  const main = $("main#sadrzaj");
  if (main.length !== 1) throw new Error(`Expected one main element in ${route}`);

  main.find("img[src]").each((_, image) => {
    const original = $(image).attr("src");
    if (original?.startsWith("/assets/clients/")) {
      $(image).attr("src", original.replace("/assets/clients/", "/clients/"));
    } else if (original?.startsWith("/assets/projects/")) {
      const filename = path.basename(original);
      const replacement = projectImages[filename];
      if (!replacement) throw new Error(`Unmapped project image: ${original}`);
      $(image).attr("src", replacement);
    }
  });
  main.find("a[href]").each((_, anchor) => {
    const href = $(anchor).attr("href");
    if (!href) return;
    const url = URL.canParse(href) ? new URL(href) : null;
    if (url && ["legatech.hr", "www.legatech.hr"].includes(url.hostname)) {
      $(anchor).attr("href", `${url.pathname}${url.search}${url.hash}`);
    }
  });
  const heroExample = heroExamples[route];
  if (heroExample) {
    const hero = main.find(".service-hero .webdev-hero-work").first();
    if (!hero.length) throw new Error(`Missing hero project in ${route}`);
    const mediaLink = hero.is("a") ? hero : hero.find(".webdev-hero-media a, a.webdev-hero-media").first();
    mediaLink.attr("href", heroExample.href);
    if (mediaLink.attr("aria-label")) mediaLink.attr("aria-label", `Pogledajte studiju slučaja ${heroExample.client}`);
    hero.find("img").first().attr("src", heroExample.image).attr("alt", heroExample.alt);
    const caption = hero.find(".webdev-hero-caption").first();
    caption.children("span").first().text(heroExample.label);
    caption.find("strong").first().text(heroExample.client);
    const serviceDetail = caption.children("small").length
      ? caption.children("small").first()
      : caption.children("div").find("span").first();
    serviceDetail.text(heroExample.service);
  }
  pages[route] = { title: $("title").text().replace(/[|–—]/g, "-"), html: main.html() };
}

await writeFile(path.join(repo, "src", "generated", "service-pages.json"), JSON.stringify(pages, null, 2) + "\n");

function splitSelectors(selector) {
  const selectors = [];
  let current = "";
  let depth = 0;
  for (const character of selector) {
    if (character === "(" || character === "[") depth++;
    if (character === ")" || character === "]") depth--;
    if (character === "," && depth === 0) {
      selectors.push(current.trim());
      current = "";
    } else current += character;
  }
  if (current.trim()) selectors.push(current.trim());
  return selectors;
}

function scopeSelector(selector) {
  if (/^:root\b/.test(selector)) return selector.replace(/^:root\b/, ".service-v0-page");
  if (/^html\b/.test(selector)) return selector.replace(/^html\b/, ".service-v0-page");
  if (/^body(?:\.service-page)?\b/.test(selector)) return selector.replace(/^body(?:\.service-page)?\b/, ".service-v0-page");
  if (/^\.service-page\b/.test(selector)) return selector.replace(/^\.service-page\b/, ".service-v0-page");
  return `.service-v0-page ${selector}`;
}

const css = (await Promise.all(["system.css", "croatian-home.css", "services.css"].map((file) => readFile(path.join(source, file), "utf8")))).join("\n");
const stylesheet = postcss.parse(css);
stylesheet.walkRules((rule) => {
  if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
  rule.selector = splitSelectors(rule.selector).map(scopeSelector).join(", ");
});
await writeFile(
  path.join(repo, "src", "app", "editorial-service.css"),
  `/* Generated from the approved static service styles by scripts/migrate-approved-services.mjs. */\n${stylesheet.toString()}\n`,
);

console.log(`Migrated ${routes.length} approved service pages and their shared styles.`);
