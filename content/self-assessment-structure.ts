import type { Locale } from "@/content/copy";

/**
 * "Sole trader vs limited company" comparison table (T3.3), shown as a
 * section on the Self Assessment pages. General information only — never a
 * recommendation of one structure over another; Sabina can talk through what
 * suits someone's situation on the free introductory call.
 *
 * Every fact here was checked live against GOV.UK on FIGURES_CHECKED_ON.
 */
export const FIGURES_CHECKED_ON = "2026-11-14";

export const GOV_UK = {
  businessStructures: "https://www.gov.uk/business-legal-structures",
} as const;

type Link = { label: string; href: string };

export type StructureRow = { aspect: string; soleTrader: string; limitedCompany: string };

export type StructureComparisonCopy = {
  heading: string;
  intro: string;
  tableCaption: string;
  colAspect: string;
  colSoleTrader: string;
  colLimitedCompany: string;
  rows: StructureRow[];
  note: string;
  /** Link text for the Limited company accounts page; href comes from routes.json. */
  limitedCompanyLinkLabel: string;
  disclaimer: (checkedOn: string) => string;
  sourcesHeading: string;
  sources: Link[];
};

export const structureComparison: Record<Locale, StructureComparisonCopy> = {
  en: {
    heading: "Sole trader or limited company?",
    intro:
      "Both sole traders and limited companies are common ways to run a small business in the UK. Here's how GOV.UK describes the main differences.",
    tableCaption: "Sole trader vs limited company, at a glance",
    colAspect: "",
    colSoleTrader: "Sole trader",
    colLimitedCompany: "Limited company",
    rows: [
      {
        aspect: "Liability",
        soleTrader: "You're personally responsible for all of the business's debts (unlimited liability).",
        limitedCompany:
          "The company is a separate legal entity. Owners are responsible for its debts only up to the value of their financial investment (limited liability).",
      },
      {
        aspect: "How profits are taxed",
        soleTrader: "Profits are taxed as your personal Income Tax, reported through your Self Assessment tax return.",
        limitedCompany:
          "The company pays Corporation Tax on its profits. Directors separately pay Income Tax and National Insurance on what they take out, such as salary or dividends.",
      },
      {
        aspect: "What must be filed",
        soleTrader: "A Self Assessment tax return each year.",
        limitedCompany:
          "Annual (statutory) accounts with Companies House, and a Company Tax Return (CT600) with HMRC.",
      },
    ],
    note:
      "This is general information, not tax advice, and not a recommendation to choose one structure over another. I can talk through which might suit your situation on the free introductory call.",
    limitedCompanyLinkLabel: "Limited company accounts and Corporation Tax",
    disclaimer: (checkedOn) =>
      `This section gives general information, not tax advice. Rules change, so check GOV.UK or ask for advice about your own situation. Checked on ${checkedOn}.`,
    sourcesHeading: "Source (GOV.UK)",
    sources: [{ label: "Business and legal structures", href: GOV_UK.businessStructures }],
  },
  pl: {
    heading: "Sole trader czy spółka Ltd?",
    intro:
      "Sole trader (działalność jednoosobowa) i spółka Ltd to dwie popularne formy prowadzenia małej firmy w Wielkiej Brytanii. Oto, jak GOV.UK opisuje główne różnice.",
    tableCaption: "Sole trader a spółka Ltd — porównanie",
    colAspect: "",
    colSoleTrader: "Sole trader",
    colLimitedCompany: "Spółka Ltd",
    rows: [
      {
        aspect: "Odpowiedzialność",
        soleTrader: "Osobiście odpowiadasz za wszystkie zobowiązania firmy (odpowiedzialność nieograniczona).",
        limitedCompany:
          "Spółka jest odrębnym podmiotem prawnym. Udziałowcy odpowiadają za jej zobowiązania tylko do wysokości wniesionego wkładu (odpowiedzialność ograniczona).",
      },
      {
        aspect: "Jak opodatkowany jest zysk",
        soleTrader: "Zysk jest opodatkowany jako Twój osobisty dochód (Income Tax), wykazywany w deklaracji Self Assessment.",
        limitedCompany:
          "Spółka płaci podatek Corporation Tax od swojego zysku. Dyrektorzy odrębnie płacą Income Tax i składki National Insurance od tego, co wypłacają z firmy, np. wynagrodzenie lub dywidendy.",
      },
      {
        aspect: "Co trzeba złożyć",
        soleTrader: "Coroczną deklarację Self Assessment.",
        limitedCompany:
          "Roczne sprawozdanie finansowe w Companies House oraz deklarację podatkową spółki (Company Tax Return, CT600) w HMRC.",
      },
    ],
    note:
      "To informacje ogólne, a nie porada podatkowa, i nie jest to rekomendacja wyboru jednej formy działalności nad drugą. Podczas bezpłatnej rozmowy wstępnej mogę omówić z Tobą, co może pasować do Twojej sytuacji.",
    limitedCompanyLinkLabel: "Rozliczenia spółek Ltd i Corporation Tax",
    disclaimer: (checkedOn) =>
      `Ta sekcja zawiera informacje ogólne i nie stanowi porady podatkowej. Przepisy się zmieniają, dlatego sprawdź GOV.UK lub zasięgnij porady dotyczącej Twojej sytuacji. Sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródło (GOV.UK, po angielsku)",
    sources: [{ label: "Formy prawne prowadzenia działalności", href: GOV_UK.businessStructures }],
  },
};
