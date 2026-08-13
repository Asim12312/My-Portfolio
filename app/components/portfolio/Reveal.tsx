"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades content in once as it enters the viewport, then stops observing.
 * Falls back to visible immediately if IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Consistent numbered section heading used across the page. */
export function SectionHeading({
  eyebrow,
  children,
  lead,
}: {
  eyebrow: string;
  children: React.ReactNode;
  lead?: string;
}) {
  return (
    <Reveal className="mb-12 sm:mb-14">
      <p className="label mb-4">{eyebrow}</p>
      <h2 className="font-display font-extrabold text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05] max-w-[18ch]">
        {children}
      </h2>
      {lead && <p className="lead mt-5">{lead}</p>}
    </Reveal>
  );
}
