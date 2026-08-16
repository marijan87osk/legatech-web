import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/src/components/json-ld";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { blogPosts, formatBlogDate, getBlogPost } from "@/src/lib/blog";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, siteName } from "@/src/lib/seo";

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
  return {
    title: `${article.title} | Legatech`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
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
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
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
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="inner-page article-page">
        <article className="section">
          <div className="container article-layout">
            <header>
              <Link className="article-back-link" href="/blog"><ArrowLeft size={18} aria-hidden="true" /> Svi članci</Link>
              <p className="mono-label">{article.categoryLabels[0] ?? "Web i poslovanje"}</p>
              <h1>{article.title}</h1>
              <p className="article-deck">{article.excerpt}</p>
              <div className="article-byline"><span>{article.authorName}</span><span>{formatBlogDate(article.publishedAt)}</span><span>{article.readingMinutes} min čitanja</span></div>
            </header>
            <div>
              {article.featuredImage && (
                <div className="article-featured-image">
                  <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill priority sizes="(max-width: 767px) 100vw, 58vw" />
                </div>
              )}
              <div className="article-body" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
