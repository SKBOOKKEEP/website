import type { Locale } from "@/content/copy";

/**
 * Copy for the Company formation pages (EN /company-formation,
 * PL /pl/zakladanie-spolki-ltd), task T2.11. Both languages carry the same
 * facts.
 *
 * Every figure and date here was checked against the GOV.UK pages in
 * `sources` on FIGURES_CHECKED_ON. Re-check them all before changing that
 * date.
 *
 * Owner-confirmed facts (Sabina, 11 Nov 2026 and this session, 13 Nov 2026):
 * offers help with the company formation process and getting a new limited
 * company set up correctly from an accounting perspective (first accounting
 * period, registering for Corporation Tax). No name-reservation service
 * claimed, no turnaround time promised, no pricing invented. No registered
 * office address service claimed — only that one is required by Companies
 * House, in general terms. Remote only, no named software, no HMRC agent
 * status claimed, no qualification named, fees agreed after the free call
 * (no figures).
 */
export const FIGURES_CHECKED_ON = "2026-11-13";

export const GOV_UK = {
  limitedCompanies: "https://www.gov.uk/limited-company-formation",
  registerYourCompany: "https://www.gov.uk/limited-company-formation/register-your-company",
  companyNameRules: "https://www.gov.uk/limited-company-formation/choose-company-name",
  directorsResponsibilities: "https://www.gov.uk/limited-company-formation/appoint-directors-and-company-secretaries",
  corporationTaxAccountingPeriod: "https://www.gov.uk/corporation-tax-accounting-period",
  registerForCorporationTax: "https://www.gov.uk/register-your-company-with-hmrc",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type CompanyFormationCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  ctaBook: string;
  ctaContact: string;

  stepsHeading: string;
  stepsIntro: string;
  steps: { title: string; text: string }[];
  stepsLink: Link;

  afterHeading: string;
  afterParagraphs: string[];
  afterLink: Link;
  limitedCompanyHref: string;
  limitedCompanyLinkLabel: string;

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

export const companyFormationCopy: Record<Locale, CompanyFormationCopy> = {
  en: {
    title: "Company Formation | Sabina Krajewska",
    description:
      "Help forming a new UK limited company and getting set up correctly from an accounting perspective, for clients in St Helens, Liverpool and across the UK.",
    ogTitle: "UK limited company formation",
    ogDescription:
      "Help with the company formation process and getting your new limited company set up correctly for accounting, working remotely in English or Polish.",
    h1: "Company formation",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens. I help people setting up a new UK limited company with the formation process, and with getting the company set up correctly from an accounting perspective once it's registered. I work remotely with clients in St Helens, Liverpool and across the UK, in English or Polish.",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    stepsHeading: "What forming a limited company involves",
    stepsIntro: "GOV.UK sets out what's needed to register a private limited company with Companies House:",
    steps: [
      {
        title: "Choosing a company name",
        text: "Your company name must follow the Companies House naming rules and not already be taken.",
      },
      {
        title: "Appointing a director",
        text: "Every limited company must have at least one director; a company secretary is optional.",
      },
      {
        title: "A registered office address",
        text: "Companies House requires every company to register an official address. This is a factual requirement of registration — it is separate from, and not part of, the accounting help described on this page.",
      },
      {
        title: "A SIC code",
        text: "You choose a Standard Industrial Classification (SIC) code that describes what your company does.",
      },
      {
        title: "Governing documents",
        text: "You need a memorandum of association and articles of association, which set out how the company agrees to be run.",
      },
    ],
    stepsLink: {
      label: "Set up a private limited company (GOV.UK)",
      href: GOV_UK.limitedCompanies,
    },

    afterHeading: "Getting set up correctly for accounting",
    afterParagraphs: [
      "Once your company is registered with Companies House, GOV.UK notes that you're usually set up for Corporation Tax at the same time, unless the company is dormant.",
      "I can help make sure your new company is set up correctly from an accounting perspective from the start — working out your first accounting period and helping with registering for Corporation Tax — so you're ready for your ongoing filing obligations.",
      "Annual accounts, Corporation Tax returns (CT600) and ongoing company tax planning are covered on my limited company accounts page.",
    ],
    afterLink: {
      label: "Corporation Tax accounting period (GOV.UK)",
      href: GOV_UK.corporationTaxAccountingPeriod,
    },
    limitedCompanyHref: "/limited-company-accounts",
    limitedCompanyLinkLabel: "Limited company accounts and Corporation Tax",

    servicesHeading: "What I can help with",
    services: [
      "Guidance through the company formation process",
      "Working out your company's first accounting period",
      "Help registering your new company for Corporation Tax",
    ],

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool and across the UK.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through your plans.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "Do I need a registered office address?",
        answer:
          "Yes — Companies House requires every limited company to register an official address when it's formed. This is a Companies House requirement, not something I provide.",
      },
      {
        question: "Can you reserve a company name for me?",
        answer:
          "I don't offer a name-reservation service. I can talk you through the Companies House naming rules as part of helping you through the formation process.",
      },
      {
        question: "How long does company formation take?",
        answer:
          "I can't promise a specific turnaround — timing depends on Companies House and the details of your application. We'll talk through what to expect on our free introductory call.",
      },
      {
        question: "Do you register companies for Corporation Tax?",
        answer:
          "Yes. I help new companies get set up correctly from an accounting perspective, including working out the first accounting period and registering for Corporation Tax.",
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
      `This page gives general information, not tax or legal advice. Rules change, so check GOV.UK and Companies House or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "Set up a private limited company", href: GOV_UK.limitedCompanies },
      { label: "Register your company", href: GOV_UK.registerYourCompany },
      { label: "Choose a company name", href: GOV_UK.companyNameRules },
      { label: "Appoint directors and a company secretary", href: GOV_UK.directorsResponsibilities },
      { label: "Corporation Tax accounting period", href: GOV_UK.corporationTaxAccountingPeriod },
    ],
  },

  pl: {
    title: "Zakładanie spółki Ltd | Sabina Krajewska",
    description:
      "Pomoc w założeniu nowej spółki Ltd w Wielkiej Brytanii i prawidłowym ustawieniu jej od strony księgowej — dla klientów z St Helens, Liverpoolu i całej UK.",
    ogTitle: "Zakładanie spółki Ltd w Wielkiej Brytanii",
    ogDescription:
      "Pomoc w procesie zakładania spółki Ltd i prawidłowym ustawieniu jej od strony księgowej — zdalnie, po polsku lub po angielsku.",
    h1: "Zakładanie spółki Ltd",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens. Pomagam osobom zakładającym nową spółkę Ltd w Wielkiej Brytanii — zarówno w samym procesie rejestracji, jak i w prawidłowym ustawieniu spółki od strony księgowej po jej zarejestrowaniu. Pracuję zdalnie z klientami z St Helens, Liverpoolu i całej Wielkiej Brytanii, po polsku lub po angielsku.",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    stepsHeading: "Na czym polega założenie spółki Ltd",
    stepsIntro: "GOV.UK wskazuje, co jest potrzebne do zarejestrowania spółki Ltd w Companies House:",
    steps: [
      {
        title: "Wybór nazwy spółki",
        text: "Nazwa spółki musi spełniać zasady nazewnictwa Companies House i nie może być już zajęta.",
      },
      {
        title: "Powołanie dyrektora",
        text: "Każda spółka Ltd musi mieć co najmniej jednego dyrektora; sekretarz spółki jest opcjonalny.",
      },
      {
        title: "Siedziba spółki (registered office)",
        text: "Companies House wymaga, aby każda spółka zarejestrowała oficjalny adres siedziby. To wymóg formalny rejestracji — odrębny od pomocy księgowej opisanej na tej stronie i nienależący do jej zakresu.",
      },
      {
        title: "Kod SIC",
        text: "Wybiera się kod SIC (Standard Industrial Classification), który opisuje działalność spółki.",
      },
      {
        title: "Dokumenty założycielskie",
        text: "Potrzebny jest statut spółki (memorandum of association) oraz umowa spółki (articles of association), które określają zasady jej funkcjonowania.",
      },
    ],
    stepsLink: {
      label: "Zakładanie spółki Ltd (GOV.UK, po angielsku)",
      href: GOV_UK.limitedCompanies,
    },

    afterHeading: "Prawidłowe ustawienie spółki od strony księgowej",
    afterParagraphs: [
      "Po zarejestrowaniu spółki w Companies House, zgodnie z GOV.UK, zwykle jednocześnie następuje zgłoszenie do Corporation Tax, chyba że spółka jest uśpiona (dormant).",
      "Mogę pomóc od samego początku prawidłowo ustawić Twoją nową spółkę od strony księgowej — ustalić pierwszy okres rozliczeniowy oraz pomóc w rejestracji do Corporation Tax — tak abyś był przygotowany na bieżące obowiązki sprawozdawcze.",
      "Roczne sprawozdania finansowe, deklaracje Corporation Tax (CT600) oraz bieżące planowanie podatkowe spółki opisuję na stronie o rozliczeniach spółek Ltd.",
    ],
    afterLink: {
      label: "Okres rozliczeniowy Corporation Tax (GOV.UK, po angielsku)",
      href: GOV_UK.corporationTaxAccountingPeriod,
    },
    limitedCompanyHref: "/pl/rozliczenia-spolek-ltd",
    limitedCompanyLinkLabel: "Rozliczenia spółek Ltd i Corporation Tax",

    servicesHeading: "W czym mogę pomóc",
    services: [
      "Pomoc w procesie zakładania spółki",
      "Ustalenie pierwszego okresu rozliczeniowego spółki",
      "Pomoc w rejestracji nowej spółki do Corporation Tax",
    ],

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Działam w St Helens i pracuję zdalnie z klientami z Liverpoolu i całej Wielkiej Brytanii.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twoich planach.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czy potrzebuję siedziby spółki (registered office address)?",
        answer:
          "Tak — Companies House wymaga, aby każda spółka Ltd zarejestrowała oficjalny adres siedziby przy zakładaniu. To wymóg Companies House, a nie usługa, którą oferuję.",
      },
      {
        question: "Czy możecie zarezerwować dla mnie nazwę spółki?",
        answer:
          "Nie oferuję usługi rezerwacji nazwy. Mogę natomiast omówić z Tobą zasady nazewnictwa Companies House w ramach pomocy w procesie zakładania spółki.",
      },
      {
        question: "Ile trwa założenie spółki?",
        answer:
          "Nie mogę obiecać konkretnego terminu — czas zależy od Companies House i szczegółów Twojego wniosku. Porozmawiamy o tym, czego się spodziewać, podczas bezpłatnej rozmowy wstępnej.",
      },
      {
        question: "Czy pomagacie w rejestracji do Corporation Tax?",
        answer:
          "Tak. Pomagam nowym spółkom prawidłowo ustawić się od strony księgowej, w tym ustalić pierwszy okres rozliczeniowy i zarejestrować się do Corporation Tax.",
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
      `Ta strona zawiera informacje ogólne, a nie poradę podatkową ani prawną. Przepisy się zmieniają, dlatego sprawdź GOV.UK i Companies House lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Zakładanie spółki Ltd", href: GOV_UK.limitedCompanies },
      { label: "Rejestracja spółki", href: GOV_UK.registerYourCompany },
      { label: "Wybór nazwy spółki", href: GOV_UK.companyNameRules },
      { label: "Powołanie dyrektorów i sekretarza spółki", href: GOV_UK.directorsResponsibilities },
      { label: "Okres rozliczeniowy Corporation Tax", href: GOV_UK.corporationTaxAccountingPeriod },
    ],
  },
};
