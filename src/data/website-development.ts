import { testimonials, type Testimonial } from "./client-testimonials";
import { barisicPlastProject, ducijaProject } from "./projects";

export interface WebsitePackage {
  name: string;
  startingPrice: string;
  description: string;
  bestFor: string;
  inclusions: string[];
  timeline: string;
  revisions: string;
  training: string;
  support: string;
  featured: boolean;
}

export interface WebsiteProofProject {
  client: string;
  service: string;
  challenge: string;
  solution: string;
  result: string;
  resultLabel: string;
  image: string | null;
  imageAlt: string;
  href?: `/projekti/${string}`;
  mock: boolean;
  verified: boolean;
}

export const websiteAudience = [
  ["Još nemate web stranicu", "Kupci vas teško mogu provjeriti, upoznati ponudu ili poslati kvalitetan upit."],
  ["Postojeći web izgleda zastarjelo", "Prvi dojam više ne odgovara kvaliteti usluge koju stvarno pružate."],
  ["Web je loš na mobitelu", "Sadržaj, navigacija i obrasci otežavaju korištenje većini današnjih posjetitelja."],
  ["Stranica se učitava presporo", "Posjetitelji odustaju prije nego što vide ponudu ili pronađu kontakt."],
  ["Ne dobivate dovoljno upita", "Web opisuje poslovanje, ali ne vodi posjetitelja prema jasnom sljedećem koraku."],
];

export const websiteProblems = [
  {
    problem: "Zastarjeli dizajn ruši povjerenje",
    shortLabel: "Zastarjeli dizajn",
    solution: "Redizajniramo vizualni sustav i hijerarhiju sadržaja kako bi web izgledao profesionalno, suvremeno i povezano s vašim poslovanjem.",
    outcome: "Uvjerljiviji prvi dojam",
  },
  {
    problem: "Navigacija skriva važne informacije",
    shortLabel: "Loša navigacija",
    solution: "Organiziramo stranice prema pitanjima kupaca i skraćujemo put od dolaska na web do razumijevanja ponude i kontakta.",
    outcome: "Jednostavniji put do upita",
  },
  {
    problem: "Sadržaj ne objašnjava vrijednost ponude",
    shortLabel: "Slab sadržaj",
    solution: "Gradimo jasnu strukturu poruka, naslova i poziva na akciju koja govori jezikom kupca, a ne internim poslovnim izrazima.",
    outcome: "Jasnija vrijednost usluge",
  },
  {
    problem: "Spora stranica tjera posjetitelje",
    shortLabel: "Spor web",
    solution: "Optimiziramo slike, kod i način učitavanja kako bi stranica pružila brzo i stabilno iskustvo na mobitelu i računalu.",
    outcome: "Brže i stabilnije iskustvo",
  },
  {
    problem: "Google teško razumije web",
    shortLabel: "Slabi SEO temelji",
    solution: "Postavljamo tehničku strukturu, naslove, meta podatke, URL-ove i interno povezivanje koje tražilicama olakšava razumijevanje sadržaja.",
    outcome: "Bolja osnova za vidljivost",
  },
  {
    problem: "Svaka mala izmjena postaje problem",
    shortLabel: "Teško održavanje",
    solution: "Predajemo uredno strukturiran web, objašnjavamo osnovno upravljanje i ostajemo dostupni kroz dogovorenu podršku ili održavanje.",
    outcome: "Manje tehničkog opterećenja",
  },
];

export const websiteDeliverables = [
  { title: "Planiranje i struktura", text: "Ciljeve, kupce i ponudu pretvaramo u logičan raspored stranica i sadržaja.", detail: "Strategija prije dizajna" },
  { title: "Individualni dizajn", text: "Vizualni smjer prilagođavamo identitetu i dojmu koji poslovanje treba ostaviti.", detail: "Bez generičkog predloška" },
  { title: "Responzivan razvoj", text: "Svaki ključni ekran i interakcija prilagođeni su mobitelu, tabletu i računalu.", detail: "Jednako jasno na svakom uređaju" },
  { title: "SEO i performanse", text: "Brzina, struktura naslova, meta podaci i indeksiranje ulaze u tehničke temelje projekta.", detail: "Spremno za daljnji rast" },
  { title: "Obrasci, analitika i sigurnost", text: "Upiti, mjerenje i osnovna zaštita postavljaju se kao funkcionalan dio weba.", detail: "Znate što web ostvaruje" },
  { title: "Objava, edukacija i podrška", text: "Web postavljamo na hosting, prolazimo upravljanje i ostajemo dostupni nakon objave.", detail: "Predaja bez nejasnoća" },
];

