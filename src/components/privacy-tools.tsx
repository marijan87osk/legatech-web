"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { X } from "@phosphor-icons/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnalyticsConsent,
  analyticsMeasurementId,
  disableGoogleAnalytics,
  enableGoogleAnalytics,
  initializeGoogleAnalytics,
  openCookieSettingsEvent,
  readStoredConsent,
  storeConsent,
  trackAnalyticsEvent,
} from "@/src/lib/analytics";

const subscribeToHydration = () => () => undefined;

export function PrivacyTools() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  return hydrated ? <PrivacyController /> : null;
}

function PrivacyController() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() => readStoredConsent()?.analytics ?? null);
  const [panelOpen, setPanelOpen] = useState(() => readStoredConsent() === null);
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    const openSettings = () => {
      setPanelOpen(true);
      window.requestAnimationFrame(() => panelRef.current?.focus());
    };
    window.addEventListener(openCookieSettingsEvent, openSettings);
    return () => window.removeEventListener(openCookieSettingsEvent, openSettings);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.cookieBanner = panelOpen ? "open" : "closed";
    return () => {
      delete document.documentElement.dataset.cookieBanner;
    };
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen || consent === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [consent, panelOpen]);

  useEffect(() => {
    if (!analyticsReady || consent !== "granted" || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
    });
  }, [analyticsReady, consent, pathname]);

  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      const placement = target.closest(".mobile-contact-actions") ? "mobile_floating" : "site_link";
      if (href.startsWith("tel:")) trackAnalyticsEvent("click_phone", { placement });
      if (href.startsWith("https://wa.me/")) trackAnalyticsEvent("click_whatsapp", { placement });
    };
    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  function chooseConsent(choice: AnalyticsConsent) {
    storeConsent(choice);
    setConsent(choice);
    setPanelOpen(false);

    if (choice === "granted") {
      if (window.gtag) {
        enableGoogleAnalytics();
        setAnalyticsReady(true);
      }
    } else {
      disableGoogleAnalytics();
      setAnalyticsReady(false);
    }
  }

  const shouldLoadAnalytics = consent === "granted";

  return (
    <>
      {shouldLoadAnalytics && (
        <Script
          id="legatech-google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`}
          strategy="afterInteractive"
          onReady={() => {
            initializeGoogleAnalytics();
            setAnalyticsReady(true);
          }}
        />
      )}

      {panelOpen && (
        <section
          ref={panelRef}
          className="cookie-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          tabIndex={-1}
        >
          <div className="cookie-consent-copy">
            <p className="mono-label">Vaša privatnost</p>
            <h2 id="cookie-consent-title">Analitika samo uz vaš pristanak.</h2>
            <p>
              Nužni kolačić pamti vaš odabir. Google Analytics učitavamo tek ako prihvatite analitičke kolačiće.
              Više detalja nalazi se u <Link href="/politika-kolacica">Politici kolačića</Link>.
            </p>
          </div>
          <div className="cookie-consent-actions">
            <button className="cookie-choice cookie-choice-reject" type="button" onClick={() => chooseConsent("denied")}>
              Odbij analitičke
            </button>
            <button className="cookie-choice cookie-choice-accept" type="button" onClick={() => chooseConsent("granted")}>
              Prihvati analitičke
            </button>
          </div>
          {consent !== null && (
            <button className="cookie-consent-close" type="button" onClick={() => setPanelOpen(false)} aria-label="Zatvorite postavke kolačića">
              <X size={20} aria-hidden="true" />
            </button>
          )}
        </section>
      )}
    </>
  );
}
