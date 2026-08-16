import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/src/components/json-ld";
import { LegalPageShell } from "@/src/components/legal-page-shell";
import { breadcrumbJsonLd } from "@/src/lib/seo";

export const metadata: Metadata = {
  title: "Uvjeti korištenja | Legatech",
  description: "Uvjeti korištenja web stranice Legatech, informacije o ponudama, cijenama, autorskim pravima i odgovornosti.",
  alternates: { canonical: "https://legatech.hr/uvjeti-koristenja/" },
  openGraph: {
    title: "Uvjeti korištenja | Legatech",
    description: "Pravila i uvjeti korištenja web stranice Legatech.",
    url: "https://legatech.hr/uvjeti-koristenja/",
    locale: "hr_HR",
    type: "website",
  },
};

const links = [
  { href: "#pruzatelj", label: "Podaci o pružatelju" },
  { href: "#sadrzaj", label: "Sadržaj i cijene" },
  { href: "#suradnja", label: "Ponude i suradnja" },
  { href: "#autorska-prava", label: "Autorska prava" },
  { href: "#odgovornost", label: "Odgovornost i poveznice" },
  { href: "#pravo", label: "Mjerodavno pravo" },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Uvjeti korištenja", path: "/uvjeti-koristenja/" }])} />
      <LegalPageShell
      eyebrow="Pravila korištenja weba"
      title="Uvjeti korištenja"
      intro="Ovi uvjeti uređuju korištenje web stranice legatech.hr. Posebna ponuda ili ugovor uređuju svaku konkretnu poslovnu suradnju."
      updatedAt="13. kolovoza 2026."
      links={links}
    >
      <section id="pruzatelj">
        <h2>1. Podaci o pružatelju</h2>
        <p>Web stranicom upravlja LEGATECH, obrt za razvoj softvera, vl. Marijan Malčić, Kninska ulica 1 A, 31000 Osijek, OIB 14184408003, MBS 98086464.</p>
        <p>Kontakt: <a href="mailto:info@legatech.hr">info@legatech.hr</a>, <a href="tel:+385997357070">099 735 7070</a>. Obrt nije u sustavu PDV-a.</p>
      </section>

      <section id="sadrzaj">
        <h2>2. Informativni sadržaj i početne cijene</h2>
        <p>Sadržaj weba daje opće informacije o uslugama, procesu i okvirnim cijenama. Nastojimo ga održavati točnim i ažurnim, ali ne predstavlja stručni savjet, jamstvo rezultata ni obvezujuću ponudu.</p>
        <p>Cijene označene izrazom <strong>Od</strong> predstavljaju početne cijene za unaprijed definiran opseg. Konačna cijena, rok, uključene stavke i uvjeti ovise o zahtjevima projekta te se potvrđuju pisanom ponudom. Budući da obrt nije u sustavu PDV-a, PDV se ne obračunava.</p>
      </section>

      <section id="suradnja">
        <h2>3. Upiti, ponude i sklapanje posla</h2>
        <p>Slanje kontaktnog obrasca, e-maila, WhatsApp poruke ili telefonski razgovor ne stvaraju automatski ugovorni odnos. Posao se smatra dogovorenim kada klijent prihvati pisanu ponudu ili kada strane sklope zaseban ugovor odnosno na drugi jasan način potvrde opseg, cijenu i uvjete.</p>
        <p>Posebna ponuda ili ugovor imaju prednost pred ovim uvjetima za pitanja koja uređuju drukčije.</p>
      </section>

      <section id="autorska-prava">
        <h2>4. Autorska prava i dopušteno korištenje</h2>
        <p>Tekstovi, dizajn, kod, grafike i drugi originalni sadržaji na ovom webu zaštićeni su odgovarajućim pravima, osim sadržaja za koji je jasno naveden drugi nositelj. Dopušteno je pregledavanje i dijeljenje poveznica u informativne svrhe.</p>
        <p>Nije dopušteno preuzimanje, umnožavanje, prerada, prodaja ili javna objava većeg dijela sadržaja bez prethodnog pisanog odobrenja, osim kada zakon izričito dopušta drukčije. Nije dopušten pokušaj ometanja rada weba, neovlašten pristup ni zlouporaba obrazaca.</p>
      </section>

      <section id="odgovornost">
        <h2>5. Dostupnost, odgovornost i vanjske poveznice</h2>
        <p>Web može privremeno biti nedostupan zbog održavanja, nadogradnje, tehničkog kvara ili okolnosti izvan razumne kontrole. Legatech ne jamči neprekidnu dostupnost niti da je svaki sadržaj u svakom trenutku potpun, ali će razumne pogreške ispraviti kada ih uoči.</p>
        <p>Vanjske poveznice, uključujući WhatsApp i stranice klijenata, vode na usluge trećih strana nad kojima Legatech nema kontrolu. Za njihov sadržaj, dostupnost i obradu podataka odgovaraju njihovi pružatelji.</p>
        <p>Odgovornost Legatecha ograničena je u najvećoj mjeri dopuštenoj primjenjivim propisima. Ova odredba ne isključuje niti ograničava odgovornost koju prema zakonu nije dopušteno isključiti ili ograničiti.</p>
      </section>

      <section id="pravo">
        <h2>6. Privatnost, izmjene i mjerodavno pravo</h2>
        <p>Obrada osobnih podataka uređena je <Link href="/politika-privatnosti">Politikom privatnosti</Link>, a kolačići <Link href="/politika-kolacica">Politikom kolačića</Link>.</p>
        <p>Uvjeti se mogu ažurirati radi promjena usluge, prakse ili propisa. Na korištenje weba primjenjuje se pravo Republike Hrvatske. Za sporove je nadležan stvarno i mjesno nadležan sud prema primjenjivim propisima.</p>
      </section>
      </LegalPageShell>
    </>
  );
}
