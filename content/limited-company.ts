import type { Locale } from "@/content/copy";

/**
 * Copy for the Limited company accounts pages (EN /limited-company-accounts,
 * PL /pl/rozliczenia-spolek-ltd), task T2.7. Both languages carry the same
 * facts.
 *
 * Every figure and date here was checked against the GOV.UK pages in
 * `sources` on FIGURES_CHECKED_ON. Re-check them all before changing that
 * date.
 *
 * Owner-confirmed scope (Sabina, 13 Nov 2026): prepares annual (statutory)
 * accounts, prepares and files Corporation Tax returns (CT600), and offers
 * company tax planning. Remote only, no named software, no HMRC agent status
 * claimed, no qualification named, fees agreed after the free call (no
 * figures).
 */
export const FIGURES_CHECKED_ON = "2026-11-13";

export const GOV_UK = {
  filingAccounts:
    "https://www.gov.uk/prepare-file-annual-accounts-for-limited-company/filing-your-accounts",
  corporationTaxOverview: "https://www.gov.uk/corporation-tax",
  payCorporationTax: "https://www.gov.uk/pay-corporation-tax",
  companyTaxReturnDeadlines: "https://www.gov.uk/company-tax-returns/deadlines",
  companyRecords:
    "https://www.gov.uk/running-a-limited-company/company-and-accounting-records",
  runningALimitedCompany: "https://www.gov.uk/running-a-limited-company",
  corporationTaxAccountingPeriod: "https://www.gov.uk/corporation-tax-accounting-period",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type LimitedCompanyCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  heroImageAlt: string;
  ctaBook: string;
  ctaContact: string;

  differenceHeading: string;
  differenceIntro: string;
  accountsCard: {
    heading: string;
    text: string;
    points: string[];
    link: Link;
  };
  ctCard: {
    heading: string;
    text: string;
    points: string[];
    link: Link;
  };

  directorHeading: string;
  directorParagraphs: string[];
  directorLink: Link;

  recordsHeading: string;
  recordsIntro: string;
  records: string[];
  recordsRetention: string;
  recordsLink: Link;

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

export const limitedCompanyCopy: Record<Locale, LimitedCompanyCopy> = {
  en: {
    title: "Limited Company Accounts & Corporation Tax | Sabina Krajewska",
    description:
      "Annual accounts, Corporation Tax returns (CT600) and company tax planning for small limited companies in St Helens, Liverpool and across the UK.",
    ogTitle: "Limited company accounts & Corporation Tax (CT600)",
    ogDescription:
      "Annual accounts, Corporation Tax returns and company tax planning for small Ltd companies, working remotely in English or Polish.",
    h1: "Limited company accounts and Corporation Tax",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens. I prepare annual accounts and Corporation Tax returns (CT600) for small limited companies, and help directors plan ahead for company tax. I work remotely with clients in St Helens, Liverpool and across the UK, in English or Polish.",
    heroImageAlt: "Laptop and paperwork on a desk",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    differenceHeading: "Annual accounts and Corporation Tax are two different things",
    differenceIntro:
      "As a director, you're responsible for two separate filings each year: your company's annual (statutory) accounts, filed with Companies House, and your Company Tax Return (CT600), filed with HMRC. They cover the same accounting period but go to different places, on different deadlines.",
    accountsCard: {
      heading: "Annual accounts (Companies House)",
      text: "Your statutory accounts show how your company performed over its financial year. They're filed with Companies House, where they become a matter of public record.",
      points: [
        "First accounts: due 21 months after the date your company registered with Companies House.",
        "Accounts for later years: due 9 months after your company's financial year ends.",
      ],
      link: {
        label: "Filing your accounts (GOV.UK)",
        href: GOV_UK.filingAccounts,
      },
    },
    ctCard: {
      heading: "Company Tax Return and Corporation Tax (HMRC)",
      text: "Your Company Tax Return (form CT600) tells HMRC your profit and works out your Corporation Tax bill for the accounting period. It's separate from your accounts, even though it's prepared from the same figures.",
      points: [
        "Company Tax Return: due 12 months after the end of the accounting period it covers.",
        "Corporation Tax payment: due 9 months and 1 day after the end of the accounting period, for taxable profits up to £1.5 million. Larger companies pay in instalments instead.",
      ],
      link: {
        label: "Pay Corporation Tax (GOV.UK)",
        href: GOV_UK.payCorporationTax,
      },
    },

    directorHeading: "Your responsibilities as a director",
    directorParagraphs: [
      "As a director, you're personally responsible for making sure your company's accounts and Company Tax Return are filed on time, even if someone else prepares them for you.",
      "Because the accounts deadline and the Corporation Tax deadlines fall on different dates, it helps to plan for both from early in the accounting period, rather than leaving either one until it's due.",
      "GOV.UK and Companies House set out the current deadlines and any penalties for late filing — see the links on this page for the detail that applies to your company.",
    ],
    directorLink: {
      label: "Running a limited company: your responsibilities (GOV.UK)",
      href: GOV_UK.runningALimitedCompany,
    },

    recordsHeading: "Records GOV.UK says a director should keep",
    recordsIntro: "To prepare your accounts and Company Tax Return, I'll need records such as:",
    records: [
      "All money received and spent by the company, including bank statements, invoices and receipts",
      "Assets the company owns, and debts it owes or is owed",
      "Year-end stock and the stocktakings used to work it out, if your company holds stock",
      "Details of who the company bought from and sold to, unless it runs a retail business",
      "Shareholder details, and records of shareholder resolutions and decisions",
    ],
    recordsRetention:
      "GOV.UK says to keep these records for at least 6 years from the end of the last company financial year they relate to, and longer in some cases — for example if a transaction spans more than one accounting period, or if HMRC has started a compliance check.",
    recordsLink: {
      label: "Company and accounting records (GOV.UK)",
      href: GOV_UK.companyRecords,
    },

    servicesHeading: "What I can help with",
    services: [
      "Preparing your company's annual (statutory) accounts for filing with Companies House",
      "Preparing and filing your Company Tax Return (CT600) and working out your Corporation Tax",
      "Company tax planning, so you can see what's coming and plan for it",
    ],

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool and across the UK.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through your company.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "Are annual accounts and my Company Tax Return the same thing?",
        answer:
          "No. Annual (statutory) accounts are filed with Companies House and become public. Your Company Tax Return (CT600) is filed separately with HMRC and works out your Corporation Tax. They're prepared from the same underlying records but have different deadlines.",
      },
      {
        question: "When are my company's first accounts due?",
        answer:
          "GOV.UK gives the first-year deadline as 21 months after the date your company registered with Companies House. After that, accounts are due 9 months after each financial year end.",
      },
      {
        question: "When is Corporation Tax due?",
        answer:
          "For taxable profits up to £1.5 million, GOV.UK gives the deadline as 9 months and 1 day after the end of your accounting period. The Company Tax Return itself is due later — 12 months after the period ends.",
      },
      {
        question: "Do you prepare CT600 returns?",
        answer:
          "Yes. I prepare and file Company Tax Returns (CT600) alongside your annual accounts, and can help with company tax planning too.",
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
      `This page gives general information, not tax advice. Rules and deadlines change, so check GOV.UK and Companies House or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "Filing your accounts", href: GOV_UK.filingAccounts },
      { label: "Corporation Tax", href: GOV_UK.corporationTaxOverview },
      { label: "Pay Corporation Tax", href: GOV_UK.payCorporationTax },
      { label: "Company Tax Returns: deadlines", href: GOV_UK.companyTaxReturnDeadlines },
      { label: "Company and accounting records", href: GOV_UK.companyRecords },
      { label: "Running a limited company", href: GOV_UK.runningALimitedCompany },
      { label: "Corporation Tax accounting period", href: GOV_UK.corporationTaxAccountingPeriod },
    ],
  },

  pl: {
    title: "Rozliczenia spółek Ltd i Corporation Tax | Sabina Krajewska",
    description:
      "Roczne sprawozdania finansowe, deklaracje Corporation Tax (CT600) i planowanie podatkowe dla małych spółek Ltd z St Helens, Liverpoolu i całej UK.",
    ogTitle: "Rozliczenia spółek Ltd i Corporation Tax (CT600)",
    ogDescription:
      "Roczne sprawozdania finansowe, deklaracje Corporation Tax i planowanie podatkowe spółki — zdalnie, po polsku lub po angielsku.",
    h1: "Rozliczenia spółek Ltd i Corporation Tax",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens. Przygotowuję roczne sprawozdania finansowe oraz deklaracje Corporation Tax (CT600) dla małych spółek Ltd, a także pomagam dyrektorom w planowaniu podatkowym spółki. Pracuję zdalnie z klientami z St Helens, Liverpoolu i całej Wielkiej Brytanii, po polsku lub po angielsku.",
    heroImageAlt: "Laptop i dokumenty na biurku",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    differenceHeading: "Roczne sprawozdanie finansowe i Corporation Tax to dwie różne rzeczy",
    differenceIntro:
      "Jako dyrektor odpowiadasz za dwa odrębne rozliczenia każdego roku: roczne sprawozdanie finansowe spółki (annual accounts), składane do Companies House, oraz deklarację podatkową spółki (Company Tax Return, CT600), składaną do HMRC. Dotyczą tego samego okresu rozliczeniowego, ale trafiają do różnych instytucji i mają różne terminy.",
    accountsCard: {
      heading: "Roczne sprawozdanie finansowe (Companies House)",
      text: "Sprawozdanie finansowe pokazuje, jak spółka działała w danym roku obrotowym. Składa się je do Companies House, gdzie staje się jawne — dostępne publicznie.",
      points: [
        "Pierwsze sprawozdanie: termin to 21 miesięcy od daty rejestracji spółki w Companies House.",
        "Sprawozdania za kolejne lata: termin to 9 miesięcy od zakończenia roku obrotowego spółki.",
      ],
      link: {
        label: "Składanie sprawozdania finansowego (GOV.UK, po angielsku)",
        href: GOV_UK.filingAccounts,
      },
    },
    ctCard: {
      heading: "Deklaracja podatkowa spółki i Corporation Tax (HMRC)",
      text: "Deklaracja podatkowa spółki (formularz CT600) informuje HMRC o zysku spółki i pozwala wyliczyć podatek Corporation Tax za dany okres rozliczeniowy. To odrębne rozliczenie od sprawozdania finansowego, choć przygotowuje się je na podstawie tych samych danych.",
      points: [
        "Deklaracja CT600: termin to 12 miesięcy od zakończenia okresu rozliczeniowego, którego dotyczy.",
        "Zapłata Corporation Tax: termin to 9 miesięcy i 1 dzień od zakończenia okresu rozliczeniowego, przy zysku podlegającym opodatkowaniu do £1,5 mln. Większe spółki płacą podatek w ratach.",
      ],
      link: {
        label: "Zapłata Corporation Tax (GOV.UK, po angielsku)",
        href: GOV_UK.payCorporationTax,
      },
    },

    directorHeading: "Obowiązki dyrektora",
    directorParagraphs: [
      "Jako dyrektor to Ty odpowiadasz za terminowe złożenie sprawozdania finansowego spółki oraz deklaracji CT600, nawet jeśli przygotowuje je ktoś inny.",
      "Ponieważ termin na sprawozdanie finansowe i terminy dotyczące Corporation Tax przypadają w różnych datach, warto planować oba rozliczenia już od początku okresu rozliczeniowego, zamiast zostawiać je na ostatnią chwilę.",
      "Aktualne terminy i ewentualne kary za spóźnienie podają GOV.UK i Companies House — szczegóły dotyczące Twojej spółki znajdziesz pod linkami na tej stronie.",
    ],
    directorLink: {
      label: "Prowadzenie spółki Ltd: obowiązki dyrektora (GOV.UK, po angielsku)",
      href: GOV_UK.runningALimitedCompany,
    },

    recordsHeading: "Dokumentacja, którą według GOV.UK powinien prowadzić dyrektor",
    recordsIntro: "Do przygotowania sprawozdania finansowego i deklaracji CT600 potrzebuję dokumentów takich jak:",
    records: [
      "Wszystkie wpływy i wydatki spółki, w tym wyciągi bankowe, faktury i paragony",
      "Majątek spółki oraz jej zobowiązania i należności",
      "Stan magazynu na koniec roku i spis z natury, na podstawie którego go ustalono, jeśli spółka prowadzi magazyn",
      "Informacje o tym, od kogo spółka kupowała i komu sprzedawała, chyba że prowadzi działalność detaliczną",
      "Dane udziałowców oraz dokumentację uchwał i decyzji udziałowców",
    ],
    recordsRetention:
      "Według GOV.UK dokumenty te należy przechowywać co najmniej 6 lat od zakończenia ostatniego roku obrotowego, którego dotyczą, a w niektórych sytuacjach dłużej — na przykład gdy transakcja obejmuje więcej niż jeden okres rozliczeniowy albo gdy HMRC wszczęło kontrolę (compliance check).",
    recordsLink: {
      label: "Dokumentacja spółki i księgi rachunkowe (GOV.UK, po angielsku)",
      href: GOV_UK.companyRecords,
    },

    servicesHeading: "W czym mogę pomóc",
    services: [
      "Przygotowanie rocznego sprawozdania finansowego spółki do złożenia w Companies House",
      "Przygotowanie i złożenie deklaracji podatkowej spółki (CT600) oraz wyliczenie Corporation Tax",
      "Planowanie podatkowe spółki, żebyś z wyprzedzeniem wiedział, czego się spodziewać",
    ],

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Działam w St Helens i pracuję zdalnie z klientami z Liverpoolu i całej Wielkiej Brytanii.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twojej spółce.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czy roczne sprawozdanie finansowe i deklaracja CT600 to to samo?",
        answer:
          "Nie. Roczne sprawozdanie finansowe składa się do Companies House i jest jawne. Deklaracja podatkowa spółki (CT600) to odrębne rozliczenie, składane do HMRC, które wylicza Corporation Tax. Oba przygotowuje się na podstawie tych samych danych, ale mają różne terminy.",
      },
      {
        question: "Kiedy trzeba złożyć pierwsze sprawozdanie finansowe spółki?",
        answer:
          "Według GOV.UK termin na pierwsze sprawozdanie to 21 miesięcy od daty rejestracji spółki w Companies House. Kolejne sprawozdania składa się w ciągu 9 miesięcy od zakończenia roku obrotowego.",
      },
      {
        question: "Kiedy trzeba zapłacić Corporation Tax?",
        answer:
          "Przy zysku podlegającym opodatkowaniu do £1,5 mln GOV.UK podaje termin 9 miesięcy i 1 dzień od zakończenia okresu rozliczeniowego. Sama deklaracja CT600 ma termin późniejszy — 12 miesięcy od zakończenia okresu.",
      },
      {
        question: "Czy przygotowujesz deklaracje CT600?",
        answer:
          "Tak. Przygotowuję i składam deklaracje podatkowe spółki (CT600) razem ze sprawozdaniem finansowym, a także pomagam w planowaniu podatkowym spółki.",
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
      `Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej. Przepisy i terminy się zmieniają, dlatego sprawdź GOV.UK i Companies House lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Składanie sprawozdania finansowego", href: GOV_UK.filingAccounts },
      { label: "Corporation Tax", href: GOV_UK.corporationTaxOverview },
      { label: "Zapłata Corporation Tax", href: GOV_UK.payCorporationTax },
      { label: "Deklaracje podatkowe spółki: terminy", href: GOV_UK.companyTaxReturnDeadlines },
      { label: "Dokumentacja spółki i księgi rachunkowe", href: GOV_UK.companyRecords },
      { label: "Prowadzenie spółki Ltd", href: GOV_UK.runningALimitedCompany },
      { label: "Okres rozliczeniowy Corporation Tax", href: GOV_UK.corporationTaxAccountingPeriod },
    ],
  },
};
