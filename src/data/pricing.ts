export interface PricePackage {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  included: string[];
  facts?: { label: string; value: string }[];
  note?: string;
  featured?: boolean;
}

export interface AddonGroup {
  title: string;
  items: { name: string; price: string }[];
  note?: string;
}

export interface PricingService {
  id: string;
  title: string;
  intro: string;
  packages: PricePackage[];
  addons: AddonGroup[];
}

export const pricingServices: PricingService[] = [
  {
    id: "web-stranice",
    title: "Izrada web stranica",
    intro: "Od jednostavne prezentacijske stranice do prodajno usmjerenog weba s naprednim SEO temeljima.",
    packages: [
      {
        name: "Web Basic",
        price: "500 €",
        description: "Za manje obrte, samostalne djelatnosti i lokalna poslovanja.",
        included: ["Do 5 jedinstvenih podstranica", "Responzivan dizajn prema vizualnom identitetu", "Kontakt obrazac, Google karta i društvene mreže", "Osnovna optimizacija brzine i tehnički SEO", "SEO naslovi, meta opisi i čitljivi URL-ovi", "Google Search Console i Analytics 4", "SSL, cookie obavijest i zaštita od neželjene pošte", "Postavljanje na hosting i 30 minuta edukacije"],
        facts: [{ label: "Rok", value: "2-4 tjedna" }, { label: "Korekcije", value: "1 runda" }, { label: "Podrška", value: "14 dana" }],
        note: "Tekstovi, profesionalne fotografije, prijevodi, premium licence, domena i hosting nisu uključeni.",
      },
      {
        name: "Web Business",
        price: "850 €",
        description: "Za tvrtke koje žele kvalitetnije predstaviti usluge i privlačiti nove klijente.",
        included: ["Do 8 jedinstvenih podstranica", "Sve iz paketa Web Basic", "Individualno dizajnirana početna stranica", "Zasebne stranice glavnih usluga", "Blog ili novosti te galerija ili portfolio", "Do dva kontaktna obrasca", "Osnovno istraživanje ključnih riječi", "SEO optimizacija svih uključenih stranica", "Strukturirani podaci i interno povezivanje", "Naprednije mjerenje konverzija i Microsoft Clarity", "Optimizacija dostavljenih fotografija i brzine", "60 minuta edukacije"],
        facts: [{ label: "Rok", value: "3-6 tjedana" }, { label: "Korekcije", value: "2 runde" }, { label: "Podrška", value: "30 dana" }],
        featured: true,
      },
      {
        name: "Web Premium",
        price: "1.300 €",
        description: "Za poslovanja kojima web predstavlja važan kanal dolaska do novih klijenata.",
        included: ["Do 12 jedinstvenih podstranica", "Sve iz paketa Web Business", "Potpuno prilagođen vizualni smjer i napredniji UX", "Prodajno strukturirana početna stranica", "Do dvije napredne stranice usluga ili landing stranice", "Napredni i višekoračni obrasci", "Blog, portfolio, reference ili studije slučaja", "Naprednije animacije i interakcije", "Detaljnije istraživanje ključnih riječi i konkurencije", "Napredna on-page SEO optimizacija", "Praćenje obrazaca, poziva i klikova", "Dodatna optimizacija performansi i 90 minuta edukacije"],
        facts: [{ label: "Rok", value: "5-8 tjedana" }, { label: "Korekcije", value: "3 runde" }, { label: "Podrška", value: "30 dana prioritetno" }],
      },
    ],
    addons: [
      { title: "Dodatne stranice i sadržaj", items: [{ name: "Jednostavna dodatna podstranica", price: "od 60 €" }, { name: "Standardna poslovna podstranica", price: "od 80 €" }, { name: "Detaljna stranica usluge", price: "od 120 €" }, { name: "Prodajna landing stranica", price: "od 200 €" }, { name: "Napredna landing stranica", price: "od 320 €" }, { name: "Cjenik ili tablični prikaz", price: "od 90 €" }, { name: "FAQ stranica", price: "od 70 €" }, { name: "Portfolio ili galerija", price: "od 120 €" }, { name: "Studija slučaja", price: "od 150 €" }, { name: "Unos dostavljenog sadržaja", price: "40 € / sat" }] },
      { title: "Pisanje i uređivanje tekstova", items: [{ name: "Lektura dostavljenog teksta", price: "od 25 € / stranica" }, { name: "Kraći tekst za podstranicu", price: "od 50 €" }, { name: "Poslovni tekst za podstranicu", price: "od 80 €" }, { name: "SEO tekst za uslugu", price: "od 120 €" }, { name: "Prodajni tekst za landing stranicu", price: "od 180 €" }, { name: "Blog članak do 1.000 riječi", price: "od 120 €" }, { name: "Stručni članak do 2.000 riječi", price: "od 220 €" }] },
      { title: "Višejezičnost", items: [{ name: "Tehničko postavljanje višejezičnosti", price: "od 120 €" }, { name: "Dodatni jezik, web do 5 podstranica", price: "od 220 €" }, { name: "Dodatni jezik, web do 10 podstranica", price: "od 380 €" }, { name: "Dodatni jezik, web do 15 podstranica", price: "od 540 €" }, { name: "Dodatna prevedena podstranica", price: "od 35 €" }, { name: "SEO podešavanje dodatnog jezika", price: "od 90 €" }], note: "Cijena uključuje tehničko postavljanje i unos dostavljenog prijevoda. Profesionalni prijevod nije uključen." },
      { title: "Obrasci i funkcionalnosti", items: [{ name: "Dodatni jednostavni obrazac", price: "od 50 €" }, { name: "Napredni kontaktni obrazac", price: "od 90 €" }, { name: "Višekoračni obrazac", price: "od 180 €" }, { name: "Kalkulator cijene ili troška", price: "od 280 €" }, { name: "Sustav za rezervaciju termina", price: "od 280 €" }, { name: "Napredna galerija", price: "od 80 €" }, { name: "Filtriranje projekata", price: "od 150 €" }, { name: "Područje za registrirane korisnike", price: "od 350 €" }, { name: "Povezivanje s vanjskim API sustavom", price: "od 300 €" }, { name: "Funkcionalnost po mjeri", price: "40 € / sat" }] },
      { title: "Newsletter i automatizacija", items: [{ name: "Povezivanje s newsletter platformom", price: "od 80 €" }, { name: "Obrazac za prijavu", price: "od 50 €" }, { name: "Predložak newslettera", price: "od 120 €" }, { name: "Osnovna automatizacija", price: "od 150 €" }, { name: "Povezivanje obrasca s CRM sustavom", price: "od 150 €" }, { name: "SMTP konfiguracija", price: "od 50 €" }] },
      { title: "Analitika i praćenje", items: [{ name: "Google Analytics 4", price: "70 €" }, { name: "Google Search Console", price: "50 €" }, { name: "Microsoft Clarity", price: "40 €" }, { name: "Osnovno praćenje konverzija", price: "od 80 €" }, { name: "Napredno praćenje obrazaca, poziva i klikova", price: "od 150 €" }, { name: "Google Tag Manager", price: "od 100 €" }] },
      { title: "Redizajn i migracija", items: [{ name: "Manji vizualni redizajn", price: "od 350 €" }, { name: "Kompletan redizajn", price: "od 650 €" }, { name: "Migracija WordPress stranice", price: "od 120 €" }, { name: "Migracija sadržaja", price: "40 € / sat" }, { name: "Prijenos do 10 podstranica", price: "od 200 €" }, { name: "Zadržavanje URL-ova i SEO preusmjerenja", price: "od 120 €" }, { name: "301 preusmjerenje", price: "od 8 € / adresa" }] },
    ],
  },
  {
    id: "web-trgovine",
    title: "Izrada web trgovina",
    intro: "WooCommerce trgovine s jasnom kupnjom, pouzdanim plaćanjem i administracijom koju možete koristiti.",
    packages: [
      { name: "Shop Start", price: "1.500 €", description: "Za manje trgovine koje prvi put pokreću online prodaju.", included: ["Do 20 jednostavnih proizvoda i 5 kategorija", "Košarica, blagajna i korisnički račun", "Zalihe, narudžbe, porezna pravila i kuponi", "Pouzeće, bankovna uplata i jedna online naplata", "Do dva načina dostave", "Responzivan dizajn i osnovni SEO", "Analytics i osnovno e-commerce mjerenje", "Sigurnosne postavke i optimizacija brzine", "90 minuta edukacije"], facts: [{ label: "Korekcije", value: "1 runda" }, { label: "Podrška", value: "30 dana" }] },
      { name: "Shop Business", price: "2.200 €", description: "Za trgovine s većim katalogom, varijacijama i naprednijom prodajom.", included: ["Sve iz paketa Shop Start", "Do 75 proizvoda i 12 kategorija", "Varijacije, napredni filteri i tražilica", "Do dva sustava plaćanja i tri načina dostave", "Napredni kuponi, liste želja i recenzije", "Povezani i preporučeni proizvodi", "Osnovni uvoz proizvoda iz tablice", "Google Merchant Center i napredno e-commerce mjerenje", "SEO glavnih kategorija i optimizacija brzine", "Dva sata edukacije"], facts: [{ label: "Korekcije", value: "2 runde" }, { label: "Podrška", value: "30 dana prioritetno" }], featured: true },
      { name: "Shop Advanced", price: "3.300 €", description: "Za veće kataloge, napredne integracije i prilagođen prodajni proces.", included: ["Sve iz paketa Shop Business", "Do 250 proizvoda putem pripremljenog uvoza", "Prilagođen prikaz kategorija i proizvoda", "Optimizirana košarica i blagajna", "Napredno filtriranje i pretraživanje", "Automatizacija napuštene košarice", "Segmentirani popusti i napredna dostava", "Priprema za višejezičnost i B2B prodaju", "Jedna vanjska integracija do 8 radnih sati", "Napredna analitika, CRO i tehnički SEO", "Tri sata edukacije"], facts: [{ label: "Korekcije", value: "3 runde" }, { label: "Podrška", value: "60 dana prioritetno" }] },
    ],
    addons: [
      { title: "Proizvodi i kategorije", items: [{ name: "Unos jednostavnog proizvoda", price: "od 4 €" }, { name: "Proizvod s varijacijama", price: "od 7 €" }, { name: "Složeni proizvod", price: "od 12 €" }, { name: "Masovni uvoz", price: "od 120 €" }, { name: "Migracija proizvoda", price: "od 280 €" }, { name: "Migracija kupaca i narudžbi", price: "od 280 €" }, { name: "SEO opis proizvoda", price: "od 30 €" }] },
      { title: "Plaćanje i računi", items: [{ name: "Dodatna kartična integracija", price: "od 150 €" }, { name: "Stripe", price: "od 150 €" }, { name: "PayPal", price: "od 100 €" }, { name: "KEKS Pay ili slično", price: "od 150 €" }, { name: "Vanjski sustav za račune", price: "od 280 €" }, { name: "Fiskalizacija ili eRačun", price: "od 380 €" }, { name: "Računovodstveni program", price: "od 420 €" }, { name: "Napredna ERP integracija", price: "na upit" }] },
      { title: "Dostava", items: [{ name: "Dodatni način dostave", price: "od 50 €" }, { name: "Dostava prema težini ili vrijednosti", price: "od 100 €" }, { name: "Dostava prema poštanskom broju", price: "od 120 €" }, { name: "Paketomati", price: "od 200 €" }, { name: "Povezivanje s dostavnom službom", price: "od 250 €" }, { name: "Automatske naljepnice", price: "od 300 €" }] },
      { title: "Prodajne funkcionalnosti", items: [{ name: "Lista želja", price: "od 70 €" }, { name: "Usporedba proizvoda", price: "od 100 €" }, { name: "Napredni filteri", price: "od 150 €" }, { name: "Personalizirani proizvodi", price: "od 200 €" }, { name: "Poklon kartice", price: "od 150 €" }, { name: "Bodovi vjernosti", price: "od 200 €" }, { name: "Pretplatnički proizvodi", price: "od 300 €" }, { name: "B2B cijene i grupe", price: "od 380 €" }, { name: "Napuštena košarica", price: "od 150 €" }, { name: "Dodatni jezik", price: "od 490 €" }] },
    ],
  },
  {
    id: "seo",
    title: "SEO optimizacija",
    intro: "Kontinuiran rad na organskoj vidljivosti, relevantnom prometu i broju kvalitetnih upita.",
    packages: [
      { name: "SEO Local", price: "290 €", cadence: "mjesečno", description: "Za lokalne obrte i manje tvrtke koje žele biti vidljivije u svojem gradu.", included: ["Praćenje 5-10 ključnih riječi", "Analiza lokalnih konkurenata", "Optimizacija Google Business profila", "Optimizacija jedne stranice mjesečno", "Meta podaci, interno povezivanje i tehničke provjere", "Jedna Google Business objava mjesečno", "Mjesečni izvještaj i sastanak do 30 minuta"], facts: [{ label: "Početna priprema", value: "od 150 €" }] },
      { name: "SEO Growth", price: "490 €", cadence: "mjesečno", description: "Za tvrtke koje kontinuirano šire organski promet i ciljaju više usluga.", included: ["Sve iz paketa SEO Local", "Praćenje 15-30 ključnih riječi", "Sadržajni plan i detaljnija analiza konkurencije", "Optimizacija do dvije stranice mjesečno", "Jedan SEO sadržaj do 1.000 riječi mjesečno", "Jedan sat tehničkih SEO zahvata", "Strukturirani podaci i praćenje konverzija", "Mjesečni izvještaj i sastanak do 45 minuta"], facts: [{ label: "Početna priprema", value: "od 250 €" }], featured: true },
      { name: "SEO Authority", price: "790 €", cadence: "mjesečno", description: "Za konkurentne djelatnosti i poslovanja kojima je organski promet važan kanal.", included: ["Sve iz paketa SEO Growth", "Praćenje 30-60 ključnih riječi", "Analiza tržišta i razvoj tematskog autoriteta", "Dva nova SEO sadržaja mjesečno", "Optimizacija do tri postojeće stranice", "Do tri sata tehničkih SEO zahvata", "Analiza povratnih poveznica i digital PR priprema", "CRO preporuke i strateški sastanak do 60 minuta"], facts: [{ label: "Početna priprema", value: "od 400 €" }] },
    ],
    addons: [{ title: "Jednokratne SEO usluge", items: [{ name: "Osnovni SEO pregled", price: "od 150 €" }, { name: "SEO audit do 20 stranica", price: "od 300 €" }, { name: "SEO audit većeg weba", price: "od 550 €" }, { name: "SEO audit web trgovine", price: "od 650 €" }, { name: "Istraživanje ključnih riječi", price: "od 150 €" }, { name: "Analiza konkurenata", price: "od 120 €" }, { name: "SEO strategija za šest mjeseci", price: "od 300 €" }, { name: "Tehnička SEO optimizacija", price: "od 220 €" }, { name: "Optimizacija stranice usluge", price: "od 90 €" }, { name: "SEO migracija i preusmjerenja", price: "od 200 €" }, { name: "Google Business profil", price: "od 150 €" }, { name: "Analiza pada organskog prometa", price: "od 200 €" }], note: "SEO ne uključuje niti može jamčiti određenu poziciju u rezultatima pretraživanja." }],
  },
  {
    id: "odrzavanje",
    title: "Održavanje web stranica",
    intro: "Ažuriranja, sigurnosne kopije, tehničke provjere i podrška kada je potrebna.",
    packages: [
      { name: "Care Basic", price: "35 €", cadence: "mjesečno", description: "Za jednostavne prezentacijske stranice koje se rijetko mijenjaju.", included: ["Mjesečno ažuriranje sustava, teme i dodataka", "Osnovna provjera funkcionalnosti i sigurnosti", "Provjera dostupnosti i kontakt obrasca", "Vanjska sigurnosna kopija jednom mjesečno", "Podrška putem e-maila"], facts: [{ label: "Reakcija", value: "do 3 radna dana" }, { label: "Godišnje", value: "350 €" }] },
      { name: "Care Plus", price: "59 €", cadence: "mjesečno", description: "Za poslovne webove koji redovito primaju upite i povremeno mijenjaju sadržaj.", included: ["Sve iz Care Basic", "Ažuriranja dva puta mjesečno", "Sigurnosni backup najmanje jednom tjedno", "Napredniji sigurnosni nadzor", "Provjera poveznica, obrazaca i performansi", "30 minuta sadržajnih izmjena mjesečno"], facts: [{ label: "Reakcija", value: "do 2 radna dana" }, { label: "Godišnje", value: "590 €" }], featured: true },
      { name: "Care Business", price: "99 €", cadence: "mjesečno", description: "Za važne poslovne stranice, aktivne kampanje i redovite nadogradnje.", included: ["Sve iz Care Plus", "Tjedna provjera ažuriranja", "Dnevne sigurnosne kopije", "Testiranje većih ažuriranja prije objave", "Napredni sigurnosni monitoring", "Provjera performansi, analitike i konverzija", "60 minuta sadržajnih ili tehničkih izmjena", "Mjesečni izvještaj i prioritetna podrška"], facts: [{ label: "Reakcija", value: "do 1 radni dan" }, { label: "Godišnje", value: "990 €" }] },
      { name: "Održavanje web shopa", price: "129 €", cadence: "mjesečno", description: "Za WooCommerce trgovine kojima je prodajni proces svakodnevno važan.", included: ["Tjedna ažuriranja i dnevne sigurnosne kopije", "Sigurnosni monitoring", "Testna narudžba i provjera blagajne", "Provjera plaćanja, dostave i e-mailova", "Provjera performansi i optimizacija baze", "90 minuta tehničkih ili sadržajnih izmjena", "Prioritetna podrška"], facts: [{ label: "Reakcija", value: "do 1 radni dan" }, { label: "Godišnje", value: "od 1.290 €" }] },
    ],
    addons: [{ title: "Pojedinačne usluge održavanja", items: [{ name: "Standardni radni sat", price: "40 €" }, { name: "Prioritetni radni sat", price: "55 €" }, { name: "Minimalni pojedinačni zahvat", price: "25 €" }, { name: "Ažuriranje WordPress sustava", price: "od 50 €" }, { name: "Sigurnosni pregled", price: "od 70 €" }, { name: "Uklanjanje zlonamjernog koda", price: "od 200 €" }, { name: "Oporavak hakirane stranice", price: "od 300 €" }, { name: "Vraćanje iz sigurnosne kopije", price: "od 70 €" }, { name: "Optimizacija brzine", price: "od 150 €" }, { name: "Popravak kontakt obrasca", price: "od 50 €" }, { name: "Problem sa slanjem e-pošte", price: "od 70 €" }, { name: "Hitna intervencija izvan radnog vremena", price: "od 80 €" }] }],
  },
];

