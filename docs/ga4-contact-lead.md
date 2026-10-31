# GA4 generate_lead — kontakt obrazac

Promjena je samo u lokalnom izvornom projektu `legatech-web`. Redizajn u `legatech redizajn2` na portu 8000 ima pregledni obrazac bez slanja i GA4 integracije; njegova potvrda validacije nije lead i nije povezana s ovim događajem. Ništa nije objavljeno.

## Kada se šalje

Postojeći `PrivacyTools` i `trackAnalyticsEvent` ostaju jedina GA4 integracija. Nema dodatnog Google taga. `generate_lead` šalje se tek kada POST `/api/contact.php` vrati HTTP 2xx i JSON s točno `ok: true`, `sent: true` i valjanim nasumičnim `submissionId` od 16 heksadekadskih znakova. API to vraća isključivo nakon uspješnog povratka SMTP `send()` poziva. To potvrđuje prihvat na SMTP servisu, a ne jamči isporuku u primateljev inbox.

Honeypot i dalje dobiva neutralnu potvrdu, ali `sent: false`, bez potvrde slanja i bez Analytics događaja. HTTP 200 sam po sebi nije dovoljan.

Sinkrona zaštita po obrascu blokira paralelni submit prije ponovnog React prikaza i ponovno slanje nakon uspjeha. Gumb „Pošaljite novi upit” pokreće novu prijavu. Isti serverov identifikator dodatno se pamti u memoriji Analytics modula kako isti uspjeh ne bi proizveo dva događaja tijekom iste učitane sesije aplikacije. ID se ne sprema u cookie/localStorage i ne šalje se Googleu.

Analytics parametri su isključivo `{ method: "contact_form" }` i opcionalni `debug_mode: true`. Ime, e-mail, telefon, tvrtka, budžet, usluga, tekst poruke i serverov ID nisu u payloadu događaja. Postojeći pristanak za analitičke kolačiće i dalje je uvjet; bez pristanka nema događaja ni naknadnog reproduciranja nakon prihvaćanja.

## Lokalne regresijske provjere

```powershell
node --test scripts/test-contact-lead.mjs
npm run lint
npx tsc --noEmit
npm run build:offline
php -l public/api/contact.php
```

Testovi koriste stvarne TypeScript module uz zamijenjeni `fetch` i postojeći `gtag` ulaz; ništa ne šalju SMTP-u ili Googleu. Provjeravaju čekanje potvrde, greške, nevaljan JSON, honeypot, paralelne submitove, ponovljeni receipt, ponovni pokušaj nakon greške, novi upit, pristanak, grešku taga i odsutnost osobnih podataka.

PHP CLI nije pronađen u ovom Windows okruženju pa lokalni `php -l` i stvarno SMTP slanje nisu izvršeni. Postojeći CI već ima provjeru sintakse tog endpointa; CI/deploy nije pokrenut.

Frontend i `public/api/contact.php` trebaju se isporučiti zajedno pri zasebno odobrenoj objavi. Stari API bez novog ugovora namjerno se ne smatra potvrđenim slanjem. Nemoj kopirati lokalni pregledni server na produkciju.

## Test u GA4 DebugView

1. Na lokalnom ili staging okruženju koje podržava PHP kontakt API postavi `NEXT_PUBLIC_GA_DEBUG_MODE=true` u lokalnu konfiguraciju pa ponovno pokreni dev server ili napravi novi build. Varijabla se ugrađuje u frontend tijekom builda. Druga opcija je Google Tag Assistant za vlastiti uređaj; ne dodaj novi Google tag.
2. Prihvati analitičke kolačiće. Otvori odgovarajući GA4 property i **Admin → Data display → DebugView**, zatim odaberi svoj testni uređaj.
3. Pošalji dopušteni testni upit. U Network provjeri odgovor `/api/contact.php`: HTTP 2xx, `ok: true`, `sent: true`, `submissionId`. Tek tada očekuj jedan `generate_lead` s `method=contact_form` i `debug_mode=true`. Provjeri da parametri ne sadrže podatke obrasca ili ID upita.
4. Provjeri nevaljan obrazac, blokiran API ili odgovor 422/429/502 i brzo dvostruko aktiviranje gumba. Za greške očekuj nula događaja; za isti uspjeh jedan. Novi upit nakon gumba „Pošaljite novi upit” može dati novi događaj. Odbijanje analitike mora zadržati slanje upita funkcionalnim, ali bez GA4 događaja.
5. Ukloni `NEXT_PUBLIC_GA_DEBUG_MODE` ili ga postavi na `false`, pa ponovno izgradi aplikaciju. Kod tada izostavlja parametar `debug_mode` (ne šalje ga kao `false`).

Bez dostupnog PHP API-ja i stvarnog SMTP uspjeha lokalni pregled neće proizvesti stvarni događaj. Jedinični testovi potvrđuju poziv taga, ali ne potvrđuju primitak u GA4; stvarni DebugView test zahtijeva pristup propertyju i zasebno dopušten test slanja. Nije izvršen na produkciji.

Službena dokumentacija: [GA4 generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead), [DebugView, debug_mode i pristanak](https://support.google.com/analytics/answer/7201382?hl=en).
