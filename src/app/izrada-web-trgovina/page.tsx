import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChartLineUp,
  Check,
  GraduationCap,
  Package,
  ShoppingCart,
} from "@phosphor-icons/react/dist/ssr";
import { ServiceClientLogos } from "@/src/components/client-logo-wall";
import { EcommerceProblemDiagnosis } from "@/src/components/ecommerce-problem-diagnosis";
import { Faq } from "@/src/components/faq";
import { Reveal } from "@/src/components/reveal";
import { ServiceExpectations } from "@/src/components/service-expectations";
import { ServiceFinalCta } from "@/src/components/service-final-cta";
import { ShoppingJourney } from "@/src/components/shopping-journey";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { TestimonialSlider } from "@/src/components/testimonial-slider";
import {
  catalogueMap,
  ecommerceAudience,
  ecommerceBenefits,
  ecommerceDeliverables,
  ecommerceFaq,
  ecommercePackages,
  ecommercePriceFactors,
  ecommerceProblems,
  ecommerceProcess,
  ecommerceProjects,
  ecommerceSeoPoints,
  ecommerceTestimonials,
  integrationGroups,
  shoppingJourney,
} from "@/src/data/ecommerce-development";

export const metadata: Metadata = {
  title: "Izrada Web Trgovina – WooCommerce Webshop - Legatech",
  description:
    "Izrada WooCommerce web trgovina s preglednim katalogom, jednostavnom kupnjom, sigurnim plaćanjem i SEO temeljima. Projekti od 1.500 €.",
  alternates: {
    canonical: "https://legatech.hr/izrada-web-trgovina/",
  },
  openGraph: {
    title: "Izrada Web Trgovina – WooCommerce Webshop - Legatech",
    description:
      "Izrada WooCommerce web trgovina s preglednim katalogom, jednostavnom kupnjom, sigurnim plaćanjem i SEO temeljima. Projekti od 1.500 €.",
    url: "https://legatech.hr/izrada-web-trgovina/",
    type: "website",
  },
};

const relatedServices = [
  {
    title: "SEO optimizacija",
    description: "Kontinuirano gradite organsku vidljivost kategorija, proizvoda i korisnog sadržaja.",
    href: "/seo-optimizacija-cijena",
  },
  {
    title: "Održavanje web stranica",
    description: "Redovite sigurnosne kopije, testne narudžbe, ažuriranja i tehnička podrška za WooCommerce.",
    href: "/odrzavanje-web-stranica",
  },
  {
    title: "Izrada web stranica",
    description: "Kada poslovna prezentacija i usluge trebaju biti odvojene od kataloga i online kupnje.",
    href: "/izrada-web-stranica-cijena",
  },
];

