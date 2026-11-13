import type { Locale } from "@/content/copy";

/**
 * Copy for the Payroll pages (EN /payroll, PL /pl/payroll), task T2.8. Both
 * languages carry the same facts.
 *
 * Every figure and date here was checked against the GOV.UK pages in
 * `sources` on FIGURES_CHECKED_ON. Re-check them all before changing that
 * date.
 *
 * Owner-confirmed facts (Sabina, 11 Nov 2026 and this session, 13 Nov 2026):
 * offers payroll/PAYE processing as a service for small employers. No
 * specific software named, no payroll frequency claimed as standard (both
 * weekly and monthly are described as options, per GOV.UK), no client-size
 * limit invented. Auto-enrolment is described as a general legal duty on
 * employers (GOV.UK-sourced); the copy is explicit that the specific scope
 * of any auto-enrolment support should be confirmed with Sabina directly —
 * it is not promised here. Remote only, no named software, no HMRC agent
 * status claimed, no qualification named, fees agreed after the free call
 * (no figures).
 */
export const FIGURES_CHECKED_ON = "2026-11-13";

export const GOV_UK = {
  runningPayroll: "https://www.gov.uk/running-payroll",
  payeForEmployers: "https://www.gov.uk/paye-for-employers",
  reportPayeInRealTime: "https://www.gov.uk/running-payroll/reporting-to-hmrc",
  workplacePensions: "https://www.gov.uk/workplace-pensions",
  employersWorkplacePensionsRules: "https://www.gov.uk/employers-workplace-pensions-rules",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type PayrollCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  ctaBook: string;
  ctaContact: string;

  whatHeading: string;
  whatIntro: string;
  what: { title: string; text: string }[];
  whatLink: Link;

  pensionHeading: string;
  pensionParagraphs: string[];
  pensionLink: Link;

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

export const payrollCopy: Record<Locale, PayrollCopy> = {
  en: {
    title: "Payroll & PAYE Processing | Sabina Krajewska",
    description:
      "Payroll and PAYE processing for small employers in St Helens, Liverpool and across the UK — RTI reporting to HMRC, payslips and statutory deductions.",
    ogTitle: "Payroll and PAYE processing for small employers",
    ogDescription:
      "Payroll and PAYE processing for small employers — RTI submissions, payslips and statutory deductions, working remotely in English or Polish.",
    h1: "Payroll and PAYE processing",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens. I offer payroll and PAYE processing for small employers — sole traders and limited companies with a few staff — including RTI reporting to HMRC, payslips and working out statutory deductions. I work remotely with clients in St Helens, Liverpool and across the UK, in English or Polish.",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    whatHeading: "What payroll and PAYE processing involves",
    whatIntro:
      "As an employer operating PAYE, GOV.UK sets out certain tasks for each pay period:",
    what: [
      {
        title: "RTI reporting to HMRC",
        text: "Pay and deductions are reported to HMRC in real time (RTI) — usually through a Full Payment Submission on or before payday, with an Employer Payment Summary where it applies.",
      },
      {
        title: "Payslips",
        text: "Each employee is given a payslip showing their pay and the deductions taken from it.",
      },
      {
        title: "Payroll frequency",
        text: "Payroll can run weekly or monthly, depending on how you pay your staff — GOV.UK describes both as options, and we agree which fits your business.",
      },
      {
        title: "Statutory deductions",
        text: "Income Tax and National Insurance are calculated and deducted from each employee's pay, and employer's National Insurance is worked out on top.",
      },
    ],
    whatLink: {
      label: "Running payroll (GOV.UK)",
      href: GOV_UK.runningPayroll,
    },

    pensionHeading: "Workplace pensions and automatic enrolment",
    pensionParagraphs: [
      "Separately from payroll itself, employers in the UK have a general legal duty to automatically enrol eligible staff into a workplace pension scheme and to contribute towards it, as set out on GOV.UK.",
      "This is a duty on every employer, not something specific to any one payroll service — if you'd like to know exactly what auto-enrolment support I can offer alongside your payroll, please ask about it directly on our free introductory call.",
    ],
    pensionLink: {
      label: "Workplace pensions (GOV.UK)",
      href: GOV_UK.workplacePensions,
    },

    servicesHeading: "What I can help with",
    services: [
      "Processing your payroll and working out PAYE deductions each pay period",
      "RTI submissions to HMRC (Full Payment Submission and Employer Payment Summary)",
      "Producing payslips for your employees",
    ],

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool and across the UK.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through what you need.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "Do you run payroll weekly or monthly?",
        answer:
          "Either — GOV.UK describes both weekly and monthly payroll as options for employers, and we agree the frequency that suits your business.",
      },
      {
        question: "What is RTI reporting?",
        answer:
          "RTI (Real Time Information) is how pay and deductions are reported to HMRC, usually on or before each payday, through a Full Payment Submission and, where it applies, an Employer Payment Summary.",
      },
      {
        question: "Do you handle workplace pensions and auto-enrolment?",
        answer:
          "Employers have a general legal duty to automatically enrol eligible staff into a workplace pension. The exact scope of any auto-enrolment support I offer alongside payroll is best confirmed directly — ask me about it on our free introductory call.",
      },
      {
        question: "Can I use my existing payroll software?",
        answer:
          "We talk through what you're using, or not yet using, on our free introductory call and agree how to work together.",
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
      `This page gives general information, not tax or legal advice. Rules change, so check GOV.UK or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "Running payroll", href: GOV_UK.runningPayroll },
      { label: "PAYE for employers", href: GOV_UK.payeForEmployers },
      { label: "Reporting to HMRC: FPS and EPS", href: GOV_UK.reportPayeInRealTime },
      { label: "Workplace pensions", href: GOV_UK.workplacePensions },
      { label: "Workplace pensions: what your employer can and cannot do", href: GOV_UK.employersWorkplacePensionsRules },
    ],
  },

  pl: {
    title: "Payroll i rozliczenia PAYE | Sabina Krajewska",
    description:
      "Payroll i rozliczenia PAYE dla małych pracodawców z St Helens, Liverpoolu i całej UK — raportowanie RTI do HMRC, paski wypłat i potrącenia ustawowe.",
    ogTitle: "Payroll i PAYE dla małych pracodawców",
    ogDescription:
      "Payroll i rozliczenia PAYE dla małych pracodawców — zgłoszenia RTI, paski wypłat i potrącenia ustawowe, zdalnie po polsku lub po angielsku.",
    h1: "Payroll i rozliczenia PAYE",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens. Prowadzę payroll i rozliczenia PAYE dla małych pracodawców — osób samozatrudniających innych oraz spółek Ltd z kilkoma pracownikami — w tym raportowanie RTI do HMRC, paski wypłat i wyliczanie potrąceń ustawowych. Pracuję zdalnie z klientami z St Helens, Liverpoolu i całej Wielkiej Brytanii, po polsku lub po angielsku.",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    whatHeading: "Na czym polega payroll i rozliczenia PAYE",
    whatIntro:
      "Jako pracodawca rozliczający się w systemie PAYE, GOV.UK wskazuje konkretne zadania w każdym okresie wypłat:",
    what: [
      {
        title: "Raportowanie RTI do HMRC",
        text: "Wynagrodzenia i potrącenia zgłasza się do HMRC w czasie rzeczywistym (RTI) — zwykle przez Full Payment Submission w dniu wypłaty lub wcześniej, a tam gdzie ma to zastosowanie, także przez Employer Payment Summary.",
      },
      {
        title: "Paski wypłat",
        text: "Każdy pracownik otrzymuje pasek wypłaty pokazujący wynagrodzenie oraz potrącenia z niego dokonane.",
      },
      {
        title: "Częstotliwość wypłat",
        text: "Payroll może działać tygodniowo lub miesięcznie, w zależności od tego, jak wypłacasz wynagrodzenia — GOV.UK opisuje obie opcje, a my wspólnie ustalamy, która pasuje do Twojej firmy.",
      },
      {
        title: "Potrącenia ustawowe",
        text: "Z wynagrodzenia każdego pracownika wylicza się i potrąca podatek dochodowy (Income Tax) oraz składkę National Insurance, a dodatkowo wylicza się składkę National Insurance pracodawcy.",
      },
    ],
    whatLink: {
      label: "Prowadzenie payroll (GOV.UK, po angielsku)",
      href: GOV_UK.runningPayroll,
    },

    pensionHeading: "Pracownicze programy emerytalne i automatyczny zapis (auto-enrolment)",
    pensionParagraphs: [
      "Niezależnie od samego payrollu, pracodawcy w Wielkiej Brytanii mają ogólny, ustawowy obowiązek automatycznego zapisania uprawnionych pracowników do pracowniczego programu emerytalnego oraz odprowadzania składek — zgodnie z GOV.UK.",
      "To obowiązek każdego pracodawcy, nie element konkretnej usługi payroll — jeśli chcesz wiedzieć dokładnie, jakie wsparcie przy auto-enrolment mogę zaoferować razem z payrollem, zapytaj o to wprost podczas bezpłatnej rozmowy wstępnej.",
    ],
    pensionLink: {
      label: "Pracownicze programy emerytalne (GOV.UK, po angielsku)",
      href: GOV_UK.workplacePensions,
    },

    servicesHeading: "W czym mogę pomóc",
    services: [
      "Prowadzenie payrollu i wyliczanie potrąceń PAYE w każdym okresie wypłat",
      "Zgłoszenia RTI do HMRC (Full Payment Submission i Employer Payment Summary)",
      "Przygotowanie pasków wypłat dla pracowników",
    ],

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Działam w St Helens i pracuję zdalnie z klientami z Liverpoolu i całej Wielkiej Brytanii.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twoich potrzebach.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czy payroll prowadzicie tygodniowo czy miesięcznie?",
        answer:
          "Jedno i drugie jest możliwe — GOV.UK opisuje zarówno tygodniowy, jak i miesięczny payroll jako dostępne opcje, a my ustalamy częstotliwość odpowiednią dla Twojej firmy.",
      },
      {
        question: "Czym jest raportowanie RTI?",
        answer:
          "RTI (Real Time Information) to sposób zgłaszania wynagrodzeń i potrąceń do HMRC, zwykle w dniu wypłaty lub wcześniej, przez Full Payment Submission oraz, tam gdzie ma to zastosowanie, Employer Payment Summary.",
      },
      {
        question: "Czy zajmujesz się pracowniczymi programami emerytalnymi i auto-enrolment?",
        answer:
          "Pracodawcy mają ogólny, ustawowy obowiązek automatycznego zapisania uprawnionych pracowników do programu emerytalnego. Dokładny zakres wsparcia, jakie oferuję przy auto-enrolment razem z payrollem, najlepiej potwierdzić bezpośrednio — zapytaj o to podczas bezpłatnej rozmowy wstępnej.",
      },
      {
        question: "Czy mogę korzystać z własnego oprogramowania do payroll?",
        answer:
          "Rozmawiamy o tym, z czego korzystasz (albo jeszcze nie korzystasz) podczas bezpłatnej rozmowy wstępnej i ustalamy, jak będziemy współpracować.",
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
      `Ta strona zawiera informacje ogólne, a nie poradę podatkową ani prawną. Przepisy się zmieniają, dlatego sprawdź GOV.UK lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Prowadzenie payroll", href: GOV_UK.runningPayroll },
      { label: "PAYE dla pracodawców", href: GOV_UK.payeForEmployers },
      { label: "Raportowanie do HMRC: FPS i EPS", href: GOV_UK.reportPayeInRealTime },
      { label: "Pracownicze programy emerytalne", href: GOV_UK.workplacePensions },
      { label: "Programy emerytalne: co może, a czego nie może zrobić pracodawca", href: GOV_UK.employersWorkplacePensionsRules },
    ],
  },
};
