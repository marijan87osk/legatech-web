// Generated from legatech-web/src/lib/{analytics,contact-submission}.ts.
(()=>{const exports={};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCookieSettingsEvent = exports.consentMaxAgeSeconds = exports.consentPolicyVersion = exports.consentCookieName = exports.analyticsMeasurementId = void 0;
exports.readStoredConsent = readStoredConsent;
exports.storeConsent = storeConsent;
exports.initializeGoogleAnalytics = initializeGoogleAnalytics;
exports.enableGoogleAnalytics = enableGoogleAnalytics;
exports.disableGoogleAnalytics = disableGoogleAnalytics;
exports.trackAnalyticsEvent = trackAnalyticsEvent;
exports.trackContactLeadOnce = trackContactLeadOnce;
exports.analyticsMeasurementId = window.LegatechRuntime.gaMeasurementId?.trim() || "G-956PBX0RC6";
exports.consentCookieName = "legatech_consent";
exports.consentPolicyVersion = "2026-08-13";
exports.consentMaxAgeSeconds = 60 * 60 * 24 * 183;
exports.openCookieSettingsEvent = "legatech:open-cookie-settings";
function readStoredConsent() {
    if (typeof document === "undefined")
        return null;
    const rawValue = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${exports.consentCookieName}=`))
        ?.slice(exports.consentCookieName.length + 1);
    if (!rawValue)
        return null;
    try {
        const parsed = JSON.parse(decodeURIComponent(rawValue));
        if (parsed.version !== exports.consentPolicyVersion ||
            (parsed.analytics !== "granted" && parsed.analytics !== "denied") ||
            typeof parsed.savedAt !== "string") {
            return null;
        }
        return parsed;
    }
    catch {
        return null;
    }
}
function storeConsent(analytics) {
    const consent = {
        analytics,
        savedAt: new Date().toISOString(),
        version: exports.consentPolicyVersion,
    };
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${exports.consentCookieName}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${exports.consentMaxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
    return consent;
}
function analyticsDisableKey() {
    return `ga-disable-${exports.analyticsMeasurementId}`;
}
function setAnalyticsDisabled(disabled) {
    Reflect.set(window, analyticsDisableKey(), disabled);
}
function ensureGtag() {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? function gtag() {
        // gtag.js recognizes Arguments commands; plain arrays mean method calls.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
    };
    return window.gtag;
}
function initializeGoogleAnalytics() {
    if (!exports.analyticsMeasurementId || readStoredConsent()?.analytics !== "granted")
        return;
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
    gtag("config", exports.analyticsMeasurementId, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
        cookie_expires: exports.consentMaxAgeSeconds,
        cookie_update: false,
        send_page_view: false,
    });
}
function enableGoogleAnalytics() {
    setAnalyticsDisabled(false);
    if (!window.gtag)
        return;
    window.gtag("consent", "update", {
        ad_personalization: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        analytics_storage: "granted",
    });
    window.gtag("config", exports.analyticsMeasurementId, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
        cookie_expires: exports.consentMaxAgeSeconds,
        cookie_update: false,
        send_page_view: false,
    });
}
function deleteCookie(name, domain) {
    const domainPart = domain ? `; Domain=${domain}` : "";
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domainPart}${secure}`;
}
function disableGoogleAnalytics() {
    if (typeof window === "undefined")
        return;
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
function trackAnalyticsEvent(name, parameters = {}) {
    if (readStoredConsent()?.analytics !== "granted" || !window.gtag)
        return;
    window.gtag("event", name, parameters);
}
// Opaque server receipts stay in memory only; never include them in GA payloads.
const trackedLeadReceipts = new Set();
function trackContactLeadOnce(receipt) {
    if (typeof window === "undefined" ||
        !/^[a-f0-9]{16}$/.test(receipt) ||
        readStoredConsent()?.analytics !== "granted" ||
        !window.gtag ||
        trackedLeadReceipts.has(receipt))
        return;
    // Mark before invoking the tag, including if a tag/extension throws afterward.
    trackedLeadReceipts.add(receipt);
    try {
        trackAnalyticsEvent("generate_lead", {
            method: "contact_form",
            ...(window.LegatechRuntime.gaDebugMode === "true" ? { debug_mode: true } : {}),
        });
    }
    catch {
        // Analytics must never turn a delivered enquiry into a visible send failure.
    }
}

window.LegatechAnalytics=exports;})();
(()=>{const exports={};const require=name=>{if(name==='./analytics')return window.LegatechAnalytics;throw Error('Unexpected dependency');};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactSubmission = createContactSubmission;
const analytics_1 = require("./analytics");
const failureMessage = "Upit trenutačno nije moguće poslati. Pokušajte ponovno ili nam se javite e-mailom.";
const connectionMessage = "Nije moguće povezati se sa servisom za slanje. Provjerite vezu ili nam pišite na info@legatech.hr.";
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function fieldErrors(value) {
    if (!isRecord(value))
        return {};
    const errors = {};
    for (const key of ["name", "email", "company", "service", "budget", "description"]) {
        if (typeof value[key] === "string")
            errors[key] = value[key];
    }
    return errors;
}
// One controller per form: the synchronous lock also covers submits before React
// has rendered the disabled button. Only an explicit new-enquiry action resets it.
function createContactSubmission(request = fetch, trackLead = analytics_1.trackContactLeadOnce) {
    let pending = false;
    let completed = false;
    return {
        get locked() { return pending || completed; },
        reset() { if (!pending)
            completed = false; },
        async submit(payload) {
            if (pending || completed)
                return { status: "ignored" };
            pending = true;
            try {
                const response = await request("/api/contact.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(payload),
                });
                const parsed = await response.json().catch(() => null);
                const result = isRecord(parsed) ? parsed : {};
                if (!response.ok || result.ok !== true || result.sent !== true ||
                    typeof result.submissionId !== "string" || !/^[a-f0-9]{16}$/.test(result.submissionId)) {
                    return {
                        status: "error",
                        message: typeof result.message === "string" ? result.message : failureMessage,
                        errors: fieldErrors(result.errors),
                    };
                }
                completed = true;
                try {
                    trackLead(result.submissionId);
                }
                catch { /* Delivery already succeeded. */ }
                return { status: "success" };
            }
            catch {
                return { status: "error", message: connectionMessage, errors: {} };
            }
            finally {
                pending = false;
            }
        },
    };
}

window.LegatechContact=exports;})();
