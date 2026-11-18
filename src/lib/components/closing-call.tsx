import { ExternalLink } from "@/lib/components/external-link";
import { ExternalArrow, PhoneIcon } from "@/lib/components/icons";
import { Reveal } from "@/lib/components/reveal";
import { site, telHref } from "@/lib/site";

type ClosingCallProps = {
  /** Heading for this page's ending */
  heading: string;
  /** One short line under the heading */
  body?: string;
};

/**
 * The page ending: a gold sign panel with the number painted big, like the
 * lettering on a van door. Navy on gold only (8.4:1).
 */
export function ClosingCall({ heading, body = "Tell us about the job and we will talk it through." }: ClosingCallProps) {
  const primary = site.phones.primary;
  const secondary = site.phones.secondary;

  return (
    <section className="on-gold bg-gold text-navy" aria-labelledby="closing-call-heading">
      <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="label">{site.teamLine}</p>
          <h2 id="closing-call-heading" className="display mt-3 text-display-lg">
            {heading}
          </h2>
          <p className="measure-narrow mt-4 text-lead">{body}</p>
        </Reveal>

        <Reveal className="phone-fit lg:col-span-7" delay={120}>
          <div className="dimension text-navy" aria-hidden="true" />
          <p className="label mt-3">{primary.label}</p>
          <a href={telHref(primary)} className="phone-number display mt-1 decoration-navy">
            {primary.display}
          </a>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-1">
            {secondary ? (
              <li>
                <a href={telHref(secondary)} className="text-link decoration-navy">
                  <PhoneIcon className="h-[18px] w-[18px]" />
                  <span className="whitespace-nowrap">
                    {secondary.label} {secondary.display}
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <ExternalLink href={site.instagram.url} className="text-link decoration-navy">
                <span className="whitespace-nowrap">Instagram {site.instagram.handle}</span>
                <ExternalArrow />
              </ExternalLink>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
