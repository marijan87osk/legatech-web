export const analyticsMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-956PBX0RC6";

export const consentCookieName = "legatech_consent";
export const consentPolicyVersion = "2026-08-13";
export const consentMaxAgeSeconds = 60 * 60 * 24 * 183;
export const openCookieSettingsEvent = "legatech:open-cookie-settings";

export type AnalyticsConsent = "granted" | "denied";

export interface StoredConsent {
  analytics: AnalyticsConsent;
  savedAt: string;
  version: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const rawValue = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${consentCookieName}=`))
    ?.slice(consentCookieName.length + 1);

  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue)) as Partial<StoredConsent>;
    if (
      parsed.version !== consentPolicyVersion ||
      (parsed.analytics !== "granted" && parsed.analytics !== "denied") ||
      typeof parsed.savedAt !== "string"
    ) {
      return null;
    }
    return parsed as StoredConsent;
  } catch {
    return null;
  }
}

export function storeConsent(analytics: AnalyticsConsent): StoredConsent {
  const consent: StoredConsent = {
    analytics,
    savedAt: new Date().toISOString(),
    version: consentPolicyVersion,
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${consentCookieName}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${consentMaxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
  return consent;
}

function analyticsDisableKey() {
  return `ga-disable-${analyticsMeasurementId}`;
}

function setAnalyticsDisabled(disabled: boolean) {
  Reflect.set(window, analyticsDisableKey(), disabled);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  return window.gtag;
}

export function initializeGoogleAnalytics() {
  if (!analyticsMeasurementId || readStoredConsent()?.analytics !== "granted") return;
  setAnalyticsDisabled(false);
  const gtag = ensureGtag();
  gtag("consent", "default", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "granted",
  });
  gtag("set", "ads_data_redaction", true);
  gtag("js", new Date());
  gtag("config", analyticsMeasurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    cookie_expires: consentMaxAgeSeconds,
    cookie_update: false,
    send_page_view: false,
  });
}

export function enableGoogleAnalytics() {
  setAnalyticsDisabled(false);
  if (!window.gtag) return;
  window.gtag("consent", "update", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "granted",
  });
  window.gtag("config", analyticsMeasurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    cookie_expires: consentMaxAgeSeconds,
    cookie_update: false,
    send_page_view: false,
  });
}

function deleteCookie(name: string, domain?: string) {
  const domainPart = domain ? `; Domain=${domain}` : "";
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domainPart}${secure}`;
}

export function disableGoogleAnalytics() {
  if (typeof window === "undefined") return;
  setAnalyticsDisabled(true);
  window.gtag?.("consent", "update", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "denied",
  });

  const baseDomain = window.location.hostname.replace(/^www\./, "");
  const analyticsCookies = document.cookie
    .split("; ")
    .map((entry) => entry.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of analyticsCookies) {
    deleteCookie(name);
    deleteCookie(name, window.location.hostname);
    deleteCookie(name, baseDomain);
    deleteCookie(name, `.${baseDomain}`);
  }
}

export function trackAnalyticsEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (readStoredConsent()?.analytics !== "granted" || !window.gtag) return;
  window.gtag("event", name, parameters);
}
