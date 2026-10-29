import type { ConsentChoice } from "./analytics";

// Le choix est conservé 6 mois, puis redemandé (recommandation CNIL).
const STORAGE_KEY = "rd_consent_v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

export const OPEN_CONSENT_EVENT = "rd:open-consent";

interface StoredConsent extends ConsentChoice {
  ts: number;
}

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (typeof parsed.ts !== "number" || Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return { analytics: parsed.analytics === true, ads: parsed.ads === true };
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    const value: StoredConsent = { ...choice, ts: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // stockage indisponible (navigation privée) : le choix vaut pour la session
  }
}

export function openConsentManager() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
