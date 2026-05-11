"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Button from "../ui/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <section id="contact" className="py-20 bg-surface-bright">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary">
            Get in Touch
          </h2>
          <p className="text-base leading-6 text-on-surface-variant mt-2">
            Have a general inquiry? Fill out the form below and I&apos;ll get back
            to you within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-secondary-container text-on-secondary-container p-10 text-center">
            <span className="material-symbols-outlined text-5xl mb-3 block" aria-hidden="true">
              check_circle
            </span>
            <p className="font-serif text-xl font-semibold mb-1">Thank you!</p>
            <p className="text-sm">Your message has been received. I&apos;ll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Smith"
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone Number <span className="normal-case font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+44 0000 000000"
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can I help your business?"
                className={`${fieldClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm" role="alert">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send Inquiry"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
