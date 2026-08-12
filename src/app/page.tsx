import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Browser,
  ChartLineUp,
  Check,
  Lifebuoy,
  ShoppingBagOpen,
} from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/src/components/contact-form";
import { ClientLogoWall } from "@/src/components/client-logo-wall";
import { Faq } from "@/src/components/faq";
import { ProblemSolver } from "@/src/components/problem-solver";
import { Reveal } from "@/src/components/reveal";
import { SiteHeader } from "@/src/components/site-header";
import { SiteFooter } from "@/src/components/site-footer";
import { TestimonialSlider } from "@/src/components/testimonial-slider";
import { testimonials } from "@/src/data/client-testimonials";
import { faqItems } from "@/src/data/mock-content";
import { ducijaProject, projects } from "@/src/data/projects";
import { blogPosts } from "@/src/lib/blog";

const services = [
  {
    title: "Izrada web stranica",
    description: "Brz, responzivan i jasno strukturiran web koji posjetitelje vodi prema upitu.",
    href: "/izrada-web-stranica-cijena",
    className: "service-web",
    icon: Browser,
    detail: "Od prvog plana do objave i podrške",
  },
  {
    title: "SEO optimizacija",
    description: "Tehnički i sadržajni temelji za veću vidljivost u relevantnim Google pretragama.",
    href: "/seo-optimizacija-cijena",
    className: "service-seo",
    icon: ChartLineUp,
    detail: "Bez nerealnih obećanja i vanity metrika",
  },
  {
    title: "Izrada web trgovina",
    description: "Pregledna kupnja na svakom uređaju, jednostavno upravljanje i prostor za rast.",
    href: "/izrada-web-trgovina",
    className: "service-shop",
    icon: ShoppingBagOpen,
    detail: "Proizvodi, plaćanje, dostava i analitika",
  },
  {
    title: "Održavanje web stranica",
    description: "Ažuriranja, sigurnosne kopije, provjere i tehnička pomoć kada vam je potrebna.",
    href: "/odrzavanje-web-stranica",
    className: "service-care",
    icon: Lifebuoy,
    detail: "Jasan opseg i dogovoreno vrijeme reakcije",
  },
];

const benefits = [
  ["Razgovarate izravno", "Bez prodajnih slojeva i prenošenja informacija kroz veliki tim."],
  ["Znate što plaćate", "Opseg, cijena i rokovi definirani su prije početka rada."],
  ["Web ima poslovni zadatak", "Svaka odluka povezana je s upitima, prodajom ili povjerenjem."],
  ["Podrška ne prestaje objavom", "Po potrebi nastavljamo održavati, pratiti i poboljšavati web."],
];

const process = [
  ["Upoznajemo poslovanje", "Ciljevi, kupci, konkurencija i trenutne prepreke."],
  ["Dogovaramo opseg", "Struktura, sadržaj, funkcionalnosti, cijena i rok."],
  ["Oblikujemo strukturu", "Put posjetitelja i sadržaj koji odgovara na prava pitanja."],
  ["Dizajniramo i razvijamo", "Vizualni sustav i brza, responzivna izvedba."],
  ["Testiramo i objavljujemo", "Sadržaj, obrasci, uređaji, SEO temelji i analitika."],
  ["Ostajemo dostupni", "Edukacija, početna podrška i opcionalno održavanje."],
];

