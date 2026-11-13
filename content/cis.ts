import type { Locale } from "@/content/copy";

/**
 * Copy for the Construction Industry Scheme (CIS) pages (EN /cis, PL /pl/cis),
 * task T2.9. Both languages carry the same facts.
 *
 * Every figure and date here was checked against the GOV.UK pages in
 * `sources` on FIGURES_CHECKED_ON. Re-check them all before changing that
 * date, and always re-check the deduction rates directly on GOV.UK — they
 * can change.
 *
 * Owner-confirmed facts (Sabina, 11 Nov 2026 and this session, 13 Nov 2026):
 * offers CIS registration guidance, monthly CIS returns for contractors,
 * deduction records, and reconciliation support via Self Assessment. No
 * automatic refund is claimed or implied — CIS deductions are advance
 * payments towards a subcontractor's tax bill, reconciled through their
 * Self Assessment return, and any repayment depends on their full tax
 * position. Remote only, no named software, no HMRC agent status claimed,
 * no qualification named, fees agreed after the free call (no figures).
 */
export const FIGURES_CHECKED_ON = "2026-11-13";

export const GOV_UK = {
  whatIsCis: "https://www.gov.uk/what-is-the-construction-industry-scheme",
  contractorRegister: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/how-to-register",
  subcontractorRegister: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/how-to-register",
  makeDeductions: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors",
  selfAssessmentOverview: "https://www.gov.uk/self-assessment-tax-returns",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type CisCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  ctaBook: string;
  ctaContact: string;

  rolesHeading: string;
  rolesIntro: string;
  roles: { title: string; text: string }[];

  ratesHeading: string;
  ratesIntro: string;
  rates: { title: string; text: string }[];
  ratesNote: string;
  ratesLink: Link;

  reconcileHeading: string;
  reconcileParagraphs: string[];
  reconcileLink: Link;
  selfAssessmentHref: string;
  selfAssessmentLinkLabel: string;

  servicesHeading: string;
  services: string[];

  workingHeading: string;
  working: string[];

  faqHeading: string;
  faqs: Faq[];

  disclaimer: (checkedOn: string) => string;
  sourcesHeading: string;
  sources: Link[];
};

