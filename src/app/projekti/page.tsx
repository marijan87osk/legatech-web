import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/src/components/json-ld";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { projects } from "@/src/data/projects";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projekti web stranica, trgovina i SEO-a | Legatech",
  description: "Pregled stvarnih i jasno označenih demo Legatech projekata izrade web stranica, trgovina, SEO-a i održavanja.",
  path: "/projekti/",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Projekti", path: "/projekti/" }])} />
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="inner-page">
        <section className="page-hero">
          <div className="container page-hero-grid">
            <div>
              <p className="mono-label">Odabrani radovi</p>
              <h1>Projekt počinje problemom, ne stilom.</h1>
            </div>
            <div className="page-hero-aside">
              <p>Stvarni projekti prikazuju potvrđen opseg rada. Privremeni primjeri ostaju jasno označeni dok ih ne zamijenimo novim referencama.</p>
            </div>
          </div>
        </section>

        <section className="section projects-list-section" aria-label="Popis projekata">
          <div className="container projects-list">
            {projects.map((project, index) => (
              <article className="project-list-row" key={project.slug}>
                <div className="project-list-image">
                  {project.href ? (
                    <Link className="project-list-image-link" href={project.href} aria-label={`Pogledajte projekt ${project.client}`}>
                      <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 58vw" />
                    </Link>
                  ) : (
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 58vw" />
                  )}
                </div>
                <div className="project-list-copy">
                  <div className="article-meta">
                    <span className={project.mock ? "demo-label" : "project-real-label"}>
                      {project.mock ? "Demo projekt" : project.industry}
                    </span>
                    <span>{project.serviceLabel}</span>
                    {project.year && <span>{project.year}</span>}
                  </div>
                  <h2>{project.client}</h2>
                  <p>{project.challenge}</p>
                  <dl>
                    <div><dt>Rješenje</dt><dd>{project.solution}</dd></div>
                    <div><dt>{project.mock ? "Demo rezultat" : "Rezultat"}</dt><dd>{project.result.value} {project.result.label}</dd></div>
                  </dl>
                  {project.href && (
                    <Link className="text-link project-detail-link" href={project.href}>
                      Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  )}
                  <span className="project-position">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section compact-cta-section">
          <div className="container compact-cta">
            <div>
              <h2>Želite projekt s jasnim poslovnim ciljem?</h2>
              <p>Opišite trenutni problem i rezultat koji želite postići.</p>
            </div>
            <Link className="button button-primary" href="/kontakt">
              Zatražite ponudu <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
