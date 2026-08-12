export type ProjectService =
  | "website-development"
  | "seo-optimization"
  | "ecommerce-development"
  | "website-maintenance";

export interface ProjectResult {
  value: string;
  label: string;
  verified: boolean;
}

export interface ProjectSummary {
  slug: string;
  client: string;
  year?: string;
  industry: string;
  services: ProjectService[];
  serviceLabel: string;
  challenge: string;
  solution: string;
  result: ProjectResult;
  image: string;
  imageAlt: string;
  href?: `/projekti/${string}`;
  mock: boolean;
}

export interface ProjectDetail extends ProjectSummary {
  href: `/projekti/${string}`;
  website: string;
  websiteLabel: string;
  variant: "service" | "commerce" | "growth" | "continuity" | "stewardship";
  heroTitle: string;
  lead: string;
  startingTitle: string;
  startingPoint: string;
  goals: string[];
  scopeTitle: string;
  scopeDescription: string;
  scope: Array<{ title: string; description: string }>;
  galleryTitle: string;
  outcomeTitle: string;
  outcome: string;
  feature: {
    label: string;
    status: string;
    title: string;
    description: string;
    name: string;
    items: string[];
    href: string;
    linkLabel: string;
  };
  gallery: Array<{ src: string; alt: string }>;
  relatedServices: Array<{ title: string; description: string; href: string }>;
  finalCta: { title: string; description: string };
}

export const ducijaProject: ProjectDetail = {
  slug: "ducija",
  client: "Ducija",
  year: "2026.",
  industry: "Najam šatora i opreme za proslave",
  services: ["website-development", "seo-optimization", "website-maintenance"],
  serviceLabel: "Izrada web stranice, SEO i održavanje",
  challenge: "Izgraditi digitalnu prisutnost od nule za lokalnu uslugu kojoj trebaju jasna ponuda, bolja vidljivost i jednostavan put do upita.",
  solution: "Legatech je izradio novi web, postavio SEO temelje za Osijek i okolicu te nastavio tehničku brigu i razvoj nakon objave.",
  result: {
    value: "Kontinuirani rast",
    label: "posjeta i upita putem web stranice",
    verified: true,
  },
  image: "/projects/ducija/cover.webp",
  imageAlt: "Početna stranica Ducija weba za najam šatora u Osijeku i okolici",
  href: "/projekti/ducija",
  website: "https://ducija.hr/",
  websiteLabel: "Posjetite ducija.hr",
  variant: "continuity",
  heroTitle: "Od nule do rastućih upita.",
  lead: "Web, lokalni SEO i održavanje povezani u stabilan kanal za najam šatora u Osijeku i okolici.",
  startingTitle: "Poslovanje je trebalo cijeli digitalni početak.",
  startingPoint: "Ducija prije projekta nije imao web stranicu. Ponudu najma šatora, dodatnu opremu, područje rada i način rezervacije trebalo je prvi put organizirati u jasan digitalni put za korisnike koji planiraju proslavu.",
  goals: [
    "Odmah objasniti što se može unajmiti i za koliko gostiju",
    "Izgraditi lokalnu vidljivost za Osijek i okolicu",
    "Olakšati slanje upita s datumom, lokacijom i brojem gostiju",
  ],
  scopeTitle: "Izrada, rast i briga planirani su kao jedan sustav.",
  scopeDescription: "Web nije zamišljen kao jednokratna objava, nego kao poslovni kanal koji se može pratiti, održavati i poboljšavati.",
  scope: [
    {
      title: "Web od nule",
      description: "Nova struktura, vizualni smjer i responzivna izvedba jasno predstavljaju šatore, dodatnu opremu i način najma.",
    },
    {
      title: "Lokalna SEO struktura",
      description: "Sadržaj i tehnički temelji usmjereni su na relevantne lokalne pretrage za najam šatora u Osijeku i okolici.",
    },
    {
      title: "Put prema rezervaciji",
      description: "Cijene, kapacitet, oprema i koraci rezervacije postavljeni su prije obrasca kako bi upiti bili jasniji i konkretniji.",
    },
    {
      title: "Kontinuirano održavanje",
      description: "Nakon objave Legatech ostaje zadužen za tehničku stabilnost, provjere i daljnja poboljšanja weba.",
    },
  ],
  galleryTitle: "Ponuda, cijena i rezervacija dostupni su bez lutanja.",
  outcomeTitle: "Web raste zajedno s potražnjom.",
  outcome: "Ducija web bilježi rast posjeta i upita, a SEO i održavanje nastavljaju podržavati taj razvoj nakon objave. Rezultat prikazujemo kvalitativno jer precizne brojke nisu javno objavljene.",
  feature: {
    label: "Kontinuitet nakon objave",
    status: "Aktivna suradnja",
    title: "Objava je bila početak, ne završetak.",
    description: "Izrada weba, SEO i održavanje povezani su kako bi web ostao pouzdan, vidljiv i spreman za daljnji rast.",
    name: "Web + SEO + održavanje",
    items: [
      "Praćenje i razvoj lokalne organske vidljivosti",
      "Tehnička ažuriranja i preventivne provjere",
      "Provjera ključnih funkcionalnosti i obrasca",
      "Podrška za manje dorade i daljnji razvoj",
      "Praćenje rasta posjeta i poslovnih upita",
    ],
    href: "/odrzavanje-web-stranica",
    linkLabel: "Saznajte više o održavanju",
  },
  gallery: [
    {
      src: "/projects/ducija/cover.webp",
      alt: "Početna stranica Ducija weba s ponudom najma šatora u Osijeku",
    },
    {
      src: "/projects/ducija/packages.webp",
      alt: "Prikaz Ducija paketa, cijena i dodatne opreme za proslave",
    },
    {
      src: "/projects/ducija/process.webp",
      alt: "Proces rezervacije šatora prikazan na Ducija web stranici",
    },
  ],
  relatedServices: [
    { title: "Izrada web stranica", description: "Nova struktura i izvedba prilagođena poslovnom cilju", href: "/izrada-web-stranica-cijena" },
    { title: "SEO optimizacija", description: "Lokalna vidljivost i relevantni organski upiti", href: "/seo-optimizacija-cijena" },
    { title: "Održavanje web stranica", description: "Tehnička briga i podrška nakon objave", href: "/odrzavanje-web-stranica" },
  ],
  finalCta: {
    title: "Trebate web koji će rasti i nakon objave?",
    description: "Povezat ćemo izradu, vidljivost i tehničku brigu u jasan plan prilagođen vašem poslovanju.",
  },
  mock: false,
};

