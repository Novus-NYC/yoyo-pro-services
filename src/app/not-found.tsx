import type { Metadata } from "next";
import Link from "next/link";
import { CallButton } from "@/lib/components/call-button";
import { ArrowIcon } from "@/lib/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  description: `That page is not on the ${site.name} site. Head back home, see the services or call us.`,
  robots: { index: false, follow: false },
};

/**
 * 404. Rendered on the server inside the root layout, so it has the site
 * header and footer, a title, one h1 and a main, and works without
 * JavaScript.
 */
export default function NotFound() {
  return (
    <section className="on-dark blueprint-grid text-paper">
      <div className="container-site flex min-h-[60vh] flex-col justify-center py-16 md:py-24">
        {/* A doorway that leads nowhere: drawn in plan, decorative */}
        <svg className="h-24 w-40 text-blueprint" viewBox="0 0 160 96" aria-hidden="true" focusable="false">
          <path d="M0 94h48M112 94h48" fill="none" stroke="var(--paper)" strokeWidth="6" />
          <path d="M50 94V34" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 34a60 60 0 0 1 60 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
        <p className="label mt-6 text-blueprint">Error 404</p>
        <h1 className="display mt-3 text-display-lg">This room is not on the plan.</h1>
        <p className="measure mt-4 text-lead">
          That page is not here. It may have moved, or the link may be mistyped. These will get you back in.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <CallButton />
          <Link href="/" className="btn-ghost-dark">
            Back to home
          </Link>
          <Link href="/services" className="text-link">
            See the services
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
