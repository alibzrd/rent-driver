"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  applyGoogleConsent,
  applyMetaConsent,
  clearTrackingCookies,
  HAS_ADS_TOOLS,
  HAS_ANALYTICS_TOOLS,
  HAS_CONSENT_TOOLS,
  trackLead,
  trackMetaPageView,
  type ConsentChoice,
  type LeadIntent,
} from "@/lib/analytics";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

// Le dossier /imara est un autre site hébergé dans ce projet : pas de tracking Rent Driver dessus.
const isRentDriverPath = (pathname: string | null) => !pathname?.startsWith("/imara");

/** Détecte les clics WhatsApp / téléphone n'importe où sur le site. */
function handleLeadClick(event: MouseEvent) {
  const target = event.target as Element | null;
  const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute("href") ?? "";
  const method = href.startsWith("tel:")
    ? "telephone"
    : /(^https?:\/\/)?(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i.test(href)
    ? "whatsapp"
    : null;
  if (!method) return;

  const placement =
    link.dataset.trackPlacement ||
    link.closest("section[id], header, footer")?.getAttribute("id") ||
    link.closest("header, footer")?.tagName.toLowerCase() ||
    "autre";
  const intent = (link.dataset.trackIntent as LeadIntent | undefined) ?? "contact";
  const rawValue = link.dataset.trackValue ? Number(link.dataset.trackValue) : undefined;
  const value = rawValue !== undefined && Number.isFinite(rawValue) ? rawValue : undefined;

  trackLead({ method, intent, placement, value });
}

export default function Tracking() {
  const pathname = usePathname();
  const active = isRentDriverPath(pathname);

  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, ads: false });

  // Lecture du choix enregistré (côté client uniquement)
  useEffect(() => {
    if (!HAS_CONSENT_TOOLS) return;
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage n'existe que côté client
    setChoice(stored);
    setBannerOpen(stored === null);
  }, []);

  // Application du consentement : chargement / révocation des outils
  useEffect(() => {
    if (!active || !choice) return;
    applyGoogleConsent(choice);
    applyMetaConsent(choice.ads);
  }, [active, choice]);

  // Écoute globale des clics de conversion
  useEffect(() => {
    if (!active) return;
    document.addEventListener("click", handleLeadClick, true);
    return () => document.removeEventListener("click", handleLeadClick, true);
  }, [active]);

  // PageView Meta lors des navigations internes (le premier est envoyé à l'init du pixel)
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (active) trackMetaPageView();
  }, [pathname, active]);

  // Lien "Gérer les cookies" du footer
  useEffect(() => {
    const open = () => {
      setDraft(readConsent() ?? { analytics: false, ads: false });
      setCustomizing(true);
      setBannerOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const save = useCallback((next: ConsentChoice) => {
    writeConsent(next);
    clearTrackingCookies(next);
    setChoice(next);
    setBannerOpen(false);
    setCustomizing(false);
  }, []);

  if (!HAS_CONSENT_TOOLS || !active || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="rd-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 pointer-events-none"
    >
      <div
        style={{
          backgroundColor: "#050B18",
          border: "1px solid rgba(161,227,249,0.18)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
        className="pointer-events-auto max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 text-sm"
      >
        <p id="rd-consent-title" className="text-white font-semibold mb-2">
          Vos choix concernant les cookies
        </p>
        <p className="text-white/55 leading-relaxed mb-4">
          Avec votre accord, nous utilisons des cookies pour mesurer la fréquentation du site
          {HAS_ADS_TOOLS ? " et l'efficacité de nos publicités (Google, Meta)" : ""}. Vous pouvez
          changer d&apos;avis à tout moment via le lien « Gérer les cookies » en bas de page.{" "}
          <a href="/politique-de-confidentialite" className="underline hover:text-white" style={{ color: "#A1E3F9" }}>
            En savoir plus
          </a>
        </p>

        {customizing && (
          <div className="flex flex-col gap-3 mb-5">
            <ConsentRow
              title="Nécessaires"
              description="Fonctionnement du site et mémorisation de vos choix. Toujours actifs."
              checked
              disabled
            />
            {HAS_ANALYTICS_TOOLS && (
              <ConsentRow
                title="Mesure d'audience"
                description="Google Analytics : pages vues, sources de trafic, utilisation du simulateur."
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
            )}
            {HAS_ADS_TOOLS && (
              <ConsentRow
                title="Publicité"
                description="Google Ads et Meta (Facebook, Instagram) : mesure des campagnes et publicités personnalisées."
                checked={draft.ads}
                onChange={(v) => setDraft((d) => ({ ...d, ads: v }))}
              />
            )}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
          {customizing ? (
            <button
              type="button"
              onClick={() => save(draft)}
              className="sm:mr-auto text-white/60 hover:text-white underline underline-offset-4 py-2"
            >
              Enregistrer mes choix
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDraft(choice ?? { analytics: false, ads: false });
                setCustomizing(true);
              }}
              className="sm:mr-auto text-white/60 hover:text-white underline underline-offset-4 py-2"
            >
              Personnaliser
            </button>
          )}
          <button
            type="button"
            onClick={() => save({ analytics: false, ads: false })}
            style={{ border: "1px solid rgba(161,227,249,0.5)", color: "#A1E3F9" }}
            className="px-6 py-2.5 rounded-full font-bold hover:bg-[rgba(161,227,249,0.08)] transition-colors"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={() => save({ analytics: true, ads: true })}
            style={{ border: "1px solid #A1E3F9", backgroundColor: "#A1E3F9", color: "#000000" }}
            className="px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition-all"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      className={`flex items-start justify-between gap-4 rounded-xl px-4 py-3 ${disabled ? "opacity-60" : "cursor-pointer"}`}
    >
      <span>
        <span className="block text-white font-medium">{title}</span>
        <span className="block text-white/45 text-xs mt-0.5">{description}</span>
      </span>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-[#A1E3F9]"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </label>
  );
}
