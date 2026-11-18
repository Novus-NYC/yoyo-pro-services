import Link from "next/link";
import { ExternalLink } from "@/lib/components/external-link";
import { ExternalArrow } from "@/lib/components/icons";
import { Wordmark } from "@/lib/components/wordmark";
import { mailingAddressLines, navLinks, serviceAreaSentence, servicesSentence, site, telHref } from "@/lib/site";

const FOOTER_LINK = "inline-flex min-h-[44px] items-center gap-2 text-paper underline-offset-4 hover:text-gold hover:underline";

/** "Cleaning, remodeling, painting and moving. Based in Brooklyn, working across ..." */
function footerSummary(): string {
  const parts = [`${servicesSentence.charAt(0).toUpperCase()}${servicesSentence.slice(1)}.`];
  if (site.base && serviceAreaSentence) parts.push(`Based in ${site.base}, working across ${serviceAreaSentence}.`);
  else if (site.base) parts.push(`Based in ${site.base}.`);
  else if (serviceAreaSentence) parts.push(`Working across ${serviceAreaSentence}.`);
  return parts.join(" ");
}

export function Footer() {
  const year = new Date().getFullYear();
  const phones = [site.phones.primary, site.phones.secondary].filter((phone) => phone !== null);

  return (
    <footer className="on-dark bg-navy-deep text-paper">
      {/* A gold rule, like the roof line in the hero drawing */}
      <div className="h-2 bg-gold" aria-hidden="true" />
      {/* min-w-0 on every column, so no unbreakable line can widen a grid
          track past the viewport. The brand column spans the full row until
          xl: below that, a third of the row is narrower than the wordmark. */}
      <div className="container-site grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-16 [&>*]:min-w-0">
        <div className="md:col-span-12 xl:col-span-4">
          <Wordmark tone="dark" size="lg" />
          <p className="display mt-6 text-display-sm text-paper">{site.tagline}</p>
          <p className="measure-narrow mt-3 text-base text-blueprint">{footerSummary()}</p>
        </div>

        <nav id="footer-nav" aria-label="Footer" className="md:col-span-3 xl:col-span-2">
          <h2 className="label text-blueprint">Pages</h2>
          <ul className="mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={FOOTER_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* The contact column takes the width of its longest link (the
            Instagram handle); the mailing address takes the rest */}
        <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] md:col-span-9 md:gap-6 xl:col-span-6">
          <div>
            <h2 className="label text-blueprint">Contact</h2>
            <ul className="mt-2">
              {phones.map((phone) => (
                <li key={phone.e164}>
                  {/* Visible role labels, as on Contact and the closing panel:
                      "Call 929-606-6927", "Second line 929-852-8456" */}
                  <a href={telHref(phone)} className={`${FOOTER_LINK} whitespace-nowrap`}>
                    {phone.label} {phone.display}
                  </a>
                </li>
              ))}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className={FOOTER_LINK}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              <li>
                <ExternalLink href={site.instagram.url} className={FOOTER_LINK}>
                  <span className="whitespace-nowrap">Instagram {site.instagram.handle}</span>
                  <ExternalArrow />
                </ExternalLink>
              </li>
            </ul>
          </div>

          {mailingAddressLines ? (
            <div>
              <h2 className="label text-blueprint">Mailing address</h2>
              <address className="mt-3 not-italic leading-relaxed text-paper">
                {mailingAddressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-1 text-sm text-blueprint">{site.mailingAddressNote}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-blueprint/25">
        <div className="container-site flex flex-col gap-1 py-4 text-base sm:flex-row sm:items-center sm:justify-between">
          <p className="text-blueprint">
            © {year} {site.legalName}
          </p>
          {/* The link text must be exactly "Made by Novus", so the new-tab note
              is attached with aria-describedby instead of sitting inside it. */}
          <a href="https://novusnyc.org" target="_blank" rel="noreferrer" aria-describedby="novus-new-tab" className={FOOTER_LINK}>
            Made by Novus
          </a>
          <span id="novus-new-tab" className="sr-only">
            Opens in a new tab
          </span>
        </div>
      </div>
    </footer>
  );
}
