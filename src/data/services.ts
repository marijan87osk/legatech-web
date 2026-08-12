export interface ServicePageData {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  price: string;
  audience: string[];
  outcomes: { title: string; text: string }[];
  process: string[];
  relatedHref: string;
}

export const servicePages: Record<string, ServicePageData> = {
  web: {
    slug: "izrada-web-stranica-cijena",
    eyebrow: "Izrada web stranica",
    title: "Web stranica koja jasno predstavlja vrijednost vašeg poslovanja.",
    lead: "Planiramo, dizajniramo i razvijamo brz web koji izgleda profesionalno i vodi posjetitelja prema upitu.",
    price: "Od 500 €",
    audience: ["Nemate web stranicu", "Postojeći web izgleda zastarjelo", "Posjetitelji ne šalju dovoljno upita", "Web je spor ili ga je teško uređivati"],
    outcomes: [{ title: "Jasna struktura", text: "Posjetitelj brzo razumije što nudite, kome pomažete i kako vas kontaktirati." }, { title: "Brz rad na svakom uređaju", text: "Responzivna izvedba i optimizirane stranice pružaju bolje iskustvo kupcima." }, { title: "SEO temelji od početka", text: "Struktura, naslovi, meta podaci i tehničke postavke nisu naknadna misao." }],
    process: ["Konzultacije i ciljevi", "Struktura i sadržaj", "Dizajn i razvoj", "Testiranje i objava", "Edukacija i podrška"],
    relatedHref: "/cjenik#web-stranice",
  },
  seo: {
    slug: "seo-optimizacija-cijena",
    eyebrow: "SEO optimizacija",
    title: "Budite vidljivi kada kupci traže ono što nudite.",
    lead: "Povezujemo tehnički SEO, sadržaj i lokalnu vidljivost s upitima koji imaju poslovnu vrijednost.",
    price: "Od 290 € mjesečno",
    audience: ["Ne pronalaze vas na Googleu", "Web dobiva malo organskog prometa", "Promet ne donosi prave upite", "Previše ovisite o plaćenim oglasima"],
    outcomes: [{ title: "Realna početna analiza", text: "Pregledavamo tehničko stanje, sadržaj, konkurente i postojeće pozicije prije preporuka." }, { title: "Relevantne ključne riječi", text: "Fokus nije na vanity pozicijama, nego na pretragama pravih potencijalnih kupaca." }, { title: "Mjerljiv napredak", text: "Pratimo vidljivost, organski promet i konverzije te jasno objašnjavamo sljedeće poteze." }],
    process: ["SEO analiza", "Strategija i prioriteti", "Tehničke dorade", "Sadržaj i interno povezivanje", "Mjerenje i optimizacija"],
    relatedHref: "/cjenik#seo",
  },
  shop: {
    slug: "izrada-web-trgovina",
    eyebrow: "Izrada web trgovina",
    title: "Online trgovina u kojoj je kupnja jednostavna.",
    lead: "Gradimo WooCommerce trgovine s preglednim katalogom, pouzdanim plaćanjem i administracijom koju možete koristiti.",
    price: "Od 1.500 €",
    audience: ["Pokrećete online prodaju", "Ručno obrađujete narudžbe", "Postojeći shop je spor ili nepregledan", "Kupci odustaju na mobitelu"],
    outcomes: [{ title: "Pregledan katalog", text: "Kategorije, filteri i proizvodi organizirani su prema stvarnom načinu kupnje." }, { title: "Kraći put do narudžbe", text: "Košarica i blagajna uklanjaju nepotrebne korake i jasno prikazuju plaćanje i dostavu." }, { title: "Spremno za rast", text: "Analitika, SEO temelji i mogućnosti integracija planiraju se zajedno s trgovinom." }],
    process: ["Ciljevi i katalog", "Struktura trgovine", "Dizajn i razvoj", "Plaćanje i dostava", "Testna kupnja i objava"],
    relatedHref: "/cjenik#web-trgovine",
  },
  care: {
    slug: "odrzavanje-web-stranica",
    eyebrow: "Održavanje web stranica",
    title: "Netko pouzdano brine o webu dok vi vodite posao.",
    lead: "Ažuriranja, sigurnosne kopije, provjere i tehnička pomoć u jasno dogovorenom opsegu.",
    price: "Od 35 € mjesečno",
    audience: ["Nemate internu tehničku osobu", "Ne želite sami raditi ažuriranja", "Web redovito treba manje izmjene", "Trebate jasan kontakt kada nešto ne radi"],
    outcomes: [{ title: "Manje neugodnih iznenađenja", text: "Redovita ažuriranja i provjere smanjuju rizik problema i prekida rada." }, { title: "Pouzdane sigurnosne kopije", text: "Backup nije koristan samo ako postoji, nego i ako se iz njega web može vratiti." }, { title: "Dogovoreno vrijeme reakcije", text: "Svaki paket jasno navodi razinu podrške i očekivano vrijeme odgovora." }],
    process: ["Pregled postojećeg weba", "Dogovor paketa", "Redovite provjere", "Izmjene i podrška", "Mjesečni pregled prema paketu"],
    relatedHref: "/cjenik#odrzavanje",
  },
};
