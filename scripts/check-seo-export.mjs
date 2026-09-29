import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const sitemapPath = path.join(outDir, "sitemap.xml");
const canonicalOrigin = "https://legatech.hr";
const errors = [];

function fail(message) {
  errors.push(message);
}

function htmlFileFor(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/"
    ? path.join(outDir, "index.html")
    : path.join(outDir, ...pathname.split("/").filter(Boolean), "index.html");
}

if (!fs.existsSync(sitemapPath)) {
  throw new Error("Nedostaje out/sitemap.xml. Prvo pokrenite produkcijski build.");
}

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urls.length === 0) fail("Sitemap ne sadrži javne URL-ove.");
if (urls.some((url) => new URL(url).pathname === "/o-meni/")) {
  fail("Legacy /o-meni/ ne smije biti u sitemapu.");
}

for (const url of urls) {
  const parsedUrl = new URL(url);
  if (parsedUrl.origin !== canonicalOrigin) {
    fail(`${url}: URL nije na canonical originu ${canonicalOrigin}.`);
    continue;
  }

  const htmlPath = htmlFileFor(url);
  if (!fs.existsSync(htmlPath)) {
    fail(`${url}: nedostaje ${path.relative(projectRoot, htmlPath)}.`);
    continue;
  }

  const $ = load(fs.readFileSync(htmlPath, "utf8"));
  const h1Count = $("h1").length;
  const pageTitle = $("title").text().trim();
  const socialTitle = $('meta[property="og:title"]').attr("content")?.trim();
  const canonical = $('link[rel="canonical"]').attr("href");
  const ogUrl = $('meta[property="og:url"]').attr("content");
  const description = $('meta[name="description"]').attr("content")?.trim();
  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .flatMap((element) => {
      try {
        const value = JSON.parse($(element).text());
        return Array.isArray(value) ? value : [value];
      } catch {
        fail(`${url}: JSON-LD nije valjan JSON.`);
        return [];
      }
    });
  const schemaTypes = new Set(jsonLd.map((item) => item?.["@type"]).flat());

  if (h1Count !== 1) fail(`${url}: očekivan je jedan H1, pronađeno ${h1Count}.`);
  if (canonical !== url) fail(`${url}: canonical je ${canonical ?? "nedostaje"}.`);
  if (ogUrl !== url) fail(`${url}: og:url je ${ogUrl ?? "nedostaje"}.`);
  if (!pageTitle) fail(`${url}: nedostaje title.`);
  if (/[|–—]/.test(pageTitle)) fail(`${url}: title mora koristiti običan znak - umjesto | ili duge crtice.`);
  if (socialTitle && /[|–—]/.test(socialTitle)) fail(`${url}: og:title mora koristiti običan znak - umjesto | ili duge crtice.`);
  if (!description) fail(`${url}: nedostaje meta description.`);
  if ($('meta[name="robots"][content*="noindex"]').length) fail(`${url}: sitemap URL je noindex.`);

  if (parsedUrl.pathname === "/" && (!schemaTypes.has("ProfessionalService") || !schemaTypes.has("WebSite"))) {
    fail(`${url}: nedostaje ProfessionalService ili WebSite schema.`);
  }
  if (["/izrada-web-stranica-cijena/", "/seo-optimizacija-cijena/", "/izrada-web-trgovina/", "/odrzavanje-web-stranica/"].includes(parsedUrl.pathname) && !schemaTypes.has("Service")) {
    fail(`${url}: nedostaje Service schema.`);
  }
  if (parsedUrl.pathname !== "/" && !schemaTypes.has("BreadcrumbList")) {
    fail(`${url}: nedostaje BreadcrumbList schema.`);
  }
  if (parsedUrl.pathname.startsWith("/blog/") && parsedUrl.pathname !== "/blog/" && !schemaTypes.has("Article")) {
    fail(`${url}: nedostaje Article schema.`);
  }
}

const stableHeadings = new Map([
  ["/", "Web koji radi za vaše poslovanje."],
  ["/izrada-web-stranica-cijena/", "Izrada web stranica – cijena i paketi"],
  ["/seo-optimizacija-cijena/", "SEO optimizacija – cijena i paketi"],
  ["/izrada-web-trgovina/", "Izrada web trgovina koje kupcima olakšavaju kupnju."],
  ["/odrzavanje-web-stranica/", "Održavanje web stranica koje ostaju sigurne, ažurne i dostupne."],
]);

for (const [pathname, expected] of stableHeadings) {
  const url = `${canonicalOrigin}${pathname}`;
  const file = htmlFileFor(url);
  if (!fs.existsSync(file)) continue;
  const $ = load(fs.readFileSync(file, "utf8"));
  const actual = $("h1").first().text().replace(/\s+/g, " ").trim();
  if (actual !== expected) fail(`${pathname}: H1 se promijenio. Očekivano "${expected}", dobiveno "${actual}".`);
}

const preservedServiceMetadata = new Map([
  ["/izrada-web-stranica-cijena/", {
    title: "Izrada Web Stranica - Cijena I Paketi - Legatech",
    description: "Profesionalna izrada web stranica za obrte i tvrtke. Paketi od 500 €, responzivan dizajn, SEO temelji, analitika i podrška nakon objave.",
  }],
  ["/seo-optimizacija-cijena/", {
    title: "SEO Optimizacija - Cijena I Paketi - Legatech",
    description: "SEO optimizacija za tvrtke i obrte - tehnički SEO, sadržaj, lokalni SEO, ključne riječi i mjerenje rezultata. Paketi od 290 € mjesečno.",
  }],
  ["/izrada-web-trgovina/", {
    title: "Izrada Web Trgovina - WooCommerce Webshop - Legatech",
    description: "Izrada WooCommerce web trgovina s preglednim katalogom, jednostavnom kupnjom, sigurnim plaćanjem i SEO temeljima. Projekti od 1.500 €.",
  }],
  ["/odrzavanje-web-stranica/", {
    title: "Održavanje Web Stranica I WordPress Podrška - Legatech",
    description: "Redovito WordPress održavanje, backup, sigurnosne provjere, ažuriranja i tehnička podrška. Paketi održavanja od 35 € mjesečno.",
  }],
]);

for (const [pathname, expected] of preservedServiceMetadata) {
  const file = htmlFileFor(`${canonicalOrigin}${pathname}`);
  if (!fs.existsSync(file)) continue;
  const $ = load(fs.readFileSync(file, "utf8"));
  const actualTitle = $("title").text().trim();
  const actualDescription = $('meta[name="description"]').attr("content")?.trim();
  if (actualTitle !== expected.title) fail(`${pathname}: promijenjen SEO title.`);
  if (actualDescription !== expected.description) fail(`${pathname}: promijenjen meta description.`);
}

const htaccess = fs.readFileSync(path.join(projectRoot, "public", ".htaccess"), "utf8");
for (const legacyPath of ["naslovna", "o-meni", "izrada-web-trgovine", "izrada-web-stranica", "seo-optimizacija", "robots-xml-sitemap"]) {
  if (!htaccess.includes(`^${legacyPath}/?$`)) fail(`.htaccess nema pravilo za /${legacyPath}/.`);
}

if (errors.length) {
  console.error(`SEO provjera nije prošla (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO provjera je prošla za ${urls.length} sitemap URL-ova.`);
