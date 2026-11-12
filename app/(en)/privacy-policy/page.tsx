import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { en } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Sabina Krajewska Bookkeeping. Learn how we collect, use, and protect your personal data.",
  alternates: pageAlternates("privacy", "en"),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="privacy" />
      <main className="mt-20 py-16 px-5 md:px-16">
        <article className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">
            Privacy Policy
          </h1>

          <p className="text-on-surface-variant mb-6">
            <strong>Effective date:</strong> November 2024
          </p>

          <p className="mb-6">
            Sabina Krajewska Bookkeeping (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you visit our website at{" "}
            <a href={SITE_URL} className="text-primary hover:underline">
              {SITE_URL}
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Contact information:</strong> Name, email address, and
              phone number when you submit our contact form or book a
              consultation.
            </li>
            <li>
              <strong>Usage data:</strong> Information about how you use our
              website, including pages visited, time spent, and referral source,
              collected via Google Analytics (when you consent to cookies).
            </li>
            <li>
              <strong>Device information:</strong> Browser type, operating
              system, and IP address for security and analytics purposes.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Respond to your enquiries and provide bookkeeping services</li>
            <li>Schedule consultations via Calendly</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            3. Cookies and Analytics
          </h2>
          <p className="mb-4">
            We use Google Analytics to understand how visitors interact with our
            website. In compliance with{" "}
            <strong>Google Consent Mode v2</strong>, we only collect analytics
            data after you provide consent via our cookie banner.
          </p>
          <p className="mb-4">
            Without your consent, no tracking cookies are set and no personal
            data is transmitted to Google Analytics.
          </p>
          <p className="mb-6">
            You can change your cookie preferences at any time by clearing your
            browser cookies and revisiting our website.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            4. Data Sharing
          </h2>
          <p className="mb-6">
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Service providers:</strong> Such as Calendly (scheduling),
              Resend (email delivery), and Google (analytics) — only when
              necessary to provide our services.
            </li>
            <li>
              <strong>Legal authorities:</strong> If required by law or to
              protect our rights.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            5. Data Retention
          </h2>
          <p className="mb-6">
            We retain your personal information only for as long as necessary to
            fulfil the purposes outlined in this policy, or as required by law.
            Contact form submissions are retained for up to 2 years unless you
            become a client, in which case records are kept in accordance with
            HMRC requirements.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            6. Your Rights
          </h2>
          <p className="mb-4">Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p className="mb-6">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:contact@simple-bookkeeping.co.uk"
              className="text-primary hover:underline"
            >
              contact@simple-bookkeeping.co.uk
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            7. Contact Us
          </h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact:
          </p>
          <address className="not-italic mb-6">
            <strong>Sabina Krajewska Bookkeeping</strong>
            <br />
            St Helens, WA9
            <br />
            Merseyside, United Kingdom
            <br />
            Email:{" "}
            <a
              href="mailto:contact@simple-bookkeeping.co.uk"
              className="text-primary hover:underline"
            >
              contact@simple-bookkeeping.co.uk
            </a>
            <br />
            Phone:{" "}
            <a href={`tel:${PHONE_E164}`} className="text-primary hover:underline">
              {PHONE_DISPLAY}
            </a>
          </address>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            8. Changes to This Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </article>
      </main>
      <Footer content={en.footer} locale="en" />
    </>
  );
}
