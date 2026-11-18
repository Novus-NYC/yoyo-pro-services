import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CallButton } from "@/lib/components/call-button";
import { ClosingCall } from "@/lib/components/closing-call";
import { ArrowIcon } from "@/lib/components/icons";
import { Marked } from "@/lib/components/plan";
import { Reveal } from "@/lib/components/reveal";
import { ServiceIcon } from "@/lib/components/service-glyph";
import { pageMetadata } from "@/lib/metadata";
import { serviceAreaSentence, services, servicesSentence, site, telHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `${site.name} is led by ${site.owner.name}, ${site.owner.title}${site.base ? `, and based in ${site.base}` : ""}. One team for ${servicesSentence}${
    serviceAreaSentence ? ` across ${serviceAreaSentence}` : ""
  }.`,
  path: "/about",
});

type Row = { label: string; value: ReactNode };

export default function AboutPage() {
  const rows: Row[] = [
    { label: "Company", value: site.name },
    { label: "Led by", value: `${site.owner.name}, ${site.owner.title}` },
    ...(site.base ? [{ label: "Based in", value: `${site.base}, New York` }] : []),
    ...(serviceAreaSentence ? [{ label: "Works in", value: serviceAreaSentence }] : []),
    { label: "Services", value: services.map((service) => service.name).join(", ") },
    {
      label: "Phone",
      value: (
        <a href={telHref(site.phones.primary)} className="underline decoration-gold-deep decoration-2 underline-offset-4 hover:decoration-navy">
          {site.phones.primary.display}
        </a>
      ),
    },
  ];

  return (
    <>
      {/* Opening: their own line, and the company set out like the title
          block in the corner of a drawing sheet */}
      <section className="drafting-paper border-b border-rule" aria-labelledby="about-heading">
        <div className="container-site grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="label rise text-muted">About {site.name}</p>
            <h1 id="about-heading" className="display rise mt-4 text-display-lg" style={{ "--rise-delay": "80ms" } as CSSProperties}>
              <Marked text={site.teamLine} phrase="solutions." className="mark hero-mark" />
            </h1>
            <p className="rise measure mt-6 text-lead" style={{ "--rise-delay": "160ms" } as CSSProperties}>
              At {site.name}, we turn ordinary spaces into extraordinary places, whether you need a clean home or a beautiful
              renovation.
            </p>
            <div className="rise mt-8" style={{ "--rise-delay": "240ms" } as CSSProperties}>
              <CallButton />
            </div>
          </div>

          <Reveal className="lg:col-span-5 lg:mt-3" delay={120}>
            <dl className="border-2 border-navy bg-white">
              {rows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 sm:grid-cols-[8.5rem_1fr] sm:px-5 ${index > 0 ? "border-t border-rule" : ""}`}
                >
                  <dt className="label pt-1 text-muted">{row.label}</dt>
                  <dd className="font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Who leads it */}
      <section className="bg-white" aria-labelledby="lead-heading">
        <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <Reveal className="md:col-span-5">
            <p className="label text-muted">Who leads it</p>
            <h2 id="lead-heading" className="display mt-3 text-display-lg">
              {site.owner.name}
            </h2>
            <p className="label mt-3 inline-block bg-gold px-2 py-1 text-navy">{site.owner.title}</p>
          </Reveal>
          <Reveal className="md:col-span-7 md:pt-8" delay={100}>
            <p className="measure text-lead">
              {site.owner.name} leads {site.name}
              {site.owner.experience ? ` and says he brings ${site.owner.experience}` : ""}.
            </p>
            <p className="measure mt-4 text-lead">
              The company keeps four trades under one name: {servicesSentence}. Whichever you need, the call goes to the same
              team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Where the work happens */}
      {serviceAreaSentence ? (
        <section className="on-dark blueprint-grid text-paper" aria-labelledby="area-heading">
          <div className="container-site py-16 md:py-24">
            <Reveal>
              <p className="label text-blueprint">Where we work</p>
              <h2 id="area-heading" className="display mt-3 text-display-lg">
                {site.base ? (
                  <>
                    Based in <span className="mark-under">{site.base}.</span>
                  </>
                ) : (
                  "Where we work"
                )}
              </h2>
              <p className="label mt-8 text-blueprint">Working across</p>
            </Reveal>
            <ol className="mt-3 grid gap-px border-2 border-blueprint/40 bg-blueprint/40 sm:grid-cols-3">
              {site.serviceArea?.map((area, index) => (
                <Reveal as="li" key={area} delay={index * 90} className="bg-navy px-5 py-6 md:px-6 md:py-8">
                  <span className="display block text-display-md">{area}</span>
                </Reveal>
              ))}
            </ol>
            <p className="measure mt-6 text-base text-blueprint">Not sure we cover your street? Ask when you call.</p>
          </div>
        </section>
      ) : null}

      {/* The trades, as a key to the drawings */}
      <section className="drafting-paper" aria-labelledby="trades-heading">
        <div className="container-site py-16 md:py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="trades-heading" className="display text-display-md">
              What we take on
            </h2>
            <Link href="/services" className="text-link">
              See the services
              <ArrowIcon />
            </Link>
          </Reveal>
          <ul className="mt-8 grid gap-px border-2 border-navy bg-navy sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 80} className="bg-paper">
                <Link href={`/services#${service.id}`} className="group flex h-full min-h-[44px] items-center gap-4 p-5 transition-colors hover:bg-gold-tint">
                  <ServiceIcon id={service.id} className="h-12 w-12 shrink-0 text-navy" />
                  <span className="display text-display-sm">{service.name}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCall heading="Talk to the team." />
    </>
  );
}
