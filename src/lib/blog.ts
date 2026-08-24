import rawPosts from "@/src/generated/blog-posts.json";

export interface BlogImage {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  modifiedAt: string;
  categoryLabels: string[];
  featuredImage: BlogImage | null;
  authorName: string;
  readingMinutes: number;
}

export const blogPosts = rawPosts as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("hr-HR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function summarizeBlogExcerpt(value: string, maxLength = 170) {
  const normalized = value
    .replace(/\s+/g, " ")
    .replace(/\s*\[…\]\s*$/, "")
    .trim();

  if (normalized.length <= maxLength) return normalized;

  const candidate = normalized.slice(0, maxLength + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const cutAt = lastSpace >= Math.floor(maxLength * 0.7) ? lastSpace : maxLength;

  return `${candidate.slice(0, cutAt).replace(/[,:;.!?-]+$/, "")}…`;
}
