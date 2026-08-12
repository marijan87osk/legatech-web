import { testimonials, type Testimonial } from "./client-testimonials";

export interface EcommerceProblem {
  problem: string;
  shortLabel: string;
  solution: string;
  outcome: string;
}

export interface ShoppingJourneyStep {
  title: string;
  shortLabel: string;
  customerNeed: string;
  shopResponse: string;
  businessValue: string;
}

export interface EcommerceProject {
  client: string;
  service: string;
  challenge: string;
  solution: string;
  result: string;
  resultLabel: string;
  image: string;
  imageAlt: string;
  href?: `/projekti/${string}`;
}

export interface EcommercePackage {
  name: string;
  startingPrice: string;
  description: string;
  bestFor: string;
  inclusions: string[];
  revisions: string;
  training: string;
  support: string;
  featured: boolean;
}

export const ecommerceAudience = [
  ["Prvi put pokrećete online prodaju", "Trebate jasan put od pripreme proizvoda do prve uspješne narudžbe."],
  ["Narudžbe još primate ručno", "Poruke, tablice i telefonske narudžbe oduzimaju vrijeme i povećavaju mogućnost pogreške."],
  ["Postojeći shop izgleda zastarjelo", "Trgovina više ne predstavlja kvalitetu ponude niti ostavlja dovoljno povjerenja prije plaćanja."],
  ["Kupnja na mobitelu je naporna", "Kategorije, proizvodi, košarica ili blagajna otežavaju kupnju na uređaju koji kupci najčešće koriste."],
  ["Administracija je prekomplicirana", "Upravljanje proizvodima, zalihama i narudžbama stvara nepotrebno operativno opterećenje."],
  ["Trebate naprednije integracije", "Plaćanje, dostava, računi ili vanjski poslovni sustavi trebaju raditi kao povezana cjelina."],
];

export const ecommerceProblems: EcommerceProblem[] = [
  {
    problem: "Kupci se gube u katalogu",
    shortLabel: "Katalog i navigacija",
    solution: "Kategorije, filtre i pretraživanje organiziramo prema načinu na koji kupci uspoređuju i biraju proizvode.",
    outcome: "Brži dolazak do pravog proizvoda",
  },
  {
    problem: "Mobilna kupnja traži previše truda",
    shortLabel: "Mobilna kupnja",
    solution: "Prioritet dajemo čitljivim informacijama, velikim dodirnim zonama i kratkom putu od proizvoda do dovršene narudžbe.",
    outcome: "Jednostavnija kupnja na manjem ekranu",
  },
  {
    problem: "Spore stranice proizvoda prekidaju kupnju",
    shortLabel: "Brzina",
    solution: "Optimiziramo fotografije, kod i učitavanje ključnog sadržaja kako bi pregledavanje trgovine ostalo brzo i stabilno.",
    outcome: "Manje čekanja i manje odustajanja",
  },
  {
    problem: "Košarica skriva važne informacije",
    shortLabel: "Košarica",
    solution: "Jasno prikazujemo proizvode, količine, popuste i očekivani trošak prije nego što kupac prijeđe na blagajnu.",
    outcome: "Više sigurnosti prije završetka kupnje",
  },
  {
    problem: "Blagajna ima previše koraka i nejasnoća",
    shortLabel: "Blagajna",
    solution: "Uklanjamo nepotrebna polja i jasno objašnjavamo plaćanje, dostavu, privatnost i završnu potvrdu narudžbe.",
    outcome: "Kraći i razumljiviji završetak kupnje",
  },
  {
    problem: "Plaćanje i dostava ne prate način poslovanja",
    shortLabel: "Plaćanje i dostava",
    solution: "Postavljamo dogovorene metode i pravila, a složenije pružatelje i dostavne sustave povezujemo kao dodatne integracije.",
    outcome: "Pouzdan proces od naplate do isporuke",
  },
  {
    problem: "Svaka izmjena proizvoda postaje tehnički zadatak",
    shortLabel: "Administracija",
    solution: "Strukturu proizvoda i varijacija postavljamo dosljedno te kroz edukaciju prolazimo svakodnevne administrativne zadatke.",
    outcome: "Samostalnije i sigurnije upravljanje trgovinom",
  },
];