export const balazProject: ProjectDetail = {
  slug: "odvjetnicki-ured-balaz",
  client: "Odvjetnički ured Balaž",
  industry: "Odvjetničke i pravne usluge",
  services: ["seo-optimization", "website-maintenance"],
  serviceLabel: "SEO optimizacija i održavanje",
  challenge: "Održavati tehničku pouzdanost postojećeg weba i organizirati širok raspon pravnih usluga i lokacijskih stranica za dugoročnu vidljivost.",
  solution: "Legatech povezuje kontinuirani SEO rad s tehničkim održavanjem kako bi sadržaj ostao razumljiv tražilicama, a web stabilan za posjetitelje.",
  result: {
    value: "Aktivna suradnja",
    label: "SEO i održavanje postojećeg weba",
    verified: true,
  },
  image: "/projects/odvjetnicki-ured-balaz/cover.webp",
  imageAlt: "Početna stranica Odvjetničkog ureda Balaž u Osijeku",
  href: "/projekti/odvjetnicki-ured-balaz",
  website: "https://odvjetnicki-ured-balaz.hr/",
  websiteLabel: "Posjetite odvjetnicki-ured-balaz.hr",
  variant: "stewardship",
  heroTitle: "Vidljivost i briga za postojeći web.",
  lead: "Kontinuirani SEO i održavanje za odvjetnički ured s velikim brojem usluga i lokalnih stranica.",
  startingTitle: "Postojeći web ima širok sadržajni opseg.",
  startingPoint: "Odvjetnički ured Balaž predstavlja velik broj pravnih područja i lokacija na kojima pruža usluge. Takav web treba jasnu sadržajnu strukturu, kontinuiranu SEO pažnju i pouzdanu tehničku brigu kako bi ostao koristan posjetiteljima i razumljiv tražilicama.",
  goals: [
    "Očuvati pouzdan rad važnih uslužnih i kontaktnih stranica",
    "Povezati pravna područja i lokacije u razumljivu SEO strukturu",
    "Kontinuirano određivati prioritete bez nerealnih obećanja pozicija",
  ],
  scopeTitle: "SEO i održavanje rade kao povezan sustav.",
  scopeDescription: "Sadržajna vidljivost nema punu vrijednost bez tehnički stabilnog weba, a održavanje treba razumjeti poslovnu ulogu svake stranice.",
  scope: [
    {
      title: "SEO struktura usluga",
      description: "Pravna područja promatraju se kao povezane teme kako bi korisnici i tražilice lakše pronašli odgovarajuću uslugu.",
    },
    {
      title: "Lokalna vidljivost",
      description: "Osijek i druga stvarna područja rada povezuju se s relevantnim pravnim uslugama bez stvaranja praznog ili dupliciranog sadržaja.",
    },
    {
      title: "Tehnička briga",
      description: "Ažuriranja, provjere funkcionalnosti i podrška smanjuju mogućnost da tehnički problem prekine put prema informacijama ili kontaktu.",
    },
    {
      title: "Kontinuirani prioriteti",
      description: "SEO i održavanje usklađuju se prema stanju weba, sadržaju i poslovno važnim stranicama umjesto nepovezanih pojedinačnih zahvata.",
    },
  ],
  galleryTitle: "Velik broj usluga traži jasnu strukturu i pouzdan kontakt.",
  outcomeTitle: "Vrijednost je u kontinuitetu, ne jednokratnoj intervenciji.",
  outcome: "Suradnja obuhvaća SEO optimizaciju i održavanje postojećeg weba Odvjetničkog ureda Balaž. Precizne podatke o prometu, pozicijama i upitima ne prikazujemo jer nisu javno potvrđeni.",
  feature: {
    label: "Dugoročna suradnja",
    status: "Kontinuirani angažman",
    title: "Tehničko stanje i vidljivost prate se zajedno.",
    description: "Kada SEO i održavanje imaju zajedničke prioritete, važne stranice mogu se poboljšavati bez zanemarivanja stabilnosti cijelog weba.",
    name: "SEO + održavanje",
    items: [
      "Praćenje važnih uslužnih i lokalnih stranica",
      "Tehničke provjere i redovita ažuriranja",
      "Provjera dostupnosti ključnih funkcionalnosti",
      "Podrška za manje sadržajne i tehničke dorade",
      "Dogovaranje sljedećih prioriteta prema stanju weba",
    ],
    href: "/seo-optimizacija-cijena",
    linkLabel: "Saznajte više o SEO optimizaciji",
  },
  gallery: [
    {
      src: "/projects/odvjetnicki-ured-balaz/cover.webp",
      alt: "Početna stranica Odvjetničkog ureda Balaž s prikazom ureda u Osijeku",
    },
    {
      src: "/projects/odvjetnicki-ured-balaz/services.webp",
      alt: "Prikaz pravnih usluga na webu Odvjetničkog ureda Balaž",
    },
    {
      src: "/projects/odvjetnicki-ured-balaz/contact.webp",
      alt: "Kontaktne informacije i područja povjerenja na webu Odvjetničkog ureda Balaž",
    },
  ],
  relatedServices: [
    { title: "SEO optimizacija", description: "Kontinuirana vidljivost važnih usluga i lokalnih tema", href: "/seo-optimizacija-cijena" },
    { title: "Održavanje web stranica", description: "Tehnička pouzdanost i podrška za postojeći web", href: "/odrzavanje-web-stranica" },
  ],
  finalCta: {
    title: "Postojeći web treba pouzdanu brigu i jasniji SEO smjer?",
    description: "Pregledat ćemo tehničko stanje, sadržaj i vidljivost te predložiti realne prioritete za nastavak suradnje.",
  },
  mock: false,
};

