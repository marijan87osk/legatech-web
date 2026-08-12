import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { ServiceFinalCta } from "@/src/components/service-final-cta";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { getProjectBySlug, projectDetails } from "@/src/data/projects";

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

  return {
    title: `${project.client}: ${project.serviceLabel} | Legatech`,
    description: project.lead,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className={`inner-page case-study-page case-study-page-${project.variant}`}>
        <section className="case-study-hero">
          <div className="container case-study-hero-grid">
            <div className="case-study-hero-copy">
              <Link className="case-study-back" href="/projekti">
                <ArrowLeft size={18} aria-hidden="true" /> Svi projekti
              </Link>
              <p className="project-real-label">{project.year ? `${project.serviceLabel} / ${project.year}` : project.serviceLabel}</p>
              <h1>{project.heroTitle}</h1>
              <p>{project.lead}</p>
            </div>
            <dl className="case-study-meta">
              <div><dt>Klijent</dt><dd>{project.client}</dd></div>
              <div><dt>Djelatnost</dt><dd>{project.industry}</dd></div>
              <div><dt>Usluge</dt><dd>{project.serviceLabel}</dd></div>
              {project.year && <div><dt>Godina</dt><dd>{project.year}</dd></div>}
              <div>
                <dt>Web stranica</dt>
                <dd>
                  <a href={project.website} target="_blank" rel="noreferrer">
                    {project.websiteLabel} <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="case-study-cover-section" aria-label={`Prikaz projekta ${project.client}`}>
          <div className="container">
            <div className="case-study-cover">
              <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width: 767px) 100vw, 1280px" />
            </div>
          </div>
        </section>

        <section className="section case-study-start-section" aria-labelledby="project-start-title">
          <div className="container case-study-start-grid">
            <div>
              <h2 id="project-start-title">{project.startingTitle}</h2>
              <p>{project.startingPoint}</p>
            </div>
            <div className="case-study-goals">
              <span>Ciljevi projekta</span>
              <ul>
                {project.goals.map((goal) => (
                  <li key={goal}><Check size={20} weight="bold" aria-hidden="true" /> {goal}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section case-study-scope-section" aria-labelledby="project-scope-title">
          <div className="container">
            <div className="case-study-section-heading">
              <h2 id="project-scope-title">{project.scopeTitle}</h2>
              <p>{project.scopeDescription}</p>
            </div>
            <div className="case-study-scope-grid">
              {project.scope.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section case-study-gallery-section" aria-labelledby="project-gallery-title">
          <div className="container">
            <div className="case-study-section-heading case-study-gallery-heading">
              <h2 id="project-gallery-title">{project.galleryTitle}</h2>
            </div>
            <div className="case-study-gallery">
              {project.gallery.slice(1).map((image, index) => (
                <figure key={image.src} className={`case-study-gallery-item case-study-gallery-item-${index + 1}`}>
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, 62vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section case-study-outcome-section" aria-labelledby="project-outcome-title">
          <div className="container case-study-outcome-grid">
            <div>
              <h2 id="project-outcome-title">{project.outcomeTitle}</h2>
              <p>{project.outcome}</p>
              <div className="case-study-result">
                <strong>{project.result.value}</strong>
                <span>{project.result.label}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section case-study-maintenance-section case-study-feature-section" aria-labelledby="project-feature-title">
          <div className="container case-study-maintenance-grid case-study-feature-grid">
            <div>
              <p className="case-study-section-number">{project.feature.label}</p>
              <h2 id="project-feature-title">{project.feature.title}</h2>
              <p>{project.feature.description}</p>
              <Link className="text-link" href={project.feature.href}>
                {project.feature.linkLabel} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="case-study-maintenance-plan case-study-feature-card">
              <span>{project.feature.status}</span>
              <h3>{project.feature.name}</h3>
              <ul>
                {project.feature.items.map((item) => (
                  <li key={item}><Check size={18} weight="bold" aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section case-study-related-section" aria-labelledby="project-related-title">
          <div className="container case-study-related-grid">
            <div>
              <h2 id="project-related-title">Isti pristup za vaš sljedeći projekt.</h2>
            </div>
            <div className="case-study-related-links">
              {project.relatedServices.map((service) => (
                <Link key={service.href} href={service.href}>
                  <span><strong>{service.title}</strong><small>{service.description}</small></span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ServiceFinalCta
          headingId="project-final-title"
          title={project.finalCta.title}
          description={project.finalCta.description}
        />
      </main>
      <SiteFooter />
    </>
  );
}
