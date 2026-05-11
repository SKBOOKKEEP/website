"use client";

import { useState, useEffect } from "react";
import Button from "./ui/Button";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#");

  useEffect(() => {
    const sections = ["services", "about", "booking", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-outline-variant"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 h-20 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-2xl font-bold text-primary"
          aria-label="Sabina Krajewska — home"
        >
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
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
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
