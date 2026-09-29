import { load } from "cheerio";

export interface ArticleHeading {
  id: string;
  title: string;
}

export function prepareArticleSections(contentHtml: string): { html: string; headings: ArticleHeading[] } {
  const $ = load(`<div id="article-root">${contentHtml}</div>`);
  const root = $("#article-root");
  const seen = new Map<string, number>();
  const headings: ArticleHeading[] = [];

  root.find("h2, h3").each((_, element) => {
    const heading = $(element);
    const title = heading.text().trim();
    if (!title) return;
    const base = (heading.attr("id") || title)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "odjeljak";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    heading.attr("id", id);
    if (element.tagName.toLowerCase() === "h2") headings.push({ id, title });
  });

  return { html: root.html() ?? contentHtml, headings: headings.slice(0, 10) };
}
