import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ServicePageData } from "@/src/data/services";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function ServicePage({ service }: { service: ServicePageData }) {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className={`inner-page service-page service-page-${service.slug}`}>
        <section className="page-hero service-page-hero">
          <div className="container service-hero-layout">
            <div><p className="mono-label">{service.eyebrow}</p><h1>{service.title}</h1><p>{service.lead}</p><div className="hero-actions"><Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link><Link className="button button-secondary" href={service.relatedHref}>Pogledajte cijene</Link></div></div>
            <aside><span>Početna cijena</span><strong>{service.price}</strong><p>Konačna ponuda ovisi o opsegu projekta.</p></aside>
          </div>
        </section>
        <section className="section service-audience"><div className="container service-audience-grid"><div><h2>Prepoznajete li svoju situaciju?</h2><p>Usluga je namijenjena poslovanjima koja žele konkretan pomak, ne samo ljepši ekran.</p></div><ul>{service.audience.map((item) => <li key={item}><Check size={20} weight="bold" aria-hidden="true" />{item}</li>)}</ul></div></section>
        <section className="section service-outcomes"><div className="container"><div className="section-heading"><h2>Što se mijenja nakon projekta.</h2></div><div className="service-outcome-grid">{service.outcomes.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
        <section className="section service-process"><div className="container service-process-layout"><div><p className="mono-label">Način rada</p><h2>Jasan put od problema do rješenja.</h2></div><ol>{service.process.map((step) => <li key={step}><span>{step}</span></li>)}</ol></div></section>
        <section className="section compact-cta-section"><div className="container compact-cta"><div><h2>Razgovarajmo o vašem projektu.</h2><p>Pošaljite kratki opis i dobit ćete konkretan prijedlog sljedećeg koraka.</p></div><Link className="button button-primary" href="/kontakt">Zatražite ponudu <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
