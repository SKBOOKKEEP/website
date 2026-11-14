import type { Locale } from "@/content/copy";
import { FAQ_CHECKED_ON, formatDate, saFaq } from "@/content/self-assessment";
import { SITE_URL } from "@/lib/seo";
import { getRoute } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * FAQPage JSON-LD for the Self Assessment FAQ (T3.2), tied to the single
 * #business entity and this page's #webpage node. Built from the same copy
 * as the visible FAQ, so the two always match word for word. Optional per
 * the task's acceptance criteria — never described in visible copy as a
 * promised or guaranteed rich result.
 */
export function selfAssessmentFaqJsonLd(locale: Locale) {
  const c = saFaq[locale];
  const route = getRoute("selfAssessment");
  const url = abs(route[locale]!.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#sa-faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/** Answer-first Self Assessment FAQ (T3.2), shared by the EN and PL pages. */
export default function SelfAssessmentFaq({ locale }: { locale: Locale }) {
  const c = saFaq[locale];
  const checkedOn = formatDate(FAQ_CHECKED_ON, locale);

  return (
    <section className="py-20 bg-surface" aria-labelledby="sa-faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(selfAssessmentFaqJsonLd(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <h2
          id="sa-faq"
          className="font-serif text-3xl font-semibold text-primary mb-8"
        >
          {c.heading}
        </h2>
        <div className="space-y-6 max-w-3xl">
          {c.faqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold text-primary mb-1">{f.question}</h3>
              <p className="text-on-surface-variant">{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-sm text-on-surface-variant max-w-3xl">
          <h3 className="font-semibold text-primary mb-2">
            {c.sourcesHeading(checkedOn)}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {c.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} className={linkClass}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
