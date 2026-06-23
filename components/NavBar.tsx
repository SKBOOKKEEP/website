"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Menu, XClose } from "./ui/icons";
import type { Content, Locale } from "@/content/copy";

/** Section ids in document order (after hero), for scroll-spy */
const SECTION_IDS = ["about", "services", "booking", "contact"] as const;

const NAVBAR_HEIGHT_PX = 80;

const LOCALES: { code: Locale; href: string; label: string }[] = [
  { code: "en", href: "/", label: "EN" },
  { code: "pl", href: "/pl", label: "PL" },
];

function LanguageSwitcher({
  locale,
  ariaLabel,
}: {
  locale: Locale;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex items-center gap-1 text-xs font-semibold tracking-widest uppercase"
      aria-label={ariaLabel}
    >
      {LOCALES.map(({ code, href, label }, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-outline-variant">/</span>}
          {code === locale ? (
            <span aria-current="true" className="text-primary">
              {label}
            </span>
          ) : (
            <a
              href={href}
              className="text-on-surface-variant hover:text-primary transition-colors"
              hrefLang={code === "pl" ? "pl-PL" : "en-GB"}
            >
              {label}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

export default function NavBar({
  content,
  locale,
}: {
  content: Content["nav"];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#");

  useEffect(() => {
    let raf = 0;

    const updateActiveFromScroll = () => {
      // Activation line: just below fixed navbar. Pick the section that owns this
      // scroll position [top, nextTop), so short sections (e.g. Services) still highlight.
      const line = window.scrollY + NAVBAR_HEIGHT_PX + 12;

      const first = document.getElementById(SECTION_IDS[0]);
      if (!first) {
        setActive("#");
        return;
      }
      const firstTop = first.getBoundingClientRect().top + window.scrollY;
      if (line < firstTop) {
        setActive((prev) => (prev === "#" ? prev : "#"));
        return;
      }

      for (let i = 0; i < SECTION_IDS.length; i++) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const nextId = SECTION_IDS[i + 1];
        const nextEl = nextId ? document.getElementById(nextId) : null;
        const nextTop = nextEl
          ? nextEl.getBoundingClientRect().top + window.scrollY
          : Number.POSITIVE_INFINITY;

        if (line >= top && line < nextTop) {
          const next = `#${id}`;
          setActive((prev) => (prev === next ? prev : next));
          return;
        }
      }

      const lastId = SECTION_IDS[SECTION_IDS.length - 1];
      setActive((prev) => (prev === `#${lastId}` ? prev : `#${lastId}`));
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", onScrollOrResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full overflow-x-hidden bg-white border-b border-outline-variant"
      role="banner"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl min-w-0 items-center justify-between gap-2 px-5 md:gap-6 md:px-16">
        <a
          href="#"
          className="flex min-w-0 flex-1 items-center gap-2 font-serif font-bold text-primary sm:gap-3"
          aria-label={content.homeAriaLabel}
        >
          <span className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10">
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </span>
          <div className="min-w-0">
            <span className="block truncate text-base leading-tight sm:text-xl md:text-2xl">
              {content.brand}
            </span>
            <span className="block truncate text-xs text-on-surface-variant">
              {content.brandSub}
            </span>
          </div>
        </a>

        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <nav
            className="flex gap-6 items-center"
            aria-label={content.mainNavAriaLabel}
          >
            {content.links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`font-semibold text-xs tracking-widest uppercase transition-colors pb-0.5 ${
                  active === href
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher
            locale={locale}
            ariaLabel={content.langSwitchAriaLabel}
          />
          <Button href="#booking" className="shrink-0">
            {content.bookCta}
          </Button>
        </div>

        <button
          type="button"
          className="shrink-0 p-2 text-primary md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? content.closeMenu : content.openMenu}
          aria-expanded={open}
        >
          {open ? (
            <XClose className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-outline-variant px-5 py-4 space-y-1">
          {content.links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block font-semibold text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant last:border-0"
            >
              {label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-3">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center justify-center bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-on-primary transition-all hover:opacity-90"
            >
              {content.bookCta}
            </a>
            <LanguageSwitcher
              locale={locale}
              ariaLabel={content.langSwitchAriaLabel}
            />
          </div>
        </div>
      )}
    </header>
  );
}
