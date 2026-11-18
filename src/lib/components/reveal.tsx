"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  /** Stagger in milliseconds */
  delay?: number;
  /**
   * "lift" fades and rises (default). "fade" only fades: use it for anything
   * that is, or wraps, a hash target, so the anchor lands exactly.
   */
  variant?: "lift" | "fade";
  id?: string;
  children: ReactNode;
};

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  return observer;
}

/**
 * Reveals its children once they enter the viewport. The hidden state only
 * exists under `html.js`, so content is visible without JavaScript, when
 * printed and under reduced motion (see globals.css).
 */
export function Reveal({ as: Tag = "div", className = "", delay = 0, variant = "lift", id, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver();
    if (!io) {
      node.classList.add("is-visible");
      return;
    }
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  const variantClass = variant === "fade" ? "reveal reveal-fade" : "reveal";

  return (
    <Tag ref={ref} id={id} className={`${variantClass} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