export const varmosProject: ProjectDetail = {
  slug: "varmos",
  client: "Varmos",
  year: "2025.",
  industry: "Instalacije vode, plina i grijanja",
  services: ["website-development", "website-maintenance"],
  serviceLabel: "Izrada web stranice i održavanje",
  challenge: "Izgraditi profesionalnu online prisutnost za poslovanje koje prije projekta nije imalo web stranicu ni pripremljen sadržaj.",
  solution: "Legatech je preuzeo strategiju, strukturu, tekstove, dizajn, razvoj, objavu i kontinuirano osnovno održavanje.",
  result: {
    value: "Aktivan kanal",
    label: "za upite putem web stranice",
    verified: true,
  },
  image: "/projects/varmos/desktop.webp",
  imageAlt: "Početna stranica Varmos weba s prikazom instalacija podnog grijanja",
  href: "/projekti/varmos",
  website: "https://varmos.hr/",
  websiteLabel: "Posjetite varmos.hr",
  variant: "service",
  heroTitle: "Digitalna prisutnost izgrađena od nule.",
  lead: "Poslovna web stranica osmišljena, napisana i izrađena od nule kako bi Varmos jasno predstavio usluge i primao upite.",
  startingTitle: "Nije postojao web ni pripremljen sadržaj.",
  startingPoint: "Varmos prije suradnje nije imao web stranicu, pripremljenu strukturu ni tekstove. Projekt je zato započeo razumijevanjem poslovanja, usluga i pitanja koja potencijalni klijenti postavljaju prije kontakta.",
  goals: [
    "Jasno predstaviti instalacije vode, plina i grijanja",
    "Izgraditi profesionalan prvi dojam od samog početka",
    "Omogućiti jednostavan dolazak do kontakta i slanje upita",
  ],
  scope: [
    {
      title: "Struktura i sadržaj",
      description: "Definirali smo raspored stranice i napisali sav sadržaj jer klijent nije imao pripremljene materijale.",
    },
    {
      title: "Vizualni smjer",
      description: "Dizajn je povezao fotografije izvedenih radova, jasnu tipografiju i prepoznatljivu crvenu akcentnu boju.",
    },
    {
      title: "Responzivna izrada",
      description: "Web je razvijen za pregled ponude i kontakt na računalima, tabletima i mobilnim uređajima.",
    },
    {
      title: "Put prema upitu",
      description: "Kontaktni pozivi, obrazac i poslovne informacije postavljeni su na mjesta na kojima korisnik donosi odluku.",
    },
  ],
  scopeTitle: "Legatech je preuzeo cijeli put do objave.",
  scopeDescription: "Od prve strukture i tekstova do dizajna, razvoja i jasnog puta prema upitu.",
  galleryTitle: "Ponuda je jasna, a kontakt uvijek blizu.",
  outcomeTitle: "Web je postao aktivna kontaktna točka.",
  outcome: "Varmos je dobio vlastitu profesionalnu online prisutnost i web stranicu koja danas služi kao stvarna kontaktna točka za nove upite. Ponuda, područje rada i način kontakta sada su dostupni na jednom jasnom mjestu.",
  feature: {
    label: "Kontinuitet",
    status: "Aktivan paket",
    title: "Objava nije kraj suradnje.",
    description: "Nakon objave Legatech nastavlja osnovnu preventivnu brigu o webu kroz najmanji paket održavanja.",
    name: "Care Basic",
    items: [
      "Mjesečna ažuriranja sustava, teme i dodataka",
      "Osnovna provjera funkcionalnosti i sigurnosti",
      "Vanjska sigurnosna kopija jednom mjesečno",
      "Provjera dostupnosti i kontakt obrasca",
      "Podrška putem e-maila s reakcijom do tri radna dana",
    ],
    href: "/odrzavanje-web-stranica",
    linkLabel: "Saznajte više o održavanju",
  },
  gallery: [
    {
      src: "/projects/varmos/desktop.webp",
      alt: "Početna stranica Varmos weba s glavnom porukom i pozivom na slanje ponude",
    },
    {
      src: "/projects/varmos/services.webp",
      alt: "Sekcija Varmos weba s uslugama instalacije vode, grijanja i plina",
    },
    {
      src: "/projects/varmos/contact.webp",
      alt: "Kontaktna sekcija Varmos weba s obrascem i kartom lokacije",
    },
  ],
  relatedServices: [
    { title: "Izrada web stranica", description: "Od strategije i sadržaja do objave", href: "/izrada-web-stranica-cijena" },
    { title: "Održavanje web stranica", description: "Redovita tehnička briga nakon objave", href: "/odrzavanje-web-stranica" },
  ],
  finalCta: {
    title: "Trebate web, ali još nemate sadržaj ni strukturu?",
    description: "Opišite poslovanje i cilj. Legatech može preuzeti cijeli put od prve ideje do objavljenog weba.",
  },
  mock: false,
};

