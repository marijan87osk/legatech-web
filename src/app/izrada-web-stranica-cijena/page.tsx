import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Handshake,
  ImageSquare,
  Lifebuoy,
  ListChecks,
} from "@phosphor-icons/react/dist/ssr";
import { ServiceClientLogos } from "@/src/components/client-logo-wall";
import { Faq } from "@/src/components/faq";
import { Reveal } from "@/src/components/reveal";
import { ServiceExpectations } from "@/src/components/service-expectations";
import { ServiceFinalCta } from "@/src/components/service-final-cta";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { TestimonialSlider } from "@/src/components/testimonial-slider";
import { WebsiteProblemDiagnosis } from "@/src/components/website-problem-diagnosis";
import { ducijaProject } from "@/src/data/projects";
import {
  websiteAudience,
  websiteBenefits,
  websiteDeliverables,
  websiteFaq,
  websitePackages,
  websiteProblems,
  websiteProcess,
  websiteProjects,
  websiteStandards,
  websiteTestimonials,
  websiteTypes,
} from "@/src/data/website-development";

export const metadata: Metadata = {
  title: "Izrada Web Stranica – Cijena I Paketi - Legatech",
  description:
    "Profesionalna izrada web stranica za obrte i tvrtke. Paketi od 500 €, responzivan dizajn, SEO temelji, analitika i podrška nakon objave.",
  alternates: {
    canonical: "https://legatech.hr/izrada-web-stranica-cijena/",
  },
  openGraph: {
    title: "Izrada Web Stranica – Cijena I Paketi - Legatech",
    description:
      "Profesionalna izrada web stranica za obrte i tvrtke. Paketi od 500 €, responzivan dizajn, SEO temelji, analitika i podrška nakon objave.",
    url: "https://legatech.hr/izrada-web-stranica-cijena/",
    type: "website",
  },
};

