import type { Locale } from "@/content/copy";

/**
 * Copy for the HMRC support pages (EN /hmrc-support, PL /pl/pomoc-hmrc),
 * task T2.10. Both languages carry the same facts.
 *
 * Owner-confirmed scope (Sabina, 13 Nov 2026): corresponds with HMRC on a
 * client's behalf, handles routine HMRC enquiries and letters, and supports
 * clients through HMRC compliance checks and investigations, as part of her
 * bookkeeping/accountancy service. No formal HMRC agent (64-8) authorisation
 * status, professional body membership or other credential is claimed beyond
 * the site-wide AML supervision / ICO registration / insurance facts already
 * shown in the footer. No invented figures, prices or outcomes. Calm,
 * practical tone — no fear-based copy about investigations.
 */
export const FIGURES_CHECKED_ON = "2026-11-13";

export const GOV_UK = {
  compliance: "https://www.gov.uk/guidance/hmrc-compliance-checks-help-and-support",
  disagree: "https://www.gov.uk/tax-appeals",
  contactHmrc: "https://www.gov.uk/government/organisations/hm-revenue-customs/contact-hmrc",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type HmrcSupportCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  ctaBook: string;
  ctaContact: string;

  scopeHeading: string;
  scopeIntro: string;
  scope: { title: string; text: string }[];

  whatHappensHeading: string;
  whatHappensIntro: string;
  whatHappens: string[];
  whatHappensLink: Link;

  expectHeading: string;
  expect: string[];

  statusHeading: string;
  statusParagraphs: string[];

  workingHeading: string;
  working: string[];

  faqHeading: string;
  faqs: Faq[];

  disclaimer: (checkedOn: string) => string;
  sourcesHeading: string;
  sources: Link[];
};

