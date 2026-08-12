import { testimonials, type Testimonial } from "@/src/data/client-testimonials";

export interface MaintenanceRisk {
  shortLabel: string;
  risk: string;
  detected: string;
  prevention: string;
  response: string;
}

export interface MaintenancePackage {
  name: string;
  price: string;
  cadence: "mjesečno";
  description: string;
  bestFor: string;
  updateFrequency: string;
  backupFrequency: string;
  includedTime: string;
  responseTime: string;
  annualPrice: string;
  inclusions: string[];
  featured: boolean;
}

export const maintenanceAudience = [
  ["Nemate internu tehničku osobu", "Trebate jedan jasan kontakt koji razumije web i može preuzeti redovite tehničke obveze."],
  ["Web redovito prima upite", "Kontaktni obrasci, dostupnost i osnovne funkcije moraju ostati pouzdani jer izravno podržavaju prodaju."],
  ["Vodite aktivne kampanje", "Promjene, obrasci i odredišne stranice trebaju provjeru prije nego što na njih šaljete plaćeni promet."],
  ["Povremeno mijenjate sadržaj", "Tekstovi, fotografije i manji tehnički zahvati rješavaju se unutar dogovorenog vremena ili zasebne procjene."],
  ["Imate WooCommerce trgovinu", "Košarica, blagajna, plaćanje, dostava i transakcijske poruke zahtijevaju redovitu provjeru."],
] as const;

export const maintenanceRisks: MaintenanceRisk[] = [
  {
    shortLabel: "Zastarjeli sustav",
    risk: "WordPress, tema ili dodaci dugo nisu ažurirani.",
    detected: "Pregledom verzija, kompatibilnosti i poznatih sigurnosnih problema.",
    prevention: "Kontroliranim ažuriranjem prema ritmu odabranog paketa.",
    response: "Prvo izrađujemo sigurnosnu kopiju, zatim ažuriramo i provjeravamo ključne funkcije.",
  },
  {
    shortLabel: "Sigurnosni propusti",
    risk: "Web pokazuje sumnjivo ponašanje ili je izložen nepotrebnom riziku.",
    detected: "Sigurnosnim pregledom, provjerom pristupa i neuobičajenih promjena.",
    prevention: "Redovitim nadzorom, ažuriranjima i osnovnim zaštitnim postavkama.",
    response: "Izoliramo uzrok, procjenjujemo opseg i dogovaramo čišćenje ili oporavak.",
  },
  {
    shortLabel: "Neispravan obrazac",
    risk: "Posjetitelj pošalje upit, ali poruka ne stigne do poslovanja.",
    detected: "Periodičnom provjerom kontaktnih obrazaca i slanja e-pošte.",
    prevention: "Praćenjem isporuke i pravilnom SMTP konfiguracijom kada je potrebna.",
    response: "Provjeravamo obrazac, pravila slanja i poslužitelj te potvrđujemo testnom porukom.",
  },
  {
    shortLabel: "Neuspjelo ažuriranje",
    risk: "Nakon ažuriranja dio stranice više ne radi ili se ne prikazuje pravilno.",
    detected: "Provjerom ključnih stranica i funkcionalnosti nakon tehničke promjene.",
    prevention: "Backupom prije zahvata i testiranjem većih ažuriranja u naprednijim paketima.",
    response: "Vraćamo stabilnu verziju, utvrđujemo konflikt i predlažemo siguran sljedeći korak.",
  },
  {
    shortLabel: "Sporost",
    risk: "Web se s vremenom usporio zbog baze, slika, dodataka ili hostinga.",
    detected: "Provjerom osnovnih performansi i promjena u ponašanju stranice.",
    prevention: "Redovitom tehničkom higijenom i povremenom optimizacijom baze.",
    response: "Lociramo najveće usko grlo i odvajamo manji zahvat od zasebne optimizacije.",
  },
  {
    shortLabel: "Kompatibilnost",
    risk: "Tema, dodatak ili vanjski servis više ne surađuju kako su prije radili.",
    detected: "Pregledom grešaka, verzija i ponašanja nakon promjena vanjskih sustava.",
    prevention: "Kontroliranim redoslijedom ažuriranja i provjerom važnih integracija.",
    response: "Utvrđujemo konflikt i biramo popravak, zamjenu dodatka ili prilagodbu integracije.",
  },
  {
    shortLabel: "Nepouzdan backup",
    risk: "Sigurnosna kopija postoji samo na istom hostingu ili nije dovoljno svježa.",
    detected: "Provjerom lokacije, učestalosti i dostupnosti postojećih kopija.",
    prevention: "Vanjski pohranjenim kopijama prema paketu i jasnim pravilima čuvanja.",
    response: "Pronalazimo zadnju ispravnu kopiju i procjenjujemo siguran način vraćanja.",
  },
];

