import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/src/components/json-ld";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { cooperationTerms, hostingItems, pricingServices } from "@/src/data/pricing";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cjenik izrade web stranica, SEO-a i održavanja | Legatech",
  description: "Početne cijene Legatech usluga: web stranice od 500 €, web trgovine od 1.500 €, SEO od 290 € mjesečno i održavanje od 35 € mjesečno.",
  path: "/cjenik/",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Cjenik", path: "/cjenik/" }])} />
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="inner-page">
        <section className="page-hero pricing-page-hero">
          <div className="container page-hero-grid">
            <div>
              <p className="mono-label">Legatech cjenik</p>
              <h1>Jasan okvir prije prvog razgovora.</h1>
            </div>
            <div className="page-hero-aside">
              <p>Transparentne početne cijene za unaprijed definiran opseg. Konačnu ponudu dobivate nakon kratkih konzultacija i pregleda zahtjeva.</p>
              <Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link>
            </div>
          </div>
        </section>

        <nav className="pricing-anchor-nav" aria-label="Kategorije cjenika">
          <div className="container">
            {pricingServices.map((service) => <a key={service.id} href={`#${service.id}`}>{service.title}</a>)}
          </div>
        </nav>

        <div className="pricing-scope-note" role="note">
          <div className="container"><strong>Važno:</strong> prikazane su početne cijene. Konačna cijena ovisi o opsegu, sadržaju, funkcionalnostima, integracijama i roku.</div>
        </div>

        {pricingServices.map((service, serviceIndex) => (
          <section id={service.id} className="section pricing-service" key={service.id}>
            <div className="container">
              <div className="pricing-service-heading">
                <span className="pricing-service-index">{String(serviceIndex + 1).padStart(2, "0")}</span>
                <div><h2>{service.title}</h2><p>{service.intro}</p></div>
              </div>

              <div className="package-stack">
                {service.packages.map((item) => (
                  <article className={`package-row${item.featured ? " package-featured" : ""}`} key={item.name}>
                    <div className="package-summary">
                      {item.featured && <span className="package-choice">Najčešći odabir</span>}
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="package-price"><span>Od</span><strong>{item.price}</strong>{item.cadence && <small>{item.cadence}</small>}</div>
                      {item.facts && <dl>{item.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
                    </div>
                    <div className="package-included">
                      <h4>Paket uključuje</h4>
                      <ul>{item.included.map((line) => <li key={line}><Check size={18} weight="bold" aria-hidden="true" /><span>{line}</span></li>)}</ul>
                      {item.note && <p className="package-note">{item.note}</p>}
                    </div>
                  </article>
                ))}
              </div>

              <div className="addon-section">
                <h3>Dodatne opcije</h3>
                <div className="addon-accordions">
                  {service.addons.map((group) => (
                    <details className="addon-accordion" key={group.title}>
                      <summary><span>{group.title}</span><Plus size={20} aria-hidden="true" /></summary>
                      <div className="addon-content">
                        {group.items.map((item) => <div className="addon-line" key={item.name}><span>{item.name}</span><strong>{item.price}</strong></div>)}
                        {group.note && <p>{group.note}</p>}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="section hosting-section">
          <div className="container hosting-layout">
            <div><p className="mono-label">Dodatni troškovi</p><h2>Hosting, domene i licence.</h2><p>Upravljani hosting ne zamjenjuje paket održavanja, osim kada je to izričito navedeno u ponudi.</p></div>
            <div className="hosting-list">{hostingItems.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div>
          </div>
        </section>

        <section className="section terms-section">
          <div className="container">
            <div className="terms-heading"><p className="mono-label">Prije početka</p><h2>Uvjeti suradnje, bez sitnih slova.</h2></div>
            <div className="terms-grid">{cooperationTerms.map((term) => <article key={term.title}><h3>{term.title}</h3><p>{term.body}</p></article>)}</div>
          </div>
        </section>

        <section className="section compact-cta-section">
          <div className="container compact-cta">
            <div><h2>Niste sigurni koji opseg vam treba?</h2><p>Opišite cilj i trenutnu situaciju. Predložit ćemo realan paket i sljedeći korak.</p></div>
            <Link className="button button-primary" href="/kontakt">Zatražite ponudu <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
