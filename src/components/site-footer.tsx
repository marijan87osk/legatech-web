import Link from "next/link";
import { CookieSettingsButton } from "./cookie-settings-button";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="wordmark footer-wordmark" href="/">LEGATECH<span>/</span></Link>
          <p>Web stranice, trgovine i SEO usmjereni na konkretne poslovne ciljeve.</p>
          <p className="footer-business-details">
            LEGATECH, obrt za razvoj softvera, vl. Marijan Malčić<br />
            Kninska ulica 1 A, 31000 Osijek<br />
            OIB: 14184408003 / MBS: 98086464
          </p>
        </div>
        <nav aria-label="Usluge u podnožju">
          <strong>Usluge</strong>
          <Link href="/izrada-web-stranica-cijena">Izrada web stranica</Link>
          <Link href="/seo-optimizacija-cijena">SEO optimizacija</Link>
          <Link href="/izrada-web-trgovina">Izrada web trgovina</Link>
          <Link href="/odrzavanje-web-stranica">Održavanje web stranica</Link>
        </nav>
        <nav aria-label="Glavne stranice u podnožju">
          <strong>Istražite</strong>
          <Link href="/projekti">Projekti</Link>
          <Link href="/cjenik">Cjenik</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/o-nama">O nama</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>
        <nav aria-label="Pravne stranice i privatnost">
          <strong>Pravno</strong>
          <Link href="/politika-privatnosti">Politika privatnosti</Link>
          <Link href="/politika-kolacica">Politika kolačića</Link>
          <Link href="/uvjeti-koristenja">Uvjeti korištenja</Link>
          <CookieSettingsButton />
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© 2026. Legatech</span>
        <span><a href="mailto:info@legatech.hr">info@legatech.hr</a> / <a href="tel:+385997357070">099 735 7070</a></span>
        <span>Osijek, Hrvatska</span>
      </div>
    </footer>
  );
}
