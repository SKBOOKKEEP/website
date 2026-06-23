import type { Content } from "@/content/copy";

export default function Footer({ content }: { content: Content["footer"] }) {
  const year = new Date().getFullYear();

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
        </nav>
      </div>
    </footer>
  );
}