export const krieProject: ProjectDetail = {
  slug: "krie-design",
  client: "KRIÉ",
  year: "2024.",
  industry: "Održiva moda i dizajnerska odjeća",
  services: ["ecommerce-development"],
  serviceLabel: "Redizajn i izrada web trgovine",
  challenge: "Zamijeniti postojeći web shop potpuno prilagođenom trgovinom koja bolje predstavlja modni brend i njegove kolekcije.",
  solution: "Legatech je izradio custom dvojezični shop, prenio i dodatno unio proizvode te povezao Monri WSPay, plaćanje virmanom i domaću i međunarodnu dostavu.",
  result: {
    value: "Cjelovit shop",
    label: "na hrvatskom i engleskom jeziku",
    verified: true,
  },
  image: "/projects/krie-design/cover.webp",
  imageAlt: "KRIÉ web trgovina s velikom fotografijom modne kolekcije uz Jadransko more",
  href: "/projekti/krie-design",
  website: "https://kriedesign.hr/naslovna/",
  websiteLabel: "Posjetite kriedesign.hr",
  variant: "commerce",
  heroTitle: "KRIÉ web trgovina po mjeri.",
  lead: "Custom dvojezični shop koji povezuje kolekcije, proizvode, plaćanje i dostavu u jedno dosljedno iskustvo kupnje.",
  startingTitle: "Postojeći shop više nije odgovarao smjeru brenda.",
  startingPoint: "KRIÉ je već imao web trgovinu i pripremljene materijale, ali je želio potpuno novu, custom izvedbu. Projekt je uključio prijenos postojećih proizvoda, unos dodatnih artikala i novu strukturu za opsežan katalog kolekcija.",
  goals: [
    "Dati fotografijama i kolekcijama snažniju ulogu u iskustvu kupnje",
    "Omogućiti prodaju na hrvatskom i engleskom jeziku",
    "Povezati katalog, plaćanje i dostavu u pouzdan prodajni proces",
  ],
  scopeTitle: "Novi shop izgrađen je oko kolekcija i kupnje.",
  scopeDescription: "Materijali su bili pripremljeni, a izvedba je obuhvatila dizajn, podatke proizvoda, oba jezika i ključne prodajne integracije.",
  scope: [
    {
      title: "Custom dizajn",
      description: "Vizualni sustav i predlošci oblikovani su posebno za KRIÉ, s naglaskom na fotografije, kolekcije i mirnu tipografsku hijerarhiju.",
    },
    {
      title: "Katalog i proizvodi",
      description: "Postojeći proizvodi preneseni su u novu trgovinu, a dio dodatnih proizvoda unesen je tijekom izrade.",
    },
    {
      title: "Dva jezika",
      description: "Legatech je izradio i postavio hrvatsku i englesku verziju shopa za domaće i međunarodne kupce.",
    },
    {
      title: "Plaćanje i dostava",
      description: "Legatech je povezao Monri WSPay, plaćanje virmanom te pravila dostave za Hrvatsku i inozemstvo.",
    },
  ],
  galleryTitle: "Katalog i proizvod imaju dovoljno prostora.",
  outcomeTitle: "Brend je dobio cjelovit dvojezični prodajni sustav.",
  outcome: "Nova trgovina povezuje vizualni identitet KRIÉ brenda s funkcionalnim katalogom i punim putem kupnje. Kupci mogu pregledavati kolekcije, birati varijacije, plaćati karticama ili virmanom i naručivati iz Hrvatske i inozemstva.",
  feature: {
    label: "Prodajna infrastruktura",
    status: "Implementirano",
    title: "Kupnja je povezana od izbora do plaćanja.",
    description: "Funkcionalnosti su postavljene prema stvarnom prodajnom procesu, bez predstavljanja vanjskih naknada ili usluga kao dijela Legatech proizvoda.",
    name: "Web shop + Monri WSPay",
    items: [
      "Kartično plaćanje putem Monri WSPay-a",
      "Plaćanje virmanom i e-mail potvrde narudžbe",
      "Dostava u Hrvatskoj i međunarodna dostava",
      "Kategorije, kolekcije i varijacije proizvoda",
      "Hrvatska i engleska verzija trgovine",
    ],
    href: "/izrada-web-trgovina",
    linkLabel: "Saznajte više o izradi web trgovina",
  },
  gallery: [
    { src: "/projects/krie-design/cover.webp", alt: "KRIÉ naslovna stranica s fotografijom modne kolekcije uz more" },
    { src: "/projects/krie-design/shop.webp", alt: "KRIÉ katalog proizvoda s fotografijama i navigacijom trgovine" },
    { src: "/projects/krie-design/product.webp", alt: "KRIÉ stranica proizvoda s odabirom veličine, količine i dodavanjem u košaricu" },
  ],
  relatedServices: [
    { title: "Izrada web trgovina", description: "Custom katalog, plaćanje i dostava", href: "/izrada-web-trgovina" },
    { title: "SEO optimizacija", description: "Vidljivost kategorija, proizvoda i sadržaja", href: "/seo-optimizacija-cijena" },
  ],
  finalCta: {
    title: "Postojeći shop više ne prati vaš brend i prodaju?",
    description: "Pošaljite adresu trgovine i opišite što želite promijeniti. Predložit ćemo realan smjer redizajna i migracije.",
  },
  mock: false,
};

