import { OG_IMAGE_PATH } from "@/lib/metadata";
import { hasPublicSiteUrl, services, servicesSentence, site, siteUrl } from "@/lib/site";

/**
 * Schema.org Organization for the home page, built only from verified
 * fields in site.ts. Deliberately no address, geo or opening hours: the
 * only published address is a mailing address, and no hours are published.
 * The page URL is left out on a local run, where no public address exists.
 */
export function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.tagline,
    description: `${site.name}: ${servicesSentence}.`,
    telephone: site.phones.primary.e164,
    sameAs: [site.instagram.url],
    // "CEO" is the owner's own title. No source says he founded the company,
    // so he is listed as an employee with that title, not as founder.
    employee: {
      "@type": "Person",
      name: site.owner.name,
      jobTitle: site.owner.title,
    },
    knowsAbout: services.map((service) => service.name),
  };
  if (hasPublicSiteUrl) {
    data.url = siteUrl;
    data.image = `${siteUrl}${OG_IMAGE_PATH}`;
  }
  if (site.email) data.email = site.email;
  if (site.serviceArea) data.areaServed = site.serviceArea.map((name) => ({ "@type": "Place", name }));

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
