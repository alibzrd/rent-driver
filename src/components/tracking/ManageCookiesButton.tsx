"use client";

import { HAS_CONSENT_TOOLS } from "@/lib/analytics";
import { openConsentManager } from "@/lib/consent";

export default function ManageCookiesButton({ className }: { className?: string }) {
  if (!HAS_CONSENT_TOOLS) return null;
  return (
    <button type="button" onClick={openConsentManager} className={className}>
      Gérer les cookies
    </button>
  );
}
