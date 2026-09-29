import type { Metadata } from "next";
import { ContactForm } from "@/src/components/contact-form";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt - Zatražite ponudu od Legatecha",
  description: "Kontaktirajte Legatech za izradu web stranice, SEO optimizaciju, web trgovinu ili održavanje. Odgovaramo u jednom radnom danu.",
  path: "/kontakt/",
});

const contactDetails = [
  { label: "E-mail", value: "info@legatech.hr", href: "mailto:info@legatech.hr" },
  { label: "Telefon", value: "099 735 7070", href: "tel:+385997357070" },
  { label: "Radno vrijeme", value: "Ponedjeljak - petak, 08:00-16:00" },
  { label: "Lokacija", value: "Osijek, Hrvatska" },
];

const nextSteps = [
  ["Pregledamo upit", "Provjeravamo cilj, traženu uslugu, okvirni budžet i dostupne materijale."],
  ["Javljamo se s pitanjima", "Ako nešto nedostaje, kratkim razgovorom pojašnjavamo opseg i prioritete."],
  ["Dobivate prijedlog", "Šaljemo preporučeni sljedeći korak, realan okvir cijene i mogući termin početka."],
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovna", path: "/" }, { name: "Kontakt", path: "/kontakt/" }])} />
      <EditorialShell variant="company-v0-page">
        <section className="ec-hero" aria-labelledby="contact-title"><div className="container ec-hero-grid">
          <div><p className="ec-eyebrow">Kontakt</p><h1 id="contact-title">Recite nam što želite postići.</h1><p>Opišite poslovanje, trenutni problem i željeni rezultat. Odgovorit ćemo s jasnim prijedlogom sljedećeg koraka.</p></div>
          <div className="ec-direct" aria-label="Izravni kontaktni podaci">{contactDetails.map((detail) => {
            const content = <><span>{detail.label}</span><strong>{detail.value}</strong></>;
            return detail.href ? <a key={detail.label} href={detail.href}>{content}</a> : <div key={detail.label}>{content}</div>;
          })}</div>
        </div></section>
        <section className="ec-form-section" aria-labelledby="contact-form-title"><div className="container ec-form-grid">
          <div className="ec-form-intro"><p className="ec-eyebrow">Zatražite ponudu</p><h2 id="contact-form-title">Dovoljno je nekoliko osnovnih informacija.</h2><p>Ne morate imati gotovu specifikaciju. Napišite što trenutno ne radi i što želite poboljšati.</p><p className="ec-response-note">Odgovaramo tijekom radnog vremena, najkasnije u jednom radnom danu.</p></div>
          <ContactForm />
        </div></section>
        <section className="ec-next" aria-labelledby="contact-next-title"><div className="container"><div className="ec-section-intro"><p className="ec-eyebrow">Nakon slanja</p><h2 id="contact-next-title">Što se događa s vašim upitom.</h2></div><ol>{nextSteps.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>
      </EditorialShell>
    </>
  );
}