export const hmrcSupportCopy: Record<Locale, HmrcSupportCopy> = {
  en: {
    title: "HMRC Support & Correspondence | Sabina Krajewska",
    description:
      "Help dealing with HMRC letters, routine enquiries and compliance checks, as part of a bookkeeping and accountancy service in St Helens and Liverpool.",
    ogTitle: "HMRC support: letters, enquiries and compliance checks",
    ogDescription:
      "Calm, practical help corresponding with HMRC, handling routine letters and enquiries, and support through compliance checks, in English or Polish.",
    h1: "Help dealing with HMRC",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens. As part of my bookkeeping and accountancy service, I help clients correspond with HMRC, deal with routine letters and enquiries, and get support through compliance checks and investigations. I work remotely with clients in St Helens, Liverpool and across the UK, in English or Polish.",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    scopeHeading: "What this covers",
    scopeIntro: "HMRC support, as part of my bookkeeping and accountancy service, covers:",
    scope: [
      {
        title: "Corresponding with HMRC",
        text: "Writing to HMRC on your behalf and helping you understand and respond to what they send you.",
      },
      {
        title: "Routine enquiries and letters",
        text: "Everyday HMRC letters and questions — for example about a tax return, a payment, or a change to your details.",
      },
      {
        title: "Compliance checks and investigations",
        text: "Support through an HMRC compliance check or investigation into your tax affairs, from the first letter through to its conclusion.",
      },
    ],

    whatHappensHeading: "What happens in a compliance check",
    whatHappensIntro:
      "HMRC opens compliance checks for all sorts of reasons, and most are resolved without anything being wrong. GOV.UK describes the general process:",
    whatHappens: [
      "HMRC writes to tell you a compliance check is starting, and what it's about.",
      "HMRC may ask to see records or information, or arrange a visit or call.",
      "You, or I on your behalf, respond with the records and explanations HMRC has asked for.",
      "HMRC tells you the outcome once the check is finished. If you disagree with it, there's a process for appealing.",
    ],
    whatHappensLink: {
      label: "HMRC compliance checks: help and support (GOV.UK)",
      href: GOV_UK.compliance,
    },

    expectHeading: "What to expect from me",
    expect: [
      "I read what HMRC has sent and explain it to you in plain English (or Polish).",
      "I help you gather the records and information HMRC has asked for.",
      "I draft or review correspondence to HMRC before it's sent.",
      "I keep you up to date as the check or enquiry progresses, and explain what happens next.",
    ],

    statusHeading: "A note on what this service is",
    statusParagraphs: [
      "This support is part of my bookkeeping and accountancy service — it isn't a separate legal or tax advice service, and I don't claim to hold a formal professional qualification beyond what's stated elsewhere on this site.",
      "I'm supervised by HMRC for anti-money laundering, registered with the ICO and insured, as shown in the footer of this site.",
      "For formal representation, such as being named as your agent on a specific matter, we agree the exact terms directly before any work starts.",
    ],

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool and across the UK.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through your situation.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "I've had a letter from HMRC. Can you help?",
        answer:
          "Yes. Send me the letter and I'll read it, explain what it means, and help you work out what to do next.",
      },
      {
        question: "Do you help with HMRC compliance checks and investigations?",
        answer:
          "Yes. I support clients through compliance checks and investigations, from the first letter through to the outcome, alongside my bookkeeping and accountancy work.",
      },
      {
        question: "Are you a registered HMRC agent?",
        answer:
          "This support is part of my bookkeeping and accountancy service. For formal representation on a specific matter, we agree the exact terms directly before any work starts.",
      },
      {
        question: "Does a compliance check mean I've done something wrong?",
        answer:
          "Not necessarily. HMRC opens checks for all sorts of reasons, and most are resolved without anything being wrong.",
      },
      {
        question: "Can you help if I'm not in St Helens or Liverpool?",
        answer: "Yes. I work remotely with clients across the UK.",
      },
      {
        question: "Can you help in Polish?",
        answer: "Yes. I work in English and Polish.",
      },
    ],

    disclaimer: (checkedOn) =>
      `This page gives general information, not legal or tax advice. For formal representation, the specific terms are agreed with me directly. Checked against GOV.UK on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "HMRC compliance checks: help and support", href: GOV_UK.compliance },
      { label: "Disagree with a tax decision", href: GOV_UK.disagree },
      { label: "Contact HMRC", href: GOV_UK.contactHmrc },
    ],
  },

  pl: {
    title: "Pomoc w kontaktach z HMRC | Sabina Krajewska",
    description:
      "Pomoc w pismach, bieżących sprawach i kontrolach (compliance checks) HMRC — w ramach księgowości i obsługi rachunkowej w St Helens i Liverpoolu.",
    ogTitle: "Pomoc z HMRC: pisma, sprawy i kontrole",
    ogDescription:
      "Spokojna, praktyczna pomoc w korespondencji z HMRC, bieżących pismach i sprawach oraz wsparcie przy kontrolach, po polsku lub po angielsku.",
    h1: "Pomoc w kontaktach z HMRC",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens. W ramach księgowości i obsługi rachunkowej pomagam klientom w korespondencji z HMRC, w bieżących pismach i sprawach oraz we wsparciu podczas kontroli (compliance checks) i postępowań wyjaśniających. Pracuję zdalnie z klientami z St Helens, Liverpoolu i całej Wielkiej Brytanii, po polsku lub po angielsku.",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    scopeHeading: "Czego to dotyczy",
    scopeIntro: "Pomoc w sprawach HMRC, jako część księgowości i obsługi rachunkowej, obejmuje:",
    scope: [
      {
        title: "Korespondencja z HMRC",
        text: "Pisanie do HMRC w Twoim imieniu oraz pomoc w zrozumieniu pism od HMRC i odpowiedzi na nie.",
      },
      {
        title: "Bieżące sprawy i pisma",
        text: "Zwykłe pisma i pytania od HMRC — na przykład dotyczące zeznania podatkowego, płatności lub zmiany danych.",
      },
      {
        title: "Kontrole i postępowania wyjaśniające",
        text: "Wsparcie podczas kontroli (compliance check) lub postępowania wyjaśniającego dotyczącego Twoich spraw podatkowych — od pierwszego pisma aż do jego zakończenia.",
      },
    ],

    whatHappensHeading: "Jak wygląda kontrola (compliance check)",
    whatHappensIntro:
      "HMRC wszczyna kontrole z różnych powodów, a większość kończy się bez stwierdzenia nieprawidłowości. GOV.UK opisuje ogólny przebieg:",
    whatHappens: [
      "HMRC informuje pismem, że rozpoczyna kontrolę, i czego ona dotyczy.",
      "HMRC może poprosić o dokumenty lub informacje albo zorganizować wizytę lub rozmowę.",
      "Ty, albo ja w Twoim imieniu, odpowiadasz, przekazując dokumenty i wyjaśnienia, o które poprosiło HMRC.",
      "Po zakończeniu kontroli HMRC informuje o wyniku. Jeśli się z nim nie zgadzasz, istnieje procedura odwoławcza.",
    ],
    whatHappensLink: {
      label: "Kontrole HMRC (compliance checks): pomoc i wsparcie (GOV.UK, po angielsku)",
      href: GOV_UK.compliance,
    },

    expectHeading: "Czego możesz się po mnie spodziewać",
    expect: [
      "Czytam pismo od HMRC i wyjaśniam Ci je po polsku (lub po angielsku).",
      "Pomagam zebrać dokumenty i informacje, o które poprosiło HMRC.",
      "Przygotowuję lub sprawdzam korespondencję do HMRC, zanim zostanie wysłana.",
      "Informuję Cię na bieżąco o postępach kontroli lub sprawy i wyjaśniam kolejne kroki.",
    ],

    statusHeading: "Czym jest ta usługa",
    statusParagraphs: [
      "Ta pomoc jest częścią mojej księgowości i obsługi rachunkowej — to nie jest odrębna usługa doradztwa prawnego czy podatkowego, i nie twierdzę, że posiadam formalne kwalifikacje zawodowe poza tymi, które są wskazane w innym miejscu na tej stronie.",
      "Podlegam nadzorowi HMRC w zakresie przeciwdziałania praniu pieniędzy, jestem zarejestrowana w ICO i posiadam ubezpieczenie — informacje te znajdziesz w stopce tej strony.",
      "W przypadku formalnej reprezentacji, np. wystąpienia jako Twój pełnomocnik w konkretnej sprawie, dokładne warunki ustalamy bezpośrednio, zanim rozpoczniemy pracę.",
    ],

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Działam w St Helens i pracuję zdalnie z klientami z Liverpoolu i całej Wielkiej Brytanii.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twojej sytuacji.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Dostałem pismo od HMRC. Czy możesz pomóc?",
        answer:
          "Tak. Prześlij mi pismo, a ja je przeczytam, wyjaśnię, co oznacza, i pomogę ustalić dalsze kroki.",
      },
      {
        question: "Czy pomagasz przy kontrolach i postępowaniach wyjaśniających HMRC?",
        answer:
          "Tak. Wspieram klientów podczas kontroli i postępowań wyjaśniających, od pierwszego pisma aż do wyniku, w ramach mojej pracy księgowej i rachunkowej.",
      },
      {
        question: "Czy jesteś zarejestrowanym pełnomocnikiem (agentem) HMRC?",
        answer:
          "Ta pomoc jest częścią mojej księgowości i obsługi rachunkowej. W przypadku formalnej reprezentacji w konkretnej sprawie dokładne warunki ustalamy bezpośrednio, zanim rozpoczniemy pracę.",
      },
      {
        question: "Czy kontrola oznacza, że zrobiłem coś źle?",
        answer:
          "Niekoniecznie. HMRC wszczyna kontrole z różnych powodów, a większość kończy się bez stwierdzenia nieprawidłowości.",
      },
      {
        question: "Czy możesz pomóc, jeśli nie jestem z St Helens ani z Liverpoolu?",
        answer: "Tak. Pracuję zdalnie z klientami z całej Wielkiej Brytanii.",
      },
      {
        question: "Czy mogę załatwić wszystko po polsku?",
        answer: "Tak. Pracuję po polsku i po angielsku.",
      },
    ],

    disclaimer: (checkedOn) =>
      `Ta strona zawiera informacje ogólne, a nie poradę prawną ani podatkową. Warunki formalnej reprezentacji ustalam z Tobą bezpośrednio. Sprawdzone w GOV.UK ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Kontrole HMRC (compliance checks): pomoc i wsparcie", href: GOV_UK.compliance },
      { label: "Odwołanie od decyzji podatkowej", href: GOV_UK.disagree },
      { label: "Kontakt z HMRC", href: GOV_UK.contactHmrc },
    ],
  },
};