export const maintenanceCoverage = [
  { title: "Ažuriranja", text: "WordPress, tema i dodaci ažuriraju se kontrolirano, uz provjeru glavnih funkcija.", detail: "Manje rizika od zastarjelih komponenti" },
  { title: "Sigurnosne kopije", text: "Backup se sprema izvan osnovne instalacije prema učestalosti odabranog paketa.", detail: "Pouzdanija osnova za oporavak" },
  { title: "Sigurnosne provjere", text: "Pregledavamo osnovne znakove problema i pokušaje neovlaštenog pristupa.", detail: "Ranije prepoznavanje rizika" },
  { title: "Dostupnost i obrasci", text: "Provjeravamo je li web dostupan i rade li ključni obrasci kako je očekivano.", detail: "Manje propuštenih poslovnih prilika" },
  { title: "Performanse", text: "Pratimo osnovno tehničko stanje i prepoznajemo kada web treba ciljanu optimizaciju.", detail: "Stabilnije iskustvo korisnika" },
  { title: "Baza podataka", text: "Napredniji paketi uključuju povremenu provjeru i optimizaciju baze.", detail: "Manje nepotrebnog tehničkog opterećenja" },
  { title: "Manje izmjene", text: "Odabrani paketi uključuju dogovoreno vrijeme za sadržajne ili tehničke zahvate.", detail: "Brže rješavanje svakodnevnih zadataka" },
  { title: "Tehnička podrška", text: "Zahtjev šaljete jednom kontaktu, uz vrijeme reakcije definirano paketom.", detail: "Jasan put kada trebate pomoć" },
] as const;

export const backupRecovery = [
  ["Izrada kopije", "Web i baza spremaju se prema učestalosti paketa."],
  ["Vanjska pohrana", "Kopija se ne oslanja samo na isti hosting kao produkcijski web."],
  ["Provjera dostupnosti", "Kopija mora biti dostupna kada je stvarno potrebna."],
  ["Sigurno vraćanje", "Prije povratka procjenjujemo što se dogodilo i koju verziju treba vratiti."],
] as const;

export const maintenanceCadence = [
  { rhythm: "Mjesečno", activity: "Ažuriranje i vanjska sigurnosna kopija za jednostavne prezentacijske webove.", plans: "Care Basic" },
  { rhythm: "Dvaput mjesečno", activity: "Kontrolirana ažuriranja za aktivnije poslovne stranice.", plans: "Care Plus" },
  { rhythm: "Tjedno", activity: "Provjera ažuriranja ili backup, ovisno o vrsti i važnosti weba.", plans: "Care Plus, Care Business i web shop" },
  { rhythm: "Dnevno", activity: "Sigurnosne kopije za poslovno važne webove i WooCommerce trgovine.", plans: "Care Business i održavanje web shopa" },
] as const;

export const includedChangeExamples = [
  "Izmjena postojećeg teksta ili kontaktnih podataka",
  "Zamjena dostavljene fotografije",
  "Manja korekcija postojećeg sadržajnog bloka",
  "Provjera ili manji popravak obrasca",
  "Manja tehnička prilagodba unutar postojećeg sustava",
] as const;

export const changeAllowances = [
  ["Care Basic", "Nema uključenih izmjena"],
  ["Care Plus", "30 minuta mjesečno"],
  ["Care Business", "60 minuta mjesečno"],
  ["Održavanje web shopa", "90 minuta mjesečno"],
] as const;

