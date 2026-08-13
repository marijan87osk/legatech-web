import type { MetadataRoute } from "next";
import { projectDetails } from "@/src/data/projects";
import { blogPosts } from "@/src/lib/blog";

export const dynamic = "force-static";

const baseUrl = "https://legatech.hr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/izrada-web-stranica-cijena", "/seo-optimizacija-cijena", "/izrada-web-trgovina", "/odrzavanje-web-stranica", "/cjenik", "/projekti", "/o-nama", "/o-meni", "/kontakt", "/blog", "/politika-privatnosti", "/politika-kolacica", "/uvjeti-koristenja"];
  return [
    ...staticPaths.map((path) => ({ url: `${baseUrl}${path}/`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...projectDetails.map((project) => ({ url: `${baseUrl}${project.href}/`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}/`, lastModified: post.modifiedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
