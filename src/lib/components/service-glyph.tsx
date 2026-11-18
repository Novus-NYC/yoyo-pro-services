import type { ServiceId } from "@/lib/site";

/**
 * Line drawings for the four services, drawn for this site on a 48 x 48
 * grid: a spray bottle, a hammer over a rule, a paint roller and a stack of
 * moving boxes. Navy (or paper) line, one gold accent each.
 *
 * Strokes do not scale with the drawing, so the line weight stays the same
 * from a 56 px icon to the house drawing in the hero.
 */
type GlyphProps = {
  id: ServiceId;
  /** Line colour */
  stroke?: string;
  /** Accent fill */
  accent?: string;
  strokeWidth?: number;
};

export function ServiceGlyph({ id, stroke = "currentColor", accent = "var(--gold)", strokeWidth = 2.25 }: GlyphProps) {
  const line = {
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  switch (id) {
    case "cleaning":
      return (
        <g>
          <path d="M14.5 33h17v9.5a1.5 1.5 0 0 1-1.5 1.5H16a1.5 1.5 0 0 1-1.5-1.5Z" fill={accent} />
          <path d="M17 21h12l2.5 6.5v15a1.5 1.5 0 0 1-1.5 1.5H16a1.5 1.5 0 0 1-1.5-1.5v-15Z" {...line} />
          <path d="M19 21v-5h8v5" {...line} />
          <path d="M16 16V9.5A1.5 1.5 0 0 1 17.5 8H30l4 4-4 4Z" {...line} />
          <path d="M27.5 16c0 2.4.9 4 2.4 5.2" {...line} />
          <path d="M37.5 12h4M37 8.6l3.3-2.2M37 15.4l3.3 2.2" {...line} />
        </g>
      );
    case "remodeling":
      return (
        <g>
          <g transform="rotate(-40 24 22)">
            <rect x="15" y="8" width="18" height="7" rx="1.5" fill={accent} />
            <rect x="15" y="8" width="18" height="7" rx="1.5" {...line} />
            <path d="M15 9.5C11.2 9 8.6 10.8 7.6 14" {...line} />
            <rect x="21.75" y="15" width="4.5" height="22" rx="1.5" {...line} />
          </g>
          <rect x="5" y="38" width="38" height="6" rx="1" {...line} />
          <path d="M11 38v3M17 38v2M23 38v3M29 38v2M35 38v3" {...line} />
        </g>
      );
    case "painting":
      return (
        <g>
          <rect x="7" y="7" width="27" height="11" rx="2.5" fill={accent} />
          <rect x="7" y="7" width="27" height="11" rx="2.5" {...line} />
          <path d="M34 12.5h4.5v10H23v6.5" {...line} />
          <rect x="19.5" y="29" width="7" height="14" rx="2" {...line} />
        </g>
      );
    case "moving":
      return (
        <g>
          <rect x="14.5" y="24" width="5" height="7" fill={accent} />
          <rect x="16" y="9" width="4" height="5.5" fill={accent} />
          <rect x="33" y="28" width="4" height="5.5" fill={accent} />
          <rect x="5" y="24" width="24" height="18" rx="1" {...line} />
          <rect x="10" y="9" width="16" height="15" rx="1" {...line} />
          <rect x="29" y="28" width="12" height="14" rx="1" {...line} />
          <path d="M2.5 43.5h43" {...line} />
        </g>
      );
  }
}

type IconProps = GlyphProps & { className?: string };

/** A service glyph as a standalone, decorative SVG */
export function ServiceIcon({ className = "", ...glyph }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false" overflow="visible">
      <ServiceGlyph {...glyph} />
    </svg>
  );
}
