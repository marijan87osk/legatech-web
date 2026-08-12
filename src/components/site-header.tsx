"use client";

import { CaretDown, List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  { label: "Izrada web stranica", href: "/izrada-web-stranica-cijena", detail: "Web koji pretvara posjet u upit" },
  { label: "SEO optimizacija", href: "/seo-optimizacija-cijena", detail: "Veća vidljivost u pravim pretragama" },
  { label: "Izrada web trgovina", href: "/izrada-web-trgovina", detail: "Jednostavnija online prodaja" },
  { label: "Održavanje web stranica", href: "/odrzavanje-web-stranica", detail: "Pouzdana tehnička podrška" },
];

const navItems = [
  { label: "Cjenik", href: "/cjenik" },
  { label: "Blog", href: "/blog" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Legatech, naslovna stranica">
          LEGATECH<span aria-hidden="true">/</span>
        </Link>

        <nav className="desktop-nav" aria-label="Glavna navigacija">
          <div className="services-menu" ref={servicesRef}>
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Usluge
              <CaretDown size={15} weight="bold" aria-hidden="true" />
            </button>
            {servicesOpen && (
              <div id="services-dropdown" className="services-dropdown">
                {services.map((service) => (
                  <Link key={service.href} href={service.href} onClick={() => setServicesOpen(false)}>
                    <strong>{service.label}</strong>
                    <span>{service.detail}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <Link className="button button-primary header-cta" href="/kontakt">Zatražite ponudu</Link>

        <button
          ref={menuButtonRef}
          className="menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Otvori navigaciju"
          onClick={() => setOpen(true)}
        >
          <List size={25} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className="mobile-menu-backdrop" role="presentation" onMouseDown={closeMenu}>
          <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobilna navigacija" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mobile-menu-top">
              <Link className="wordmark" href="/" onClick={closeMenu}>LEGATECH<span>/</span></Link>
              <button ref={closeButtonRef} type="button" className="menu-trigger" aria-label="Zatvori navigaciju" onClick={closeMenu}>
                <X size={25} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobilna navigacija">
              <span className="mobile-nav-heading">Usluge</span>
              {services.map((service) => (
                <Link key={service.href} href={service.href} onClick={closeMenu}>{service.label}</Link>
              ))}
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
              ))}
            </nav>
            <Link className="button button-primary" href="/kontakt" onClick={closeMenu}>Zatražite ponudu</Link>
          </div>
        </div>
      )}
    </header>
  );
}