export const barisicPlastProject: ProjectDetail = {
  slug: "barisic-plast",
  client: "Barišić Plast",
  industry: "Plastifikacija metala",
  services: ["website-development", "seo-optimization"],
  serviceLabel: "Izrada web stranice, SEO i početna Google Ads kampanja",
  challenge: "Izgraditi novi web koji jasno predstavlja industrijsku uslugu, pokreće prve posjete i dugoročno dovodi relevantne organske upite.",
  solution: "Legatech je izradio novi web, pokrenuo početnu Google Ads kampanju te razvio SEO strukturu i sadržaj koji su s vremenom preuzeli glavni dio vidljivosti.",
  result: {
    value: "Organski kanal",
    label: "danas donosi snažnu posjetu i redovite upite",
    verified: true,
  },
  image: "/projects/barisic-plast/cover.webp",
  imageAlt: "Početna stranica Barišić Plast weba s pogonom za plastifikaciju metala",
  href: "/projekti/barisic-plast",
  website: "https://barisic-plast.com/",
  websiteLabel: "Posjetite barisic-plast.com",
  variant: "growth",
  heroTitle: "Web i SEO koji donose upite.",
  lead: "Web, početni Google Ads i SEO povezani u dugoročan kanal za vidljivost i nove poslovne upite.",
  startingTitle: "Novi web trebao je odmah početi raditi za poslovanje.",
  startingPoint: "Barišić Plast trebao je novu digitalnu osnovu koja stručno objašnjava plastifikaciju metala, prikazuje izvedene radove i pretvara interes posjetitelja u konkretan upit. Sam web nije bio dovoljan bez početnog izvora prometa i dugoročnog plana vidljivosti.",
  goals: [
    "Jasno predstaviti postupak i prednosti plastifikacije metala",
    "Pokrenuti prve relevantne posjete odmah nakon objave",
    "Izgraditi organsku vidljivost koja dugoročno donosi upite",
  ],
  scopeTitle: "Web, oglasi i SEO imali su različite uloge.",
  scopeDescription: "Projekt je prvo osigurao kvalitetno odredište i početni promet, a zatim sustavno gradio organsku vidljivost.",
  scope: [
    {
      title: "Novi poslovni web",
      description: "Struktura, dizajn i razvoj povezali su glavnu uslugu, prednosti postupka, izvedene radove i jasan put prema upitu.",
    },
    {
      title: "Početna Google Ads kampanja",
      description: "Oglasi su nakon objave doveli prve relevantne posjetitelje dok je organska vidljivost tek počinjala rasti.",
    },
    {
      title: "SEO struktura i sadržaj",
      description: "Uslužne teme, interna struktura i sadržaj razvijani su prema stvarnim pretragama vezanim uz plastifikaciju metala.",
    },
    {
      title: "Put prema upitu",
      description: "Kontaktni obrazac, telefon i pozivi na akciju postavljeni su uz sadržaj koji odgovara na pitanja potencijalnih klijenata.",
    },
  ],
  galleryTitle: "Stručna usluga dobila je jasan digitalni prikaz.",
  outcomeTitle: "SEO je prerastao početnu kampanju u održiv kanal.",
  outcome: "Google Ads osigurao je početni zamah nakon objave. Kako su SEO struktura i sadržaj sazrijevali, organski promet postao je snažan izvor posjeta i redovitih upita putem weba. Rezultat prikazujemo kvalitativno jer precizne brojke nisu javno objavljene.",
  feature: {
    label: "Razvoj kanala",
    status: "Web + Ads + SEO",
    title: "Svaki kanal odradio je svoj dio posla.",
    description: "Plaćena kampanja nije bila zamjena za SEO, nego početni most dok novi web nije izgradio organsku vidljivost.",
    name: "Od objave do organskog rasta",
    items: [
      "Novi web kao kvalitetno odredište kampanje",
      "Početni Google Ads za prve relevantne posjete",
      "SEO struktura glavne usluge i povezanih tema",
      "Sadržaj usmjeren na namjeru pretraživanja",
      "Jasan put od posjeta do slanja upita",
    ],
    href: "/seo-optimizacija-cijena",
    linkLabel: "Saznajte više o SEO optimizaciji",
  },
  gallery: [
    { src: "/projects/barisic-plast/cover.webp", alt: "Početna stranica Barišić Plast weba s glavnom porukom i pozivom na kontakt" },
    { src: "/projects/barisic-plast/inquiry.webp", alt: "Kontaktni obrazac Barišić Plast weba za slanje poslovnog upita" },
    { src: "/projects/barisic-plast/work.webp", alt: "Galerija izvedenih projekata plastifikacije metala na Barišić Plast webu" },
  ],
  relatedServices: [
    { title: "Izrada web stranica", description: "Struktura, sadržaj i razvoj novog poslovnog weba", href: "/izrada-web-stranica-cijena" },
    { title: "SEO optimizacija", description: "Dugoročna vidljivost i relevantni organski upiti", href: "/seo-optimizacija-cijena" },
  ],
  finalCta: {
    title: "Trebate novi web koji neće ovisiti samo o oglasima?",
    description: "Povezat ćemo kvalitetan web, realan početni kanal prometa i SEO plan koji dugoročno gradi vidljivost.",
  },
  mock: false,
};

