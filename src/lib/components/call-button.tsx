import { PhoneIcon } from "@/lib/components/icons";
import { callLabel, site, telHref, type Phone } from "@/lib/site";

type CallButtonProps = {
  /** Visible label. Defaults to "Call 929-606-6927". */
  label?: string;
  phone?: Phone;
  className?: string;
  /** Use the compact size (header) */
  compact?: boolean;
  /**
   * A 44 x 44 px square with only the phone icon (header on the narrowest
   * phones). The accessible name is the full label, "Call 929-606-6927".
   */
  iconOnly?: boolean;
  onClick?: () => void;
};

/**
 * The site's one primary action: a tap-to-call link styled as the gold
 * sign panel. When the visible label leaves out the number ("Call about
 * painting"), the accessible name adds it after the visible words.
 */
export function CallButton({
  label = callLabel,
  phone = site.phones.primary,
  className = "",
  compact = false,
  iconOnly = false,
  onClick,
}: CallButtonProps) {
  const showsNumber = label.includes(phone.display);
  const accessibleName = showsNumber ? label : `${label}, ${phone.display}`;

  if (iconOnly) {
    return (
      <a
        href={telHref(phone)}
        className={`btn-call btn-compact h-11 w-11 px-0 ${className}`.trim()}
        aria-label={accessibleName}
        onClick={onClick}
      >
        <PhoneIcon />
      </a>
    );
  }

  return (
    <a
      href={telHref(phone)}
      className={`btn-call ${compact ? "btn-compact" : ""} ${className}`.trim()}
      aria-label={showsNumber ? undefined : accessibleName}
      onClick={onClick}
    >
      <PhoneIcon />
      <span>{label}</span>
    </a>
  );
}
