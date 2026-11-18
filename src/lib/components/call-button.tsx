import { PhoneIcon } from "@/lib/components/icons";
import { callLabel, site, telHref, type Phone } from "@/lib/site";

type CallButtonProps = {
  /** Visible label. Defaults to "Call 929-606-6927". */
  label?: string;
  phone?: Phone;
  className?: string;
  /** Use the compact size (header) */
  compact?: boolean;
  onClick?: () => void;
};

/**
 * The site's one primary action: a tap-to-call link styled as the gold
 * sign panel. When the visible label leaves out the number ("Call about
 * painting"), the accessible name adds it after the visible words.
 */
export function CallButton({ label = callLabel, phone = site.phones.primary, className = "", compact = false, onClick }: CallButtonProps) {
  const showsNumber = label.includes(phone.display);
  return (
    <a
      href={telHref(phone)}
      className={`btn-call ${compact ? "btn-compact" : ""} ${className}`.trim()}
      aria-label={showsNumber ? undefined : `${label}, ${phone.display}`}
      onClick={onClick}
    >
      <PhoneIcon />
      <span>{label}</span>
    </a>
  );
}