export const websiteTypes = [
  ["Poslovni web", "Cjelovita prezentacija tvrtke, ponude i razloga za kontakt."],
  ["Web za uslužnu djelatnost", "Struktura koja svaku glavnu uslugu objašnjava kroz problem i rezultat."],
  ["Landing stranica", "Jedna fokusirana ponuda za kampanju, uslugu ili prikupljanje upita."],
  ["Portfolio", "Radovi i studije slučaja organizirani tako da grade povjerenje."],
  ["Sadržajni web", "Blog, novosti ili stručni resursi povezani s jasnom informacijskom arhitekturom."],
  ["Redizajn", "Nova struktura i izvedba uz promišljeno zadržavanje korisnog sadržaja i SEO vrijednosti."],
];

export const websiteStandards = [
  ["Mobilni prikaz", "Kupci mogu brzo pročitati ponudu i poslati upit bez povećavanja, traženja ili pogrešnih dodira."],
  ["Brzina", "Optimizirano učitavanje smanjuje odustajanje i podržava bolje korisničko iskustvo."],
  ["Pristupačnost", "Semantička struktura, kontrast i tipkovnička navigacija čine web upotrebljivijim većem broju ljudi."],
  ["SEO temelji", "Google lakše razumije stranice, teme i odnose među uslugama."],
  ["Sigurnost", "Osnovne zaštitne postavke, SSL i zaštita obrazaca smanjuju nepotrebne rizike."],
  ["Jednostavno upravljanje", "Sadržaj je organiziran tako da su redovite izmjene razumljive i predvidive."],
  ["Mjerenje konverzija", "Možete pratiti obrasce, pozive i druge radnje povezane s poslovnim ciljem."],
];

export const websiteProjects: WebsiteProofProject[] = [
  {
    client: ducijaProject.client,
    service: ducijaProject.serviceLabel,
    challenge: ducijaProject.challenge,
    solution: ducijaProject.solution,
    result: ducijaProject.result.value,
    resultLabel: ducijaProject.result.label,
    image: ducijaProject.image,
    imageAlt: ducijaProject.imageAlt,
    href: ducijaProject.href,
    mock: false,
    verified: true,
  },
  {
    client: "Varmos",
    service: "Izrada web stranice i održavanje",
    challenge: "Izgraditi profesionalnu online prisutnost za poslovanje koje nije imalo web stranicu ni pripremljen sadržaj.",
    solution: "Legatech je preuzeo strukturu, tekstove, dizajn, razvoj, objavu i osnovno održavanje web stranice.",
    result: "Aktivan kanal",
    resultLabel: "za upite putem web stranice",
    image: "/projects/varmos/desktop.webp",
    imageAlt: "Početna stranica stvarnog Varmos web projekta",
    href: "/projekti/varmos",
    mock: false,
    verified: true,
  },
  {
    client: barisicPlastProject.client,
    service: "Izrada web stranice i SEO",
    challenge: barisicPlastProject.challenge,
    solution: barisicPlastProject.solution,
    result: barisicPlastProject.result.value,
    resultLabel: barisicPlastProject.result.label,
    image: barisicPlastProject.image,
    imageAlt: barisicPlastProject.imageAlt,
    href: barisicPlastProject.href,
    mock: false,
    verified: true,
  },
];

export const websiteProcess = [
  ["Konzultacije i ciljevi", "Upoznajemo poslovanje, kupce, ponudu i rezultat koji web treba podržati."],
  ["Struktura i sadržaj", "Dogovaramo podstranice, korisnički put i materijale potrebne za izradu."],
  ["Dizajn", "Oblikujemo vizualni smjer i ključne ekrane prije pune implementacije."],
  ["Razvoj", "Izrađujemo responzivan, brz i tehnički uredan web."],
  ["Testiranje", "Provjeravamo sadržaj, obrasce, uređaje, performanse i SEO postavke."],
  ["Objava i podrška", "Postavljamo web, prolazimo edukaciju i ostajemo dostupni nakon objave."],
];

