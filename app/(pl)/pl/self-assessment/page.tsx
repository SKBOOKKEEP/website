import { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import { pl } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";
import SelfAssessmentGuidance from "@/components/sections/SelfAssessmentGuidance";
import { saGuidance } from "@/content/self-assessment";

export const metadata: Metadata = {
  title: {
    absolute:
      "Księgowa Self Assessment St Helens i Liverpool | Sabina Krajewska",
  },
  description:
    "Self Assessment po polsku z księgową z St Helens — dla samozatrudnionych, wynajmujących i freelancerów z Liverpoolu i zdalnie z całej Wielkiej Brytanii.",
  keywords: [
    "self assessment po polsku",
    "rozliczenie self assessment UK",
    "polski księgowy self assessment",
    "deklaracja podatkowa UK",
    "rozliczenie podatku UK po polsku",
    "samozatrudniony UK podatek",
    "freelancer rozliczenie UK",
    "HMRC pomoc po polsku",
    "self employed rozliczenie",
    "polska księgowa Liverpool",
  ],
  alternates: pageAlternates("selfAssessment", "pl"),
  openGraph: {
    title: "Rozliczenie Self Assessment po polsku | St Helens i Liverpool",
    description:
      "Pomoc z rozliczeniem Self Assessment po polsku — St Helens, Liverpool i zdalnie w całej Wielkiej Brytanii.",
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/self-assessment`,
    type: "website",
    locale: "pl_PL",
    alternateLocale: ["en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rozliczenie Self Assessment po polsku | St Helens i Liverpool",
    description:
      "Pomoc z rozliczeniem Self Assessment po polsku — St Helens, Liverpool i zdalnie w całej Wielkiej Brytanii.",
  },
};

const benefits = [
  "Dokładne obliczenie należnego podatku",
  "Maksymalizacja odliczeń i kosztów uzyskania przychodu",
  "Uniknięcie kar za spóźnione lub błędne rozliczenie",
  "Komunikacja z HMRC w Twoim imieniu",
  "Wsparcie przez cały rok, nie tylko przed terminem",
  "Obsługa w języku polskim i angielskim",
];


export default function SelfAssessmentPagePl() {
  return (
    <>
      <NavBar content={pl.nav} locale="pl" routeKey="selfAssessment" />

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-primary-container overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-tight font-bold text-surface-bright mb-6">
                  Rozliczenie Self Assessment po polsku — księgowa z St Helens
                </h1>
                <p className="text-lg text-on-primary-container mb-8 max-w-xl">
                  Pomagam z rozliczeniem Self Assessment w HMRC — po polsku i po
                  angielsku. Jeśli prowadzisz jednoosobową działalność (sole
                  trader), pracujesz jako freelancer albo masz dodatkowe dochody
                  do zadeklarowania, zadbam o poprawne i terminowe złożenie
                  Twojej deklaracji. Działam z St Helens i pracuję zdalnie z
                  klientami z Liverpoolu i całej Wielkiej Brytanii.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/pl#booking" variant="outline-light" size="lg">
                    Umów bezpłatną konsultację
                  </Button>
                  <Button href="/pl#contact" variant="outline-light" size="lg">
                    Skontaktuj się
                  </Button>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/biuro.png"
                  alt="Profesjonalne biuro księgowe"
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
              Czym jest Self Assessment?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-on-surface-variant mb-4">
                  Self Assessment to system, za pomocą którego HMRC (brytyjski
                  urząd skarbowy) pobiera podatek dochodowy od osób, które nie
                  mają podatku automatycznie potrącanego przez PAYE. Jeśli
                  jesteś samozatrudniony, freelancerem lub masz dochody z innych
                  źródeł niż etat, prawdopodobnie musisz złożyć deklarację Self
                  Assessment.
                </p>
                <p className="text-on-surface-variant mb-4">
                  Rok podatkowy trwa od 6 kwietnia do 5 kwietnia następnego
                  roku. Deklaracje online muszą być złożone do{" "}
                  <strong>31 stycznia</strong> po zakończeniu roku podatkowego,
                  a płatność jest wymagana do tego samego terminu.
                </p>
                <p className="text-on-surface-variant">
                  Spóźnione złożenie lub błędy mogą skutkować karami i odsetkami.
                  Współpraca z profesjonalną księgową gwarantuje, że Twoja
                  deklaracja będzie poprawna i złożona na czas.
                </p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-lg">
                <h3 className="font-semibold text-primary mb-4">
                  Kluczowe terminy
                </h3>
                <ul className="space-y-3 text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      5 paź
                    </span>
                    <span>
                      Rejestracja do Self Assessment, jeśli po raz pierwszy
                      musisz złożyć deklarację za poprzedni rok podatkowy
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 paź
                    </span>
                    <span>Termin na deklarację papierową</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 sty
                    </span>
                    <span>
                      Termin na deklarację online i płatność podatku
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-secondary shrink-0">
                      31 lip
                    </span>
                    <span>
                      Druga rata zaliczki na podatek (jeśli dotyczy)
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-on-surface-variant">
                  {saGuidance.pl.deadlineNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <SelfAssessmentGuidance locale="pl" />

        {/* Benefits */}
        <section className="py-20 bg-primary-container">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-8">
              Dlaczego warto skorzystać z pomocy profesjonalisty?
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
                  alt="Sabina Krajewska - polska księgowa w Liverpool i St Helens"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
                  Twoja polska księgowa w UK
                </h2>
                <p className="text-on-surface-variant mb-4">
                  Nazywam się Sabina Krajewska i jestem księgową
                  z siedzibą w St Helens, obsługującą klientów w Liverpoolu,
                  Merseyside i całej Wielkiej Brytanii. Oferuję osobistą,
                  profesjonalną obsługę zarówno po polsku, jak i po angielsku.
                </p>
                <p className="text-on-surface-variant mb-6">
                  Niezależnie czy składasz pierwszą deklarację Self Assessment,
                  czy szukasz bardziej niezawodnego wsparcia, jestem tutaj, aby
                  pomóc Ci z pewnością poruszać się po wymogach HMRC.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/pl#booking" size="lg">
                    Umów bezpłatną konsultację
                  </Button>
                  <Button href={`tel:${PHONE_E164}`} variant="outline" size="lg">
                    Zadzwoń: {PHONE_DISPLAY}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