export default function EcommerceDevelopmentPage() {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />

      <main id="sadrzaj" className="inner-page ecommerce-page">
        <section className="ecommerce-hero" aria-labelledby="ecommerce-title">
          <div className="container ecommerce-hero-grid">
            <div className="ecommerce-hero-copy">
              <p className="mono-label">Izrada web trgovina</p>
              <h1 id="ecommerce-title">Izrada web trgovina koje kupcima olakšavaju kupnju.</h1>
              <p className="ecommerce-hero-lead">
                Planiramo i izrađujemo WooCommerce trgovine s preglednim katalogom, jednostavnom kupnjom i administracijom koju možete koristiti.
              </p>
              <div className="ecommerce-hero-actions">
                <Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link>
                <a className="button button-secondary" href="#shop-paketi">Pogledajte pakete</a>
              </div>
              <div className="ecommerce-hero-price">
                <span>Početna cijena</span>
                <strong>Od 1.500 €</strong>
                <small>Konačna cijena ovisi o katalogu, integracijama i funkcionalnostima.</small>
              </div>
            </div>

            <Reveal className="ecommerce-hero-project" delay={0.08}>
              <div className="ecommerce-hero-image">
                <Image
                  src="/projects/krie-design/cover.webp"
                  alt="Stvarni prikaz KRIÉ web trgovine s modnom kolekcijom uz more"
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </div>
              <div className="ecommerce-hero-caption">
                <span className="project-real-label">Web trgovina / 2024.</span>
                <div><strong>KRIÉ</strong><span>Custom dvojezična web trgovina</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <ServiceExpectations
          title="Što možete očekivati od web trgovine"
          items={[
            {
              icon: <ShoppingCart size={25} aria-hidden="true" />,
              title: "Pouzdana kupnja",
              description: "Katalog, košarica i blagajna testiraju se kao jedan povezan prodajni proces.",
            },
            {
              icon: <Package size={25} aria-hidden="true" />,
              title: "Jasna administracija",
              description: "Proizvodi, zalihe i narudžbe strukturirani su za svakodnevno upravljanje.",
            },
            {
              icon: <GraduationCap size={25} aria-hidden="true" />,
              title: "Edukacija i podrška",
              description: "Svaki paket uključuje edukaciju i početno razdoblje tehničke podrške nakon objave.",
            },
          ]}
          note="Naknade pružatelja plaćanja, licence, pretplate i drugi vanjski troškovi nisu uključeni ako nisu izričito navedeni."
        />

        <ServiceClientLogos />

        <section className="section ecommerce-audience-section" aria-labelledby="ecommerce-audience-title">
          <div className="container ecommerce-audience-layout">
            <Reveal className="ecommerce-sticky-intro">
              <p className="mono-label">Za koga je usluga</p>
              <h2 id="ecommerce-audience-title">Online prodaja treba odgovarati načinu na koji stvarno poslujete.</h2>
              <p>Web trgovina ima smisla kada kupcima olakšava odluku, a vama smanjuje ručni rad i nejasnoće oko narudžbi.</p>
            </Reveal>
            <div className="ecommerce-audience-list">
              {ecommerceAudience.map(([title, description]) => (
                <article key={title}>
                  <Check size={21} weight="bold" aria-hidden="true" />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-problems-section" aria-labelledby="ecommerce-problems-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="ecommerce-problems-title">Prepoznajmo gdje kupnja ili upravljanje zapinju.</h2>
              <p>Odaberite problem kako biste vidjeli konkretan smjer rješenja i njegovu poslovnu vrijednost.</p>
            </Reveal>
            <EcommerceProblemDiagnosis problems={ecommerceProblems} />
          </div>
        </section>

        <section className="section ecommerce-deliverables-section" aria-labelledby="ecommerce-deliverables-title">
          <div className="container">
            <Reveal className="section-heading">
              <p className="mono-label">Što dobivate</p>
              <h2 id="ecommerce-deliverables-title">Cijeli prodajni sustav, ne samo katalog proizvoda.</h2>
            </Reveal>
            <div className="ecommerce-deliverables-grid">
              {ecommerceDeliverables.map((item, index) => (
                <Reveal key={item.title} className={`ecommerce-deliverable ecommerce-deliverable-${index + 1}`} delay={index * 0.035}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-catalogue-section" aria-labelledby="ecommerce-catalogue-title">
          <div className="container ecommerce-catalogue-layout">
            <Reveal className="ecommerce-catalogue-intro">
              <h2 id="ecommerce-catalogue-title">Dobar katalog odgovara i kupcu i operativi.</h2>
              <p>Struktura mora pomoći pronalaženju proizvoda, ali i ostati dosljedna kada dodajete nove artikle, varijacije i zalihe.</p>
            </Reveal>
            <div className="ecommerce-catalogue-map">
              <div className="ecommerce-catalogue-core" aria-hidden="true"><span>Struktura</span><strong>kataloga</strong></div>
              {catalogueMap.map((group, index) => (
                <article key={group.title} className={`ecommerce-catalogue-node ecommerce-catalogue-node-${index + 1}`}>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                  <ul>{group.children.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-journey-section" aria-labelledby="ecommerce-journey-title">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <p className="mono-label">Mobilni kupovni put</p>
              <h2 id="ecommerce-journey-title">Svaki korak mora odgovoriti na drugo pitanje kupca.</h2>
              <p>Ovo nije lažni checkout prikaz, nego pregled odluka koje oblikuju iskustvo kupnje.</p>
            </Reveal>
            <ShoppingJourney steps={shoppingJourney} />
          </div>
        </section>

        <section className="section ecommerce-integrations-section" aria-labelledby="ecommerce-integrations-title">
          <div className="container">
            <Reveal className="ecommerce-integrations-heading">
              <h2 id="ecommerce-integrations-title">Plaćanje, dostava i sustavi moraju raditi kao cjelina.</h2>
              <p>Osnovne metode ovise o paketu, a vanjske i složenije integracije definiraju se nakon tehničke provjere.</p>
            </Reveal>
            <div className="ecommerce-integration-grid">
              {integrationGroups.map((group, index) => (
                <article key={group.title} className={`ecommerce-integration ecommerce-integration-${index + 1}`}>
                  <span>{group.scope}</span>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-seo-section" aria-labelledby="ecommerce-seo-title">
          <div className="container ecommerce-seo-layout">
            <Reveal className="ecommerce-seo-intro">
              <ChartLineUp size={36} aria-hidden="true" />
              <h2 id="ecommerce-seo-title">SEO trgovine počinje prije unosa prvog proizvoda.</h2>
              <p>Kategorije, filteri, URL adrese i podaci proizvoda planiraju se prije nego što katalog postane velik i teško promjenjiv.</p>
              <Link className="text-link" href="/seo-optimizacija-cijena">Saznajte više o SEO optimizaciji <ArrowRight size={18} aria-hidden="true" /></Link>
            </Reveal>
            <div className="ecommerce-seo-list">
              {ecommerceSeoPoints.map(([title, description]) => (
                <article key={title}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-projects-section" aria-labelledby="ecommerce-projects-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="ecommerce-projects-title">Od prodajnog problema do jasnijeg sustava kupnje.</h2>
              <p>KRIÉ je dobio potpuno prilagođenu dvojezičnu trgovinu, povezanu s plaćanjem i domaćom te međunarodnom dostavom.</p>
            </Reveal>
            <div className="ecommerce-projects-grid">
              {ecommerceProjects.map((project) => (
                <article key={project.client} className="ecommerce-project">
                  <div className="ecommerce-project-media">
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 900px) 100vw, 58vw" />
                  </div>
                  <div className="ecommerce-project-body">
                    <div className="ecommerce-project-meta">
                      <span>{project.service}</span>
                    </div>
                    <h3>{project.client}</h3>
                    <dl>
                      <div><dt>Problem</dt><dd>{project.challenge}</dd></div>
                      <div><dt>Rješenje</dt><dd>{project.solution}</dd></div>
                    </dl>
                    <div className="ecommerce-project-result">
                      <span>Opseg projekta</span>
                      <strong>{project.result}</strong>
                      <p>{project.resultLabel}</p>
                    </div>
                    {project.href && (
                      <Link className="text-link ecommerce-project-link" href={project.href}>
                        Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-process-section" aria-labelledby="ecommerce-process-title">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2 id="ecommerce-process-title">Od kataloga do prve testne narudžbe.</h2>
              <p>Svaka faza priprema sljedeću, a kupovni proces provjerava se prije javne objave.</p>
            </Reveal>
            <ol className="service-process-track" tabIndex={0} aria-label="Proces izrade web trgovine">
              {ecommerceProcess.map(([title, description], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="shop-paketi" className="section ecommerce-packages-section" aria-labelledby="ecommerce-packages-title">
          <div className="container">
            <Reveal className="ecommerce-packages-heading">
              <p className="mono-label">Paketi i početne cijene</p>
              <h2 id="ecommerce-packages-title">Opseg raste zajedno s katalogom i prodajnim procesom.</h2>
              <p>Rok izrade definira se individualnom ponudom nakon pregleda proizvoda, materijala, plaćanja, dostave i integracija.</p>
            </Reveal>
            <div className="ecommerce-package-list">
              {ecommercePackages.map((item) => (
                <article key={item.name} className={`ecommerce-package${item.featured ? " is-featured" : ""}`}>
                  <div className="ecommerce-package-summary">
                    {item.featured && <span className="ecommerce-package-choice">Najčešći odabir</span>}
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="ecommerce-package-best">{item.bestFor}</span>
                    <div className="ecommerce-package-price"><span>Od</span><strong>{item.startingPrice}</strong></div>
                    <dl>
                      <div><dt>Korekcije</dt><dd>{item.revisions}</dd></div>
                      <div><dt>Edukacija</dt><dd>{item.training}</dd></div>
                      <div><dt>Podrška</dt><dd>{item.support}</dd></div>
                    </dl>
                  </div>
                  <div className="ecommerce-package-inclusions">
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
            <div className="ecommerce-package-note">
              <p>Troškovi kartičnog plaćanja, provizije, licence i naknade vanjskih pružatelja nisu uključeni. Konačna ponuda definira stvarni opseg.</p>
              <Link className="button button-secondary" href="/cjenik#web-trgovine">Pogledajte detaljan cjenik</Link>
            </div>
          </div>
        </section>

        <section className="section ecommerce-factors-section" aria-labelledby="ecommerce-factors-title">
          <div className="container ecommerce-factors-layout">
            <Reveal className="ecommerce-factors-intro">
              <h2 id="ecommerce-factors-title">Što utječe na konačnu cijenu trgovine?</h2>
              <p>Najveću razliku ne stvara samo broj stranica, nego količina podataka i poslovnih pravila koja trgovina mora podržati.</p>
            </Reveal>
            <div className="ecommerce-factors-grid">
              {ecommercePriceFactors.map(([title, description], index) => (
                <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-testimonials-section" aria-label="Izjave klijenata o suradnji s Legatechom">
          <div className="container"><TestimonialSlider items={ecommerceTestimonials} /></div>
        </section>

        <section className="section ecommerce-benefits-section" aria-labelledby="ecommerce-benefits-title">
          <div className="container ecommerce-benefits-layout">
            <Reveal className="ecommerce-sticky-intro">
              <h2 id="ecommerce-benefits-title">Tehnička trgovina mora ostati razumljiva ljudima koji je vode.</h2>
              <p>Prodajni cilj, iskustvo kupca i svakodnevna administracija vode odluke prije dodatnih efekata i funkcionalnosti.</p>
            </Reveal>
            <div className="ecommerce-benefits-list">
              {ecommerceBenefits.map(([title, description]) => (
                <article key={title}><Check size={21} weight="bold" aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ecommerce-faq-section" aria-labelledby="ecommerce-faq-title">
          <div className="container faq-layout">
            <Reveal className="faq-intro">
              <p className="mono-label">Česta pitanja</p>
              <h2 id="ecommerce-faq-title">Važne odluke prije prve prodaje.</h2>
              <p>Od proizvoda i plaćanja do održavanja, vlasništva i troškova vanjskih sustava.</p>
            </Reveal>
            <Faq items={ecommerceFaq} />
          </div>
        </section>

        <section className="section ecommerce-related-section" aria-labelledby="ecommerce-related-title">
          <div className="container ecommerce-related-layout">
            <div><h2 id="ecommerce-related-title">Trgovina nastavlja rasti nakon objave.</h2><p>Vidljivost, tehnička stabilnost i sadržaj proizvoda povezuju se s ostalim Legatech uslugama.</p></div>
            <div className="ecommerce-related-list">
              {relatedServices.map((service) => (
                <Link key={service.href} href={service.href}>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
              <Link className="ecommerce-related-pricing" href="/cjenik">Pogledajte cijeli cjenik <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <ServiceFinalCta
          headingId="ecommerce-final-title"
          title="Ne morate imati gotov katalog ni potpunu specifikaciju."
          description="Opišite proizvode, način prodaje i što želite postići. Predložit ćemo realan opseg i što treba pripremiti prije početka."
        />
      </main>

      <SiteFooter />
    </>
  );
}
