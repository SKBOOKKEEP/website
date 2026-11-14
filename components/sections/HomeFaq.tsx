import type { Locale } from "@/content/copy";
import { en, pl } from "@/content/copy";

const copy: Record<Locale, typeof en.faq> = { en: en.faq, pl: pl.faq };

/**
 * Short, answer-first home page FAQ (T3.2). Service-scope questions only —
 * no tax figures or dates here. FAQPage JSON-LD is optional per the task's
 * acceptance criteria and is included below purely as structured data for
 * search engines and AI assistants; it is never described in visible copy as
 * a promised or guaranteed rich result.
 */
export function homeFaqJsonLd(locale: Locale, url: string) {
  const c = copy[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: c.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

export default function HomeFaq({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <section className="py-20 bg-surface-container-lowest" aria-labelledby="home-faq">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <h2
          id="home-faq"
          className="font-serif text-3xl font-semibold text-primary mb-8"
        >
          {c.heading}
        </h2>
        <div className="space-y-6 max-w-3xl">
          {c.items.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold text-primary mb-1">{f.question}</h3>
              <p className="text-on-surface-variant">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
