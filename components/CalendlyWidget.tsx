"use client";

import { useEffect } from "react";

interface Props {
  url: string;
}

export default function CalendlyWidget({ url }: Props) {
  useEffect(() => {
    if (!url) return;
    if (document.querySelector('script[src*="calendly.com"]')) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const el = document.querySelector('script[src*="calendly.com"]');
      el?.remove();
    };
  }, [url]);

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <span className="material-symbols-outlined text-6xl text-on-primary-container mb-4">
          calendar_month
        </span>
        <p className="font-semibold text-sm text-on-primary-container">Booking Calendar</p>
        <p className="text-xs text-on-primary-container mt-1 max-w-[220px]">
          Set NEXT_PUBLIC_CALENDLY_URL in your environment to enable online booking
        </p>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
