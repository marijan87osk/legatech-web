import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

export const metadata: Metadata = { title: "O Legatechu | Digitalna agencija Osijek", description: "Upoznajte Legatech, malu digitalnu agenciju iz Osijeka s osobnim pristupom webu, SEO-u i online prodaji." };

export default function AboutPage() {
  const values = [["Izravan razgovor", "Komunicirate s osobom koja razumije projekt i donosi tehničke odluke."], ["Transparentan opseg", "Prije početka znate što dobivate, koliko traje i što utječe na cijenu."], ["Poslovni razlog prije efekta", "Dizajn i tehnologija imaju zadatak podržati povjerenje, upite ili prodaju."], ["Podrška nakon objave", "Web ostaje alat koji se može održavati, mjeriti i poboljšavati."]];
  return (
    <><a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a><SiteHeader />
      <main id="sadrzaj" className="inner-page">
        <section className="page-hero about-page-hero"><div className="container about-hero-layout"><div><p className="mono-label">O Legatechu</p><h1>Mala agencija. Izravan pristup. Ozbiljna izvedba.</h1></div><div><p>Legatech je digitalna agencija iz Osijeka koja hrvatskim malim i srednjim poslovanjima pomaže izgraditi profesionalnu online prisutnost.</p><p>Web ne promatramo kao ukras. To je prodajni, komunikacijski i operativni alat koji treba imati jasan zadatak.</p></div></div></section>
        <section className="section about-values"><div className="container"><div className="section-heading"><h2>Kako želimo da suradnja izgleda.</h2></div><div className="about-values-grid">{values.map(([title, text]) => <article key={title}><Check size={21} weight="bold" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="section about-expertise"><div className="container about-expertise-layout"><div><p className="mono-label">Jedan povezani sustav</p><h2>Dizajn, razvoj, SEO i podrška nisu odvojeni problemi.</h2></div><p>Struktura sadržaja utječe na SEO. Brzina utječe na iskustvo i konverzije. Održavanje čuva pouzdanost nakon objave. Zato svaku uslugu planiramo u kontekstu cijelog poslovnog cilja.</p></div></section>
        <section className="section compact-cta-section"><div className="container compact-cta"><div><h2>Imate projekt ili problem za riješiti?</h2><p>Kratko opišite situaciju i dobit ćete jasan prijedlog sljedećeg koraka.</p></div><Link className="button button-primary" href="/kontakt">Zatražite ponudu <ArrowRight size={18} aria-hidden="true" /></Link></div></section>
      </main><SiteFooter /></>
  );
}
