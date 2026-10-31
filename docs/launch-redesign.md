# Lokalni kandidat redizajna

## Cacheiranje javnih resursa

Produkcijski build stvara `asset-manifest.json` i CSS/JS kopije s hashom sadržaja u nazivu. HTML, uključujući 404, koristi te nazive. Promjena sadržaja stvara novi URL, a nepromijenjeni resurs zadržava isti URL. Stari nazivi ostaju dostupni radi već spremljenih HTML dokumenata.

Hashirani CSS/JS imaju `public, max-age=31536000, immutable`; HTML, izvorni nehashirani CSS/JS i javni metapodaci moraju se revalidirati. Build isključuje naslijeđeni `mod_expires` kako ne bi nadjačao tu politiku. Za primjenu `.htaccess` pravila na izravne statičke URL-ove SiteGround NGINX Direct Delivery treba biti isključen za produkcijsku domenu.

`check:seo` provjerava hashove i HTML reference, a `scripts/check-live-redesign.mjs` nakon objave provjerava manifest, cache/security zaglavlja i `/index.html` preusmjeravanja. SMTP konfiguracija i PHP endpoint ne sudjeluju u verzioniranju resursa.

Detaljan postupak pripreme i preostale hosting/SMTP provjere nalaze se u `../legatech redizajn2/LAUNCH.md` (lokalni radni prostor).

Produkcijski izvor je `redesign/site/` s inventarom `redesign/files.json`. `scripts/build-redesign.mjs` primjenjuje svježi WordPress sadržaj kroz odobreni predložak. `npm run build:offline` čuva noviji odobreni sadržaj kada je cache stariji, dok `LEGATECH_WORDPRESS_SYNC_FRESH=true` dopušta potvrđeno povlačenje članaka. Sinkronizator odbija sirove snimke starije od odobrene osnove ili zadnje prihvaćene snimke. Metadata vremena i hasha nalazi se u `src/generated/blog-sync.json` i prati cache.

Naredbe prije izdanja:

```text
npm run lint
npx tsc --noEmit
npm run test:release
npm run build:offline
npm run check:seo
node scripts/require-release-approval.mjs
```

`npm run build` prethodno izvršava read-only REST sinkronizaciju. Produkcijske zastavice su SMTP i debug false. Privatni SMTP config nije u javnoj arhivi; deploy preflight zahtijeva `private/legatech-contact.php` uz produkcijski `public_html`, PHP 8.1+ te OpenSSL i mbstring. `npm run preview:static` daje siguran loopback pregled na 8127 s noindexom, blokiranim vanjskim Analyticsom i isključenim mailom.

GitHub/WordPress artifact format i okidači zadržani su. WordPress može automatski preuzeti artifact nakon pusha na main; **ne pushati ili pokretati workflow prije zasebnog odobrenja objave**. Lokalni `launch/` paket iz drugog radnog direktorija nije službeni CI artifact i nema aktivacijski marker.

Puna adresa odobrena je za buduću produkciju samo u pravnom odjeljku `/uvjeti-koristenja/#pruzatelj`, uz napomenu da nije ured za prijam klijenata. `redesign/legal-approval.json` veže to odobrenje uz hash bloka. Nije odobren deploy. Izmjena bloka traži novu potvrdu.

Postojeći CI izvršava Linux testove deploya, povrata i WordPress launchera prije arhiviranja. Deploy radi sigurnosnu kopiju i provjerava release marker prije aktivacije; postojeći post-deploy smoke ima povrat u slučaju greške. Nakon buduće odobrene objave dodatno pokrenuti `node scripts/check-live-redesign.mjs` (samo GET zahtjevi, bez slanja pošte ili Analyticsa).

Read-only provjera stvarnog hostinga 31. 10. 2026. potvrđuje da se postojeći produkcijski SMTP može zadržati: live i novi API koriste isti resolver privatne konfiguracije; na serveru su potvrđeni sva potrebna polja i prava 0600, PHP 8.2.35 s proširenjima, potrebni CLI alati i backup aktivnog izdanja (463 datoteke, bez nedostajućih). Mail TLS/certifikat provjeren je bez autentikacije ili slanja poruke. Nije potrebna nova SMTP konfiguracija ili lozinka.

Trenutačni operativni nalaz: WordPress deployer bilježi nedostajući/istekli artifact, a GitHub za posljednji uspješni build od 13. 10. više ne vraća artifact. Prije buduće aktivacije potreban je svjež uspješan CI artifact. Sada nije pokrenut workflow/push niti je mijenjan server. Efektivno ponašanje novog `.htaccess` i puni CI testovi novog kandidata ostaju provjere prije/uz odobrenu objavu. Detalji su u `../legatech redizajn2/reviews/hosting-readonly-2026-10-31/IZVJESTAJ.md`.
