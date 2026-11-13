import type { RouteKey } from "@/lib/routes";

/**
 * Copy for the PL-only "UK-wide Polish accountant" page (SEO task T4.2):
 * PL /pl/polska-ksiegowa-uk. There is no English equivalent — this route
 * exists only for "polski księgowy manchester" / "polski księgowy w uk"
 * style searches (GSC, 28 days to 11 Nov 2026: 0 impressions / 10 clicks /
 * position 35.4, and 0 / 2 / position 49).
 *
 * This is deliberately NOT a doorway page. The practice is based in St
 * Helens, WA9, and works with clients across the whole UK remotely,
 * including Greater Manchester — but there is no Manchester office, and the
 * page says so plainly rather than copying how some competitors (e.g. AKF
 * Accounts) present Manchester/Liverpool/London "location" pages. Owner-
 * confirmed facts (Sabina, 11 Nov 2026): remote only, no face-to-face
 * meetings, no street address or map, no prices, figures, client names,
 * years or reviews. Services referenced are limited to the ones that already
 * have their own pages: Self Assessment, Bookkeeping & VAT, Making Tax
 * Digital, Limited company accounts/CT600 and HMRC support — the HMRC
 * support content lives on its own page (content/hmrc-support.ts) and is
 * linked to here, not repeated.
 *
 * The AML line cites GOV.UK (checked 13 Nov 2026), the same source used on
 * the Liverpool and St Helens pages. Polish copy is held for Sabina's human
 * review (T4.3) before this page is treated as finished.
 */

export const AML_SOURCE_URL =
  "https://www.gov.uk/guidance/money-laundering-regulations-who-needs-to-register";

export interface PolishUkCopy {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  portraitAlt: string;
  ctaBook: string;
  ctaContact: string;
  ctaCall: string;

  whereHeading: string;
  whereParagraphs: string[];

  remoteHeading: string;
  remoteIntro: string;
  remote: { title: string; text: string }[];

  docsHeading: string;
  docsIntro: string;
  docs: string[];

  coverHeading: string;
  coverIntro: string;
  cover: { title: string; text: string }[];

  hmrcHeading: string;
  hmrcParagraphs: string[];
  hmrcLinkLabel: string;

  linksHeading: string;
  /** Link text per page; a link only renders once that route is published. */
  links: Partial<Record<RouteKey, string>>;

  checklistHeading: string;
  checklistIntro: string;
  checklist: { question: string; answer: string; source?: string }[];
  sourceLabel: string;

  faqHeading: string;
  faqs: { question: string; answer: string }[];

  disclaimer: string;
}

