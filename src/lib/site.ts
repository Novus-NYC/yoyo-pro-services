/**
 * Single source of truth for every business fact on the site.
 *
 * Facts come from the owner's own Instagram (bio, reel caption and flyers),
 * the owner's message to Novus and the New York State Department of State
 * registry, as recorded in BUILD_NOTES.md. Anything not published or not
 * confirmed is `null`, and the UI that would show it renders nothing.
 */

/* ------------------------------------------------------------------
   Site URL: NEXT_PUBLIC_SITE_URL, then the Vercel production domain,
   then localhost. No domain is registered yet (open item).
   ------------------------------------------------------------------ */
const LOCAL_ORIGIN = "http://localhost:3000";

function resolveSiteUrl(): { url: string; isPublic: boolean } {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return { url: configured.replace(/\/+$/, ""), isPublic: true };

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return { url: `https://${vercelDomain.replace(/\/+$/, "")}`, isPublic: true };

  return { url: LOCAL_ORIGIN, isPublic: false };
}

const resolvedSiteUrl = resolveSiteUrl();

export const siteUrl = resolvedSiteUrl.url;

/** False on a local run. robots.txt then leaves out the sitemap line. */
export const hasPublicSiteUrl = resolvedSiteUrl.isPublic;

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
export type Phone = {
  /** As printed on the flyers: 929-606-6927 */
  display: string;
  /** E.164, for tel: links */
  e164: string;
  /** Short role label shown beside the number */
  label: string;
};

export type ServiceId = "cleaning" | "remodeling" | "painting" | "moving";

export type Service = {
  id: ServiceId;
  name: string;
  /**
   * The business's own one-line tagline from its Instagram reel caption,
   * rewritten without the dash. Confirm with the owner (open item).
   */
  tagline: string;
  /** Lower-case noun for sentences: "Ask about painting" */
  noun: string;
};

export type NavLink = { href: string; label: string };

/* ------------------------------------------------------------------
   Business facts
   ------------------------------------------------------------------ */
const primaryPhone: Phone = { display: "929-606-6927", e164: "+19296066927", label: "Call" };
const secondaryPhone: Phone = { display: "929-852-8456", e164: "+19298528456", label: "Second line" };

export const site = {
  /** Running-text name. The legal name appears only in the footer legal line. */
  name: "YOYO Pro Services",
  legalName: "YOYO Pro Services LLC",

  /** Their main line ("We Take Care of Your Space!"), in sentence case */
  tagline: "We take care of your space.",
  /** Their line "One Team. Multiple Solutions." */
  teamLine: "One team. Multiple solutions.",
  /** From the Instagram bio and reel caption ("At YOYO PRO SERVICES, we turn ...") */
  promise: "we turn ordinary spaces into extraordinary places",
  /** Adapted from the reel caption ("Whether you need a sparkling clean home, ...") */
  pitch:
    "Whether you need a sparkling clean home, a beautiful renovation, a fresh coat of paint or a stress-free move, it is one call.",

  owner: {
    name: "Ericson J. Ventura",
    title: "CEO",
    /**
     * The owner's own statement ("10 years or more experience"). Use on the
     * About page only, attributed to him. Not publicly verified: open item.
     */
    experience: "more than 10 years of experience" as string | null,
  },

  /** "Based in Brooklyn": the registry lists Kings County. Owner to confirm the wording. */
  base: "Brooklyn" as string | null,

  /** From the Instagram bio hashtags (#nyc #NJ #PA). Owner to confirm. */
  serviceArea: ["New York City", "New Jersey", "Pennsylvania"] as string[] | null,

  phones: {
    primary: primaryPhone,
    secondary: secondaryPhone as Phone | null,
  },

  instagram: {
    handle: "@yoyoproservices",
    url: "https://www.instagram.com/yoyoproservices/",
  },

  /**
   * Printed on both flyers as "Our Address". A virtual mailbox address, so it
   * is shown as a mailing address only: no map, no directions, no geo.
   */
  mailingAddress: {
    street: "169 Madison Ave",
    suite: "Suite 66927",
    locality: "New York",
    region: "NY",
    postalCode: "10016",
  } as { street: string; suite: string; locality: string; region: string; postalCode: string } | null,
  /** Shown under the mailing address wherever it appears: it is not a place to visit */
  mailingAddressNote: "For mail only.",

  // Not published anywhere. Keep null until the owner confirms them.
  email: null as string | null,
  hours: null as string | null,
  bookingUrl: null as string | null,
  /** Whether either number takes text messages is unknown */
  textNumber: null as Phone | null,
  /** Real job, team or vehicle photos. None exist yet. */
  photos: null as { src: string; width: number; height: number; alt: string }[] | null,
};

export const services: Service[] = [
  { id: "cleaning", name: "Cleaning", noun: "cleaning", tagline: "A fresher, healthier space." },
  { id: "remodeling", name: "Remodeling", noun: "remodeling", tagline: "Transform your home with style." },
  { id: "painting", name: "Painting", noun: "painting", tagline: "Bring new life to your walls." },
  { id: "moving", name: "Moving", noun: "moving", tagline: "Making your move easier and stress-free." },
];

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/* ------------------------------------------------------------------
   Derived strings (so no page retypes a fact)
   ------------------------------------------------------------------ */

/** "a, b and c" */
export function listSentence(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "cleaning, remodeling, painting and moving" */
export const servicesSentence = listSentence(services.map((service) => service.noun));

/** "New York City, New Jersey and Pennsylvania", or null */
export const serviceAreaSentence = site.serviceArea ? listSentence(site.serviceArea) : null;

export const telHref = (phone: Phone) => `tel:${phone.e164}`;

/** The primary call to action everywhere: "Call 929-606-6927" */
export const callLabel = `Call ${site.phones.primary.display}`;

export const mailingAddressLines = site.mailingAddress
  ? [
      site.mailingAddress.street,
      site.mailingAddress.suite,
      `${site.mailingAddress.locality}, ${site.mailingAddress.region} ${site.mailingAddress.postalCode}`,
    ]
  : null;
