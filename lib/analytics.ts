declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "cookie_consent";

export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;
}

export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted") return "granted";
  if (stored === "denied") return "denied";
  return null;
}

export function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const gaId = getGaMeasurementId();
  if (!gaId) return false;
  const consent = getStoredConsent();
  return consent === "granted";
}

type GA4EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  eventName: string,
  params?: GA4EventParams
): void {
  if (!isAnalyticsEnabled()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackCalendlyBooking(): void {
  trackEvent("calendly_booking_confirmed", {
    event_category: "engagement",
    event_label: "calendly",
  });
}

export function trackEnquiryFormSubmit(): void {
  trackEvent("enquiry_form_submit", {
    event_category: "engagement",
    event_label: "contact_form",
  });
}

export function trackPhoneClick(): void {
  trackEvent("phone_click", {
    event_category: "engagement",
    event_label: "tel_link",
  });
}
