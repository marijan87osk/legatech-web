import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="wordmark footer-wordmark" href="/">LEGATECH<span>/</span></Link>
          <p>Web stranice, trgovine i SEO usmjereni na konkretne poslovne ciljeve.</p>
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
      </div>
      <div className="container footer-bottom">
        <span>© 2026. Legatech</span>
        <span><a href="mailto:info@legatech.hr">info@legatech.hr</a> / <a href="tel:+385997357070">099 735 7070</a></span>
        <span>Osijek, Hrvatska</span>
      </div>
    </footer>
  );
}