export const ecommerceDeliverables = [
  { title: "Plan i struktura trgovine", text: "Ponudu, kupce i prodajni proces pretvaramo u jasan opseg, kategorije i funkcionalnosti.", detail: "Odluke prije razvoja" },
  { title: "Katalog i proizvodi", text: "Kategorije, varijacije, filteri i podaci o proizvodima dobivaju dosljednu strukturu.", detail: "Lakše pronalaženje i upravljanje" },
  { title: "Responzivna kupnja", text: "Ključne radnje prilagođavamo mobitelu, tabletu i računalu bez skrivenih prepreka.", detail: "Kupnja na svakom uređaju" },
  { title: "Košarica i blagajna", text: "Proces kupnje jasno prikazuje proizvode, cijenu, dostavu, plaćanje i potvrdu narudžbe.", detail: "Manje nejasnoća prije plaćanja" },
  { title: "Analitika, SEO i sigurnost", text: "Mjerenje prodaje, tehnički SEO, performanse i osnovna zaštita ulaze u temelj trgovine.", detail: "Spremno za mjerenje i rast" },
  { title: "Objava, edukacija i podrška", text: "Provodimo testnu kupnju, objavljujemo trgovinu i prolazimo upravljanje narudžbama i sadržajem.", detail: "Predaja bez nagađanja" },
];

export const catalogueMap = [
  {
    title: "Kategorije",
    text: "Grupe proizvoda prate način pretraživanja i usporedbe, a ne samo internu organizaciju skladišta.",
    children: ["Glavne kategorije", "Potkategorije", "Istaknute kolekcije"],
  },
  {
    title: "Proizvod",
    text: "Naziv, fotografije, opis, cijena, dostupnost i dostava odgovaraju na pitanja prije kupnje.",
    children: ["Jednostavni proizvodi", "Varijacije", "Povezani proizvodi"],
  },
  {
    title: "Pronalaženje",
    text: "Filteri i tražilica smanjuju broj koraka kada katalog postane veći ili složeniji.",
    children: ["Filteri", "Pretraživanje", "Sortiranje"],
  },
  {
    title: "Operativa",
    text: "Zalihe, statusi i narudžbe postavljaju se tako da svakodnevni rad ostane razumljiv.",
    children: ["Zalihe", "Narudžbe", "Statusi i e-mailovi"],
  },
];

export const shoppingJourney: ShoppingJourneyStep[] = [
  {
    title: "Kategorija",
    shortLabel: "Pronalazak",
    customerNeed: "Kupac želi brzo suziti izbor bez otvaranja desetaka proizvoda.",
    shopResponse: "Jasna navigacija, relevantni filtri i čitljiv pregled proizvoda.",
    businessValue: "Veća mogućnost da pravi proizvod uđe u uži izbor.",
  },
  {
    title: "Proizvod",
    shortLabel: "Odluka",
    customerNeed: "Prije dodavanja u košaricu kupac treba razumjeti vrijednost, cijenu, dostupnost i dostavu.",
    shopResponse: "Snažne fotografije, korisne informacije, jasne varijacije i vidljiva akcija kupnje.",
    businessValue: "Manje pitanja i sigurnija odluka o kupnji.",
  },
  {
    title: "Košarica",
    shortLabel: "Provjera",
    customerNeed: "Kupac želi potvrditi proizvode, količine, popuste i očekivani trošak.",
    shopResponse: "Pregledna košarica s mogućnošću jednostavne izmjene prije blagajne.",
    businessValue: "Manje iznenađenja i prekida prije završnog koraka.",
  },
  {
    title: "Blagajna",
    shortLabel: "Plaćanje",
    customerNeed: "Kupac želi sigurno završiti narudžbu bez nepotrebnih polja i nejasnih uvjeta.",
    shopResponse: "Kratak obrazac, jasna dostava, dostupna plaćanja i razumljiv sažetak narudžbe.",
    businessValue: "Veća vjerojatnost dovršene kupnje.",
  },
  {
    title: "Potvrda",
    shortLabel: "Povjerenje",
    customerNeed: "Nakon plaćanja kupac mora znati je li narudžba zaprimljena i što slijedi.",
    shopResponse: "Jasna potvrda, status narudžbe i pouzdane transakcijske e-mail poruke.",
    businessValue: "Manje upita podršci i bolji dojam nakon kupnje.",
  },
];

