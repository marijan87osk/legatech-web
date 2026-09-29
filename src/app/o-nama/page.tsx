import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "O Legatechu - Digitalna agencija Osijek",
  description: "Upoznajte Legatech, malu digitalnu agenciju iz Osijeka s osobnim pristupom webu, SEO-u i online prodaji.",
  path: "/o-nama/",
});

const values = [
  ["Izravan razgovor", "Komunicirate s osobom koja razumije projekt i donosi tehničke odluke."],
  ["Transparentan opseg", "Prije početka znate što dobivate, koliko traje i što utječe na cijenu."],
  ["Poslovni razlog prije efekta", "Dizajn i tehnologija imaju zadatak podržati povjerenje, upite ili prodaju."],
  ["Podrška nakon objave", "Web ostaje alat koji se može održavati, mjeriti i poboljšavati."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "O nama", path: "/o-nama/" }])} />
      <EditorialShell variant="company-v0-page">
        <section className="ea-hero" aria-labelledby="about-title"><div className="container ea-hero-grid"><div><p className="ec-eyebrow">O Legatechu</p><h1 id="about-title">Mala agencija. Izravan pristup. Ozbiljna izvedba.</h1></div><div><p>Legatech je digitalna agencija iz Osijeka koja hrvatskim malim i srednjim poslovanjima pomaže izgraditi profesionalnu online prisutnost.</p><p>Web ne promatramo kao ukras. To je prodajni, komunikacijski i operativni alat koji treba imati jasan zadatak.</p></div></div></section>
        <section className="ea-values" aria-labelledby="about-values-title"><div className="container"><h2 id="about-values-title">Kako želimo da suradnja izgleda.</h2><div className="ea-values-grid">{values.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
        <section className="ea-expertise" aria-labelledby="about-expertise-title"><div className="container ea-expertise-grid"><div><p className="ec-eyebrow">Jedan povezani sustav</p><h2 id="about-expertise-title">Dizajn, razvoj, SEO i podrška nisu odvojeni problemi.</h2></div><p>Struktura sadržaja utječe na SEO. Brzina utječe na iskustvo i konverzije. Održavanje čuva pouzdanost nakon objave. Zato svaku uslugu planiramo u kontekstu cijelog poslovnog cilja.</p></div></section>
        <section className="editorial-final-cta" aria-labelledby="about-cta-title"><div className="container editorial-final-cta-grid"><h2 id="about-cta-title">Imate projekt ili problem za riješiti?</h2><div><p>Kratko opišite situaciju i dobit ćete jasan prijedlog sljedećeg koraka.</p><Link className="ep-button" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div></div></section>
      </EditorialShell>
    </>
  );
}
