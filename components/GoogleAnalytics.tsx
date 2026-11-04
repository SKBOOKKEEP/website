"use client";

import Script from "next/script";
import { getGaMeasurementId } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const gaId = getGaMeasurementId();

  if (!gaId) return null;

  return (
    <>
      <Script id="consent-mode" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          
          // Initialize with denied by default (Consent Mode v2)
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
          
          // Check localStorage for prior consent
          try {
            var consent = localStorage.getItem('cookie_consent');
            if (consent === 'granted') {
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
            }
          } catch(e) {}
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
