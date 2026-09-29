import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { projects, type ProjectSummary } from "@/src/data/projects";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projekti web stranica, trgovina i SEO-a - Legatech",
  description: "Pregled stvarnih Legatech projekata izrade web stranica, trgovina, SEO-a i održavanja.",
  path: "/projekti/",
});

function ProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  const picture = <Image src={project.image} alt={project.imageAlt} width={960} height={600} sizes="(max-width: 700px) 100vw, 50vw" />;
  return (
    <article className="epr-card">
      {project.href ? <Link className="epr-image" href={project.href}>{picture}</Link> : <div className="epr-image">{picture}</div>}
      <div className="epr-copy">
        <p className="epr-meta">{String(index + 1).padStart(2, "0")} / {project.industry}{project.year ? ` / ${project.year}` : ""}</p>
        <h3>{project.client}</h3><p className="epr-service">{project.serviceLabel}</p>
        <p>{project.challenge}</p>
        <dl><div><dt>Rješenje</dt><dd>{project.solution}</dd></div><div><dt>Rezultat</dt><dd>{project.result.value} {project.result.label}</dd></div></dl>
        {project.href && <Link className="epr-link" href={project.href}>Pogledajte studiju slučaja <span aria-hidden="true">↗</span></Link>}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Projekti", path: "/projekti/" }])} />
      <EditorialShell variant="project-v0-page">
        <section className="epr-hero" aria-labelledby="projects-title"><div className="container epr-hero-grid"><div><p className="epr-eyebrow">Odabrani radovi</p><h1 id="projects-title">Projekt počinje problemom, ne stilom.</h1></div><p>Ovdje su projekti na kojima smo radili — od početnog izazova do rješenja s jasnom poslovnom ulogom.</p></div></section>
        <section className="epr-work" aria-labelledby="real-projects-title"><div className="container"><div className="epr-section-heading"><h2 id="real-projects-title">Stvarni projekti.</h2><p>Od prvog izazova do rješenja koje ima jasnu poslovnu ulogu.</p></div><div className="epr-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></div></section>
        <section className="editorial-final-cta" aria-labelledby="projects-cta-title"><div className="container editorial-final-cta-grid"><h2 id="projects-cta-title">Želite projekt s jasnim poslovnim ciljem?</h2><div><p>Opišite trenutni problem i rezultat koji želite postići.</p><Link className="ep-button" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div></div></section>
      </EditorialShell>
    </>
  );
}
