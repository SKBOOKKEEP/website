import { BookOpen, User, Building, Bank } from "../ui/icons";
import type { Content, Locale, ServiceIcon } from "@/content/copy";
import { publishedPath } from "@/lib/routes";

const icons: Record<ServiceIcon, typeof BookOpen> = {
  bookOpen: BookOpen,
  user: User,
  building: Building,
  bank: Bank,
};

/** Same-page anchor used by the hero CTA; Services renders on the home pages only. */
const BOOKING_ANCHOR = "#booking";

export default function Services({
  content,
  locale,
}: {
  content: Content["services"];
  locale: Locale;
}) {
  return (
    <section id="services" className="scroll-mt-20 my-20 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
            {content.heading}
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto" aria-hidden="true" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {content.items.map(({ icon, title, description, route }) => {
            const Icon = icons[icon];
            // Unpublished (or route-less) services link to the home page's
            // booking section, the same anchor as the hero CTA, and switch to
            // the real page automatically once its route is published.
            const href = (route && publishedPath(route, locale)) || BOOKING_ANCHOR;
            const cardContent = (
              <>
                <Icon
                  className="w-9 h-9 text-secondary mb-4"
                  aria-hidden="true"
                />
                <h3 className="font-serif text-2xl font-semibold text-primary mb-2">
                  {title}
                </h3>
                <p className="text-base leading-6 text-on-surface-variant">
                  {description}
                </p>
              </>
            );

            const cardClass =
              "p-8 border border-outline-variant hover:border-primary transition-colors flex flex-col items-center text-center";

            return (
              <a key={title} href={href} className={cardClass}>
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
