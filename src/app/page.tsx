import Link from "next/link";
import type { CSSProperties } from "react";
import { CallButton } from "@/lib/components/call-button";
import { ClosingCall } from "@/lib/components/closing-call";
import { HouseSection } from "@/lib/components/house-section";
import { ArrowIcon } from "@/lib/components/icons";
import { OrganizationJsonLd } from "@/lib/components/json-ld";
import { Marked, PlanDoor } from "@/lib/components/plan";
import { Reveal } from "@/lib/components/reveal";
import { ServiceIcon } from "@/lib/components/service-glyph";
import { pageMetadata } from "@/lib/metadata";
import { serviceAreaSentence, services, servicesSentence, site } from "@/lib/site";

const capitalized = `${servicesSentence.charAt(0).toUpperCase()}${servicesSentence.slice(1)}`;

export const metadata = pageMetadata({
  title: `${site.name}: ${capitalized}`,
  absoluteTitle: true,
  description: `${capitalized}${serviceAreaSentence ? ` across ${serviceAreaSentence}` : ""}, from one team${
    site.base ? ` based in ${site.base}` : ""
  }. Call ${site.phones.primary.display}.`,
  path: "/",
});

/** Doors for the four rooms of the plan, so it reads as a plan, not a grid */
const DOORS = [
  { wall: "top", side: "right", offset: 48 },
  { wall: "bottom", side: "left", offset: 56 },
  { wall: "top", side: "right", offset: 48 },
  { wall: "bottom", side: "right", offset: 40 },
] as const;

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />

      {/* Hero: the promise, the call, and the house drawn open */}
      <section className="on-dark blueprint-grid text-paper" aria-labelledby="hero-heading">
        <div className="container-site grid gap-6 pb-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-7">
            <p className="label rise text-blueprint">
              {site.name}
              {site.base ? <span className="text-paper"> · Based in {site.base}</span> : null}
            </p>
            <h1 id="hero-heading" className="display rise mt-4 text-display-xl" style={rise(80)}>
              <Marked text={site.tagline} phrase="your space." className="mark-under hero-mark" />
            </h1>
            <p className="rise measure mt-7 text-lead" style={rise(160)}>
              {capitalized}
              {serviceAreaSentence ? ` across ${serviceAreaSentence}` : ""}. One team for all four.
            </p>
            <div className="rise mt-7 flex flex-wrap gap-3" style={rise(240)}>
              <CallButton />
              <Link href="/services" className="btn-ghost-dark">
                See the four services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HouseSection className="mx-auto block w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px]" />
          </div>
        </div>
      </section>

      {/* The services as a floor plan: one room each */}
      <section className="drafting-paper" aria-labelledby="plan-heading">
        <div className="container-site py-16 md:py-24">
          {/* Stacked until lg, so the heading always leads its paragraph */}
          <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <p className="label text-muted">What we do</p>
              <h2 id="plan-heading" className="display mt-3 text-display-lg">
                Four kinds of work. <span className="mark">One team.</span>
              </h2>
            </div>
            <p className="measure text-lead lg:col-span-5">{site.pitch}</p>
          </Reveal>

          <div className="plan mt-10 md:mt-14 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.id} className="plan-room group" aria-labelledby={`room-${service.id}`}>
                <PlanDoor {...DOORS[index]} />
                {/* A room with its door in the bottom wall keeps clear space
                    above it, so the swing never runs into the text */}
                <Reveal
                  className={`flex h-full flex-col p-6 pt-8 sm:p-8 md:min-h-[17rem] md:p-10 ${
                    DOORS[index].wall === "bottom" ? "pb-20 sm:pb-20 md:pb-20" : ""
                  }`}
                  delay={index * 90}
                >
                  <ServiceIcon id={service.id} className="h-14 w-14 text-navy md:h-16 md:w-16" />
                  <h3 id={`room-${service.id}`} className="display mt-6 text-display-md">
                    {/* The link's ::after stretches over the whole room */}
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-3 after:absolute after:inset-0 after:content-['']"
                    >
                      {service.name}
                      <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </Link>
                  </h3>
                  <p className="mt-2 text-lead text-muted">{service.tagline}</p>
                </Reveal>
              </article>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CallButton />
            <Link href="/services" className="text-link">
              See the services
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Who and where */}
      <section className="border-t border-rule bg-paper-2" aria-labelledby="who-heading">
        <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <Reveal className="md:col-span-7">
            <p className="label text-muted">Who we are</p>
            <h2 id="who-heading" className="display mt-3 text-display-lg">
              Led by {site.owner.name}.
            </h2>
            <p className="measure mt-5 text-lead">
              {site.owner.name}, {site.owner.title}, runs {site.name}
              {site.base ? `, a company based in ${site.base}` : ""}. One team takes on {servicesSentence}, so a clean, a repaint
              and a move can all start with the same number.
            </p>
            <Link href="/about" className="text-link mt-4">
              About {site.name}
              <ArrowIcon />
            </Link>
          </Reveal>

          {site.serviceArea ? (
            <Reveal className="md:col-span-5" delay={120}>
              <div className="border-2 border-navy bg-white">
                <p className="label border-b-2 border-navy px-5 py-3 text-navy">Where we work</p>
                <ul>
                  {site.serviceArea.map((area, index) => (
                    <li
                      key={area}
                      className={`display flex items-baseline justify-between gap-4 px-5 py-4 text-display-sm ${
                        index > 0 ? "border-t border-rule" : ""
                      }`}
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="border-t-2 border-navy px-5 py-3 text-base text-muted">Not sure we cover your area? Ask when you call.</p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <ClosingCall heading="Have a job in mind?" body="Call and tell us about it. We will talk it through." />
    </>
  );
}
