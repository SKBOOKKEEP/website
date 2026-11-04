import type { Content, Locale } from "@/content/copy";

export default function Footer({
  content,
  locale = "en",
}: {
  content: Content["footer"];
  locale?: Locale;
}) {
  const year = new Date().getFullYear();
  const privacyHref = locale === "pl" ? "/pl/privacy-policy" : "/privacy-policy";

  return (
    <footer
      className="py-20 px-5 md:px-16 bg-primary-container"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="font-serif text-xl text-surface-bright mb-2">
            {content.name}
          </p>
          <p className="text-sm text-on-primary-container text-center md:text-left">
            {content.copyright.replace("{year}", String(year))}
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-6 justify-center"
          aria-label={content.navAriaLabel}
        >
          <a
            href="https://www.gov.uk/government/organisations/hm-revenue-customs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-on-primary-container hover:text-surface-bright transition-colors"
          >
            {content.hmrcLink}
          </a>
          <a
            href="https://www.facebook.com/share/1EWvARkhhL/?ref=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-on-primary-container hover:text-surface-bright transition-colors"
          >
            {content.facebookLink}
          </a>
          <a
            href={privacyHref}
            className="text-sm text-on-primary-container hover:text-surface-bright transition-colors"
          >
            {content.privacyLink}
          </a>
        </nav>
      </div>
    </footer>
  );
}