export const hostingItems = [
  ["Pomoć pri registraciji domene", "uključena uz izradu"], ["Postavljanje na postojeći hosting", "uključeno uz izradu"], ["Samostalno postavljanje hostinga", "od 50 €"], ["Upravljani hosting za prezentacijsku stranicu", "od 150 € godišnje"], ["Upravljani hosting za zahtjevniju stranicu", "od 220 € godišnje"], ["Upravljani hosting za web trgovinu", "od 320 € godišnje"], ["Migracija na novi hosting", "od 120 €"], ["Poslovna e-mail adresa", "od 25 € po adresi"], ["Premium teme i licence", "prema stvarnom trošku"],
];

export const cooperationTerms = [
  { title: "Materijali", body: "Prije početka klijent dostavlja logotip, tekstove, fotografije, kontaktne podatke, podatke o uslugama ili proizvodima te potrebne pristupe. Priprema nedostajućih materijala obračunava se prema cjeniku." },
  { title: "Korekcije", body: "Jedna runda znači objedinjeni popis manjih izmjena odobrenog dizajna i sadržaja. Nova funkcionalnost ili promjena odobrene strukture nije korekcija. Dodatne korekcije naplaćuju se 40 € po satu." },
  { title: "Plaćanje", body: "Za projekte do 2.500 € plaća se 50% prije početka i 50% prije objave. Za veće projekte moguće je 40% prije početka, 30% nakon odobrenja dizajna i 30% prije objave." },
  { title: "Rokovi", body: "Rok počinje nakon uplate predujma, dostave materijala i pristupa te potvrde strukture. Kašnjenje materijala ili potvrda pomiče završni rok." },
  { title: "Ubrzana izrada", body: "Prioritetna ili ubrzana izrada može povećati cijenu 20-35%, ovisno o dostupnosti i traženom roku." },
  { title: "Vanjski troškovi", body: "Domena, hosting, premium licence, pretplate vanjskih servisa, provizije, prijevodi, fotografiranje, pravni dokumenti, oglasi i medijski prostor nisu uključeni ako nisu izričito navedeni." },
  { title: "Jamstvo", body: "Nakon objave otklanjaju se tehničke pogreške unutar ugovorenog opsega. Jamstvo ne pokriva izmjene klijenta ili drugih izvođača, vanjske servise, hosting, licence ni nove zahtjeve." },
  { title: "Konačna ponuda", body: "Sve cijene su informativne početne cijene. Prije rada dobivate pisanu ponudu s jasnim opsegom, cijenom i rokovima." },
];
