import { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import { en } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";
import SelfAssessmentGuidance from "@/components/sections/SelfAssessmentGuidance";
import SelfAssessmentDepth from "@/components/sections/SelfAssessmentDepth";
import { saGuidance } from "@/content/self-assessment";

export const metadata: Metadata = {
  title: {
    absolute:
      "Self Assessment Tax Returns in St Helens & Liverpool | Sabina Krajewska",
  },
  description:
    "Self Assessment tax returns for sole traders, landlords and freelancers in St Helens and Liverpool, in English or Polish. Get in touch to discuss your return.",
  keywords: [
    "self assessment Liverpool",
    "self assessment St Helens",
    "tax return Liverpool",
    "self assessment accountant Liverpool",
    "HMRC tax return help",
    "sole trader tax return",
    "freelancer tax return UK",
    "Polish accountant self assessment",
    "self employed tax return",
    "personal tax return Liverpool",
  ],
  alternates: pageAlternates("selfAssessment", "en"),
  openGraph: {
    title: "Self Assessment Tax Returns | St Helens & Liverpool",
    description:
      "Help with your Self Assessment tax return in St Helens, Liverpool and remotely across the UK, in English or Polish.",
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/self-assessment-tax-returns`,
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self Assessment Tax Returns | St Helens & Liverpool",
    description:
      "Help with your Self Assessment tax return in St Helens, Liverpool and remotely across the UK, in English or Polish.",
  },
};

const benefits = [
  "Accurate calculation of your tax liability",
  "Maximise allowable expenses and deductions",
  "Avoid penalties for late or incorrect filing",
  "Direct communication with HMRC on your behalf",
  "Year-round support, not just at deadline time",
  "Service available in English and Polish",
];


export default function SelfAssessmentPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="selfAssessment" />

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-primary-container overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-tight font-bold text-surface-bright mb-6">
                  Self Assessment Tax Returns in Liverpool & St Helens
                </h1>
                <p className="text-lg text-on-primary-container mb-8 max-w-xl">
                  Expert help with your HMRC Self Assessment tax return. Whether
                  you&apos;re a sole trader, freelancer, or have additional
                  income to declare, I&apos;ll ensure your return is accurate,
                  compliant, and filed on time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/#booking" variant="outline-light" size="lg">
                    Book Free Consultation
                  </Button>
                  <Button href="/#contact" variant="outline-light" size="lg">
                    Get in Touch
                  </Button>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/biuro.png"
                  alt="Professional accounting office workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Self Assessment */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
              What is Self Assessment?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-on-surface-variant mb-4">
                  Self Assessment is the system HMRC uses to collect Income Tax
                  from individuals who don&apos;t have their tax automatically
                  deducted through PAYE. If you&apos;re self-employed, a
                  freelancer, or have income from sources other than
                  employment, you&apos;ll likely need to file a Self Assessment
                  tax return.
                </p>
                <p className="text-on-surface-variant mb-4">
                  The tax year runs from 6 April to 5 April the following year.
                  Online returns must be filed by <strong>31 January</strong>{" "}
                  following the end of the tax year, with payment due by the
                  same date.
                </p>
                <p className="text-on-surface-variant">
                  Filing late or making errors can result in penalties and
                  interest charges. Working with a professional accountant
                  ensures your return is correct and submitted on time.
                </p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-lg">
                <h3 className="font-semibold text-primary mb-4">
                  Key Deadlines
                </h3>
                <ul className="space-y-3 text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      5 Oct
                    </span>
                    <span>
                      Register for Self Assessment if you need to file for
                      the previous tax year for the first time
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 Oct
                    </span>
                    <span>Paper tax return deadline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 Jan
                    </span>
                    <span>
                      Online tax return deadline & payment due date
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 Jul
                    </span>
                    <span>Second payment on account (if applicable)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-on-surface-variant">
                  {saGuidance.en.deadlineNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <SelfAssessmentGuidance locale="en" />
        <SelfAssessmentDepth locale="en" />

        {/* Benefits */}
        <section className="py-20 bg-primary-container">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-8">
              Why Choose Professional Help?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 text-on-primary-container"
                >
                  <CheckCircle
                    className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me / CTA */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/Sabina.jpeg"
                  alt="Sabina Krajewska - Accountant in Liverpool and St Helens"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
                  Your Local Accountant in St Helens
                </h2>
                <p className="text-on-surface-variant mb-4">
                  I&apos;m Sabina Krajewska, an accountant and bookkeeper based in
                  St Helens serving clients across Liverpool, Merseyside, and the
                  wider UK. I offer a personal, professional service in both
                  English and Polish.
                </p>
                <p className="text-on-surface-variant mb-6">
                  Whether you&apos;re filing your first Self Assessment or
                  looking for more reliable support, I&apos;m here to help you
                  navigate HMRC requirements with confidence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/#booking" size="lg">
                    Book Free Consultation
                  </Button>
                  <Button href={`tel:${PHONE_E164}`} variant="outline" size="lg">
                    Call {PHONE_DISPLAY}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer content={en.footer} locale="en" />
    </>
  );
}
