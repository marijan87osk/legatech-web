import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChartLineUp,
  ImageSquare,
  MagnifyingGlass,
  MapPin,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { ServiceClientLogos } from "@/src/components/client-logo-wall";
import { Faq } from "@/src/components/faq";
import { Reveal } from "@/src/components/reveal";
import { SeoProblemDiagnosis } from "@/src/components/seo-problem-diagnosis";
import { ServiceExpectations } from "@/src/components/service-expectations";
import { ServiceFinalCta } from "@/src/components/service-final-cta";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { TestimonialSlider } from "@/src/components/testimonial-slider";
import {
  localSeoSteps,
  seoActivities,
  seoAudience,
  seoAuditChecks,
  seoBenefits,
  seoEngagements,
  seoFaq,
  seoPackages,
  seoProblems,
  seoProcess,
  seoProjects,
  seoTestimonials,
  seoTimeline,
} from "@/src/data/seo-optimization";

export const metadata: Metadata = {
  title: "SEO optimizacija za veću Google vidljivost | Legatech",
  description:
    "SEO optimizacija za hrvatske tvrtke koje žele relevantniji organski promet i više kvalitetnih upita. Paketi od 290 € mjesečno.",
};

const relatedServices = [
  {
    title: "Izrada web stranica",
    description: "Kada struktura, brzina ili sadržaj postojećeg weba ograničavaju SEO napredak.",
    href: "/izrada-web-stranica-cijena",
  },
  {
    title: "Izrada web trgovina",
    description: "Tehnički uredan shop s jasnom strukturom kategorija i proizvodnih stranica.",
    href: "/izrada-web-trgovina",
  },
  {
    title: "Održavanje web stranica",
    description: "Redovita tehnička podrška za sigurnost, stabilnost i provedbu manjih dorada.",
    href: "/odrzavanje-web-stranica",
  },
];

