import type { ReactNode } from "react";

/**
 * Floor-plan pieces: a door cut into a room's wall with its swing drawn in
 * plan line. Decorative only.
 */
type PlanDoorProps = {
  wall: "top" | "bottom";
  /** Which end of the opening the hinge sits on */
  side: "left" | "right";
  /** Distance from that side of the room, in px */
  offset?: number;
};

export function PlanDoor({ wall, side, offset = 40 }: PlanDoorProps) {
  const flips = [side === "right" ? "scale(-1 1) translate(-64 0)" : "", wall === "bottom" ? "scale(1 -1) translate(0 -64)" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className="plan-door" data-wall={wall} style={{ [side]: offset }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64" overflow="visible" focusable="false">
        <g transform={flips || undefined} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 1v59" />
          <path d="M1 60A59 59 0 0 0 60 1" strokeDasharray="4 4" />
        </g>
      </svg>
    </span>
  );
}

/**
 * Splits `text` around `phrase` and wraps the phrase in a highlighter mark.
 * Falls back to the plain text if the phrase is not found.
 */
export function Marked({ text, phrase, className }: { text: string; phrase: string; className: string }): ReactNode {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}
