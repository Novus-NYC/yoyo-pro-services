import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ExternalLink } from "@/lib/components/external-link";
import { ExternalArrow, PhoneIcon } from "@/lib/components/icons";
import { Reveal } from "@/lib/components/reveal";
import { ServiceIcon } from "@/lib/components/service-glyph";
import { pageMetadata } from "@/lib/metadata";
import { mailingAddressLines, serviceAreaSentence, services, site, telHref } from "@/lib/site";

const secondary = site.phones.secondary;

export const metadata = pageMetadata({
  title: "Contact",
  description: `Call ${site.name} at ${site.phones.primary.display}${secondary ? ` or ${secondary.display}` : ""}, or find ${
    site.instagram.handle
  } on Instagram. Tell us about the job and we will talk it through.`,
  path: "/contact",
});

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

type Note = { label: string; body: ReactNode };

/** Written out in full so Tailwind can see the class names */
const NOTE_COLUMNS: Record<number, string> = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };

export default function ContactPage() {
  const primary = site.phones.primary;

  // Only verified details are listed. Email and hours stay hidden until the
  // owner confirms them (both are null in site.ts).
  const notes: Note[] = [
    { label: "When you call", body: <p>Tell us what needs doing and where, and we will talk it through.</p> },
    ...(serviceAreaSentence
      ? [
          {
            label: "Where we work",
            body: (
              <p>
                {serviceAreaSentence}.{site.base ? ` Based in ${site.base}.` : ""}
              </p>
            ),
          },
        ]
      : []),
    ...(site.hours ? [{ label: "Hours", body: <p>{site.hours}</p> }] : []),
    ...(site.email
      ? [
          {
            label: "Email",
            body: (
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
            ),
          },
        ]
      : []),
    ...(mailingAddressLines
      ? [
          {
            label: "Mailing address",
            body: (
              <>
                <address className="not-italic">
                  {mailingAddressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-2 text-base text-muted">For post only.</p>
              </>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* The number, painted big */}
      <section className="on-dark blueprint-grid text-paper" aria-labelledby="contact-heading">
        <div className="container-site py-14 md:py-20 lg:py-24">
          <p className="label rise text-blueprint">Contact {site.name}</p>
          <h1 id="contact-heading" className="display rise mt-4 max-w-[18ch] text-display-lg" style={rise(80)}>
            Call us about the job.
          </h1>

          <div className="phone-fit rise mt-10 max-w-[60rem]" style={rise(160)}>
            <div className="dimension text-blueprint" aria-hidden="true" />
            <p className="label mt-3 text-blueprint">{primary.label}</p>
            <a
              href={telHref(primary)}
              className="phone-number display mt-2 inline-block text-gold decoration-4 underline-offset-[10px] hover:underline"
            >
              {primary.display}
            </a>
          </div>

          <ul className="rise mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-10" style={rise(240)}>
            {secondary ? (
              <li>
                <a href={telHref(secondary)} className="text-link text-lead">
                  <PhoneIcon />
                  <span className="whitespace-nowrap">
                    {secondary.label} {secondary.display}
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <ExternalLink href={site.instagram.url} className="text-link text-lead">
                <span className="whitespace-nowrap">Instagram {site.instagram.handle}</span>
                <ExternalArrow />
              </ExternalLink>
            </li>
          </ul>
        </div>
      </section>

      {/* Notes, set like the notes column on a drawing */}
      <section className="drafting-paper border-b border-rule" aria-labelledby="notes-heading">
        <div className="container-site py-16 md:py-20">
          <Reveal>
            <h2 id="notes-heading" className="display text-display-md">
              Good to know
            </h2>
          </Reveal>
          <dl className={`mt-8 grid gap-px border-2 border-navy bg-navy ${NOTE_COLUMNS[Math.min(notes.length, 3)]}`}>
            {notes.map((note, index) => (
              <Reveal key={note.label} delay={index * 90} className="bg-white p-6 md:p-8">
                <dt className="label text-muted">{note.label}</dt>
                <dd className="mt-3 text-lead">{note.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* What to call about */}
      <section className="bg-paper-2" aria-labelledby="call-about-heading">
        <div className="container-site py-16 md:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="call-about-heading" className="display text-display-md">
              What to call about
            </h2>
            <Link href="/services" className="text-link">
              See the services
            </Link>
          </Reveal>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 80} className="border-t-2 border-navy pt-5">
                <ServiceIcon id={service.id} className="h-12 w-12 text-navy" />
                <p className="display mt-4 text-display-sm">{service.name}</p>
                <p className="mt-1 text-muted">{service.tagline}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
