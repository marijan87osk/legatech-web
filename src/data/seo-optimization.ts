import { testimonials, type Testimonial } from "./client-testimonials";
import { balazProject, barisicPlastProject, ducijaProject } from "./projects";

export interface SeoProblem {
  problem: string;
  shortLabel: string;
  solution: string;
  outcome: string;
}

export interface SeoProofProject {
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

export interface SeoPackage {
  name: string;
  startingPrice: string;
  setupPrice: string;
  description: string;
  bestFor: string;
  inclusions: string[];
  meeting: string;
  featured: boolean;
}

export const seoAudience = [
  ["Ne pronalaze vas na Googleu", "Konkurenti se pojavljuju za važne pretrage dok je vaš web teško pronaći."],
  ["Organski promet je slab", "Web postoji, ali ne privlači dovoljno ljudi koji aktivno traže vaše usluge."],
  ["Dolaze pogrešni upiti", "Sadržaj cilja preširoke ili pogrešne pojmove pa posjete rijetko postaju kvalitetni kontakti."],
  ["Lokalna konkurencija vas prestiže", "Vaša lokacija, Google Business profil i lokalne stranice nisu dovoljno povezani."],
  ["Previše ovisite o oglasima", "Svaki prekid kampanje odmah zaustavlja dolazak novih posjetitelja i upita."],
  ["Tržište postaje konkurentnije", "Bez jasne SEO strategije novi sadržaj i tehničke dorade rade odvojeno i bez prioriteta."],
];

export const seoProblems: SeoProblem[] = [
  {
    problem: "Ciljate pojmove koje vaši kupci ne koriste",
    shortLabel: "Ključne riječi",
    solution: "Istražujemo način na koji kupci stvarno traže uslugu, procjenjujemo namjeru i povezujemo svaku važnu temu s odgovarajućom stranicom.",
    outcome: "Relevantniji posjetitelji i kvalitetniji upiti",
  },
  {
    problem: "Sadržaj ne odgovara na pitanja prije odluke",
    shortLabel: "Sadržaj",
    solution: "Uređujemo postojeće stranice i planiramo novi sadržaj koji jasno objašnjava uslugu, gradi povjerenje i vodi prema kontaktu.",
    outcome: "Više razloga da posjetitelj ostane i javi se",
  },
  {
    problem: "Tehničke greške otežavaju pretraživanje weba",
    shortLabel: "Tehnički SEO",
    solution: "Provjeravamo brzinu, statusne kodove, kanonske adrese, strukturirane podatke i druge tehničke temelje koji utječu na razumijevanje weba.",
    outcome: "Pouzdanija osnova za indeksiranje i rast",
  },
  {
    problem: "Struktura weba skriva važne usluge",
    shortLabel: "Struktura",
    solution: "Preuređujemo hijerarhiju stranica i interno povezivanje kako bi korisnici i tražilice lakše razumjeli glavne teme i odnose među njima.",
    outcome: "Jasniji put do važne stranice i upita",
  },
  {
    problem: "Važne stranice nisu pravilno indeksirane",
    shortLabel: "Indeksiranje",
    solution: "Provjeravamo što Google može pronaći i indeksirati, uklanjamo tehničke prepreke te uređujemo sitemap i pravila indeksiranja.",
    outcome: "Važan sadržaj postaje dostupan pretraživaču",
  },
  {
    problem: "Lokalni kupci vas ne vide u svojoj blizini",
    shortLabel: "Lokalna vidljivost",
    solution: "Usklađujemo Google Business profil, lokalne pojmove, podatke o poslovanju i lokacijske stranice s načinom na koji kupci traže uslugu.",
    outcome: "Veća prisutnost u relevantnim lokalnim pretragama",
  },
];

export const seoActivities = [
  {
    title: "Smjer i prilike",
    items: ["SEO analiza", "Istraživanje ključnih riječi", "Analiza konkurenata"],
    benefit: "Znamo gdje postoji realna prilika i kojim redom treba raditi.",
  },
  {
    title: "Tehnički temelji",
    items: ["Tehnički SEO", "Indeksiranje", "Brzina i stabilnost"],
    benefit: "Web ne gubi potencijal zbog problema ispod površine.",
  },
  {
    title: "Stranice i sadržaj",
    items: ["On-page optimizacija", "Uređivanje sadržaja", "Interno povezivanje"],
    benefit: "Svaka važna stranica ima jasnu temu i poslovni zadatak.",
  },
  {
    title: "Lokalna vidljivost i autoritet",
    items: ["Lokalni SEO", "Google Business profil", "Analiza povratnih poveznica"],
    benefit: "Poslovanje gradi relevantnost tamo gdje ga kupci traže.",
  },
  {
    title: "Mjerenje i odluke",
    items: ["Praćenje pozicija", "Mjerenje konverzija", "Razumljivi izvještaji"],
    benefit: "Sljedeći potez temelji se na podacima, a ne pretpostavci.",
  },
];

export const seoAuditChecks = [
  ["Tehničko stanje", "Greške, brzina, mobilni prikaz, statusni kodovi i strukturirani podaci."],
  ["Indeksiranje", "Koje stranice Google pronalazi, preskače ili pogrešno odabire."],
  ["Postojeće pozicije", "Za koje pojmove web već ima vidljivost i gdje postoji prostor za pomak."],
  ["Ključne riječi", "Relevantnost, namjera, konkurencija i veza s konkretnom uslugom."],
  ["Sadržaj", "Pokrivenost tema, kvaliteta objašnjenja i usklađenost s potrebom kupca."],
  ["Konkurenti", "Što bolje pokrivaju i koje prilike ostavljaju otvorenima."],
  ["Struktura weba", "Hijerarhija, URL adrese i interno povezivanje važnih stranica."],
];

export const localSeoSteps = [
  ["Google Business profil", "Točni podaci, kategorije, usluge, fotografije i redovite objave."],
  ["Google Karte", "Usklađeni lokalni signali koji olakšavaju povezivanje poslovanja s područjem usluge."],
  ["Lokalne pretrage", "Pojmovi koji spajaju konkretnu uslugu s gradom, kvartom ili područjem rada."],
  ["Recenzije i povjerenje", "Dosljedan proces prikupljanja stvarnih recenzija i odgovaranja korisnicima."],
  ["Lokacijske stranice", "Korisne stranice za područja koja stvarno pokrivate, bez umnožavanja tankog sadržaja."],
];

export const seoTimeline = [
  {
    period: "Prvih 30 dana",
    title: "Postavljamo dijagnozu",
    text: "Analiziramo stanje, mjerimo početnu poziciju i dogovaramo prioritete s najvećim učinkom.",
  },
  {
    period: "2-3 mjeseca",
    title: "Uklanjamo prepreke",
    text: "Provode se tehničke dorade, uređuju glavne stranice i postavlja sadržajni smjer.",
  },
  {
    period: "4-6 mjeseci",
    title: "Vidimo obrazac rasta",
    text: "Pratimo promjene u vidljivosti, organskim posjetima i upitima te širimo ono što pokazuje potencijal.",
  },
  {
    period: "Kontinuirano",
    title: "Gradimo prednost",
    text: "Nove teme, konkurencija i ponašanje kupaca traže redovito mjerenje i prilagodbu prioriteta.",
  },
];

export const seoProjects: SeoProofProject[] = [
  {
    client: ducijaProject.client,
    service: "SEO optimizacija i lokalna vidljivost",
    challenge: "Izgraditi lokalnu organsku vidljivost za potpuno novi web i dovesti relevantne posjetitelje do jasnog puta prema upitu.",
    solution: "Struktura, sadržaj i tehnički SEO povezani su s ponudom najma šatora za Osijek i okolicu, a razvoj se nastavlja nakon objave.",
    result: ducijaProject.result.value,
    resultLabel: ducijaProject.result.label,
    image: ducijaProject.image,
    imageAlt: ducijaProject.imageAlt,
    href: ducijaProject.href,
    mock: false,
    verified: true,
  },
  {
    client: barisicPlastProject.client,
    service: "SEO optimizacija i početna Google Ads kampanja",
    challenge: "Pokrenuti početni promet za novi web i zatim izgraditi dugoročnu organsku vidljivost za plastifikaciju metala.",
    solution: "Početna Google Ads kampanja osigurala je prve posjete, dok su SEO struktura i sadržaj postupno preuzeli glavni dio vidljivosti.",
    result: "Organski kanal",
    resultLabel: "snažne posjete i redovite upite putem weba",
    image: barisicPlastProject.image,
    imageAlt: barisicPlastProject.imageAlt,
    href: barisicPlastProject.href,
    mock: false,
    verified: true,
  },
  {
    client: balazProject.client,
    service: balazProject.serviceLabel,
    challenge: balazProject.challenge,
    solution: balazProject.solution,
    result: balazProject.result.value,
    resultLabel: balazProject.result.label,
    image: balazProject.image,
    imageAlt: balazProject.imageAlt,
    href: balazProject.href,
    mock: false,
    verified: true,
  },
];

export const seoProcess = [
  ["Analiza", "Utvrđujemo početno stanje i poslovno važne prilike."],
  ["Strategija", "Prioritete povezujemo s uslugama, kupcima i konkurencijom."],
  ["Tehničke dorade", "Uklanjamo prepreke indeksiranju, brzini i razumijevanju weba."],
  ["Sadržaj", "Uređujemo postojeće stranice i planiramo nove korisne teme."],
  ["Autoritet", "Procjenjujemo signale povjerenja i prilike za kvalitetne poveznice."],
  ["Mjerenje", "Pratimo vidljivost, organski promet i poslovno važne radnje."],
  ["Nova optimizacija", "Rezultate pretvaramo u sljedeći prioritet i novi ciklus rada."],
];

export const seoEngagements = [
  {
    title: "SEO audit",
    label: "Jednokratna dijagnoza",
    text: "Detaljan pregled problema i prilika za poslovanje koje treba jasan prioritetni plan prije ulaganja.",
    bestFor: "Kada ne znate zašto vidljivost pada ili odakle početi.",
  },
  {
    title: "Pojedinačna optimizacija",
    label: "Ciljani zahvat",
    text: "Optimizacija jedne stranice, tehničkog problema ili jasno dogovorenog SEO zadatka.",
    bestFor: "Kada je problem već poznat i opseg se može precizno definirati.",
  },
  {
    title: "Mjesečni SEO",
    label: "Kontinuirani rast",
    text: "Redovita kombinacija tehničkih dorada, sadržaja, lokalne vidljivosti, mjerenja i novih prioriteta.",
    bestFor: "Kada organski promet treba postati pouzdan poslovni kanal.",
  },
];

export const seoPackages: SeoPackage[] = [
  {
    name: "SEO Local",
    startingPrice: "290 € mjesečno",
    setupPrice: "od 150 €",
    description: "Za lokalne obrte i manje tvrtke koje žele biti vidljivije u svojem gradu i okolici.",
    bestFor: "Lokalna usluga i jasno definirano područje rada",
    inclusions: [
      "Početni pregled web stranice",
      "Praćenje 5-10 ključnih riječi",
      "Osnovna analiza lokalnih konkurenata",
      "Optimizacija Google Business profila",
      "Optimizacija jedne postojeće stranice mjesečno",
      "Meta podaci, interno povezivanje i tehničke provjere",
      "Jedna Google Business objava mjesečno",
      "Praćenje organskog prometa i mjesečni izvještaj",
    ],
    meeting: "do 30 minuta mjesečno",
    featured: false,
  },
  {
    name: "SEO Growth",
    startingPrice: "490 € mjesečno",
    setupPrice: "od 250 €",
    description: "Za tvrtke koje žele širiti organski promet i rangirati za veći broj usluga i ključnih riječi.",
    bestFor: "Kontinuirano širenje vidljivosti, sadržaja i upita",
    inclusions: [
      "Sve iz paketa SEO Local",
      "Praćenje 15-30 ključnih riječi",
      "Detaljnija analiza konkurencije i sadržajni plan",
      "Optimizacija do dvije postojeće stranice mjesečno",
      "Jedan novi SEO sadržaj do 1.000 riječi mjesečno",
      "Tehnički SEO zahvati do jednog sata mjesečno",
      "Optimizacija slika, strukture naslova i strukturiranih podataka",
      "Praćenje konverzija i izvještaj s preporukama",
    ],
    meeting: "do 45 minuta mjesečno",
    featured: true,
  },
  {
    name: "SEO Authority",
    startingPrice: "790 € mjesečno",
    setupPrice: "od 400 €",
    description: "Za konkurentne djelatnosti i poslovanja kojima je organski promet važan prodajni kanal.",
    bestFor: "Konkurentno tržište i razvoj tematskog autoriteta",
    inclusions: [
      "Sve iz paketa SEO Growth",
      "Praćenje 30-60 ključnih riječi",
      "Detaljna analiza tržišta i konkurenata",
      "Dva nova SEO sadržaja mjesečno",
      "Optimizacija do tri postojeće stranice mjesečno",
      "Tehnički SEO zahvati do tri sata mjesečno",
      "Analiza povratnih poveznica i priprema digital PR aktivnosti",
      "CRO preporuke, praćenje dva puta mjesečno i detaljan izvještaj",
    ],
    meeting: "do 60 minuta mjesečno",
    featured: false,
  },
];

export const seoTestimonials: Testimonial[] = testimonials;

export const seoBenefits = [
  ["Bez nerealnih obećanja", "Ne jamčimo poziciju. Dogovaramo aktivnosti, pratimo promjene i otvoreno objašnjavamo ograničenja."],
  ["Tehnička i sadržajna perspektiva", "Problem ne svodimo samo na ključne riječi ako web, struktura ili sadržaj koče rezultat."],
  ["Razumljivi izvještaji", "Jasno vidite što je napravljeno, što se promijenilo i koji je sljedeći prioritet."],
  ["Relevantan promet prije taštine", "Važnije je privući pravog kupca i upit nego zauzeti poziciju za pojam bez poslovne vrijednosti."],
  ["SEO povezan s poslovnim ciljem", "Vidljivost povezujemo s uslugama, lokacijom, pozivima, obrascima i drugim važnim radnjama."],
];

export const seoFaq = [
  { question: "Koliko košta SEO optimizacija?", answer: "Mjesečni SEO paketi počinju od 290 €, uz jednokratnu početnu pripremu od 150 €. Konačna cijena ovisi o veličini i stanju weba, konkurenciji, broju tema i količini potrebnog sadržaja." },
  { question: "Koliko dugo trebam ulagati u SEO?", answer: "SEO je dugoročan proces, a preporučeno trajanje suradnje je najmanje šest mjeseci. Neke tehničke promjene mogu se primijeniti brzo, ali stabilan rast vidljivosti i upita obično traži kontinuiran rad." },
  { question: "Možete li jamčiti prvo mjesto na Googleu?", answer: "Ne. Nitko ne može pouzdano jamčiti određenu poziciju jer rezultati ovise o konkurenciji, algoritmima, stanju weba i autoritetu. Možemo jamčiti transparentan rad, dogovoreni opseg i redovito mjerenje." },
  { question: "Koje pristupe trebate?", answer: "Najčešće trebamo pristup web stranici, Google Search Consoleu, Google Analyticsu 4 i Google Business profilu. Točan popis dogovaramo nakon početnog pregleda." },
  { question: "Moram li sam pisati sadržaj?", answer: "Ne nužno. Možete dostaviti stručno znanje i postojeće materijale, a sadržaj možemo urediti ili izraditi prema dogovorenom paketu i dodatnom opsegu." },
  { question: "Je li lokalni SEO uključen?", answer: "SEO Local uključuje optimizaciju Google Business profila, lokalne ključne riječi i povezane aktivnosti. Lokalni SEO je dio šire SEO usluge, ne zasebna glavna usluga." },
  { question: "Što dobivam SEO auditom?", answer: "Dobivate pregled tehničkih problema, sadržaja, ključnih riječi, konkurencije, strukture i vidljivosti te prioritetni plan preporuka. Provedba preporuka dogovara se prema opsegu." },
  { question: "Kako izgleda mjesečni izvještaj?", answer: "Izvještaj sažima provedene aktivnosti, važne promjene u vidljivosti i organskom prometu, praćene konverzije te preporuke za sljedeće razdoblje." },
  { question: "Trebam li zaustaviti Google oglase?", answer: "Ne. SEO i oglasi mogu raditi zajedno. Oglasi mogu donositi promet odmah, dok SEO dugoročno gradi organsku vidljivost i smanjuje potpunu ovisnost o plaćenim kampanjama." },
  { question: "Što mogu očekivati u prvih šest mjeseci?", answer: "Prvo se postavlja mjerenje i uklanjaju prioritetne prepreke, zatim se uređuju stranice i sadržaj. Do šestog mjeseca tražimo jasan obrazac promjene, ali opseg rezultata ovisi o konkurenciji, početnom stanju i autoritetu weba." },
];