export const integrationGroups = [
  {
    title: "Plaćanje",
    scope: "Osnovno uključeno prema paketu",
    text: "Pouzeće, bankovna uplata i dogovoreni sustavi online plaćanja.",
    items: ["Kartično plaćanje", "Stripe", "PayPal", "KEKS Pay ili slični sustavi"],
  },
  {
    title: "Dostava",
    scope: "Pravila uključena, vanjske integracije dodatno",
    text: "Načini dostave, prag besplatne dostave i naprednija pravila prema lokaciji, težini ili vrijednosti.",
    items: ["Lokalno preuzimanje", "Dostavne službe", "Paketomati", "Automatske naljepnice"],
  },
  {
    title: "Računi i poslovni sustavi",
    scope: "Dodatno ugovorene integracije",
    text: "Povezivanje trgovine s procesima koji se nastavljaju nakon narudžbe.",
    items: ["Računi", "Fiskalizacija i eRačun", "Računovodstveni program", "ERP"],
  },
  {
    title: "Prodaja i automatizacija",
    scope: "Prema potrebama i paketu",
    text: "Funkcionalnosti koje podržavaju ponovnu kupnju, promocije i segmentirane ponude.",
    items: ["Kuponi", "Napuštena košarica", "Newsletter i CRM", "B2B cijene"],
  },
];

export const ecommerceSeoPoints = [
  ["Struktura kategorija", "Kategorije ciljaju jasne skupine proizvoda i povezuju se s relevantnim dijelovima kataloga."],
  ["SEO proizvoda", "Naslovi, opisi, fotografije i strukturirani podaci pomažu razumijevanju pojedinog proizvoda."],
  ["Tehnički SEO", "Indeksiranje, kanonske adrese, filteri i duplicirani sadržaj planiraju se prije nego katalog naraste."],
  ["Performanse", "Brže učitavanje podržava iskustvo kupnje i tehničku kvalitetu trgovine."],
  ["Interno povezivanje", "Kategorije, proizvodi, vodiči i povezane stavke grade razumljivu tematsku cjelinu."],
  ["Merchant Center", "Shop Business uključuje povezivanje s Google Merchant Centerom prema dostupnim podacima o proizvodima."],
];

export const ecommerceProjects: EcommerceProject[] = [
  {
    client: "KRIÉ",
    service: "Custom dvojezična web trgovina",
    challenge: "Zamijeniti postojeći shop novom trgovinom koja bolje predstavlja brend, kolekcije i međunarodnu prodaju.",
    solution: "Custom dizajn, migracija i unos proizvoda, hrvatska i engleska verzija, Monri WSPay te domaća i međunarodna dostava.",
    result: "Cjelovit shop",
    resultLabel: "na hrvatskom i engleskom jeziku",
    image: "/projects/krie-design/cover.webp",
    imageAlt: "Stvarni prikaz KRIÉ web trgovine s modnom kolekcijom uz more",
    href: "/projekti/krie-design",
  },
];

export const ecommerceProcess = [
  ["Ciljevi i katalog", "Upoznajemo ponudu, kupce, način prodaje i opseg proizvoda."],
  ["Struktura trgovine", "Dogovaramo kategorije, podatke, funkcionalnosti i potrebne materijale."],
  ["UX i dizajn", "Oblikujemo ključne točke kupovnog puta i vizualni smjer trgovine."],
  ["Razvoj", "Izrađujemo responzivan WooCommerce shop i dogovorene predloške."],
  ["Proizvodi i integracije", "Postavljamo uključene proizvode, varijacije i dogovorena povezivanja."],
  ["Plaćanje i dostava", "Konfiguriramo metode, pravila i transakcijske poruke."],
  ["Testna kupnja", "Provjeravamo katalog, košaricu, blagajnu, e-mailove, plaćanje i dostavu."],
  ["Objava i edukacija", "Objavljujemo trgovinu, prolazimo upravljanje i ostajemo dostupni za podršku."],
];

