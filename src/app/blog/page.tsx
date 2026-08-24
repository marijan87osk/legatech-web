import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/src/components/json-ld";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { blogPosts, formatBlogDate, summarizeBlogExcerpt } from "@/src/lib/blog";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog o web stranicama i SEO-u | Legatech",
  description: "Praktični vodiči o izradi web stranica, SEO optimizaciji, web trgovinama i održavanju.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="inner-page">
        <section className="page-hero blog-page-hero">
          <div className="container page-hero-grid">
            <div><p className="mono-label">Legatech blog</p><h1>Praktični odgovori za bolji web.</h1></div>
            <div className="page-hero-aside"><p>Jasno objašnjeni troškovi, SEO, prodaja i održavanje za vlasnike poslovanja.</p></div>
          </div>
        </section>
        <section className="section blog-listing">
          <div className="container">
            {blogPosts.length ? (
              <div className="blog-list-grid">
                {blogPosts.map((article) => (
                  <article className="blog-list-card" key={article.slug}>
                    <Link href={`/blog/${article.slug}`}>
                      {article.featuredImage && (
                        <div className="blog-card-image">
                          <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
                        </div>
                      )}
                      <div className="article-meta">
                        <span>{article.categoryLabels[0] ?? "Web i poslovanje"}</span>
                        <time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time>
                      </div>
                      <h2>{article.title}</h2>
                      <p>{summarizeBlogExcerpt(article.excerpt)}</p>
                      <div className="article-footer"><span>{article.readingMinutes} min čitanja</span><ArrowUpRight size={21} aria-hidden="true" /></div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="blog-empty-state">
                <p className="mono-label">Novi sadržaj uskoro</p>
                <h2>Prvi praktični vodiči su u pripremi.</h2>
                <p>Do tada nam pošaljite pitanje o svojem webu, SEO-u, trgovini ili održavanju. Odgovorit ćemo konkretno i bez tehničkog žargona.</p>
                <Link className="text-link" href="/kontakt">Postavite pitanje <ArrowRight size={19} aria-hidden="true" /></Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