export default function SeoOptimizationPage() {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />

      <main id="sadrzaj" className="inner-page seo-page">
        <section className="seo-hero" aria-labelledby="seo-title">
          <div className="container seo-hero-grid">
            <div className="seo-hero-copy">
              <p className="mono-label">SEO optimizacija</p>
              <h1 id="seo-title">SEO optimizacija za veću vidljivost i više pravih upita.</h1>
              <p className="seo-hero-lead">
                Gradimo organsku vidljivost kroz tehničke dorade, koristan sadržaj i lokalni SEO koji dovodi relevantne posjetitelje.
              </p>
              <div className="seo-hero-actions">
                <Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link>
                <a className="button button-secondary" href="#seo-paketi">Pogledajte pakete</a>
              </div>
              <div className="seo-hero-price">
                <span>Početna cijena</span>
                <strong>Od 290 € mjesečno</strong>
                <small>Jednokratna početna priprema od 150 €.</small>
              </div>
            </div>

            <Reveal className="seo-hero-project" delay={0.08}>
              <div className="seo-hero-image">
                <Image
                  src="/projects/ducija/cover.webp"
                  alt="Stvarni Ducija projekt izrade web stranice i lokalne SEO optimizacije"
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </div>
              <div className="seo-hero-caption">
                <span className="project-real-label">Lokalni SEO / 2026.</span>
                <div>
                  <strong>Ducija</strong>
                  <span>Novi web, lokalni SEO i održavanje</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <ServiceExpectations
          title="Način rada i očekivanja SEO suradnje"
          items={[
            {
              icon: <Target size={25} aria-hidden="true" />,
              title: "Bez jamčenja pozicija",
              description: "Obećavamo dogovoreni rad i transparentnost, ne rezultat koji nitko ne može kontrolirati.",
            },
            {
              icon: <MagnifyingGlass size={25} aria-hidden="true" />,
              title: "Aktivnosti koje razumijete",
              description: "Znate što je napravljeno, zašto je važno i što slijedi nakon svakog izvještaja.",
            },
            {
              icon: <ChartLineUp size={25} aria-hidden="true" />,
              title: "Promet povezan s ciljem",
              description: "Pratimo relevantne posjete, obrasce, pozive i druge radnje koje imaju poslovnu vrijednost.",
            },
          ]}
          note="SEO je dugoročan proces, a rezultati ovise o konkurenciji, stanju weba i autoritetu domene."
        />

        <ServiceClientLogos />

        <section className="section seo-audience-section" aria-labelledby="seo-audience-title">
          <div className="container seo-audience-layout">
            <Reveal className="seo-sticky-intro">
              <p className="mono-label">Za koga je SEO</p>
              <h2 id="seo-audience-title">Kupci traže uslugu. Vaš web još nije dio njihove odluke.</h2>
              <p>SEO ima smisla kada problem nije samo broj posjeta, nego njihova relevantnost i sposobnost weba da ih pretvori u upite.</p>
            </Reveal>
            <div className="seo-audience-list">
              {seoAudience.map(([title, description]) => (
                <article key={title}>
                  <Check size={21} weight="bold" aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-problems-section" aria-labelledby="seo-problems-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="seo-problems-title">Prvo pronalazimo gdje vidljivost zapinje.</h2>
              <p>Odaberite problem i pogledajte kako ga povezujemo s konkretnim poslovnim učinkom.</p>
            </Reveal>
            <SeoProblemDiagnosis problems={seoProblems} />
          </div>
        </section>

        <section className="section seo-activities-section" aria-labelledby="seo-activities-title">
          <div className="container">
            <Reveal className="seo-activities-heading">
              <p className="mono-label">Što SEO uključuje</p>
              <h2 id="seo-activities-title">Jedna strategija povezuje tehniku, sadržaj i tržište.</h2>
              <p>Nijedna pojedinačna dorada nije dovoljna ako ostali dijelovi weba rade protiv nje.</p>
            </Reveal>
            <div className="seo-activities-grid">
              {seoActivities.map((group, index) => (
                <Reveal key={group.title} className={`seo-activity seo-activity-${index + 1}`} delay={index * 0.035}>
                  <span className="seo-activity-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <p>{group.benefit}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-audit-section" aria-labelledby="seo-audit-title">
          <div className="container seo-audit-layout">
            <Reveal className="seo-audit-intro">
              <span className="seo-audit-mark" aria-hidden="true"><MagnifyingGlass size={36} /></span>
              <h2 id="seo-audit-title">Audit pretvara nejasan problem u redoslijed poteza.</h2>
              <p>Ne mijenjamo web naslijepo. Prvo utvrđujemo što koči rezultat, koliko je važno i što treba napraviti prije ostalog.</p>
              <p className="seo-audit-note">SEO audit je dio šire SEO usluge, a može se ugovoriti i kao jasno definiran jednokratni pregled.</p>
            </Reveal>
            <ol className="seo-audit-list">
              {seoAuditChecks.map(([title, description], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section seo-local-section" aria-labelledby="seo-local-title">
          <div className="container seo-local-layout">
            <div className="seo-local-copy">
              <span className="seo-local-icon" aria-hidden="true"><MapPin size={34} /></span>
              <h2 id="seo-local-title">Budite vidljivi tamo gdje kupac stvarno traži uslugu.</h2>
              <p>Lokalni SEO povezuje grad, područje rada, Google Business profil i sadržaj weba u uvjerljivu cjelinu.</p>
              <p>Posebno je važan obrtima i uslužnim tvrtkama kojima većina kvalitetnih upita dolazi iz određenog grada ili regije.</p>
            </div>
            <ol className="seo-local-path">
              {localSeoSteps.map(([title, description], index) => (
                <li key={title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section seo-timeline-section" aria-labelledby="seo-timeline-title">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <p className="mono-label">Realistična očekivanja</p>
              <h2 id="seo-timeline-title">SEO rezultat razvija se kroz faze.</h2>
              <p>Brzina promjene ovisi o konkurenciji, stanju weba, količini kvalitetnog sadržaja i postojećem autoritetu domene.</p>
            </Reveal>
            <ol className="seo-timeline" tabIndex={0} aria-label="Vremenske faze SEO optimizacije">
              {seoTimeline.map((phase) => (
                <li key={phase.period}>
                  <span className="seo-timeline-period">{phase.period}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section seo-projects-section" aria-labelledby="seo-projects-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="seo-projects-title">Primjeri kako povezujemo problem, rad i rezultat.</h2>
              <p>Stvarni projekti pokazuju kako SEO podržava različite poslovne modele, lokalnu vidljivost i dugoročnu kvalitetu weba.</p>
            </Reveal>
            <div className="seo-projects-grid">
              {seoProjects.map((project, index) => (
                <article key={project.client} className={`seo-project-card seo-project-card-${index + 1}`}>
                  <div className="seo-project-media">
                    {project.image ? (
                      <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, 58vw" />
                    ) : (
                      <div className="seo-project-placeholder" role="img" aria-label={project.imageAlt}>
                        <ImageSquare size={44} aria-hidden="true" />
                        <span>Placeholder za budući prikaz projekta</span>
                      </div>
                    )}
                  </div>
                  <div className="seo-project-body">
                    <div className="seo-project-meta">{project.mock && <span className="demo-label">Demo projekt</span>}<span>{project.service}</span></div>
                    <h3>{project.client}</h3>
                    <dl>
                      <div><dt>Problem</dt><dd>{project.challenge}</dd></div>
                      <div><dt>Pristup</dt><dd>{project.solution}</dd></div>
                    </dl>
                    <div className="seo-project-result">
                      <span>{project.verified ? "Potvrđen kvalitativan ishod" : "Demo rezultat, nije verificiran"}</span>
                      <strong>{project.result}</strong>
                      <p>{project.resultLabel}</p>
                    </div>
                    {project.href && (
                      <Link className="text-link seo-project-link" href={project.href}>
                        Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-process-section" aria-labelledby="seo-process-title">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2 id="seo-process-title">SEO je ciklus učenja, provedbe i nove odluke.</h2>
              <p>Svaki krug rada koristi prethodne podatke kako bi sljedeći prioritet bio precizniji.</p>
            </Reveal>
            <div className="seo-cycle" tabIndex={0} aria-label="Ciklički proces SEO optimizacije">
              <div className="seo-cycle-center" aria-hidden="true">
                <span>Kontinuirani</span>
                <strong>SEO ciklus</strong>
              </div>
              <ol className="seo-cycle-track">
                {seoProcess.map(([title, description], index) => (
                  <li key={title} className={`seo-cycle-step seo-cycle-step-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section seo-engagement-section" aria-labelledby="seo-engagement-title">
          <div className="container">
            <Reveal className="seo-engagement-heading">
              <h2 id="seo-engagement-title">Nije svaki SEO problem mjesečni projekt.</h2>
              <p>Odabir ovisi o tome trebate li dijagnozu, preciznu doradu ili kontinuirano graditi vidljivost.</p>
            </Reveal>
            <div className="seo-engagement-grid">
              {seoEngagements.map((item) => (
                <article key={item.title}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <strong>{item.bestFor}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="seo-paketi" className="section seo-packages-section" aria-labelledby="seo-packages-title">
          <div className="container">
            <Reveal className="seo-packages-heading">
              <p className="mono-label">Paketi i početne cijene</p>
              <h2 id="seo-packages-title">Od lokalne vidljivosti do ozbiljnog organskog kanala.</h2>
              <p>Preporučeno trajanje suradnje je najmanje šest mjeseci. Konačni opseg potvrđujemo nakon početnog pregleda.</p>
            </Reveal>
            <div className="seo-package-list">
              {seoPackages.map((item) => (
                <article key={item.name} className={`seo-package${item.featured ? " is-featured" : ""}`}>
                  <div className="seo-package-summary">
                    {item.featured && <span className="seo-package-choice">Najčešći odabir</span>}
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="seo-package-best">{item.bestFor}</span>
                    <div className="seo-package-price"><span>Od</span><strong>{item.startingPrice}</strong></div>
                    <dl>
                      <div><dt>Početna priprema</dt><dd>{item.setupPrice}</dd></div>
                      <div><dt>Strateški sastanak</dt><dd>{item.meeting}</dd></div>
                    </dl>
                  </div>
                  <div className="seo-package-inclusions">
                    <h4>Što paket uključuje</h4>
                    <ul>
                      {item.inclusions.map((inclusion) => (
                        <li key={inclusion}><Check size={18} weight="bold" aria-hidden="true" /><span>{inclusion}</span></li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="seo-package-note">
              <p>SEO ne uključuje niti može jamčiti određenu poziciju. Troškovi objava na vanjskim portalima i medijskog prostora nisu uključeni.</p>
              <Link className="button button-secondary" href="/cjenik#seo">Pogledajte detaljan cjenik</Link>
            </div>
          </div>
        </section>

        <section className="section seo-testimonials-section" aria-label="Izjave klijenata o suradnji s Legatechom">
          <div className="container">
            <TestimonialSlider items={seoTestimonials} />
          </div>
        </section>

        <section className="section seo-benefits-section" aria-labelledby="seo-benefits-title">
          <div className="container seo-benefits-layout">
            <Reveal className="seo-sticky-intro">
              <h2 id="seo-benefits-title">Vidljivost ima smisla tek kada podržava poslovni cilj.</h2>
              <p>SEO promatramo zajedno s kvalitetom weba, jasnoćom ponude i načinom na koji posjetitelj postaje upit.</p>
            </Reveal>
            <div className="seo-benefits-list">
              {seoBenefits.map(([title, description]) => (
                <article key={title}>
                  <Check size={21} weight="bold" aria-hidden="true" />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-faq-section" aria-labelledby="seo-faq-title">
          <div className="container faq-layout">
            <Reveal className="faq-intro">
              <h2 id="seo-faq-title">Prije ulaganja trebate znati što je realno.</h2>
              <p>Od cijene i trajanja do pristupa podacima i prvih šest mjeseci suradnje.</p>
            </Reveal>
            <Faq items={seoFaq} />
          </div>
        </section>

        <section className="section seo-related-section" aria-labelledby="seo-related-title">
          <div className="container seo-related-layout">
            <div>
              <h2 id="seo-related-title">Ponekad SEO problem počinje u samom webu.</h2>
              <p>Kada tehnička osnova ili korisničko iskustvo ograničavaju napredak, povezujemo SEO s odgovarajućom uslugom.</p>
            </div>
            <div className="seo-related-list">
              {relatedServices.map((service) => (
                <Link key={service.href} href={service.href}>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
              <Link className="seo-related-pricing" href="/cjenik">Pogledajte cijeli cjenik <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <ServiceFinalCta
          headingId="seo-final-title"
          title="Ne morate znati gdje je SEO problem."
          description="Opišite poslovanje, tržište i što želite poboljšati. Početni pregled pokazat će ima li više smisla audit, ciljana dorada ili kontinuiran rad."
        />
      </main>

      <SiteFooter />
    </>
  );
}