export const supportProcess = [
  ["Pošaljete zahtjev", "Kratko opišete što ne radi ili što želite promijeniti."],
  ["Pregledavamo situaciju", "Provjeravamo hitnost, uzrok i pripada li zahtjev ugovorenom paketu."],
  ["Potvrđujemo opseg", "Ako zahvat izlazi iz paketa, prije rada dobivate procjenu i objašnjenje."],
  ["Izvršavamo zahvat", "Radimo dogovorenu izmjenu, popravak ili tehničku provjeru."],
  ["Šaljemo potvrdu", "Dobivate sažetak napravljenog i preporuku ako je potreban sljedeći korak."],
] as const;

export const maintenancePackages: MaintenancePackage[] = [
  {
    name: "Care Basic",
    price: "35 €",
    cadence: "mjesečno",
    description: "Za jednostavne prezentacijske stranice koje se rijetko mijenjaju.",
    bestFor: "Osnovna preventivna briga",
    updateFrequency: "Jednom mjesečno",
    backupFrequency: "Jednom mjesečno, vanjski",
    includedTime: "Nije uključeno",
    responseTime: "Do 3 radna dana",
    annualPrice: "350 €",
    inclusions: ["Ažuriranje WordPress sustava, teme i dodataka", "Osnovna provjera funkcionalnosti", "Mjesečni sigurnosni pregled", "Provjera dostupnosti stranice", "Provjera kontakt obrasca", "Podrška putem e-maila"],
    featured: false,
  },
  {
    name: "Care Plus",
    price: "59 €",
    cadence: "mjesečno",
    description: "Za poslovne webove koji redovito primaju upite i povremeno mijenjaju sadržaj.",
    bestFor: "Najčešći odabir za poslovni web",
    updateFrequency: "Dvaput mjesečno",
    backupFrequency: "Najmanje jednom tjedno",
    includedTime: "30 minuta mjesečno",
    responseTime: "Do 2 radna dana",
    annualPrice: "590 €",
    inclusions: ["Sve iz Care Basic paketa", "Napredniji sigurnosni nadzor", "Zaštita od pokušaja neovlaštenog pristupa", "Provjera neispravnih poveznica", "Osnovna optimizacija baze podataka", "Provjera obrazaca i osnovnih performansi"],
    featured: true,
  },
  {
    name: "Care Business",
    price: "99 €",
    cadence: "mjesečno",
    description: "Za važne poslovne stranice, aktivne kampanje i webove koji se redovito nadograđuju.",
    bestFor: "Aktivan web s važnim konverzijama",
    updateFrequency: "Tjedna provjera",
    backupFrequency: "Dnevno",
    includedTime: "60 minuta mjesečno",
    responseTime: "Do 1 radni dan",
    annualPrice: "990 €",
    inclusions: ["Sve iz Care Plus paketa", "Testiranje većih ažuriranja prije objave", "Napredni sigurnosni monitoring", "Provjera performansi", "Povremena optimizacija baze", "Provjera analitike i konverzija", "Mjesečni izvještaj i prioritetna podrška"],
    featured: false,
  },
  {
    name: "Održavanje web shopa",
    price: "od 129 €",
    cadence: "mjesečno",
    description: "Za WooCommerce trgovine kojima su narudžbe, plaćanje i dostava svakodnevno važni.",
    bestFor: "Aktivna online prodaja",
    updateFrequency: "Tjedna provjera",
    backupFrequency: "Dnevno",
    includedTime: "90 minuta mjesečno",
    responseTime: "Do 1 radni dan",
    annualPrice: "od 1.290 €",
    inclusions: ["Sigurnosni monitoring", "Provjera košarice i blagajne", "Testna narudžba", "Provjera plaćanja i dostave", "Provjera transakcijskih e-mailova", "Provjera i optimizacija baze", "Provjera performansi i prioritetna podrška"],
    featured: false,
  },
];

export const oneOffGroups = [
  { title: "Satnice i prioritet", items: [["Standardni radni sat", "40 €"], ["Prioritetni radni sat", "55 €"], ["Minimalni pojedinačni zahvat", "25 €"], ["Hitna intervencija izvan radnog vremena", "od 80 €"]] },
  { title: "Sigurnost i oporavak", items: [["Sigurnosni pregled stranice", "od 70 €"], ["Uklanjanje zlonamjernog koda", "od 200 €"], ["Oporavak hakirane stranice", "od 300 €"], ["Vraćanje iz sigurnosne kopije", "od 70 €"]] },
  { title: "Tehnički popravci", items: [["Ažuriranje WordPress sustava", "od 50 €"], ["Optimizacija brzine", "od 150 €"], ["Popravak kontakt obrasca", "od 50 €"], ["Problem sa slanjem e-pošte", "od 70 €"]] },
] as const;