export const polishUkCopy: PolishUkCopy = {
  title: "Polska księgowa dla klientów z całej Wielkiej Brytanii | Sabina Krajewska",
  description:
    "Szukasz polskiej księgowej w Manchesterze lub gdziekolwiek w UK? Działam zdalnie z St Helens, bez biura w Manchesterze — uczciwie o tym piszę.",
  ogTitle: "Polska księgowa — zdalnie dla całej Wielkiej Brytanii",
  ogDescription:
    "Księgowa z St Helens, która zdalnie obsługuje klientów z całej Wielkiej Brytanii, w tym z Greater Manchester. Bez biura w Manchesterze — bez udawania, że jest inaczej.",
  h1: "Polska księgowa dla klientów z całej Wielkiej Brytanii",
  lead: "Nazywam się Sabina Krajewska. Moja działalność jest zarejestrowana w St Helens, WA9, a całą pracę wykonuję zdalnie — z klientami z Greater Manchester i z dowolnego miejsca w Wielkiej Brytanii współpracuję dokładnie tak samo, jak z osobami mieszkającymi bliżej.",
  portraitAlt:
    "Sabina Krajewska, księgowa działająca zdalnie z St Helens, współpracująca z klientami z całej Wielkiej Brytanii",
  ctaBook: "Umów bezpłatną rozmowę wstępną",
  ctaContact: "Napisz do mnie",
  ctaCall: "Zadzwoń:",

  whereHeading: "Uczciwie o tym, gdzie działam",
  whereParagraphs: [
    "Od razu to wyjaśniam, bo warto to wiedzieć przed kontaktem: nie mam biura w Manchesterze ani w żadnym innym mieście. Moja działalność jest zarejestrowana w St Helens, WA9, i nigdzie nie prowadzę spotkań osobistych.",
    "Niektóre firmy księgowe reklamujące się dla Polaków w UK wymieniają adresy w Manchesterze, Liverpoolu czy Londynie, choć w praktyce obsługują klientów zdalnie. Wolę napisać wprost, jak jest u mnie: pracuję zdalnie z klientami z Greater Manchester, Liverpoolu, Londynu i każdego innego miejsca w Wielkiej Brytanii — miejsce zamieszkania nie ma wpływu na jakość obsługi ani na to, jak szybko odpowiadam.",
  ],

  remoteHeading: "Jak wygląda współpraca zdalna w praktyce",
  remoteIntro:
    "Praca zdalna nie oznacza mniej kontaktu — oznacza inny sposób kontaktu. Tak to zwykle wygląda:",
  remote: [
    {
      title: "Rozmowy telefoniczne i wideorozmowy",
      text: "Pierwszą rozmowę i bieżące pytania załatwiamy przez telefon lub wideorozmowę, w terminie dogodnym dla obu stron — bez dojazdu z Twojej strony.",
    },
    {
      title: "Dokumenty przesyłane elektronicznie",
      text: "Faktury, paragony i wyciągi bankowe przesyłasz w formie elektronicznej: jako skan, zdjęcie telefonem albo plik z Twojego oprogramowania księgowego. Nie trzeba niczego wysyłać pocztą ani przekazywać osobiście.",
    },
    {
      title: "Podpisy elektroniczne",
      text: "Dokumenty, które wymagają Twojego podpisu, podpisujesz elektronicznie, więc nie musisz nic drukować ani odsyłać papierowo.",
    },
    {
      title: "Jedna osoba od początku do końca",
      text: "Kontaktujesz się bezpośrednio ze mną, za każdym razem z tą samą osobą, więc nie trzeba za każdym razem od nowa tłumaczyć, czym zajmuje się firma.",
    },
  ],

  docsHeading: "Jakie dokumenty warto przygotować",
  docsIntro:
    "Zakres zależy od tego, czym się zajmujesz, ale zwykle przydają się:",
  docs: [
    "Faktury sprzedaży i zakupu",
    "Paragony i potwierdzenia wydatków firmowych",
    "Wyciągi bankowe z rachunku firmowego",
    "Informacje o dotychczasowej rejestracji: VAT, PAYE, numer UTR, numer spółki (jeśli dotyczy)",
    "Wszelkie pisma od HMRC, na które czekasz z odpowiedzią lub które Cię niepokoją",
    "Dane logowania do oprogramowania księgowego, jeśli już z niego korzystasz",
  ],

  coverHeading: "W czym mogę pomóc",
  coverIntro:
    "Poniżej usługi, które oferuję — każda ma też swoją osobną stronę z pełnymi informacjami:",
  cover: [
    {
      title: "Self Assessment",
      text: "Przygotowanie i złożenie rocznej deklaracji podatkowej dla osób samozatrudnionych, wynajmujących nieruchomości i innych osób rozliczających się przez Self Assessment.",
    },
    {
      title: "Księgowość i VAT",
      text: "Bieżąca księgowość tak często, jak potrzebujesz, uzupełnianie zaległej dokumentacji, rejestracja do VAT i składanie deklaracji VAT zgodnie z Making Tax Digital.",
    },
    {
      title: "Making Tax Digital",
      text: "Pomoc w przejściu na Making Tax Digital for Income Tax i w bieżącym prowadzeniu ewidencji w zgodnym z nim oprogramowaniu.",
    },
    {
      title: "Spółki Ltd — sprawozdania i CT600",
      text: "Roczne sprawozdania finansowe oraz deklaracje Corporation Tax (CT600) dla małych spółek Ltd.",
    },
  ],

  hmrcHeading: "Pomoc z HMRC po polsku i angielsku",
  hmrcParagraphs: [
    "Jeśli masz pismo od HMRC i nie masz pewności, co ono oznacza, mogę pomóc je przetłumaczyć na prosty język i doradzić, co dalej.",
    "Pełny opis tej usługi — w tym jak wygląda kontrola HMRC i czego się spodziewać — znajdziesz na osobnej stronie, żeby nie powtarzać tu tych samych informacji.",
  ],
  hmrcLinkLabel: "Pomoc z HMRC",

  linksHeading: "Powiązane strony",
  links: {
    selfAssessment: "Rozliczenie Self Assessment",
    bookkeeping: "Księgowość i VAT",
    mtdIncomeTax: "Making Tax Digital dla podatku dochodowego",
    limitedCompany: "Spółki Ltd",
    hmrcSupport: "Pomoc z HMRC",
    stHelens: "Księgowa w St Helens",
    liverpool: "Księgowa dla Liverpoolu",
  },

  checklistHeading: "Pytania, które warto zadać każdej księgowej online",
  checklistIntro:
    "Niezależnie od tego, kogo wybierzesz, te pytania pomogą Ci porównać oferty. Poniżej moje odpowiedzi.",
  checklist: [
    {
      question: "Czy masz biuro w Manchesterze albo innym mieście?",
      answer:
        "Nie. Moja działalność jest zarejestrowana w St Helens, WA9, i nie mam biura w Manchesterze ani nigdzie indziej. Pracuję wyłącznie zdalnie.",
    },
    {
      question: "Czy podlegasz nadzorowi w zakresie przeciwdziałania praniu pieniędzy?",
      answer:
        "Firmy świadczące usługi księgowe muszą podlegać nadzorowi w zakresie przeciwdziałania praniu pieniędzy — organizacji zawodowej albo HMRC. To wymóg prawny, a nie znak jakości, ale warto to sprawdzić. Ja podlegam nadzorowi HMRC.",
      source: AML_SOURCE_URL,
    },
    {
      question: "Z kim będę się kontaktować?",
      answer: "Kontaktujesz się bezpośrednio ze mną.",
    },
    {
      question: "Jak mam przekazywać dokumenty?",
      answer:
        "Elektronicznie — skanem, zdjęciem albo plikiem z oprogramowania księgowego. Jeśli nie korzystasz jeszcze z żadnego programu, pomogę Ci je skonfigurować.",
    },
    {
      question: "Jak ustalasz opłaty?",
      answer:
        "Opłaty ustalamy po bezpłatnej rozmowie wstępnej, kiedy znamy już zakres pracy. Nie publikuję cen.",
    },
  ],
  sourceLabel: "Źródło: GOV.UK (po angielsku)",

  faqHeading: "Najczęstsze pytania",
  faqs: [
    {
      question: "Mieszkam w Manchesterze — czy mogę się z Tobą spotkać osobiście?",
      answer:
        "Nie, nigdzie nie prowadzę spotkań osobistych, więc dotyczy to tak samo Manchesteru, jak i każdego innego miasta. Cała współpraca odbywa się przez telefon, wideorozmowę i e-mail.",
    },
    {
      question: "Czy obsługujesz klientów spoza Greater Manchester i Merseyside?",
      answer:
        "Tak. Ponieważ pracuję zdalnie, współpracuję z klientami z całej Wielkiej Brytanii w ten sam sposób.",
    },
    {
      question: "Mam zaległości w dokumentach. Czy nadal możesz pomóc?",
      answer:
        "Tak, uzupełnianie zaległej lub brakującej dokumentacji to część mojej pracy. Opowiedz mi o swojej sytuacji podczas rozmowy wstępnej.",
    },
    {
      question: "Czy mogę się z Tobą kontaktować wyłącznie po polsku?",
      answer: "Tak. Całą współpracę, od pierwszej rozmowy po bieżącą księgowość, możemy prowadzić po polsku.",
    },
  ],

  disclaimer:
    "Ta strona opisuje moje usługi. Zawiera informacje ogólne i nie stanowi porady podatkowej.",
};
