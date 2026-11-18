import type { CSSProperties, ReactNode } from "react";
import { ServiceGlyph } from "@/lib/components/service-glyph";
import { services, type ServiceId } from "@/lib/site";

/**
 * The hero drawing: a house cut open like a section drawing, one room per
 * service. Drawn for this site (it does not trace the business's logo).
 * Paper line on the navy blueprint, the roof and the accents in gold.
 */

const PAPER = "var(--paper)";
const GOLD = "var(--gold)";
const BLUEPRINT = "var(--blueprint)";

const wall = {
  fill: "none",
  stroke: PAPER,
  strokeWidth: 3,
  strokeLinecap: "square" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const fine = {
  fill: "none",
  stroke: BLUEPRINT,
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke" as const,
};

const labelStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 650,
  fontStretch: "85%",
  letterSpacing: "1.8px",
};

/** Where each service's room sits in the drawing */
const ROOMS: Record<ServiceId, { label: [number, number]; delay: number }> = {
  painting: { label: [76, 240], delay: 150 },
  cleaning: { label: [284, 240], delay: 280 },
  moving: { label: [76, 348], delay: 410 },
  remodeling: { label: [252, 348], delay: 540 },
};

function Sparkle({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${size})`}
      d="M0-9 2.2-2.2 9 0 2.2 2.2 0 9-2.2 2.2-9 0-2.2-2.2Z"
      fill={GOLD}
    />
  );
}

function Room({ id, children }: { id: ServiceId; children: ReactNode }) {
  const room = ROOMS[id];
  const name = services.find((service) => service.id === id)?.name ?? id;
  return (
    <g className="room-in" style={{ "--room-delay": `${room.delay}ms` } as CSSProperties}>
      <text x={room.label[0]} y={room.label[1]} fill={BLUEPRINT} style={labelStyle}>
        {name.toUpperCase()}
      </text>
      {children}
    </g>
  );
}

export function HouseSection({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 470"
      role="img"
      aria-label="Line drawing of a house cut open to show four rooms: painting, cleaning, moving and remodeling."
    >
      {/* Ground and a dimension line under the house */}
      <path d="M0 430H520" {...fine} />
      <path d="M60 452H200M320 452H460M60 444v16M460 444v16" {...fine} />
      <text x="260" y="457" textAnchor="middle" fill={BLUEPRINT} style={labelStyle}>
        ONE TEAM
      </text>

      {/* Structure: walls, floors, chimney */}
      <path d="M60 430V214M460 430V214M60 214H460M60 322H460M268 214V322M236 322V430" {...wall} />
      <path d="M380 155V112h24v59" {...wall} />

      {/* The roof, in gold */}
      <path
        d="M34 228 260 72l226 156"
        fill="none"
        stroke={GOLD}
        strokeWidth={7}
        strokeLinejoin="miter"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <text x="260" y="186" textAnchor="middle" fill={BLUEPRINT} style={labelStyle}>
        YOUR SPACE
      </text>

      {/* Painting: a wall half done, the roller at its edge */}
      <Room id="painting">
        <rect x="170" y="232" width="84" height="76" fill={GOLD} />
        <g transform="translate(108 248) scale(1.3)">
          <ServiceGlyph id="painting" stroke={PAPER} accent={GOLD} strokeWidth={2.5} />
        </g>
      </Room>

      {/* Cleaning: the spray bottle and a little shine */}
      <Room id="cleaning">
        <g transform="translate(330 240) scale(1.45)">
          <ServiceGlyph id="cleaning" stroke={PAPER} accent={GOLD} strokeWidth={2.5} />
        </g>
        <Sparkle x={428} y={262} />
        <Sparkle x={412} y={292} size={0.6} />
      </Room>

      {/* Moving: a door out and boxes ready to go */}
      <Room id="moving">
        <rect x="76" y="360" width="34" height="70" {...fine} stroke={PAPER} strokeWidth={2} />
        <circle cx="102" cy="398" r="2.5" fill={PAPER} />
        <g transform="translate(130 362) scale(1.4)">
          <ServiceGlyph id="moving" stroke={PAPER} accent={GOLD} strokeWidth={2.5} />
        </g>
      </Room>

      {/* Remodeling: the hammer, and a cabinet still dashed in as planned */}
      <Room id="remodeling">
        <g transform="translate(262 360) scale(1.4)">
          <ServiceGlyph id="remodeling" stroke={PAPER} accent={GOLD} strokeWidth={2.5} />
        </g>
        <path d="M352 430V368h88v62M352 399h88M396 368v62" {...fine} strokeDasharray="6 5" />
      </Room>
    </svg>
  );
}
