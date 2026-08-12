export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  service: string;
  status: "verified";
}

export const clientTestimonials = {
  mate: {
    quote: "Krenuli smo bez weba, a dobili smo stranicu koja jasno prikazuje ponudu, cijene i način rezervacije. Posjete i upiti nastavljaju rasti.",
    name: "Mate",
    role: "Vlasnik",
    company: "Ducija",
    service: "Izrada web stranice, SEO i održavanje",
    status: "verified",
  },
  ivan: {
    quote: "Legatech je preuzeo cijeli web, od strukture i tekstova do objave. Danas klijenti na jednom mjestu vide usluge i mogu poslati upit.",
    name: "Ivan",
    role: "Vlasnik",
    company: "Varmos",
    service: "Izrada web stranice i održavanje",
    status: "verified",
  },
  kristina: {
    quote: "Novi dvojezični shop povezao je kolekcije, proizvode, plaćanje i dostavu u iskustvo koje puno bolje prati KRIÉ brend.",
    name: "Kristina",
    role: "Vlasnica",
    company: "KRIÉ",
    service: "Custom dvojezična web trgovina",
    status: "verified",
  },
  ante: {
    quote: "Početna kampanja dovela je prve posjete, a SEO je s vremenom postao glavni kanal vidljivosti i redovitih upita.",
    name: "Ante",
    role: "Vlasnik",
    company: "Barišić Plast",
    service: "Izrada web stranice i SEO optimizacija",
    status: "verified",
  },
} satisfies Record<string, Testimonial>;

export const testimonials: Testimonial[] = [
  clientTestimonials.mate,
  clientTestimonials.ivan,
  clientTestimonials.kristina,
  clientTestimonials.ante,
];