const relatedServices = [
  {
    title: "SEO optimizacija",
    description: "Nastavite graditi vidljivost za pretrage koje mogu donijeti relevantne upite.",
    href: "/seo-optimizacija-cijena",
  },
  {
    title: "Izrada web trgovina",
    description: "Kada katalog, naplata i dostava trebaju biti dio online prodajnog procesa.",
    href: "/izrada-web-trgovina",
  },
  {
    title: "Održavanje web stranica",
    description: "Ažuriranja, sigurnosne kopije i podrška nakon početnog razdoblja uključenog u izradu.",
    href: "/odrzavanje-web-stranica",
  },
];

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />

      <main id="sadrzaj" className="inner-page webdev-page">
        <section className="webdev-hero">
          <div className="container webdev-hero-grid">
            <div className="webdev-hero-copy">
              <p className="mono-label">Izrada web stranica</p>
              <h1>Izrada web stranica – cijena i paketi</h1>
              <p className="webdev-hero-lead">
                Planiramo, dizajniramo i razvijamo brz web koji jasno predstavlja ponudu i vodi prave posjetitelje prema upitu.
              </p>
              <div className="webdev-hero-actions">
                <Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link>
                <a className="button button-secondary" href="#paketi">Pogledajte pakete</a>
              </div>
              <div className="webdev-hero-price">
                <span>Početna cijena</span>
                <strong>Od 500 €</strong>
                <small>Konačna cijena ovisi o opsegu projekta.</small>
              </div>
            </div>

            <Reveal className="webdev-hero-project" delay={0.08}>
              <div className="webdev-hero-image">
                <Image
                  src={ducijaProject.image}
                  alt={ducijaProject.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </div>
              <div className="webdev-project-caption">
                <span className="project-real-label">Web od nule / 2026.</span>
                <strong>{ducijaProject.client}</strong>
                <span>{ducijaProject.serviceLabel}</span>
              </div>
            </Reveal>
          </div>
        </section>

        <ServiceExpectations
          title="Što možete očekivati od izrade web stranice"
          items={[
            {
              icon: <Handshake size={25} aria-hidden="true" />,
              title: "Izravna suradnja",
              description: "Razgovarate izravno s osobom koja planira, dizajnira i razvija vašu web stranicu.",
            },
            {
              icon: <ListChecks size={25} aria-hidden="true" />,
              title: "Jasan opseg i cijena",
              description: "Prije početka znate što je uključeno, koliko projekt traje i koje su obveze obje strane.",
            },
            {
              icon: <Lifebuoy size={25} aria-hidden="true" />,
              title: "Podrška nakon objave",
              description: "Nakon objave prolazimo upravljanje stranicom i ostajemo dostupni tijekom uključene podrške.",
            },
          ]}
          note="Konačan opseg, cijenu i rok potvrđujemo pisanom ponudom prije početka rada."
        />

        <ServiceClientLogos />

        <section className="section webdev-audience-section">
          <div className="container webdev-audience-layout">
            <Reveal className="webdev-sticky-intro">
              <h2>Web više ne odgovara poslu koji danas vodite.</h2>
              <p>Nova stranica ima smisla kada trenutna online prisutnost usporava povjerenje, upite ili daljnji rast.</p>
            </Reveal>
            <div className="webdev-audience-list">
              {websiteAudience.map(([title, description]) => (
                <article key={title}>
                  <Check size={21} weight="bold" aria-hidden="true" />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section webdev-problems-section">
          <div className="container">
            <Reveal className="section-heading">
              <p className="mono-label">Problemi i rješenja</p>
              <h2>Prepoznajmo što web trenutno koči.</h2>
              <p>Odaberite problem kako biste vidjeli konkretan smjer rješenja.</p>
            </Reveal>
            <WebsiteProblemDiagnosis problems={websiteProblems} />
          </div>
        </section>

        <section className="section webdev-deliverables-section">
          <div className="container">
            <Reveal className="section-heading">
              <h2>Cijeli sustav, ne samo nekoliko lijepih ekrana.</h2>
            </Reveal>
            <div className="webdev-deliverables-grid">
              {websiteDeliverables.map((item, index) => (
                <Reveal key={item.title} className={`webdev-deliverable webdev-deliverable-${index + 1}`} delay={index * 0.04}>
                  <span className="webdev-deliverable-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section webdev-types-section">
          <div className="container webdev-types-layout">
            <Reveal className="webdev-types-intro">
              <h2>Format prati poslovni zadatak.</h2>
              <p>Ne treba svakom poslovanju isti broj stranica, sadržaja ili funkcionalnosti.</p>
            </Reveal>
            <div className="webdev-types-list">
              {websiteTypes.map(([title, description], index) => (
                <article key={title} className={index === 0 || index === 5 ? "is-wide" : undefined}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section webdev-standards-section">
          <div className="container webdev-standards-layout">
            <div>
              <h2>Tehničke odluke imaju poslovnu posljedicu.</h2>
            </div>
            <div className="webdev-standards-list">
              {websiteStandards.map(([title, description]) => (
                <article key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="projekti" className="section webdev-projects-section">
          <div className="container">
            <Reveal className="section-heading">
              <h2>Od prazne stranice do stvarne uloge u poslovanju.</h2>
              <p>Stvarni projekti prikazuju različite početne situacije, potvrđen opseg rada i konkretnu poslovnu ulogu weba.</p>
            </Reveal>
            <div className="webdev-projects-list">
              {websiteProjects.map((project, index) => (
                <article key={project.client} className={`webdev-project webdev-project-${index + 1}`}>
                  <div className="webdev-project-media">
                    {project.image ? (
                      <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 55vw" />
                    ) : (
                      <div className="webdev-image-placeholder" role="img" aria-label={project.imageAlt}>
                        <ImageSquare size={44} aria-hidden="true" />
                        <span>Placeholder za budući prikaz projekta</span>
                      </div>
                    )}
                  </div>
                  <div className="webdev-project-content">
                    <div className="webdev-project-meta">
                      {project.mock && <span className="demo-label">Demo projekt</span>}
                      <span>{project.service}</span>
                    </div>
                    <h3>{project.client}</h3>
                    <dl>
                      <div><dt>Problem</dt><dd>{project.challenge}</dd></div>
                      <div><dt>Rješenje</dt><dd>{project.solution}</dd></div>
                    </dl>
                    <div className="webdev-project-result">
                      <span>{project.verified ? "Potvrđen ishod" : "Demo rezultat, nije verificiran"}</span>
                      <strong>{project.result}</strong>
                      <p>{project.resultLabel}</p>
                    </div>
                    {project.href && (
                      <Link className="text-link webdev-project-link" href={project.href}>
                        Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proces" className="section webdev-process-section">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2>Jasan slijed od prvog razgovora do objave.</h2>
              <p>U svakom trenutku znate što radimo, što trebamo od vas i što slijedi.</p>
            </Reveal>
            <ol className="service-process-track" tabIndex={0} aria-label="Proces izrade web stranice">
              {websiteProcess.map(([title, description], index) => (
                <li key={title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="paketi" className="section webdev-packages-section">
          <div className="container">
            <Reveal className="webdev-packages-heading">
              <div><p className="mono-label">Paketi i početne cijene</p><h2>Odaberite opseg koji odgovara ulozi weba u poslovanju.</h2></div>
              <p>Sve cijene predstavljaju početni okvir za unaprijed definiran opseg. Konačnu ponudu dobivate nakon kratkih konzultacija.</p>
            </Reveal>
            <div className="webdev-package-list">
              {websitePackages.map((item) => (
                <article key={item.name} className={`webdev-package${item.featured ? " is-featured" : ""}`}>
                  <div className="webdev-package-summary">
                    {item.featured && <span className="webdev-package-choice">Najčešći odabir</span>}
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="webdev-package-best">{item.bestFor}</span>
                    <div className="webdev-package-price"><span>Od</span><strong>{item.startingPrice}</strong></div>
                    <dl>
                      <div><dt>Rok</dt><dd>{item.timeline}</dd></div>
                      <div><dt>Korekcije</dt><dd>{item.revisions}</dd></div>
                      <div><dt>Edukacija</dt><dd>{item.training}</dd></div>
                      <div><dt>Podrška</dt><dd>{item.support}</dd></div>
                    </dl>
                  </div>
                  <div className="webdev-package-inclusions">
                    <h4>Što paket uključuje</h4>
                    <ul>{item.inclusions.map((inclusion) => <li key={inclusion}><Check size={18} weight="bold" aria-hidden="true" /><span>{inclusion}</span></li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="webdev-package-note">
              <p>Tekstovi, profesionalne fotografije, prijevodi, domena, hosting, premium licence i funkcionalnosti izvan navedenog opsega nisu uključeni.</p>
              <Link className="button button-secondary" href="/cjenik#web-stranice">Pogledajte detaljan cjenik</Link>
            </div>
          </div>
        </section>

        <section className="section webdev-testimonials-section" aria-label="Izjave klijenata o suradnji s Legatechom">
          <div className="container">
            <TestimonialSlider items={websiteTestimonials} />
          </div>
        </section>

        <section className="section webdev-benefits-section">
          <div className="container webdev-benefits-layout">
            <Reveal className="webdev-sticky-intro">
              <p className="mono-label">Zašto Legatech</p>
              <h2>Mali tim znači više fokusa na vaš projekt.</h2>
              <p>Tehnologiju i dizajn prevodimo u odluke koje možete razumjeti i povezati s poslovnim ciljem.</p>
            </Reveal>
            <div className="webdev-benefits-list">
              {websiteBenefits.map(([title, description]) => (
                <article key={title}><Check size={21} weight="bold" aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section webdev-faq-section">
          <div className="container faq-layout">
            <Reveal className="faq-intro">
              <p className="mono-label">Česta pitanja</p>
              <h2>Važne informacije prije početka.</h2>
              <p>Ako ne pronađete odgovor, opišite projekt i javit ćemo se s konkretnim sljedećim korakom.</p>
            </Reveal>
            <Faq items={websiteFaq} />
          </div>
        </section>

        <section className="section webdev-related-section">
          <div className="container webdev-related-layout">
            <div><h2>Web može nastaviti rasti nakon objave.</h2></div>
            <div className="webdev-related-list">
              {relatedServices.map((service) => (
                <Link key={service.href} href={service.href}>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
              <Link className="webdev-related-pricing" href="/cjenik">Pogledajte cijeli cjenik <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <ServiceFinalCta
          headingId="webdev-final-title"
          title="Ne trebate imati gotovu specifikaciju."
          description="Opišite poslovanje, trenutni problem i rezultat koji želite postići. Predložit ćemo realan sljedeći korak."
        />
      </main>

      <SiteFooter />
    </>
  );
}
