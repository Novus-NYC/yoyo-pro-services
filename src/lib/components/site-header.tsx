"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CallButton } from "@/lib/components/call-button";
import { ExternalLink } from "@/lib/components/external-link";
import { ExternalArrow, PhoneIcon } from "@/lib/components/icons";
import { Wordmark } from "@/lib/components/wordmark";
import { navLinks, site, telHref } from "@/lib/site";

/** The desktop nav takes over at Tailwind's `md` breakpoint */
const DESKTOP_QUERY = "(min-width: 768px)";
const PANEL_ID = "mobile-menu";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Close the menu whenever the route changes, including browser Back and
  // Forward. Adjusting state during render avoids an extra effect pass; the
  // open effect's cleanup then gives the page back.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** Elements made inert while the menu is open (everything but the panel) */
  const inertedRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Give the page back: must run before focus returns to the toggle. */
  const releasePage = useCallback(() => {
    for (const element of inertedRef.current) element.inert = false;
    inertedRef.current = [];
    document.body.classList.remove("menu-open");
  }, []);

  const close = useCallback(
    (returnFocus = true) => {
      releasePage();
      setOpen(false);
      if (returnFocus) toggleRef.current?.focus();
    },
    [releasePage],
  );

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // While the dialog is open, everything outside it is inert: the skip
    // link, the header, main and the footer.
    const outside = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== panel && element.tagName !== "SCRIPT" && !element.inert,
    );
    for (const element of outside) element.inert = true;
    inertedRef.current = outside;
    document.body.classList.add("menu-open");
    // The panel's visibility flips on the next style pass (it is part of the
    // open/close transition), and a hidden element cannot take focus, so wait
    // two frames before moving focus to the close button.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => closeRef.current?.focus());
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const media = window.matchMedia(DESKTOP_QUERY);
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };

    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      releasePage();
    };
  }, [open, close, releasePage]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const secondary = site.phones.secondary;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      <header className={`site-header on-dark sticky top-0 z-40 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-site flex items-center justify-between gap-2" style={{ height: "var(--header-h)" }}>
          <Link href="/" className="flex min-h-[44px] items-center" aria-label={`${site.name}, home`}>
            <Wordmark tone="dark" />
          </Link>

          <div className="flex items-center gap-2 md:gap-6 lg:gap-8">
            <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* The call is always in the header: an icon square on the
                narrowest phones, "Call" from 380 px, the full number from lg */}
            <CallButton iconOnly className="min-[380px]:hidden" />
            <CallButton compact label="Call" className="hidden min-[380px]:inline-flex lg:hidden" />
            <CallButton compact className="hidden lg:inline-flex" />

            {/* Without JavaScript the menu cannot open, so a plain link to the
                footer's page list stands in for the toggle (see globals.css) */}
            <a
              href="#footer-nav"
              className="nojs-menu-link h-11 w-11 items-center justify-center border-2 border-paper text-paper md:hidden"
              style={{ borderRadius: 3 }}
              aria-label="Pages, in the footer"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle inline-flex h-11 w-11 items-center justify-center border-2 border-paper text-paper md:hidden"
              style={{ borderRadius: 3 }}
              aria-expanded={open}
              aria-controls={PANEL_ID}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu. A sibling of the header, never a child, so the sticky
          header cannot become its containing block. */}
      <div
        id={PANEL_ID}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`on-dark blueprint-grid fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain text-paper transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-site flex shrink-0 items-center justify-between" style={{ height: "var(--header-h)" }}>
          <span className="flex items-center">
            <Wordmark tone="dark" />
          </span>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-paper text-paper"
            style={{ borderRadius: 3 }}
            aria-label="Close menu"
            onClick={() => close()}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              <path d="M4 4l14 14M18 4 4 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        {/* Centered on tall screens. On short viewports (landscape phones)
            the panel scrolls instead of clipping the last link or the CTA. */}
        <nav
          aria-label="Pages"
          className="container-site flex flex-1 flex-col justify-center py-6 [@media(max-height:560px)]:justify-start"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // A link to the page already open does not navigate, so focus
              // goes back to the toggle instead of being dropped.
              onClick={() => close(link.href === pathname)}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              className="group flex min-h-[64px] items-center justify-between gap-4 border-b border-blueprint/30 py-3"
            >
              <span className="display text-[2.25rem] leading-none transition-colors group-hover:text-gold">{link.label}</span>
              {isCurrent(link.href) ? <span className="label text-gold">You are here</span> : null}
            </Link>
          ))}
        </nav>

        <div className="container-site shrink-0 pb-8">
          {/* tel: links do not leave the page, so focus returns to the toggle */}
          <CallButton className="w-full" onClick={() => close()} />
          <ul className="mt-3 flex flex-wrap gap-x-6">
            {secondary ? (
              <li>
                <a href={telHref(secondary)} className="text-link" onClick={() => close()}>
                  <PhoneIcon className="h-[18px] w-[18px]" />
                  <span className="whitespace-nowrap">
                    {secondary.label} {secondary.display}
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <ExternalLink href={site.instagram.url} className="text-link">
                <span className="whitespace-nowrap">Instagram {site.instagram.handle}</span>
                <ExternalArrow />
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
