// ─── Tracking Rent Driver ─────────────────────────────────────────────
// Ces identifiants sont publics (ils apparaissent dans le code de toute page
// qui utilise ces outils). Valeur par défaut ci-dessous, surchargeable par
// variable d'environnement. Tant qu'un identifiant est vide, l'outil
// correspondant n'est ni chargé ni affiché dans le bandeau.
//
//   NEXT_PUBLIC_GA4_ID                    ex. G-XXXXXXXXXX
//   NEXT_PUBLIC_GOOGLE_ADS_ID             ex. AW-123456789
//   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL     libellé de la conversion "Lead" Google Ads
//   NEXT_PUBLIC_META_PIXEL_ID             ex. 123456789012345
//
// Les événements ne partent que si le visiteur a donné son consentement.

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-7CCDPNSL3P"; // GA4 « Rent Driver – Site »
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const HAS_ANALYTICS_TOOLS = Boolean(GA4_ID);
export const HAS_ADS_TOOLS = Boolean(GOOGLE_ADS_ID || META_PIXEL_ID);
export const HAS_CONSENT_TOOLS = HAS_ANALYTICS_TOOLS || HAS_ADS_TOOLS;

type GtagFn = (...args: unknown[]) => void;
type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

type Params = Record<string, string | number | boolean | undefined>;

function clean(params: Params): Params {
  return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
}

function gtagEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, clean(params));
}

function fbqEvent(name: string, params: Params = {}, custom = false) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(custom ? "trackCustom" : "track", name, clean(params));
}

// ─── Événements métier ────────────────────────────────────────────────

export type LeadMethod = "whatsapp" | "telephone";
/** reservation = WhatsApp du simulateur, devis = devis pro, contact = tout le reste */
export type LeadIntent = "reservation" | "devis" | "contact";

export interface LeadEvent {
  method: LeadMethod;
  intent: LeadIntent;
  placement: string;
  value?: number;
}

/** Clic sur WhatsApp ou sur un numéro de téléphone = prise de contact (conversion principale). */
export function trackLead({ method, intent, placement, value }: LeadEvent) {
  const currency = value !== undefined ? "EUR" : undefined;

  // GA4 — événement recommandé, à marquer comme "événement clé"
  gtagEvent("generate_lead", { method, lead_intent: intent, placement, value, currency });

  // Google Ads — conversion directe (optionnelle si on importe l'événement clé GA4)
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
    gtagEvent("conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
      value: value ?? 1,
      currency: "EUR",
    });
  }

  // Meta — Lead pour les demandes de réservation/devis, Contact pour le reste
  fbqEvent(intent === "contact" ? "Contact" : "Lead", {
    content_name: placement,
    content_category: method,
    value,
    currency,
  });
}

export function trackSimulationStart(clientType: "particulier" | "professionnel") {
  gtagEvent("simulation_start", { client_type: clientType });
}

export function trackSimulationComplete(params: {
  distanceKm: number;
  price: number;
  driverMode?: string | null;
}) {
  gtagEvent("simulation_complete", {
    distance_km: params.distanceKm,
    driver_mode: params.driverMode ?? undefined,
    value: params.price,
    currency: "EUR",
  });
  fbqEvent(
    "SimulationComplete",
    { value: params.price, currency: "EUR", distance_km: params.distanceKm },
    true
  );
}

export function trackMetaPageView() {
  fbqEvent("PageView");
}

// ─── Chargement des scripts (appelé uniquement après consentement) ────

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
}

function consentState({ analytics, ads }: ConsentChoice) {
  const a = analytics ? "granted" : "denied";
  const m = ads ? "granted" : "denied";
  return { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m };
}

function injectScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let googleConfigured = { ga4: false, ads: false };

/** Google Consent Mode v2 (mode "basique") : rien n'est chargé avant le choix du visiteur. */
export function applyGoogleConsent(choice: ConsentChoice) {
  const wantsGa4 = choice.analytics && Boolean(GA4_ID);
  const wantsAds = choice.ads && Boolean(GOOGLE_ADS_ID);

  if (typeof window.gtag !== "function") {
    if (!wantsGa4 && !wantsAds) return; // rien à charger
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    injectScript(
      `https://www.googletagmanager.com/gtag/js?id=${GA4_ID || GOOGLE_ADS_ID}`,
      "rd-gtag"
    );
  }

  window.gtag("consent", "update", consentState(choice));

  if (wantsGa4 && !googleConfigured.ga4) {
    window.gtag("config", GA4_ID);
    googleConfigured = { ...googleConfigured, ga4: true };
  }
  if (wantsAds && !googleConfigured.ads) {
    window.gtag("config", GOOGLE_ADS_ID);
    googleConfigured = { ...googleConfigured, ads: true };
  }
}

/** Pixel Meta : chargé seulement avec le consentement "publicité", révoqué sinon. */
export function applyMetaConsent(ads: boolean) {
  if (!META_PIXEL_ID) return;

  if (!ads) {
    if (typeof window.fbq === "function") window.fbq("consent", "revoke");
    return;
  }

  if (typeof window.fbq !== "function") {
    const n: FbqFn = function fbq(...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    };
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;
    window._fbq = n;
    injectScript("https://connect.facebook.net/fr_FR/fbevents.js", "rd-meta-pixel");
    window.fbq("consent", "grant");
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  } else {
    window.fbq("consent", "grant");
  }
}

/** Supprime les cookies de mesure/pub déjà posés quand le visiteur retire son accord. */
export function clearTrackingCookies(choice: ConsentChoice) {
  const prefixes = [
    ...(choice.analytics ? [] : ["_ga"]),
    ...(choice.ads ? [] : ["_gcl", "_fbp", "_fbc"]),
  ];
  if (prefixes.length === 0) return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!prefixes.some((p) => name.startsWith(p))) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}
