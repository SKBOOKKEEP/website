import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { pl } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności Sabina Krajewska Bookkeeping. Dowiedz się, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.",
  alternates: pageAlternates("privacy", "pl"),
};

export default function PrivacyPolicyPagePl() {
  return (
    <>
      <NavBar content={pl.nav} locale="pl" routeKey="privacy" />
      <main className="mt-20 py-16 px-5 md:px-16">
        <article className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">
            Polityka prywatności
          </h1>

          <p className="text-on-surface-variant mb-6">
            <strong>Data wejścia w życie:</strong> Listopad 2024
          </p>

          <p className="mb-6">
            Sabina Krajewska Bookkeeping (&quot;my&quot;, &quot;nas&quot; lub
            &quot;nasz&quot;) zobowiązuje się do ochrony Twojej prywatności.
            Niniejsza Polityka prywatności wyjaśnia, w jaki sposób zbieramy,
            wykorzystujemy i chronimy Twoje dane osobowe podczas odwiedzania
            naszej strony internetowej{" "}
            <a href={SITE_URL} className="text-primary hover:underline">
              {SITE_URL}
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            1. Jakie informacje zbieramy
          </h2>
          <p className="mb-4">Możemy zbierać następujące rodzaje informacji:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Dane kontaktowe:</strong> Imię i nazwisko, adres e-mail
              oraz numer telefonu, gdy wysyłasz formularz kontaktowy lub
              rezerwujesz konsultację.
            </li>
            <li>
              <strong>Dane dotyczące użytkowania:</strong> Informacje o tym, jak
              korzystasz z naszej strony, w tym odwiedzane strony, czas
              spędzony na stronie i źródło ruchu, zbierane przez Google
              Analytics (po wyrażeniu zgody na pliki cookie).
            </li>
            <li>
              <strong>Dane urządzenia:</strong> Typ przeglądarki, system
              operacyjny i adres IP w celach bezpieczeństwa i analitycznych.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            2. Jak wykorzystujemy Twoje dane
          </h2>
          <p className="mb-4">Zbierane informacje wykorzystujemy do:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Odpowiadania na Twoje zapytania i świadczenia usług księgowych
            </li>
            <li>Planowania konsultacji przez Calendly</li>
            <li>Ulepszania naszej strony i usług</li>
            <li>Wypełniania obowiązków prawnych</li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            3. Pliki cookie i analityka
          </h2>
          <p className="mb-4">
            Używamy Google Analytics, aby zrozumieć, w jaki sposób odwiedzający
            korzystają z naszej strony. Zgodnie z{" "}
            <strong>Google Consent Mode v2</strong>, zbieramy dane analityczne
            dopiero po wyrażeniu zgody za pomocą banera cookie.
          </p>
          <p className="mb-4">
            Bez Twojej zgody nie są ustawiane żadne pliki cookie śledzące i
            żadne dane osobowe nie są przesyłane do Google Analytics.
          </p>
          <p className="mb-6">
            Możesz zmienić swoje preferencje dotyczące plików cookie w dowolnym
            momencie, usuwając pliki cookie przeglądarki i ponownie odwiedzając
            naszą stronę.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            4. Udostępnianie danych
          </h2>
          <p className="mb-6">
            Nie sprzedajemy Twoich danych osobowych. Możemy udostępniać
            informacje:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Dostawcom usług:</strong> Takim jak Calendly
              (planowanie), Resend (dostarczanie e-maili) i Google (analityka)
              — tylko w zakresie niezbędnym do świadczenia naszych usług.
            </li>
            <li>
              <strong>Organom prawnym:</strong> Jeśli jest to wymagane przez
              prawo lub w celu ochrony naszych praw.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            5. Przechowywanie danych
          </h2>
          <p className="mb-6">
            Przechowujemy Twoje dane osobowe tylko tak długo, jak jest to
            konieczne do realizacji celów określonych w niniejszej polityce lub
            zgodnie z wymogami prawa. Zgłoszenia z formularza kontaktowego są
            przechowywane do 2 lat, chyba że zostaniesz klientem — wówczas dane
            są przechowywane zgodnie z wymogami HMRC.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            6. Twoje prawa
          </h2>
          <p className="mb-4">
            Zgodnie z UK GDPR masz prawo do:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Dostępu do przechowywanych przez nas danych osobowych</li>
            <li>Żądania poprawienia nieprawidłowych danych</li>
            <li>Żądania usunięcia Twoich danych</li>
            <li>Sprzeciwu wobec przetwarzania Twoich danych</li>
            <li>Żądania przenoszenia danych</li>
          </ul>
          <p className="mb-6">
            Aby skorzystać z tych praw, skontaktuj się z nami pod adresem{" "}
            <a
              href="mailto:contact@simple-bookkeeping.co.uk"
              className="text-primary hover:underline"
            >
              contact@simple-bookkeeping.co.uk
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            7. Kontakt
          </h2>
          <p className="mb-6">
            Jeśli masz pytania dotyczące niniejszej Polityki prywatności,
            skontaktuj się z nami:
          </p>
          <address className="not-italic mb-6">
            <strong>Sabina Krajewska Bookkeeping</strong>
            <br />
            St Helens, WA9
            <br />
            Merseyside, Wielka Brytania
            <br />
            E-mail:{" "}
            <a
              href="mailto:contact@simple-bookkeeping.co.uk"
              className="text-primary hover:underline"
            >
              contact@simple-bookkeeping.co.uk
            </a>
            <br />
            Telefon:{" "}
            <a href={`tel:${PHONE_E164}`} className="text-primary hover:underline">
              {PHONE_DISPLAY}
            </a>
          </address>

          <h2 className="font-serif text-2xl font-semibold text-primary mt-10 mb-4">
            8. Zmiany w polityce
          </h2>
          <p className="mb-6">
            Możemy od czasu do czasu aktualizować niniejszą Politykę
            prywatności. Wszelkie zmiany zostaną opublikowane na tej stronie z
            zaktualizowaną datą wejścia w życie.
          </p>
        </article>
      </main>
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