export const ecommercePackages: EcommercePackage[] = [
  {
    name: "Shop Start",
    startingPrice: "1.500 €",
    description: "Za manje trgovine koje žele započeti online prodaju s jednostavnim katalogom proizvoda.",
    bestFor: "Prvi web shop s jasnim osnovnim prodajnim procesom",
    inclusions: [
      "WooCommerce trgovina s do 20 jednostavnih proizvoda i 5 kategorija",
      "Početna stranica, kategorije, proizvodi, košarica, blagajna i korisnički račun",
      "Upravljanje zalihama, narudžbama, cijenama i poreznim pravilima",
      "Pouzeće, bankovna uplata i jedna osnovna integracija online plaćanja",
      "Do dva načina dostave i osnovni kuponi",
      "Automatske e-mail poruke kupcima i responzivan dizajn",
      "Osnovni SEO kategorija i proizvoda te Google Analytics",
      "Osnovno e-commerce mjerenje, brzina i sigurnosne postavke",
    ],
    revisions: "1 runda",
    training: "90 minuta",
    support: "30 dana",
    featured: false,
  },
  {
    name: "Shop Business",
    startingPrice: "2.200 €",
    description: "Za trgovine s većim brojem proizvoda, varijacijama i naprednijim mogućnostima prodaje.",
    bestFor: "Aktivna trgovina kojoj trebaju bolji katalog, promocije i mjerenje",
    inclusions: [
      "Sve iz paketa Shop Start, do 75 proizvoda i 12 kategorija",
      "Proizvodi s varijacijama, napredniji filteri i tražilica",
      "Do dva sustava plaćanja i tri načina dostave",
      "Besplatna dostava prema vrijednosti košarice i napredni kuponi",
      "Povezani proizvodi, liste želja i recenzije",
      "Prilagodba transakcijskih e-mailova i osnovni uvoz iz tablice",
      "Napredno e-commerce mjerenje i Google Merchant Center",
      "SEO glavnih kategorija i naprednija optimizacija brzine",
    ],
    revisions: "2 runde",
    training: "2 sata",
    support: "30 dana prioritetno",
    featured: true,
  },
  {
    name: "Shop Advanced",
    startingPrice: "3.300 €",
    description: "Za ozbiljnije trgovine koje trebaju veći katalog, napredne integracije i prilagođen prodajni proces.",
    bestFor: "Veći katalog, složenija pravila i povezivanje poslovnih sustava",
    inclusions: [
      "Sve iz paketa Shop Business i do 250 proizvoda putem pripremljenog uvoza",
      "Napredni proizvodi, varijacije i prilagođen prikaz kategorija i proizvoda",
      "Optimizirana košarica, blagajna, filtriranje i pretraživanje",
      "Automatizacija napuštene košarice i segmentirani popusti",
      "Napredna pravila dostave",
      "Priprema za višejezičnost i B2B prodaju",
      "Integracija jednog vanjskog sustava u opsegu do 8 radnih sati",
      "Napredna analitika, optimizacija konverzija i tehnički SEO",
    ],
    revisions: "3 runde",
    training: "3 sata",
    support: "60 dana prioritetno",
    featured: false,
  },
];

export const ecommercePriceFactors = [
  ["Broj proizvoda", "Veći katalog traži pripremu podataka, dosljednu strukturu i često automatiziran uvoz."],
  ["Složenost proizvoda", "Varijacije, personalizacija, pretplate i B2B cijene povećavaju opseg planiranja i testiranja."],
  ["Sadržaj i fotografije", "Unos, obrada fotografija i pisanje opisa ugovaraju se prema količini i pripremljenosti materijala."],
  ["Plaćanje i računi", "Svaki pružatelj ima vlastite tehničke uvjete, naknade, certifikate i licence."],
  ["Dostava", "Paketomati, kurirske službe i složena pravila dostave zahtijevaju dodatnu konfiguraciju ili integraciju."],
  ["Integracije", "Računovodstvo, ERP, skladište i drugi sustavi ovise o dostupnom API-ju i stvarnom opsegu povezivanja."],
  ["Migracija", "Prijenos proizvoda, kupaca i narudžbi ovisi o kvaliteti i strukturi postojećih podataka."],
  ["Jezici i funkcionalnosti", "Višejezičnost i funkcionalnosti po mjeri definiraju se kao zaseban dio ponude."],
];

