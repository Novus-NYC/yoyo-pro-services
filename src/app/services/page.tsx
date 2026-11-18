import type { CSSProperties } from "react";
import { CallButton } from "@/lib/components/call-button";
import { ClosingCall } from "@/lib/components/closing-call";
import { Reveal } from "@/lib/components/reveal";
import { ServiceIcon } from "@/lib/components/service-glyph";
import { pageMetadata } from "@/lib/metadata";
import { serviceAreaSentence, services, servicesSentence, site } from "@/lib/site";

const capitalized = `${servicesSentence.charAt(0).toUpperCase()}${servicesSentence.slice(1)}`;

export const metadata = pageMetadata({
  title: "Services",
  description: `${capitalized} from one team${serviceAreaSentence ? ` across ${serviceAreaSentence}` : ""}. Call ${
    site.phones.primary.display
  } to talk through your job.`,
  path: "/services",
});

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export default function ServicesPage() {
  return (
    <>
      {/* Opening: the four names set big, with a key to the drawings below */}
      <section className="drafting-paper border-b-2 border-navy" aria-labelledby="services-heading">
        <div className="container-site py-14 md:py-20">
          <p className="label rise text-muted">Services</p>
          <h1 id="services-heading" className="display rise mt-4 max-w-[16ch] text-display-xl" style={rise(80)}>
            {capitalized}.
          </h1>
          <p className="rise measure mt-6 text-lead" style={rise(160)}>
            Four trades under one name. Jump to the one you need, or call about the whole job: it is the same team and the
            same number.
          </p>

          {/* In-page key: a short jump list to each service */}
          <nav aria-label="Services on this page" className="rise mt-10" style={rise(240)}>
            <ul className="grid grid-cols-2 gap-px border-2 border-navy bg-navy md:grid-cols-4">
              {services.map((service) => (
                <li key={service.id} className="bg-paper">
                  <a
                    href={`#${service.id}`}
                    className="flex min-h-[56px] items-center gap-3 px-4 py-3 font-semibold transition-colors hover:bg-gold-tint"
                  >
                    <ServiceIcon id={service.id} className="h-8 w-8 shrink-0 text-navy" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* One band per service. The section is the hash target, so it never
          moves; only its contents reveal. */}
      {services.map((service, index) => {
        const flip = index % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={`border-b border-rule ${flip ? "bg-paper-2" : "bg-white"}`}
          >
            <div className="container-site grid items-center gap-7 py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <Reveal className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
                {/* A detail drawing: the glyph framed like a sheet, with a
                    dimension line along its foot */}
                <div
                  className={`relative max-w-[15rem] border-2 border-navy bg-paper p-6 sm:max-w-[20rem] sm:p-8 md:mx-auto md:max-w-[26rem] md:p-10 ${
                    flip ? "md:mr-0" : "md:ml-0"
                  }`}
                >
                  <ServiceIcon
                    id={service.id}
                    className="mx-auto block aspect-square w-full max-w-[8rem] text-navy sm:max-w-[11rem] md:max-w-[13rem]"
                    strokeWidth={3}
                  />
                  <div className="dimension mt-6 text-plan" aria-hidden="true" />
                  <p className="label mt-2 text-center text-muted">{service.name}</p>
                </div>
              </Reveal>

              <Reveal className={`md:col-span-7 ${flip ? "md:order-1" : ""}`} delay={100}>
                <p className="label text-muted">Service</p>
                <h2 id={`${service.id}-heading`} className="display mt-3 text-display-lg">
                  {service.name}
                </h2>
                <p className="mt-4 text-display-sm" style={{ fontWeight: 650, fontStretch: "110%" }}>
                  <span className="mark-static">{service.tagline}</span>
                </p>
                <CallButton className="mt-8" label={`Call about ${service.noun}`} />
              </Reveal>
            </div>
          </section>
        );
      })}

      <ClosingCall heading="Need more than one?" body="Tell us about the whole job and we will talk it through." />
    </>
  );
}
