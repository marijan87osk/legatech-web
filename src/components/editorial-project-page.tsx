import Image from "next/image";
import Link from "next/link";
import type { ProjectDetail } from "@/src/data/projects";
import { EditorialShell } from "./editorial-shell";

export function EditorialProjectPage({ project }: { project: ProjectDetail }) {
  return (
    <EditorialShell variant="project-v0-page">
      <article>
        <header className="case-hero">
          <div className="container">
            <Link className="case-back" href="/projekti/">← Svi projekti</Link>
            <div className="case-hero-grid">
              <div>
                <p className="case-meta">{project.client} / {project.serviceLabel}{project.year ? ` / ${project.year}` : ""}</p>
                <h1>{project.heroTitle}</h1>
              </div>
              <p className="case-hero-lead">{project.lead}</p>
            </div>
            <figure className="case-media">
              <Image src={project.image} alt={project.imageAlt} width={1560} height={900} priority sizes="(max-width: 767px) 100vw, 1280px" />
              <figcaption><span>{project.client} — prikaz projekta</span><span>01 / {String(Math.max(project.gallery.length, 1)).padStart(2, "0")}</span></figcaption>
            </figure>
            <dl className="case-facts">
              <div><dt>Klijent</dt><dd>{project.client}</dd></div>
              <div><dt>Djelatnost</dt><dd>{project.industry}</dd></div>
              <div><dt>Usluge</dt><dd>{project.serviceLabel}</dd></div>
              {project.year && <div><dt>Godina</dt><dd>{project.year}</dd></div>}
              <div><dt>Web stranica</dt><dd><a href={project.website} target="_blank" rel="noopener noreferrer">{project.websiteLabel} ↗</a></dd></div>
            </dl>
          </div>
        </header>

        <section className="case-section" aria-labelledby="case-challenge-title">
          <div className="container case-split">
            <div><span className="case-overline">Izazov</span><h2 id="case-challenge-title">{project.startingTitle}</h2></div>
            <div><p>{project.startingPoint}</p><ol className="case-goals">{project.goals.map((goal) => <li key={goal}>{goal}</li>)}</ol></div>
          </div>
        </section>

        <section className="case-work" aria-labelledby="case-work-title">
          <div className="container">
            <div className="case-work-header">
              <div><span className="case-overline">Pristup</span><h2 id="case-work-title">{project.scopeTitle}</h2></div>
              <p>{project.scopeDescription}</p>
            </div>
            <div className="case-work-grid">
              {project.scope.map((item, index) => (
                <article className="case-work-item" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {project.gallery.length > 1 && (
          <section className="case-gallery" aria-labelledby="case-gallery-title">
            <div className="container">
              <div className="case-gallery-head"><h2 id="case-gallery-title">{project.galleryTitle}</h2><p>{project.scopeDescription}</p></div>
              <div className="case-gallery-grid">
                {project.gallery.slice(1).map((image) => (
                  <figure key={image.src}>
                    <Image src={image.src} alt={image.alt} width={1200} height={900} loading="lazy" sizes="(max-width: 767px) 100vw, 60vw" />
                    <figcaption>{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="case-result" aria-labelledby="case-result-title">
          <div className="container case-result-grid">
            <div><span className="case-overline">Ishod</span><h2 id="case-result-title">{project.outcomeTitle}</h2></div>
            <div className="case-result-copy"><p>{project.outcome}</p><strong>{project.result.value} — {project.result.label}</strong></div>
          </div>
        </section>

        <section className="case-continuity" aria-labelledby="case-continuity-title">
          <div className="container case-continuity-grid">
            <div><span className="case-overline">{project.feature.label}</span><h2 id="case-continuity-title">{project.feature.title}</h2></div>
            <div>
              <p>{project.feature.description}</p>
              <p className="case-feature-identity"><span>{project.feature.status}</span><strong>{project.feature.name}</strong></p>
              <ul>{project.feature.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link href={project.feature.href}>{project.feature.linkLabel} ↗</Link>
            </div>
          </div>
        </section>

        {project.relatedServices.length > 0 && (
          <section className="case-related" aria-labelledby="case-related-title">
            <div className="container">
              <h2 id="case-related-title">Povezane usluge</h2>
              <div className="case-related-grid">
                {project.relatedServices.map((service) => (
                  <Link href={service.href} key={service.href}>
                    <strong>{service.title}</strong><span>{service.description}</span><span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <section className="case-next" aria-labelledby="case-next-title">
        <div className="container case-next-inner">
          <div><span className="case-overline">Vaš sljedeći korak</span><h2 id="case-next-title">{project.finalCta.title}</h2><p>{project.finalCta.description}</p></div>
          <Link href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </EditorialShell>
  );
}
