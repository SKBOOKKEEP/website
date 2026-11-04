"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import { getGaMeasurementId } from "@/lib/analytics";

const CONSENT_KEY = "cookie_consent";
const CONSENT_GRANTED = "granted";
const CONSENT_DENIED = "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function updateConsent(granted: boolean) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CONSENT_KEY, granted ? CONSENT_GRANTED : CONSENT_DENIED);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  const consent = granted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  });
}

export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === CONSENT_GRANTED) return "granted";
  if (stored === CONSENT_DENIED) return "denied";
  return null;
}

interface CookieConsentProps {
  locale: "en" | "pl";
}

const copy = {
  en: {
    message:
      "We use cookies to analyse website traffic and improve your experience. ",
    privacyLink: "Privacy Policy",
    accept: "Accept",
    decline: "Decline",
  },
  pl: {
    message:
      "Używamy plików cookie do analizy ruchu na stronie i poprawy wrażeń użytkownika. ",
    privacyLink: "Polityka prywatności",
    accept: "Akceptuję",
    decline: "Odrzucam",
  },
};

function getSnapshot(): boolean {
  const gaId = getGaMeasurementId();
  if (!gaId) return false;
  return getStoredConsent() === null;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const gaId = getGaMeasurementId();
  const t = copy[locale];

  const handleAccept = useCallback(() => {
    updateConsent(true);
    setDismissed(true);
  }, []);

  const handleDecline = useCallback(() => {
    updateConsent(false);
    setDismissed(true);
  }, []);

  if (!gaId || !shouldShow || dismissed) return null;

  const privacyHref = locale === "pl" ? "/pl/privacy-policy" : "/privacy-policy";

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 bg-surface-container-lowest border-t border-outline-variant shadow-lg"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-on-surface flex-1">
          {t.message}
          <a
            href={privacyHref}
            className="underline hover:text-primary transition-colors"
          >
            {t.privacyLink}
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-widest border border-outline text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-primary text-on-primary hover:opacity-90 transition-colors cursor-pointer"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
