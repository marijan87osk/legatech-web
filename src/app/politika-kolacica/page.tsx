import type { Metadata } from "next";
import { CookieSettingsButton } from "@/src/components/cookie-settings-button";
import { JsonLd } from "@/src/components/json-ld";
import { LegalPageShell } from "@/src/components/legal-page-shell";
import { breadcrumbJsonLd } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Politika kolačića | Legatech",
  description: "Saznajte koje nužne i analitičke kolačiće koristi web stranica Legatech i kako možete promijeniti svoj odabir.",
  alternates: { canonical: "https://legatech.hr/politika-kolacica/" },
  openGraph: {
    title: "Politika kolačića | Legatech",
    description: "Informacije o kolačićima i upravljanju privolom na web stranici Legatech.",
    url: "https://legatech.hr/politika-kolacica/",
    locale: "hr_HR",
    type: "website",
  },
};

const links = [
  { href: "#sto-su-kolacici", label: "Što su kolačići" },
  { href: "#nuzni", label: "Nužni kolačić" },
  { href: "#analiticki", label: "Analitički kolačići" },
  { href: "#upravljanje", label: "Upravljanje odabirom" },
  { href: "#pruzatelji", label: "Pružatelji i prijenosi" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Politika kolačića", path: "/politika-kolacica/" }])} />
      <LegalPageShell
      eyebrow="Privola i postavke"
      title="Politika kolačića"
      intro="Web radi bez analitičkih kolačića. Google Analytics učitava se tek kada ga izričito prihvatite."
      updatedAt="13. kolovoza 2026."
      links={links}
    >
      <section id="sto-su-kolacici">
        <h2>1. Što su kolačići</h2>
        <p>Kolačići su male tekstualne datoteke koje preglednik sprema na vaš uređaj. Mogu omogućiti osnovnu funkciju weba ili, uz vašu privolu, pomoći razumjeti kako se web koristi.</p>
      </section>

      <section id="nuzni">
        <h2>2. Nužni kolačić</h2>
        <div className="legal-table-wrap">
          <table>
            <thead><tr><th>Naziv</th><th>Svrha</th><th>Trajanje</th><th>Pružatelj</th></tr></thead>
            <tbody>
              <tr><td><code>legatech_consent</code></td><td>Pamti prihvaćanje ili odbijanje analitičkih kolačića, verziju politike i vrijeme odabira.</td><td>6 mjeseci</td><td>Legatech</td></tr>
            </tbody>
          </table>
        </div>
        <p>Ovaj kolačić potreban je kako web ne bi pri svakom posjetu ponovno tražio isti odabir. Ne služi praćenju i ne može se isključiti kroz naš banner.</p>
      </section>

      <section id="analiticki">
        <h2>3. Google Analytics kolačići</h2>
        <p>Google Analytics 4 koristi se za anonimnije, zbirno razumijevanje posjećenosti i poboljšanje sadržaja. Google skripta i ovi kolačići ne učitavaju se prije prihvaćanja analitičkih kolačića.</p>
        <div className="legal-table-wrap">
          <table>
            <thead><tr><th>Naziv</th><th>Svrha</th><th>Najdulje trajanje</th><th>Pružatelj</th></tr></thead>
            <tbody>
              <tr><td><code>_ga</code></td><td>Razlikovanje posjetitelja i izrada zbirne statistike korištenja.</td><td>6 mjeseci</td><td>Google Analytics</td></tr>
              <tr><td><code>_ga_956PBX0RC6</code></td><td>Čuvanje i brojanje stanja posjete za Legatech GA4 svojstvo.</td><td>6 mjeseci</td><td>Google Analytics</td></tr>
            </tbody>
          </table>
        </div>
        <p>Oglašivačke funkcije, Google Signals, personalizacija oglasa i povezivanje s Google Adsom nisu dio ove postavke. Podaci o događajima u GA4 postavljeni su na razdoblje čuvanja od dva mjeseca.</p>
      </section>

      <section id="upravljanje">
        <h2>4. Kako promijeniti odabir</h2>
        <p>Analitičke kolačiće možete prihvatiti ili odbiti jednako dostupnim opcijama u banneru. Odabir možete kasnije promijeniti. Povlačenje privole zaustavlja daljnje Analytics praćenje i briše njegove dostupne first-party kolačiće s ove domene.</p>
        <CookieSettingsButton className="button button-secondary legal-cookie-button" />
        <p>Kolačiće možete obrisati i kroz postavke preglednika. Ako obrišete nužni consent kolačić, web će ponovno zatražiti vaš odabir. Promjena verzije ove politike također ponovno pokreće zahtjev za privolom.</p>
      </section>

      <section id="pruzatelji">
        <h2>5. Pružatelj i mogući prijenosi</h2>
        <p>Google Analytics pruža Google Ireland Limited. Googleova infrastruktura može uključivati obradu izvan Europskog gospodarskog prostora uz zaštitne mehanizme koje navodi Google. Više informacija nalazi se u <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Googleovim pravilima privatnosti</a>.</p>
        <p>Za pitanja o kolačićima javite se na <a href="mailto:info@legatech.hr">info@legatech.hr</a>.</p>
      </section>
      </LegalPageShell>
    </>
  );
}
