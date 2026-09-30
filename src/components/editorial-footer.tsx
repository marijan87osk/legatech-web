import Link from "next/link";
import Image from "next/image";
import { CookieSettingsButton } from "./cookie-settings-button";

export function EditorialFooter() {
  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="editorial-footer-top">
          <div className="editorial-footer-brand">
            <Link className="editorial-brand" href="/" aria-label="Legatech, naslovna stranica">
              <Image src="/brand/legatech-black.svg" alt="" width={164} height={41} unoptimized />
            </Link>
            <p>Web stranice, trgovine i SEO usmjereni na konkretne poslovne ciljeve.</p>
            <p>LEGATECH, obrt za razvoj softvera, vl. Marijan Malčić<br />Kninska ulica 1 A, 31000 Osijek<br />OIB: 14184408003 / MBS: 98086464</p>
          </div>
          <div className="editorial-footer-links">
            <nav aria-label="Usluge u podnožju">
              <h2>Usluge</h2>
              <Link href="/izrada-web-stranica-cijena/">Izrada web stranica</Link>
              <Link href="/seo-optimizacija-cijena/">SEO optimizacija</Link>
              <Link href="/izrada-web-trgovina/">Izrada web trgovina</Link>
              <Link href="/odrzavanje-web-stranica/">Održavanje web stranica</Link>
            </nav>
            <nav aria-label="Glavne stranice u podnožju">
              <h2>Istražite</h2>
              <Link href="/cjenik/">Cjenik</Link>
              <Link href="/blog/">Blog</Link>
              <Link href="/o-nama/">O nama</Link>
              <Link href="/kontakt/">Kontakt</Link>
            </nav>
            <nav aria-label="Pravne stranice i privatnost">
              <h2>Pravno</h2>
              <Link href="/politika-privatnosti/">Politika privatnosti</Link>
              <Link href="/politika-kolacica/">Politika kolačića</Link>
              <Link href="/uvjeti-koristenja/">Uvjeti korištenja</Link>
              <CookieSettingsButton />
            </nav>
          </div>
        </div>
        <div className="editorial-footer-bottom">
          <span>© 2026. Legatech</span>
          <span><a href="mailto:info@legatech.hr">info@legatech.hr</a> / <a href="tel:+385997357070">099 735 7070</a></span>
          <span>Osijek, Hrvatska</span>
        </div>
      </div>
    </footer>
  );
}
