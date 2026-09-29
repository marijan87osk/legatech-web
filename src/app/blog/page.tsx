import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { blogPosts, formatBlogDate, summarizeBlogExcerpt } from "@/src/lib/blog";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog o web stranicama i SEO-u - Legatech",
  description: "Praktični vodiči o izradi web stranica, SEO optimizaciji, web trgovinama i održavanju.",
  path: "/blog/",
});

export default function BlogPage() {
  const featured = blogPosts.find((article) => article.slug === "kako-napraviti-dobru-kontakt-formu") ?? blogPosts[0];
  const otherPosts = blogPosts.filter((article) => article.slug !== featured?.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <EditorialShell variant="blog-v0-page">
        <section className="blog-hero" aria-labelledby="blog-title">
          <div className="container blog-hero-grid">
            <h1 id="blog-title">Praktični odgovori za bolji web.</h1>
            <p>Jasno objašnjeni troškovi, SEO, prodaja i održavanje za vlasnike poslovanja.</p>
          </div>
        </section>

        {featured && (
          <section className="container blog-feature" aria-labelledby="featured-title">
            <div className="blog-overline">Izdvojeni vodič / 01</div>
            <div className="blog-feature-copy">
              <Link href={`/blog/${featured.slug}/`}>
                <div className="blog-meta">
                  <span>{featured.categoryLabels[0] ?? "Web i poslovanje"}</span>
                  <time dateTime={featured.publishedAt}>{formatBlogDate(featured.publishedAt)}</time>
                  <span>{featured.readingMinutes} min čitanja</span>
                </div>
                <h2 id="featured-title">{featured.title}</h2>
                <p>{summarizeBlogExcerpt(featured.excerpt, 230)}</p>
                <span className="blog-read">Pročitajte vodič <span aria-hidden="true">↗</span></span>
              </Link>
            </div>
          </section>
        )}

        <section className="blog-index" aria-labelledby="all-posts-title">
          <div className="container">
            <div className="blog-index-head">
              <h2 id="all-posts-title">Ostali vodiči</h2>
              <p>Odaberite temu koja vam pomaže donijeti sljedeću odluku o webu.</p>
            </div>
            {otherPosts.length ? (
              <div className="blog-rows">
                {otherPosts.map((article, index) => (
                  <Link className="blog-row" href={`/blog/${article.slug}/`} key={article.slug}>
                    <span className="blog-row-index">{String(index + 2).padStart(2, "0")}</span>
                    <span>
                      <span className="blog-meta">
                        <span>{article.categoryLabels[0] ?? "Web i poslovanje"}</span>
                        <time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time>
                        <span>{article.readingMinutes} min čitanja</span>
                      </span>
                      <h3>{article.title}</h3>
                      <p>{summarizeBlogExcerpt(article.excerpt)}</p>
                    </span>
                    <span className="blog-row-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="editorial-empty-note">Novi sadržaj uskoro. Do tada nam pošaljite pitanje o svojem webu, SEO-u, trgovini ili održavanju.</p>
            )}
          </div>
        </section>
        <section className="blog-question" aria-labelledby="blog-question-title">
          <div className="container blog-question-inner">
            <div><span className="blog-overline">Pitanje za Legatech</span><h2 id="blog-question-title">Imate konkretan izazov sa svojim webom?</h2></div>
            <Link href="/kontakt/">Pošaljite upit <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </EditorialShell>
    </>
  );
}
