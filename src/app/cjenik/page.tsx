import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { cooperationTerms, hostingItems, pricingServices, type PricePackage } from "@/src/data/pricing";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cjenik izrade web stranica, SEO-a i održavanja - Legatech",
  description: "Početne cijene Legatech usluga: web stranice od 500 €, web trgovine od 1.500 €, SEO od 290 € mjesečno i održavanje od 35 € mjesečno.",
  path: "/cjenik/",
});

function PackageCard({ item }: { item: PricePackage }) {
  return (
    <article className={item.featured ? "ep-package ep-package-featured" : "ep-package"}>
      {item.featured && <span className="ep-package-badge">Najčešći odabir</span>}
      <div className="ep-package-head">
        <h3>{item.name}</h3><p>{item.description}</p>
        <strong>Od {item.price} {item.cadence && <small>{item.cadence}</small>}</strong>
      </div>
      {item.facts && <dl className="ep-package-facts">{item.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
      <h4>Paket uključuje</h4>
      <ul>{item.included.map((line) => <li key={line}>{line}</li>)}</ul>
      {item.note && <p className="ep-package-note">{item.note}</p>}
    </article>
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Cjenik", path: "/cjenik/" }])} />
      <EditorialShell variant="pricing-v0-page">
        <section className="ep-hero" aria-labelledby="pricing-title"><div className="container ep-hero-grid">
          <div><p className="ep-eyebrow">Legatech cjenik</p><h1 id="pricing-title">Jasan okvir prije prvog razgovora.</h1></div>
          <div className="ep-hero-aside"><p>Transparentne početne cijene za unaprijed definiran opseg. Konačnu ponudu dobivate nakon kratkih konzultacija i pregleda zahtjeva.</p><Link className="ep-button" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div>
        </div></section>

        <nav className="ep-anchor-nav" aria-label="Kategorije cjenika"><div className="container">{pricingServices.map((service) => <a key={service.id} href={`#${service.id}`}>{service.title}</a>)}</div></nav>
        <div className="ep-scope-note" role="note"><div className="container"><strong>Važno:</strong> prikazane su početne cijene. Konačna cijena ovisi o opsegu, sadržaju, funkcionalnostima, integracijama i roku.</div></div>

        {pricingServices.map((service, serviceIndex) => (
          <section id={service.id} className="ep-service" key={service.id} aria-labelledby={`${service.id}-title`}><div className="container">
            <div className="ep-service-heading"><span>{String(serviceIndex + 1).padStart(2, "0")}</span><div><h2 id={`${service.id}-title`}>{service.title}</h2><p>{service.intro}</p></div></div>
            <div className={service.packages.length === 4 ? "ep-package-grid ep-package-grid-four" : "ep-package-grid"}>{service.packages.map((item) => <PackageCard item={item} key={item.name} />)}</div>
            {service.addons.length > 0 && <div className="ep-addons"><h3>Dodatne opcije</h3><div className="ep-addon-list">{service.addons.map((group) => (
              <details key={group.title}><summary>{group.title}</summary><div className="ep-addon-content">{group.items.map((item) => <div className="ep-addon-line" key={item.name}><span>{item.name}</span><strong>{item.price}</strong></div>)}{group.note && <p>{group.note}</p>}</div></details>
            ))}</div></div>}
          </div></section>
        ))}

        <section className="ep-hosting" aria-labelledby="hosting-title"><div className="container ep-hosting-layout"><div><p className="ep-eyebrow">Dodatni troškovi</p><h2 id="hosting-title">Hosting, domene i licence.</h2><p>Upravljani hosting ne zamjenjuje paket održavanja, osim kada je to izričito navedeno u ponudi.</p></div><div className="ep-hosting-list">{hostingItems.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div></div></section>
        <section className="ep-terms" aria-labelledby="terms-title"><div className="container"><div className="ep-section-intro"><p className="ep-eyebrow">Prije početka</p><h2 id="terms-title">Uvjeti suradnje, bez sitnih slova.</h2></div><div className="ep-terms-grid">{cooperationTerms.map((term) => <article key={term.title}><h3>{term.title}</h3><p>{term.body}</p></article>)}</div></div></section>
        <section className="editorial-final-cta" aria-labelledby="pricing-cta-title"><div className="container editorial-final-cta-grid"><h2 id="pricing-cta-title">Niste sigurni koji opseg vam treba?</h2><div><p>Opišite cilj i trenutnu situaciju. Predložit ćemo realan paket i sljedeći korak.</p><Link className="ep-button" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div></div></section>
      </EditorialShell>
    </>
  );
}