export const ecommerceTestimonials: Testimonial[] = testimonials;

export const ecommerceBenefits = [
  ["Izravna suradnja", "Razgovarate s osobom koja razumije i dizajn kupovnog puta i tehničku izvedbu trgovine."],
  ["Jasan opseg", "Prije početka znate broj proizvoda, uključene metode, integracije, korekcije, edukaciju i podršku."],
  ["Mobilna kupnja kao prioritet", "Katalog, proizvod, košarica i blagajna planiraju se za uređaj koji kupci najčešće koriste."],
  ["SEO ugrađen u strukturu", "Kategorije, proizvodi, performanse i tehnički temelji nisu naknadni dodatak."],
  ["Edukacija i podrška", "Dobivate vrijeme za edukaciju i dogovoreno razdoblje podrške nakon objave."],
];

export const ecommerceFaq = [
  { question: "Koliko košta izrada web trgovine?", answer: "Shop Start počinje od 1.500 €, Shop Business od 2.200 €, a Shop Advanced od 3.300 €. Konačna cijena ovisi o proizvodima, plaćanju, dostavi, sadržaju, integracijama i funkcionalnostima." },
  { question: "Koliko traje izrada web trgovine?", answer: "Rok se određuje individualnom ponudom nakon pregleda kataloga, materijala, načina plaćanja, dostave i integracija. Rok počinje nakon predujma, dostave potrebnih materijala i potvrde strukture." },
  { question: "Zašto koristite WooCommerce?", answer: "WooCommerce je fleksibilan sustav za WordPress trgovine koji podržava proizvode, narudžbe, kupone, plaćanje, dostavu i velik broj poslovnih integracija. Konačna arhitektura uvijek ovisi o stvarnim potrebama trgovine." },
  { question: "Tko unosi proizvode?", answer: "Svaki paket uključuje dogovoreni broj proizvoda. Dodatni unos, priprema tablice, migracija, fotografije i SEO opisi obračunavaju se prema detaljnom cjeniku." },
  { question: "Moram li imati pripremljene fotografije i opise?", answer: "Klijent dostavlja podatke, opise i fotografije. Možemo dodatno ponuditi obradu fotografija, pisanje opisa i pripremu podataka za uvoz." },
  { question: "Koje načine plaćanja mogu ponuditi?", answer: "Paketi mogu uključivati pouzeće, bankovnu uplatu i dogovoreni broj online sustava plaćanja. Naknade, licence i uvjeti vanjskih pružatelja nisu uključeni u cijenu izrade." },
  { question: "Možete li povezati dostavnu službu ili paketomate?", answer: "Da, kada odabrani pružatelj omogućuje odgovarajuću integraciju. Povezivanje dostavne službe, paketomata i automatskih naljepnica obračunava se kao dodatna opcija." },
  { question: "Uključujete li fiskalizaciju, eRačun ili računovodstvo?", answer: "Takva povezivanja nisu dio osnovnog paketa. Mogu se ugovoriti zasebno nakon provjere sustava, dostupnih integracija i stvarnog opsega." },
  { question: "Hoće li trgovina biti optimizirana za Google?", answer: "Svi paketi uključuju osnovne SEO temelje, a viši paketi proširuju optimizaciju kategorija, mjerenje i tehnički SEO. Kontinuirani rast dostupan je kroz zasebnu SEO uslugu." },
  { question: "Što se događa nakon objave?", answer: "Paketi uključuju 30 ili 60 dana tehničke podrške. Za redovita ažuriranja, sigurnosne kopije, testne narudžbe i izmjene dostupan je paket održavanja web shopa." },
  { question: "Tko je vlasnik trgovine?", answer: "Nakon podmirenja ugovorenog iznosa dobivate dogovorene pristupe i vlasništvo nad isporučenom trgovinom u okviru pisane ponude." },
  { question: "Koji vanjski troškovi nisu uključeni?", answer: "Nisu uključene naknade za kartično plaćanje, licence, pretplate, domena, hosting, premium dodaci, profesionalne fotografije, prijevodi i drugi troškovi vanjskih pružatelja." },
];