export const maintenanceTestimonials: Testimonial[] = testimonials;

export const maintenanceBenefits = [
  ["Izravna komunikacija", "Zahtjev ne prolazi kroz više odjela, nego dolazi osobi koja razumije tehnički kontekst weba."],
  ["Poznat opseg", "Paket, uključeno vrijeme i očekivano vrijeme reakcije jasno su definirani prije početka."],
  ["Razumljive povratne informacije", "Objašnjavamo što je napravljeno i kada problem zahtijeva zaseban, veći zahvat."],
  ["Dokumentirane aktivnosti", "Napredniji paket uključuje mjesečni pregled napravljenih provjera i važnih preporuka."],
  ["Šira tehnička perspektiva", "Održavanje povezujemo s razvojem, performansama, SEO temeljima i stvarnim poslovnim ciljem weba."],
] as const;

export const maintenanceFaq = [
  { question: "Što je uključeno u mjesečno održavanje?", answer: "Opseg ovisi o paketu. Svi paketi uključuju ažuriranja, sigurnosne kopije, tehničke provjere i podršku, dok napredniji paketi dodaju češće provjere, sadržajne izmjene, izvještavanje i prioritetnu reakciju." },
  { question: "Koliko brzo reagirate na zahtjev?", answer: "Care Basic ima vrijeme reakcije do tri radna dana, Care Plus do dva radna dana, a Care Business i održavanje web shopa do jednog radnog dana." },
  { question: "Znači li vrijeme reakcije da će problem tada biti riješen?", answer: "Ne nužno. Vrijeme reakcije označava kada započinjemo pregled zahtjeva. Vrijeme rješavanja ovisi o uzroku, opsegu i dostupnosti vanjskih sustava." },
  { question: "Što se smatra hitnim slučajem?", answer: "Nedostupan web, neispravna blagajna ili ozbiljan sigurnosni problem mogu zahtijevati prioritetnu intervenciju. Dostupnost i cijena hitnog rada potvrđuju se prije zahvata." },
  { question: "Gdje se čuvaju sigurnosne kopije?", answer: "Paketi uključuju vanjske sigurnosne kopije kako se oporavak ne bi oslanjao samo na isti hosting. Točna lokacija i pravila čuvanja definiraju se prema tehničkom okruženju." },
  { question: "Jesu li sadržajne izmjene uključene?", answer: "Care Plus uključuje 30 minuta, Care Business 60 minuta, a održavanje web shopa 90 minuta sadržajnih ili tehničkih izmjena mjesečno. Care Basic ne uključuje izmjene." },
  { question: "Prenosi li se neiskorišteno vrijeme u sljedeći mjesec?", answer: "Ne. Neiskorišteno vrijeme iz mjesečnog paketa ne prenosi se u sljedeći mjesec." },
  { question: "Jesu li hosting i licence uključeni?", answer: "Nisu, osim ako je to izričito navedeno u individualnoj ponudi. Hosting, premium licence i pretplate vanjskih servisa obračunavaju se zasebno." },
  { question: "Možete li preuzeti već hakiranu stranicu?", answer: "Možemo prvo napraviti pregled i procjenu. Uklanjanje zlonamjernog koda i oporavak hakirane stranice zasebni su zahvati i nisu automatski uključeni u mjesečni paket." },
  { question: "Što ako web već ima tehničke probleme?", answer: "Prije početka održavanja pregledavamo postojeće stanje. Problemi koji su postojali prije ugovaranja procjenjuju se i rješavaju kao početni ili zasebni zahvat." },
  { question: "Mogu li otkazati mjesečni paket?", answer: "Uvjeti trajanja i otkazivanja navode se u pisanoj ponudi prije početka suradnje. Godišnja cijena vrijedi za unaprijed dogovoreno godišnje plaćanje." },
  { question: "Održavate li WooCommerce trgovine?", answer: "Da. Poseban paket od 129 € mjesečno uključuje provjeru košarice, blagajne, testnu narudžbu, plaćanje, dostavu, transakcijske poruke i 90 minuta izmjena." },
];
