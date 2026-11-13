import type { Locale } from "@/content/copy";
import type { RouteKey } from "@/lib/routes";
import { buildPageJsonLd } from "@/lib/seo";

/** WebPage (+ breadcrumb on inner pages) JSON-LD for one route. */
export default function PageJsonLd({
  routeKey,
  locale,
}: {
  routeKey: RouteKey;
  locale: Locale;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildPageJsonLd(routeKey, locale)),
      }}
    />
  );
}
