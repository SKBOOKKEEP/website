"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Menu, XClose } from "./ui/icons";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

/** Section ids in document order (after hero), for scroll-spy */
const SECTION_IDS = ["about", "services", "booking", "contact"] as const;

const NAVBAR_HEIGHT_PX = 80;

export default function NavBar() {
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
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-outline-variant"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 h-20 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 font-serif text-2xl font-bold text-primary"
          aria-label="Sabina Krajewska — home"
        >
          <span className="relative h-10 w-10 shrink-0">
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </span>
          Sabina Krajewska
        </a>

        <nav className="hidden md:flex gap-6 items-center" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
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

        <Button href="#booking" className="hidden md:inline-flex">
          Book Consultation
        </Button>

        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
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
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block font-semibold text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary py-3 border-b border-outline-variant last:border-0"
            >
              {label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-full font-semibold text-xs tracking-widest uppercase px-6 py-3 bg-primary text-on-primary hover:opacity-90 transition-all"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