export const websitePackages: WebsitePackage[] = [
  {
    name: "Web Basic",
    startingPrice: "500 €",
    description: "Profesionalna web stranica za manje obrte, samostalne djelatnosti i lokalna poslovanja.",
    bestFor: "Jasna i profesionalna početna prisutnost",
    inclusions: [
      "Do 5 jedinstvenih podstranica",
      "Responzivan dizajn prilagođen vizualnom identitetu",
      "Kontaktni obrazac, Google karta i društvene mreže",
      "Osnovna optimizacija brzine i tehnički SEO",
      "SEO naslovi, meta opisi i čitljivi URL-ovi",
      "Google Search Console i Google Analytics 4",
      "SSL, cookie obavijest i zaštita od neželjene pošte",
      "Postavljanje stranice na hosting",
    ],
    timeline: "2-4 tjedna",
    revisions: "1 runda",
    training: "30 minuta",
    support: "14 dana",
    featured: false,
  },
  {
    name: "Web Business",
    startingPrice: "850 €",
    description: "Kompletna poslovna stranica za tvrtke koje žele kvalitetnije predstaviti usluge i privlačiti nove klijente.",
    bestFor: "Tvrtke kojima web treba redovito donositi upite",
    inclusions: [
      "Sve iz paketa Web Basic i do 8 podstranica",
      "Detaljnija razrada strukture i individualna početna stranica",
      "Zasebne stranice za glavne usluge",
      "Blog ili novosti te galerija ili portfolio",
      "Do dva kontaktna obrasca",
      "Osnovno istraživanje ključnih riječi",
      "SEO optimizacija svih uključenih stranica",
      "Interno povezivanje i osnovni strukturirani podaci",
      "Naprednije mjerenje konverzija i Microsoft Clarity",
      "Optimizacija dostavljenih fotografija i brzine",
    ],
    timeline: "3-6 tjedana",
    revisions: "2 runde",
    training: "60 minuta",
    support: "30 dana",
    featured: true,
  },
  {
    name: "Web Premium",
    startingPrice: "1.300 €",
    description: "Prodajno usmjerena stranica za poslovanja kojima je web važan kanal dolaska do novih klijenata.",
    bestFor: "Ambiciozniji prodajni web i konkurentna tržišta",
    inclusions: [
      "Sve iz paketa Web Business i do 12 podstranica",
      "Potpuno prilagođen vizualni smjer i napredniji UX",
      "Prodajno strukturirana početna stranica",
      "Do dvije napredne stranice usluga ili landing stranice",
      "Napredni i višekoračni obrasci",
      "Blog, portfolio, reference ili studije slučaja",
      "Naprednije animacije i interakcije",
      "Detaljnije istraživanje ključnih riječi i konkurencije",
      "Napredna on-page SEO optimizacija",
      "Praćenje obrazaca, poziva i klikova te dodatna optimizacija performansi",
    ],
    timeline: "5-8 tjedana",
    revisions: "3 runde",
    training: "90 minuta",
    support: "30 dana prioritetno",
    featured: false,
  },
];

export const websiteTestimonials: Testimonial[] = testimonials;

export const websiteBenefits = [
  ["Izravna suradnja", "Razgovarate s osobom koja razumije projekt i donosi tehničke odluke."],
  ["Transparentan opseg", "Prije početka znate što paket uključuje, koliko traje i što utječe na cijenu."],
  ["SEO-aware razvoj", "Struktura, sadržaj i tehnička izvedba od početka uzimaju u obzir vidljivost."],
  ["Poslovni cilj prije efekta", "Dizajn mora podržati povjerenje, upite ili prodaju, ne samo izgledati atraktivno."],
  ["Podrška nakon objave", "Dobivate edukaciju, početno razdoblje podrške i mogućnost dugoročnog održavanja."],
];

export const websiteFaq = [
  { question: "Koliko košta izrada web stranice?", answer: "Web Basic počinje od 500 €, Web Business od 850 €, a Web Premium od 1.300 €. Konačna cijena ovisi o broju podstranica, sadržaju, funkcionalnostima, integracijama i roku." },
  { question: "Koliko traje izrada web stranice?", answer: "Web Basic obično traje 2-4 tjedna, Web Business 3-6 tjedana, a Web Premium 5-8 tjedana. Rok počinje nakon uplate predujma i dostave dogovorenih materijala." },
  { question: "Moram li imati pripremljene tekstove?", answer: "Tekstove možete dostaviti sami. Ako nisu spremni, možemo ponuditi uređivanje, pisanje i SEO pripremu sadržaja prema dodatnim stavkama iz cjenika." },
  { question: "Trebam li profesionalne fotografije?", answer: "Nisu obvezne, ali kvalitetne autentične fotografije često značajno poboljšavaju dojam. Dostavljene fotografije optimiziramo, dok profesionalno fotografiranje nije uključeno u paket." },
  { question: "Jesu li domena i hosting uključeni?", answer: "Pomoć pri registraciji domene i postavljanje na postojeći hosting uključeni su uz izradu. Trošak domene, hostinga i premium licenci obračunava se zasebno ako nije izričito naveden u ponudi." },
  { question: "Hoće li web biti optimiziran za Google?", answer: "Svaki paket uključuje tehničke SEO temelje, meta podatke i čitljive URL-ove. Opsežnije istraživanje, sadržaj i kontinuirana optimizacija dostupni su kroz SEO uslugu." },
  { question: "Koliko korekcija mogu tražiti?", answer: "Web Basic uključuje jednu, Business dvije, a Premium tri objedinjene runde korekcija. Nova funkcionalnost ili promjena odobrene strukture obračunava se zasebno." },
  { question: "Tko je vlasnik web stranice?", answer: "Nakon podmirenja ugovorenog iznosa dobivate dogovorene pristupe i vlasništvo nad isporučenim webom u okviru pisane ponude." },
  { question: "Mogu li samostalno uređivati sadržaj?", answer: "Da. Uključena edukacija prilagođena je paketu, a strukturu sadržaja postavljamo tako da su uobičajene izmjene razumljive i predvidive." },
  { question: "Pružate li podršku nakon objave?", answer: "Da. Svaki paket uključuje početno razdoblje tehničke podrške, a za redovita ažuriranja, sigurnosne kopije i izmjene dostupni su paketi održavanja." },
];
