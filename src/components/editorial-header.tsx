"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const services = [
  { label: "Izrada web stranica", href: "/izrada-web-stranica-cijena/", detail: "Profesionalne stranice koje pretvaraju posjete u upite." },
  { label: "SEO optimizacija", href: "/seo-optimizacija-cijena/", detail: "Veća vidljivost za relevantna pretraživanja." },
  { label: "Izrada web trgovina", href: "/izrada-web-trgovina/", detail: "Jednostavniji put od proizvoda do kupnje." },
  { label: "Održavanje web stranica", href: "/odrzavanje-web-stranica/", detail: "Siguran, ažuran i pouzdan web." },
];

const pages = [
  { label: "Cjenik", href: "/cjenik/" },
  { label: "Blog", href: "/blog/" },
  { label: "O nama", href: "/o-nama/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export function EditorialHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, servicesOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const current = (href: string) => pathname === href || pathname === href.slice(0, -1);

  return (
    <header className="editorial-header" id="vrh">
      <div className="container editorial-header-inner">
        <Link className="editorial-brand" href="/" aria-label="Legatech, naslovna stranica" onClick={closeMenus}>
          <Image src="/brand/legatech-black.svg" alt="" width={164} height={41} loading="eager" unoptimized />
        </Link>
        <button
          ref={menuButtonRef}
          className="editorial-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-controls="editorial-nav"
          aria-expanded={menuOpen}
          onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false); }}
        >
          <span /><span />
        </button>
        <nav className="editorial-nav" id="editorial-nav" data-open={menuOpen} aria-label="Glavna navigacija">
          <div className="editorial-services" ref={servicesRef}>
            <button
              ref={servicesButtonRef}
              className="editorial-services-toggle"
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="editorial-services-menu"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Usluge <span className="editorial-chevron" aria-hidden="true" />
            </button>
            <div className="editorial-services-menu" id="editorial-services-menu" hidden={!servicesOpen}>
              {services.map((service, index) => (
                <Link key={service.href} href={service.href} aria-current={current(service.href) ? "page" : undefined} onClick={closeMenus}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{service.label}</strong>
                  <small>{service.detail}</small>
                </Link>
              ))}
            </div>
          </div>
          {pages.map((page) => (
            <Link key={page.href} href={page.href} aria-current={current(page.href) ? "page" : undefined} onClick={closeMenus}>
              {page.label}
            </Link>
          ))}
        </nav>
        <Link className="editorial-header-cta" href="/kontakt/" onClick={closeMenus}>Zatražite ponudu <span aria-hidden="true">↗</span></Link>
      </div>
    </header>
  );
}
