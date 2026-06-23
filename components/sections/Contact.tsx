"use client";

import {
  useState,
  useRef,
  type FormEvent,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import Button from "../ui/Button";
import { CheckCircle, Phone, Mail, Check, Copy } from "../ui/icons";
import type { Content } from "@/content/copy";

const PHONE_E164 = "+447312026090";
const PHONE_DISPLAY = "+44 731 202 6090";
const CONTACT_EMAIL = "contact@simple-bookkeeping.co.uk";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = { name: "", email: "", phone: "", message: "" };

export default function Contact({ content }: { content: Content["contact"] }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = async (
    text: string,
    kind: "phone" | "email",
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      setCopied(kind);
      copyResetRef.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard may be unavailable; link still works
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full border border-outline text-on-surface bg-white px-4 py-3 focus:border-primary outline-none transition-colors rounded-none";
  const labelClass =
    "block font-semibold text-xs tracking-widest uppercase text-on-surface mb-1";

  return (
    <section id="contact" className="scroll-mt-20 py-20 bg-surface-bright">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary">
            {content.heading}
          </h2>

          <p className="text-base leading-6 text-on-surface-variant mt-2">
            {content.subtitle}
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-secondary-container text-on-secondary-container p-10 text-center">
            <CheckCircle className="w-12 h-12 mb-3 inline-block" aria-hidden="true" />
            <p className="font-serif text-xl font-semibold mb-1">
              {content.successTitle}
            </p>
            <p className="text-sm">{content.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="name">
                {content.nameLabel}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={content.namePlaceholder}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                {content.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={content.emailPlaceholder}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                {content.phoneLabel}{" "}
                <span className="normal-case font-normal">
                  {content.phoneOptional}
                </span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder={content.phonePlaceholder}
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                {content.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={content.messagePlaceholder}
                className={`${fieldClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm" role="alert">
                {content.errorMessage}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? content.submitting : content.submit}
            </Button>
          </form>
        )}

        <div className="">
          <p className="py-8 text-center font-semibold text-xs tracking-widest uppercase text-on-surface-variant mb-4">
            {content.orReachDirectly}
          </p>
          <div className="flex flex-col gap-4">
            <div className="group relative border border-outline bg-white shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus-within:border-primary focus-within:shadow-md">
              <a
                href={`tel:${PHONE_E164}`}
                className="block px-5 py-5 pr-14 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Phone className="w-6 h-6 text-secondary mb-2" aria-hidden="true" />
                <span className={labelClass}>{content.phoneTitle}</span>
                <span className="mt-1 block font-serif text-lg font-semibold text-primary group-hover:underline decoration-1 underline-offset-4">
                  {PHONE_DISPLAY}
                </span>
                <span className="mt-2 block text-sm text-on-surface-variant">
                  {content.tapToCall}
                </span>
              </a>
              <button
                type="button"
                onClick={(e) => copyToClipboard(PHONE_E164, "phone", e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-outline bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={content.copyPhoneAria}
              >
                {copied === "phone" ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Copy className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="group relative border border-outline bg-white shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus-within:border-primary focus-within:shadow-md">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block px-5 py-5 pr-14 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white break-words"
              >
                <Mail className="w-6 h-6 text-secondary mb-2" aria-hidden="true" />
                <span className={labelClass}>{content.emailTitle}</span>
                <span className="mt-1 block font-serif text-lg font-semibold text-primary group-hover:underline decoration-1 underline-offset-4">
                  {CONTACT_EMAIL}
                </span>
                <span className="mt-2 block text-sm text-on-surface-variant">
                  {content.tapToCompose}
                </span>
              </a>
              <button
                type="button"
                onClick={(e) => copyToClipboard(CONTACT_EMAIL, "email", e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-outline bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={content.copyEmailAria}
              >
                {copied === "email" ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Copy className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
