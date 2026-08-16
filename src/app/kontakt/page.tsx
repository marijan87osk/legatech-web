import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/src/components/contact-form";
import { JsonLd } from "@/src/components/json-ld";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { breadcrumbJsonLd, createPageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt | Zatražite ponudu od Legatecha",
  description:
    "Kontaktirajte Legatech za izradu web stranice, SEO optimizaciju, web trgovinu ili održavanje. Odgovaramo u jednom radnom danu.",
  path: "/kontakt/",
});

const contactDetails = [
  {
    label: "E-mail",
    value: "info@legatech.hr",
    href: "mailto:info@legatech.hr",
    icon: EnvelopeSimple,
  },
  {
    label: "Telefon",
    value: "099 735 7070",
    href: "tel:+385997357070",
    icon: Phone,
  },
  {
    label: "Radno vrijeme",
    value: "Ponedjeljak - petak, 08:00-16:00",
    icon: Clock,
  },
  {
    label: "Lokacija",
    value: "Osijek, Hrvatska",
    icon: MapPin,
  },
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
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="inner-page contact-page">
        <section className="page-hero contact-page-hero">
          <div className="container contact-page-hero-grid">
            <div className="contact-page-copy">
              <p className="mono-label">Kontakt</p>
              <h1>Recite nam što želite postići.</h1>
              <p>
                Opišite poslovanje, trenutni problem i željeni rezultat. Odgovorit ćemo s jasnim prijedlogom sljedećeg koraka.
              </p>
            </div>
            <div className="contact-direct" aria-label="Izravni kontaktni podaci">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <>
                    <Icon size={23} weight="regular" aria-hidden="true" />
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                    {detail.href && <ArrowRight size={18} aria-hidden="true" />}
                  </>
                );

                return detail.href ? (
                  <a key={detail.label} href={detail.href} className="contact-detail contact-detail-link">
                    {content}
                  </a>
                ) : (
                  <div key={detail.label} className="contact-detail">{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section contact-form-section">
          <div className="container contact-page-form-layout">
            <div className="contact-form-intro">
              <p className="mono-label">Zatražite ponudu</p>
              <h2>Dovoljno je nekoliko osnovnih informacija.</h2>
              <p>
                Ne morate imati gotovu specifikaciju. Napišite što trenutno ne radi i što želite poboljšati.
              </p>
              <p className="contact-response-note">Odgovaramo tijekom radnog vremena, najkasnije u jednom radnom danu.</p>
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="section contact-next-section">
          <div className="container contact-next-layout">
            <div>
              <p className="mono-label">Nakon slanja</p>
              <h2>Što se događa s vašim upitom.</h2>
            </div>
            <ol>
              {nextSteps.map(([title, description]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