const demoProjects: ProjectSummary[] = [
  {
    slug: "atelier-sloj",
    client: "Atelier Sloj",
    industry: "Arhitektura",
    services: ["website-development"],
    serviceLabel: "Poslovna web stranica",
    challenge: "Predstaviti projekte jasno i pretvoriti interes investitora u kvalitetne upite.",
    solution: "Mirna struktura, vizualno vodstvo kroz projekte i kratak put do kontakta.",
    result: { value: "+43,7%", label: "demo kvalificiranih upita", verified: false },
    image: "/projects/atelier-sloj.png",
    imageAlt: "Demo prikaz responzivne web stranice arhitektonskog studija",
    mock: true,
  },
  {
    slug: "biljka-21",
    client: "Biljka 21",
    industry: "Specijalizirana trgovina",
    services: ["ecommerce-development"],
    serviceLabel: "Web trgovina",
    challenge: "Pojednostaviti kupnju na mobitelu i jasnije predstaviti velik izbor biljaka.",
    solution: "Pregledne kategorije, snažne fotografije proizvoda i kraći put do košarice.",
    result: { value: "+31,4%", label: "demo mobilnih kupnji", verified: false },
    image: "/projects/biljka-21.png",
    imageAlt: "Demo prikaz responzivne web trgovine sobnih biljaka",
    mock: true,
  },
  {
    slug: "termo-krug",
    client: "Termo Krug",
    industry: "Grijanje i hlađenje",
    services: ["seo-optimization", "website-development"],
    serviceLabel: "Web stranica i lokalni SEO",
    challenge: "Povećati lokalnu vidljivost i olakšati slanje hitnog upita sa svakog uređaja.",
    solution: "Stranice usluga prema namjeri pretraživanja i kontakt vidljiv u pravom trenutku.",
    result: { value: "+58,2%", label: "demo organskih klikova", verified: false },
    image: "/projects/termo-krug.png",
    imageAlt: "Demo prikaz web stranice lokalne tvrtke za grijanje i hlađenje",
    mock: true,
  },
];

export const projects: ProjectSummary[] = [ducijaProject, balazProject, varmosProject, krieProject, barisicPlastProject, ...demoProjects];
export const projectDetails: ProjectDetail[] = [ducijaProject, balazProject, varmosProject, krieProject, barisicPlastProject];

export function getProjectBySlug(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
