/**
 * Small interface icons, drawn for this site. All decorative: the text
 * beside them carries the meaning.
 */
type IconProps = { className?: string };

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg className={`shrink-0 ${className}`.trim()} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.2 2.8h3.1l1.8 4.6-2.3 1.5a11.6 11.6 0 0 0 6.3 6.3l1.5-2.3 4.6 1.8v3.1a2 2 0 0 1-2.1 2A17.4 17.4 0 0 1 4.2 4.9a2 2 0 0 1 2-2.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg className={`shrink-0 ${className}`.trim()} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

/** "Leaves the site" arrow for external links */
export function ExternalArrow({ className = "" }: IconProps) {
  return (
    <svg className={`shrink-0 ${className}`.trim()} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
