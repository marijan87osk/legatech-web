import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/src/components/json-ld";
import { LegalPageShell } from "@/src/components/legal-page-shell";
import { breadcrumbJsonLd } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Politika privatnosti | Legatech",
  description: "Saznajte koje osobne podatke Legatech obrađuje, zašto ih obrađuje i kako možete ostvariti svoja prava.",
  alternates: { canonical: "https://legatech.hr/politika-privatnosti/" },
  openGraph: {
    title: "Politika privatnosti | Legatech",
    description: "Informacije o obradi osobnih podataka na web stranici Legatech.",
    url: "https://legatech.hr/politika-privatnosti/",
    locale: "hr_HR",
    type: "website",
  },
};

const links = [
  { href: "#voditelj", label: "Tko obrađuje podatke" },
  { href: "#podaci", label: "Koje podatke obrađujemo" },
  { href: "#svrhe", label: "Svrhe i pravne osnove" },
  { href: "#primatelji", label: "Primatelji i prijenosi" },
  { href: "#rokovi", label: "Rokovi čuvanja" },
  { href: "#prava", label: "Vaša prava" },
  { href: "#sigurnost", label: "Sigurnost i izmjene" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Politika privatnosti", path: "/politika-privatnosti/" }])} />
      <LegalPageShell
      eyebrow="Privatnost i osobni podaci"
      title="Politika privatnosti"
      intro="Ovdje jasno objašnjavamo koje podatke obrađujemo kada koristite web, pošaljete upit ili odaberete analitičke kolačiće."
      updatedAt="13. kolovoza 2026."
      links={links}
    >
      <section id="voditelj">
        <h2>1. Tko obrađuje vaše podatke</h2>
        <p>Voditelj obrade je LEGATECH, obrt za razvoj softvera, vl. Marijan Malčić, Kninska ulica 1 A, 31000 Osijek, OIB 14184408003, MBS 98086464.</p>
        <p>Za pitanja o privatnosti ili zahtjev za ostvarivanje prava javite se na <a href="mailto:info@legatech.hr">info@legatech.hr</a> ili na broj <a href="tel:+385997357070">099 735 7070</a>.</p>
      </section>

      <section id="podaci">
        <h2>2. Koje podatke obrađujemo</h2>
        <h3>Kontaktni upiti</h3>
        <p>Kada pošaljete obrazac, obrađujemo ime i prezime, e-mail adresu, naziv tvrtke ili obrta ako ga navedete, odabranu uslugu, okvirni budžet i opis projekta.</p>
        <h3>Zaštita obrasca i tehnički zapisi</h3>
        <p>Radi sprječavanja zlouporabe IP adresa privremeno se pretvara u jednosmjerni sigurnosni sažetak. Poslužitelj može bilježiti IP adresu, vrijeme zahtjeva, traženu adresu, vrstu preglednika i tehničke pogreške. Ti podaci služe sigurnosti, stabilnosti i dijagnostici.</p>
        <h3>Google Analytics</h3>
        <p>Google Analytics 4 učitava se samo nakon vaše privole. Tada možemo obrađivati podatke o posjećenim stranicama, vrsti uređaja i preglednika, približnoj lokaciji, vremenu posjeta i općim događajima poput uspješnog slanja obrasca ili klika na kontakt. U Analytics ne šaljemo sadržaj obrasca, ime, e-mail, telefonski broj ni parametre upita iz URL-a.</p>
        <h3>WhatsApp i telefonski kontakt</h3>
        <p>Klikom na WhatsApp ili telefonsku poveznicu sami pokrećete komunikaciju. Legatech tada obrađuje podatke koje dobrovoljno pošaljete, a WhatsApp zasebno obrađuje podatke prema vlastitim pravilima.</p>
      </section>

      <section id="svrhe">
        <h2>3. Svrhe i pravne osnove</h2>
        <ul>
          <li>odgovor na upit, priprema ponude i radnje prije mogućeg ugovora, na temelju članka 6. stavka 1. točke (b) GDPR-a;</li>
          <li>sigurnost weba, sprječavanje neželjene pošte, dijagnostika i zaštita pravnih zahtjeva, na temelju legitimnog interesa iz članka 6. stavka 1. točke (f) GDPR-a;</li>
          <li>mjerenje posjećenosti i poboljšanje weba, isključivo na temelju privole iz članka 6. stavka 1. točke (a) GDPR-a;</li>
          <li>ispunjavanje računovodstvenih i drugih zakonskih obveza ako postanete klijent, na temelju članka 6. stavka 1. točke (c) GDPR-a.</li>
        </ul>
        <p>Podaci označeni kao obvezni potrebni su kako bismo razumjeli i obradili upit. Naziv tvrtke ili obrta nije obvezan. Ne provodimo automatizirano donošenje odluka ni profiliranje koje bi za vas proizvodilo pravne ili slične značajne učinke.</p>
      </section>

      <section id="primatelji">
        <h2>4. Primatelji podataka i prijenosi izvan EGP-a</h2>
        <p>Podacima pristupaju samo Legatech i pružatelji usluga koji su potrebni za rad weba i komunikaciju:</p>
        <ul>
          <li>SiteGround kao pružatelj hostinga i tehničke infrastrukture;</li>
          <li>Google Ireland Limited za Analytics, samo ako ste dali privolu;</li>
          <li>WhatsApp Ireland Limited kada sami pokrenete komunikaciju putem WhatsAppa;</li>
          <li>nadležna tijela kada je dostava podataka propisana zakonom.</li>
        </ul>
        <p>Neki pružatelji mogu obrađivati podatke izvan Europskog gospodarskog prostora. Takvi prijenosi oslanjaju se na odluke o primjerenosti, standardne ugovorne klauzule ili druge zaštitne mehanizme koje primjenjuje pojedini pružatelj.</p>
      </section>

      <section id="rokovi">
        <h2>5. Koliko dugo čuvamo podatke</h2>
        <ul>
          <li>upite koji ne prerastu u projekt čuvamo najviše šest mjeseci od posljednje komunikacije;</li>
          <li>podatke povezane s ugovorenim poslom čuvamo tijekom suradnje i nakon nje onoliko dugo koliko zahtijevaju računovodstveni, porezni i drugi propisi te rokovi za zaštitu pravnih zahtjeva;</li>
          <li>aktivni zapisi ograničenja slanja obrasca obuhvaćaju najviše posljednjih deset minuta, a napuštene datoteke automatski se brišu nakon 24 sata;</li>
          <li>trajanje tehničkih zapisa hostinga ovisi o sigurnosnim postavkama pružatelja hostinga;</li>
          <li>Google Analytics podaci o događajima postavljeni su na dva mjeseca, a analitički kolačići najdulje na šest mjeseci.</li>
        </ul>
      </section>

      <section id="prava">
        <h2>6. Vaša prava</h2>
        <p>Ovisno o okolnostima, možete zatražiti pristup podacima, ispravak, brisanje, ograničenje obrade i prenosivost. Možete uložiti prigovor na obradu temeljenu na legitimnom interesu. Privolu za Analytics možete povući u svakom trenutku putem opcije <strong>Postavke kolačića</strong> u podnožju weba, bez utjecaja na zakonitost ranije obrade.</p>
        <p>Za ostvarivanje prava pišite na <a href="mailto:info@legatech.hr">info@legatech.hr</a>. Radi zaštite podataka možemo zatražiti razumnu potvrdu identiteta. Ako smatrate da je obrada protivna propisima, imate pravo podnijeti pritužbu <a href="https://azop.hr/prava-ispitanika/zahtjev-za-utvrdivanje-povrede-prava/" target="_blank" rel="noreferrer">Agenciji za zaštitu osobnih podataka</a>.</p>
      </section>

      <section id="sigurnost">
        <h2>7. Sigurnost i izmjene politike</h2>
        <p>Primjenjujemo razmjerne tehničke i organizacijske mjere, uključujući šifrirani prijenos, ograničenje pristupa, validaciju obrasca, zaštitu od automatizirane neželjene pošte i sigurnosne kopije gdje su primjerene.</p>
        <p>Politiku možemo ažurirati kada se promijeni način obrade, pružatelj usluge ili propis. Datum posljednje izmjene uvijek je naveden na ovoj stranici. O kolačićima pročitajte više u <Link href="/politika-kolacica">Politici kolačića</Link>.</p>
      </section>
      </LegalPageShell>
    </>
  );
}
