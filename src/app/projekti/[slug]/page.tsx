import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialProjectPage } from "@/src/components/editorial-project-page";
import { JsonLd } from "@/src/components/json-ld";
import { getProjectBySlug, projectDetails } from "@/src/data/projects";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    title: `${project.client}: ${project.serviceLabel} - Legatech`,
    description: project.lead,
    path: project.href,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Naslovna", path: "/" },
          { name: "Projekti", path: "/projekti/" },
          { name: project.client, path: project.href },
        ])}
      />
      <EditorialProjectPage project={project} />
    </>
  );
}
