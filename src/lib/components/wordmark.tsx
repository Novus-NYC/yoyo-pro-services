/**
 * Typographic wordmark set in the site's own type: "YOYO" in expanded heavy
 * Archivo, "PRO" as navy letters on a gold block (a colour nod to the
 * business's navy and gold, without tracing its logo), "Services" as a
 * spaced label. The text reads "YOYO Pro Services" to assistive technology.
 */
type WordmarkProps = {
  /** "dark" sits on navy, "light" on paper */
  tone?: "dark" | "light";
  size?: "sm" | "lg";
  className?: string;
};

export function Wordmark({ tone = "dark", size = "sm", className = "" }: WordmarkProps) {
  const big = size === "lg";
  return (
    <span className={`inline-flex items-center whitespace-nowrap ${big ? "gap-2.5" : "gap-1.5 sm:gap-2"} ${className}`.trim()}>
      <span
        className={`display leading-none ${tone === "dark" ? "text-paper" : "text-navy"} ${
          big ? "text-[2.25rem]" : "text-[1.125rem] sm:text-[1.4rem]"
        }`}
        style={{ letterSpacing: "0.01em" }}
      >
        YOYO
      </span>
      <span
        className={`display bg-gold uppercase leading-none text-navy ${
          big ? "px-2 py-1.5 text-[1.5rem]" : "px-1 py-1 text-[0.875rem] sm:px-1.5 sm:text-[1.05rem]"
        }`}
        style={{ borderRadius: 2, letterSpacing: "0.02em" }}
      >
        Pro
      </span>
      <span
        className={`label ${tone === "dark" ? "text-blueprint" : "text-muted"} ${big ? "text-[1rem]" : "text-[0.75rem] sm:text-[0.875rem]"}`}
      >
        Services
      </span>
    </span>
  );
}
