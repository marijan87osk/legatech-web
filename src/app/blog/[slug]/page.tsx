import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { prepareArticleSections } from "@/src/lib/article-sections";
import { blogPosts, formatBlogDate, getBlogPost, summarizeBlogDeck, summarizeBlogExcerpt } from "@/src/lib/blog";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, normalizeMetaTitle, siteName } from "@/src/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.length ? blogPosts.map((article) => ({ slug: article.slug })) : [{ slug: "_prazno" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogPost(slug);
  if (!article) return {};
  const path = `/blog/${article.slug}/`;
  const url = absoluteUrl(path);
  const description = summarizeBlogExcerpt(article.excerpt, 160);
  return {
    title: normalizeMetaTitle(`${article.title} - Legatech`),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: normalizeMetaTitle(article.title),
      description,
      url,
      siteName,
      locale: "hr_HR",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      images: article.featuredImage ? [{ url: article.featuredImage.src, alt: article.featuredImage.alt }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogPost(slug);
  if (!article) notFound();
  const deck = summarizeBlogDeck(article.excerpt);
  const { html, headings } = prepareArticleSections(article.contentHtml);
  const related = blogPosts.filter((post) => post.slug !== article.slug).slice(0, 2);
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: article.title,
            description: summarizeBlogExcerpt(article.excerpt, 200),
            path: `/blog/${article.slug}/`,
            publishedAt: article.publishedAt,
            modifiedAt: article.modifiedAt,
            authorName: article.authorName,
            image: article.featuredImage?.src,
          }),
          breadcrumbJsonLd([
            { name: "Naslovna", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: article.title, path: `/blog/${article.slug}/` },
          ]),
        ]}
      />
      <EditorialShell variant="blog-v0-page">
        <article>
          <header className="blog-post-hero">
            <div className="container">
              <Link className="blog-breadcrumb" href="/blog/">← Svi članci</Link>
              <div className="blog-meta">
                <span>{article.categoryLabels[0] ?? "Web i poslovanje"}</span>
                <time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time>
                <span>{article.readingMinutes} min čitanja</span>
                <span>{article.authorName}</span>
              </div>
              <h1>{article.title}</h1>
              <p className="blog-post-deck">{deck}</p>
            </div>
          </header>
          {article.featuredImage && (
            <div className="container blog-featured-image">
              <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill priority sizes="(max-width: 767px) 100vw, 1100px" />
            </div>
          )}
          <div className={`container blog-reading${headings.length ? "" : " blog-reading-no-toc"}`}>
            {headings.length > 0 && (
              <aside className="blog-contents" aria-labelledby="contents-title">
                <h2 id="contents-title">U ovom vodiču</h2>
                <nav aria-label="Sadržaj članka">
                  {headings.map((heading) => <a href={`#${heading.id}`} key={heading.id}>{heading.title}</a>)}
                </nav>
              </aside>
            )}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </article>
        {related.length > 0 && (
          <section className="blog-related" aria-labelledby="related-title">
            <div className="container">
              <h2 id="related-title">Nastavite čitati</h2>
              <div className="blog-related-list">
                {related.map((post) => (
                  <Link href={`/blog/${post.slug}/`} key={post.slug}>
                    <span>{post.categoryLabels[0] ?? "Web i poslovanje"} · {post.readingMinutes} min čitanja</span>
                    <h3>{post.title}</h3>
                    <span>Pročitajte članak ↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