const prices = [
  ["Izrada web stranica", "Od 500 €", "Profesionalni web do pet jedinstvenih podstranica."],
  ["Izrada web shopa", "Od 1.500 €", "WooCommerce trgovina s osnovnim katalogom i naplatom."],
  ["SEO optimizacija", "Od 290 € mjesečno", "Kontinuirani rad na vidljivosti, sadržaju i tehničkom stanju."],
  ["Održavanje", "Od 35 € mjesečno", "Ažuriranja, sigurnosne provjere, backup i podrška."],
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">
        Preskočite na sadržaj
      </a>
      <SiteHeader />

      <main id="sadrzaj">
        <section id="vrh" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">Digitalna agencija iz Osijeka</p>
              <h1>Web koji radi za vaše poslovanje.</h1>
              <p className="hero-lead">
                Izrada web stranica, trgovina i SEO koji donose više pravih upita.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/kontakt">
                  Zatražite ponudu
                </Link>
                <a className="button button-secondary" href="#projekti">
                  Pogledajte projekte
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <Image
                  src="/projects/ducija/cover-hero.webp"
                  alt={ducijaProject.imageAlt}
                  fill
                  preload
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </div>
              <div className="hero-project-note">
                <span>Web od nule / {ducijaProject.year}</span>
                <strong>{ducijaProject.client}</strong>
                <span>{ducijaProject.serviceLabel}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="credibility-band" aria-label="Način suradnje">
          <div className="container credibility-grid">
            <p>Osobna suradnja</p>
            <p>Transparentne početne cijene</p>
            <p>Podrška nakon objave</p>
          </div>
        </section>

        <section id="klijenti" className="client-logos-section" aria-labelledby="client-logos-title">
          <div className="container client-logos-wrap">
            <div className="client-logos-header">
              <h2 id="client-logos-title">Odabrani klijenti</h2>
            </div>
            <ClientLogoWall />
          </div>
        </section>

        <section id="usluge" className="section">
          <div className="container">
            <Reveal className="section-heading">
              <h2>Sve što web treba da podrži rast.</h2>
              <p>
                Četiri povezane usluge, jedan jasan smjer i rješenje prilagođeno stvarnom cilju vašeg poslovanja.
              </p>
            </Reveal>

            <div className="services-system">
              <div className="services-grid">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Reveal key={service.title} className={`service-tile ${service.className}`} delay={index * 0.05}>
                      <a href={service.href}>
                        <div className="service-topline">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <Icon size={28} weight="regular" aria-hidden="true" />
                        </div>
                        <div>
                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                        </div>
                        <div className="service-footer">
                          <span>{service.detail}</span>
                          <ArrowUpRight size={22} aria-hidden="true" />
                        </div>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal className="services-outcome">
                <div>
                  <span>Zajednički cilj</span>
                  <strong>Web koji privlači, objašnjava i pretvara interes u upit.</strong>
                </div>
                <div className="services-flow" aria-label="Put od vidljivosti do poslovnog rasta">
                  <span>Vidljivost</span>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>Povjerenje</span>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>Upit</span>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>Rast</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section problem-section">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2>Ne trebate još jedan lijep web.</h2>
              <p>Trebate riješiti konkretan problem koji koči vidljivost, prodaju ili svakodnevni rad.</p>
            </Reveal>
            <ProblemSolver />
          </div>
        </section>

        <section id="projekti" className="section projects-section">
          <div className="container">
            <Reveal className="section-heading projects-heading">
              <h2>Od poslovnog problema do weba koji ima jasnu ulogu.</h2>
            </Reveal>

            <div className="projects-grid">
              {projects.slice(0, 3).map((project, index) => (
                <Reveal
                  key={project.slug}
                  className={`project-card project-card-${index + 1}`}
                  delay={index * 0.06}
                >
                  <Link href={project.href ?? "/projekti"}>
                    <div className="project-image">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes={index === 0 ? "(max-width: 767px) 100vw, 66vw" : "(max-width: 767px) 100vw, 42vw"}
                      />
                    </div>
                    <div className="project-info">
                      <div>
                        <span className={project.mock ? "demo-label" : "project-real-label"}>
                          {project.mock ? "Demo projekt" : project.industry}
                        </span>
                        <h3>{project.client}</h3>
                        <p>{project.serviceLabel}</p>
                        <p className="project-challenge">{project.challenge}</p>
                      </div>
                      <div className="project-metric">
                        <strong>{project.result.value}</strong>
                        <span>{project.result.label}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Link className="text-link projects-link" href="/projekti">
              Pogledajte sve projekte
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section id="zasto-legatech" className="section benefits-section">
          <div className="container benefits-layout">
            <Reveal className="benefits-intro">
              <p className="mono-label">Zašto Legatech</p>
              <h2>Mali tim znači više fokusa na vaš posao.</h2>
              <p>
                Suradnja je izravna, odluke su objašnjene, a web se gradi oko onoga što poslovanje stvarno treba postići.
              </p>
            </Reveal>
            <div className="benefits-list">
              {benefits.map(([title, description], index) => (
                <Reveal key={title} className="benefit-item" delay={index * 0.05}>
                  <Check size={22} weight="bold" aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="proces" className="section process-section">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2>Jasan proces, bez nagađanja.</h2>
              <p>U svakom trenutku znate što radimo, što trebamo od vas i što slijedi.</p>
            </Reveal>
            <div className="process-grid">
              {process.map(([title, description], index) => (
                <Reveal key={title} className="process-item" delay={index * 0.04}>
                  <span className="process-marker" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="cijene" className="section pricing-section">
          <div className="container">
            <Reveal className="pricing-intro">
              <p className="mono-label">Početne cijene</p>
              <h2>Prvo znate okvir. Zatim dogovaramo detalje.</h2>
              <p>
                Cijene vrijede za unaprijed definiran opseg. Konačnu ponudu dobivate nakon kratkih konzultacija.
              </p>
            </Reveal>
            <div className="pricing-list">
              {prices.map(([title, price, description], index) => (
                <Reveal key={title} className="price-row" delay={index * 0.05}>
                  <span className="price-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="price-name">
                    <h3>{title}</h3>
                  </div>
                  <p>{description}</p>
                  <strong>{price}</strong>
                </Reveal>
              ))}
            </div>
            <a className="button button-secondary" href="/cjenik">
              Pogledajte detaljan cjenik
            </a>
          </div>
        </section>

        <section id="iskustva" className="section testimonial-section">
          <div className="container">
            <TestimonialSlider items={testimonials} />
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-layout">
            <Reveal className="faq-intro">
              <p className="mono-label">Česta pitanja</p>
              <h2>Odgovori prije prvog razgovora.</h2>
              <p>Ako vaše pitanje nije ovdje, opišite projekt i dobit ćete konkretan odgovor.</p>
            </Reveal>
            <Faq items={faqItems} />
          </div>
        </section>

        <section className="section insights-section">
          <div className="container">
            <Reveal className="section-heading">
              <p className="mono-label">Legatech blog</p>
              <h2>Praktični odgovori za bolji web.</h2>
            </Reveal>
            {blogPosts.length ? <div className="articles-grid">
              {blogPosts.slice(0, 3).map((article, index) => (
                <Reveal key={article.slug} className={`article-card article-card-${index + 1}`} delay={index * 0.05}>
                  <a href={`/blog/${article.slug}`}>
                    <div className="article-meta">
                      <span>{article.categoryLabels[0] ?? "Web i poslovanje"}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-footer">
                      <span>{article.readingMinutes} min čitanja</span>
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div> : <div className="insights-empty"><p>Prvi stručni vodiči su u pripremi. Ako već sada imate pitanje, pošaljite ga i dobit ćete konkretan odgovor.</p><Link className="text-link" href="/kontakt">Postavite pitanje <ArrowRight size={19} aria-hidden="true" /></Link></div>}
          </div>
        </section>

        <section id="kontakt" className="section contact-section">
          <div className="container contact-layout">
            <Reveal className="contact-intro">
              <p className="mono-label">Zatražite ponudu</p>
              <h2>Recite što želite postići.</h2>
              <p>
                Ukratko opišite poslovanje, trenutni problem i željeni rezultat. Dobit ćete jasan prijedlog sljedećeg koraka.
              </p>
              <div className="contact-facts">
                <div>
                  <span>Lokacija</span>
                  <strong>Osijek, Hrvatska</strong>
                </div>
                <div>
                  <span>Odgovor</span>
                  <strong>U jednom radnom danu</strong>
                </div>
                <div>
                  <span>Radno vrijeme</span>
                  <strong>08:00-16:00</strong>
                </div>
                <p>
                  <a href="mailto:info@legatech.hr">info@legatech.hr</a><br />
                  <a href="tel:+385997357070">099 735 7070</a>
                </p>
              </div>
            </Reveal>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
