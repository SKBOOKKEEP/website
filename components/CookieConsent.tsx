"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "cookie_consent";
const CONSENT_GRANTED = "granted";
const CONSENT_DENIED = "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function setConsentMode(granted: boolean) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  const consent = granted ? "granted" : "denied";

  gtag("consent", "default", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
    wait_for_update: 500,
  });
}

export function initConsentMode() {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem(CONSENT_KEY);
  const granted = stored === CONSENT_GRANTED;
  setConsentMode(granted);
  return stored !== null;
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

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    updateConsent(true);
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    updateConsent(false);
    setVisible(false);
  }, []);

  if (!visible) return null;

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