export const cisCopy: Record<Locale, CisCopy> = {
  en: {
    title: "Construction Industry Scheme (CIS) | Sabina Krajewska",
    description:
      "CIS registration guidance, monthly CIS returns and deduction reconciliation for contractors and subcontractors in St Helens, Liverpool and the North West.",
    ogTitle: "Construction Industry Scheme (CIS) support",
    ogDescription:
      "CIS registration, monthly returns and reconciliation via Self Assessment for contractors and subcontractors, working remotely in English or Polish.",
    h1: "Construction Industry Scheme (CIS)",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens. I help contractors and subcontractors in the construction industry with CIS — registration guidance, monthly CIS returns, deduction records, and reconciling deductions through Self Assessment. I work remotely with clients in St Helens, Liverpool and across the North West, in English or Polish.",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    rolesHeading: "Contractors and subcontractors",
    rolesIntro:
      "The Construction Industry Scheme sets out different rules depending on your role:",
    roles: [
      {
        title: "Contractors",
        text: "If you pay subcontractors for construction work, you usually need to register as a contractor, verify your subcontractors with HMRC, make deductions from their payments and pay those deductions to HMRC.",
      },
      {
        title: "Subcontractors",
        text: "If you carry out construction work for a contractor, you can register as a subcontractor. Registering affects the rate of deduction taken from your payments.",
      },
    ],

    ratesHeading: "CIS deduction rates",
    ratesIntro: "GOV.UK gives the current CIS deduction rates as:",
    rates: [
      { title: "20%", text: "The standard rate, for subcontractors registered for CIS." },
      { title: "30%", text: "The higher rate, for subcontractors who are not registered for CIS." },
      { title: "0%", text: "For subcontractors with gross payment status, who are paid in full and handle their own tax through Self Assessment." },
    ],
    ratesNote: "Checked against GOV.UK on 13 November 2026 — always re-check the current rate directly, as it can change.",
    ratesLink: {
      label: "Make deductions and pay subcontractors (GOV.UK)",
      href: GOV_UK.makeDeductions,
    },

    reconcileHeading: "Reconciling CIS deductions at year end",
    reconcileParagraphs: [
      "CIS deductions taken from a subcontractor's payments count as advance payments towards their tax and National Insurance bill — they are not a refund paid automatically.",
      "At the end of the tax year, a subcontractor reconciles the CIS deductions taken during the year against their actual tax bill through their Self Assessment tax return. Whether that results in a repayment, and how much, depends on their full tax position for the year — there is no automatic refund and no typical amount.",
      "I can help prepare your Self Assessment tax return alongside your CIS records, so the deductions you've had taken are properly reconciled.",
    ],
    reconcileLink: {
      label: "Self Assessment tax returns (GOV.UK)",
      href: GOV_UK.selfAssessmentOverview,
    },
    selfAssessmentHref: "/self-assessment-tax-returns",
    selfAssessmentLinkLabel: "Self Assessment tax returns",

    servicesHeading: "What I can help with",
    services: [
      "Guidance on registering for CIS, as a contractor or subcontractor",
      "Monthly CIS returns, for contractors",
      "Keeping records of CIS deductions",
      "Reconciling CIS deductions through your Self Assessment tax return",
    ],

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool and across the North West.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through your situation.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "What's the difference between a CIS contractor and subcontractor?",
        answer:
          "A contractor pays subcontractors for construction work and must register, verify subcontractors and make deductions. A subcontractor carries out the work and can register to affect the deduction rate taken from their pay.",
      },
      {
        question: "What are the current CIS deduction rates?",
        answer:
          "GOV.UK gives 20% for registered subcontractors, 30% for subcontractors who aren't registered, and 0% for those with gross payment status — checked on GOV.UK on 13 November 2026.",
      },
      {
        question: "Will I get a refund of my CIS deductions?",
        answer:
          "Not automatically. CIS deductions are advance payments towards your tax bill, reconciled through your Self Assessment tax return. Whether you're owed a repayment, and how much, depends on your full tax position — there's no automatic refund.",
      },
      {
        question: "Do you submit monthly CIS returns?",
        answer:
          "Yes, for contractors. I also help subcontractors with registration guidance, deduction records and reconciling deductions through Self Assessment.",
      },
      {
        question: "Can you help if I'm not in St Helens or Liverpool?",
        answer: "Yes. I work remotely with clients across the North West and the rest of the UK.",
      },
      {
        question: "Can you help in Polish?",
        answer: "Yes. I work in English and Polish.",
      },
    ],

    disclaimer: (checkedOn) =>
      `This page gives general information, not tax advice. Rules and rates change, so check GOV.UK or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "What is the Construction Industry Scheme (CIS)?", href: GOV_UK.whatIsCis },
      { label: "Register as a CIS contractor", href: GOV_UK.contractorRegister },
      { label: "Register as a CIS subcontractor", href: GOV_UK.subcontractorRegister },
      { label: "Make deductions and pay subcontractors", href: GOV_UK.makeDeductions },
      { label: "Self Assessment tax returns", href: GOV_UK.selfAssessmentOverview },
    ],
  },

  pl: {
    title: "Construction Industry Scheme (CIS) | Sabina Krajewska",
    description:
      "Pomoc w rejestracji CIS, comiesięczne deklaracje CIS i rozliczanie potrąceń dla wykonawców i podwykonawców z St Helens, Liverpoolu i North West.",
    ogTitle: "Wsparcie w Construction Industry Scheme (CIS)",
    ogDescription:
      "Rejestracja CIS, comiesięczne deklaracje i rozliczenie potrąceń przez Self Assessment dla wykonawców i podwykonawców — zdalnie, po polsku lub po angielsku.",
    h1: "Construction Industry Scheme (CIS)",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens. Pomagam wykonawcom (contractors) i podwykonawcom (subcontractors) w branży budowlanej w sprawach CIS — w rejestracji, comiesięcznych deklaracjach CIS, prowadzeniu ewidencji potrąceń oraz rozliczaniu potrąceń przez Self Assessment. Pracuję zdalnie z klientami z St Helens, Liverpoolu i całego North West, po polsku lub po angielsku.",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    rolesHeading: "Wykonawcy i podwykonawcy",
    rolesIntro:
      "Construction Industry Scheme przewiduje różne zasady w zależności od Twojej roli:",
    roles: [
      {
        title: "Wykonawcy (contractors)",
        text: "Jeśli płacisz podwykonawcom za roboty budowlane, zwykle musisz zarejestrować się jako wykonawca, zweryfikować podwykonawców w HMRC, dokonywać potrąceń z ich płatności i przekazywać te potrącenia do HMRC.",
      },
      {
        title: "Podwykonawcy (subcontractors)",
        text: "Jeśli wykonujesz roboty budowlane na zlecenie wykonawcy, możesz zarejestrować się jako podwykonawca. Rejestracja wpływa na wysokość potrącenia z Twoich płatności.",
      },
    ],

    ratesHeading: "Stawki potrąceń CIS",
    ratesIntro: "GOV.UK podaje obecne stawki potrąceń CIS jako:",
    rates: [
      { title: "20%", text: "Stawka standardowa, dla podwykonawców zarejestrowanych w CIS." },
      { title: "30%", text: "Stawka podwyższona, dla podwykonawców niezarejestrowanych w CIS." },
      { title: "0%", text: "Dla podwykonawców ze statusem gross payment, którym płaci się w pełnej kwocie, a oni sami rozliczają podatek przez Self Assessment." },
    ],
    ratesNote: "Sprawdzone w GOV.UK 13 listopada 2026 — zawsze zweryfikuj aktualną stawkę bezpośrednio na GOV.UK, ponieważ może się zmienić.",
    ratesLink: {
      label: "Potrącenia i płatności dla podwykonawców (GOV.UK, po angielsku)",
      href: GOV_UK.makeDeductions,
    },

    reconcileHeading: "Rozliczenie potrąceń CIS na koniec roku",
    reconcileParagraphs: [
      "Potrącenia CIS pobrane z płatności podwykonawcy liczą się jako zaliczki na poczet jego podatku i składki National Insurance — nie są zwrotem wypłacanym automatycznie.",
      "Na koniec roku podatkowego podwykonawca rozlicza potrącenia CIS pobrane w ciągu roku z rzeczywistym podatkiem należnym, w swoim zeznaniu Self Assessment. To, czy wynika z tego zwrot i w jakiej wysokości, zależy od jego całej sytuacji podatkowej w danym roku — nie ma tu automatycznego zwrotu ani typowej kwoty.",
      "Mogę pomóc przygotować Twoje zeznanie Self Assessment razem z ewidencją CIS, tak aby pobrane potrącenia zostały prawidłowo rozliczone.",
    ],
    reconcileLink: {
      label: "Zeznania podatkowe Self Assessment (GOV.UK, po angielsku)",
      href: GOV_UK.selfAssessmentOverview,
    },
    selfAssessmentHref: "/pl/self-assessment",
    selfAssessmentLinkLabel: "Zeznania podatkowe Self Assessment",

    servicesHeading: "W czym mogę pomóc",
    services: [
      "Pomoc w rejestracji w CIS, jako wykonawca lub podwykonawca",
      "Comiesięczne deklaracje CIS, dla wykonawców",
      "Prowadzenie ewidencji potrąceń CIS",
      "Rozliczanie potrąceń CIS w zeznaniu Self Assessment",
    ],

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Działam w St Helens i pracuję zdalnie z klientami z Liverpoolu i całego North West.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twojej sytuacji.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czym różni się wykonawca od podwykonawcy w CIS?",
        answer:
          "Wykonawca płaci podwykonawcom za roboty budowlane i musi się zarejestrować, weryfikować podwykonawców oraz dokonywać potrąceń. Podwykonawca wykonuje roboty i może się zarejestrować, co wpływa na stawkę potrącenia z jego wynagrodzenia.",
      },
      {
        question: "Jakie są obecne stawki potrąceń CIS?",
        answer:
          "Według GOV.UK to 20% dla zarejestrowanych podwykonawców, 30% dla niezarejestrowanych oraz 0% dla osób ze statusem gross payment — sprawdzone w GOV.UK 13 listopada 2026.",
      },
      {
        question: "Czy dostanę zwrot potrąceń CIS?",
        answer:
          "Nie automatycznie. Potrącenia CIS to zaliczki na poczet Twojego podatku, rozliczane w zeznaniu Self Assessment. To, czy należy Ci się zwrot i w jakiej wysokości, zależy od Twojej pełnej sytuacji podatkowej — nie ma automatycznego zwrotu.",
      },
      {
        question: "Czy składacie comiesięczne deklaracje CIS?",
        answer:
          "Tak, dla wykonawców. Pomagam też podwykonawcom w rejestracji, prowadzeniu ewidencji potrąceń i rozliczaniu ich przez Self Assessment.",
      },
      {
        question: "Czy możesz pomóc, jeśli nie jestem z St Helens ani z Liverpoolu?",
        answer: "Tak. Pracuję zdalnie z klientami z całego North West i reszty Wielkiej Brytanii.",
      },
      {
        question: "Czy mogę załatwić wszystko po polsku?",
        answer: "Tak. Pracuję po polsku i po angielsku.",
      },
    ],

    disclaimer: (checkedOn) =>
      `Ta strona zawiera informacje ogólne, a nie poradę podatkową. Przepisy i stawki się zmieniają, dlatego sprawdź GOV.UK lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Czym jest Construction Industry Scheme (CIS)?", href: GOV_UK.whatIsCis },
      { label: "Rejestracja jako wykonawca CIS", href: GOV_UK.contractorRegister },
      { label: "Rejestracja jako podwykonawca CIS", href: GOV_UK.subcontractorRegister },
      { label: "Potrącenia i płatności dla podwykonawców", href: GOV_UK.makeDeductions },
      { label: "Zeznania podatkowe Self Assessment", href: GOV_UK.selfAssessmentOverview },
    ],
  },
};
