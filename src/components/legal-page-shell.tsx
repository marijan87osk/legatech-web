import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface LegalSectionLink {
  href: string;
  label: string;
}

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  links: LegalSectionLink[];
  children: ReactNode;
}

export function LegalPageShell({ eyebrow, title, intro, updatedAt, links, children }: LegalPageShellProps) {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />
      <main id="sadrzaj" className="legal-page">
        <header className="legal-hero">
          <div className="container legal-hero-grid">
            <div>
              <p className="mono-label">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="legal-intro">{intro}</p>
            </div>
            <aside className="legal-identity" aria-label="Podaci o pružatelju usluge">
              <span className="mono-label">Voditelj i pružatelj</span>
              <strong>LEGATECH, obrt za razvoj softvera</strong>
              <p>vl. Marijan Malčić</p>
              <p>Kninska ulica 1 A, 31000 Osijek</p>
              <p>OIB: 14184408003 / MBS: 98086464</p>
              <a href="mailto:info@legatech.hr">info@legatech.hr</a>
              <a href="tel:+385997357070">099 735 7070</a>
            </aside>
          </div>
        </header>

        <section className="section legal-body-section">
          <div className="container legal-layout">
            <aside className="legal-navigation">
              <nav aria-label="Sadržaj pravne stranice">
                <p className="mono-label">Na ovoj stranici</p>
                {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
              </nav>
              <p className="legal-updated">Ažurirano: {updatedAt}</p>
            </aside>
            <article className="legal-article">{children}</article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
