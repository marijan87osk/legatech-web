"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react";

export function MobileContactActions() {
  return (
    <nav className="mobile-contact-actions" aria-label="Brzi kontakt">
      <a
        className="mobile-contact-action mobile-contact-whatsapp"
        href="https://wa.me/385997357070"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pošaljite poruku putem WhatsAppa"
      >
        <WhatsappLogo size={25} weight="fill" aria-hidden="true" />
      </a>
      <a
        className="mobile-contact-action mobile-contact-phone"
        href="tel:+385997357070"
        aria-label="Nazovite Legatech"
      >
        <Phone size={24} weight="fill" aria-hidden="true" />
      </a>
    </nav>
  );
}
