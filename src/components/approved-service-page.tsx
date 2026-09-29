import type { Metadata } from "next";
import approvedPages from "@/src/generated/service-pages.json";
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from "@/src/lib/seo";
import { JsonLd } from "./json-ld";
import { EditorialShell } from "./editorial-shell";

type ServiceRoute = keyof typeof approvedPages;

// Preserve the established SEO titles independently of the approved page design snapshots.
const serviceSeoTitles: Record<ServiceRoute, string> = {
  "izrada-web-stranica-cijena": "Izrada Web Stranica - Cijena I Paketi - Legatech",
  "seo-optimizacija-cijena": "SEO Optimizacija - Cijena I Paketi - Legatech",
  "izrada-web-trgovina": "Izrada Web Trgovina - WooCommerce Webshop - Legatech",
  "odrzavanje-web-stranica": "Održavanje Web Stranica I WordPress Podrška - Legatech",
};

const services: Record<ServiceRoute, { name: string; description: string; startingPrice: number; billingPeriod?: "MONTH" }> = {
  "izrada-web-stranica-cijena": {
    name: "Izrada web stranica",
    description: "Profesionalna izrada web stranica za obrte i tvrtke. Paketi od 500 €, responzivan dizajn, SEO temelji, analitika i podrška nakon objave.",
    startingPrice: 500,
  },
  "seo-optimizacija-cijena": {
    name: "SEO optimizacija",
    description: "SEO optimizacija za tvrtke i obrte - tehnički SEO, sadržaj, lokalni SEO, ključne riječi i mjerenje rezultata. Paketi od 290 € mjesečno.",
    startingPrice: 290,
    billingPeriod: "MONTH",
  },
  "izrada-web-trgovina": {
    name: "Izrada web trgovina",
    description: "Izrada WooCommerce web trgovina s preglednim katalogom, jednostavnom kupnjom, sigurnim plaćanjem i SEO temeljima. Projekti od 1.500 €.",
    startingPrice: 1500,
  },
  "odrzavanje-web-stranica": {
    name: "Održavanje web stranica",
    description: "Redovito WordPress održavanje, backup, sigurnosne provjere, ažuriranja i tehnička podrška. Paketi održavanja od 35 € mjesečno.",
    startingPrice: 35,
    billingPeriod: "MONTH",
  },
};

export function approvedServiceMetadata(route: ServiceRoute): Metadata {
  return createPageMetadata({
    title: serviceSeoTitles[route],
    description: services[route].description,
    path: `/${route}/`,
  });
}

export function ApprovedServicePage({ route }: { route: ServiceRoute }) {
  const service = services[route];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Naslovnica", path: "/" }, { name: service.name, path: `/${route}/` }])} />
      <JsonLd data={serviceJsonLd({ ...service, path: `/${route}/` })} />
      <EditorialShell variant="service-v0-page">
        {/* Checked-in, trusted HTML snapshot of the approved Croatian service design. */}
        <div className="approved-service-content" dangerouslySetInnerHTML={{ __html: approvedPages[route].html }} />
      </EditorialShell>
    </>
  );
}
