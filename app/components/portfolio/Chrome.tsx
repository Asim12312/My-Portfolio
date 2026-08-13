"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, PROFILE } from "@/lib/content";
import { useHasMounted } from "./hooks";
import { CommandPalette } from "./CommandPalette";

/* A single, very soft wash of brand colour. The previous version had four
   saturated blurred blobs drifting behind everything. */
export function Blobs() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full animate-blob will-change-transform"
        style={{
          width: 620, height: 620, top: -260, left: "-10%",
          background: "var(--brand)", filter: "blur(140px)", opacity: 0.07,
        }}
      />
      <div
        className="absolute rounded-full animate-blob will-change-transform"
        style={{
          width: 520, height: 520, bottom: "-8%", right: "-8%",
          background: "var(--brand)", filter: "blur(140px)", opacity: 0.05,
          animationDelay: "-7s",
        }}
      />
    </div>
  );
}

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 z-[60] h-px">
      <div className="h-full bg-brand transition-[width] duration-75" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) return <div className={`h-9 w-9 ${className}`} />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`h-9 w-9 shrink-0 rounded-full hairline bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      {isDark ? (
        <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

function useActiveSection(hashes: readonly string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const targets = hashes
      .map((h) => document.getElementById(h))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [hashes]);

  return active;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.hash));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-5 sm:px-10 py-3.5 border-b transition-colors ${
          scrolled ? "backdrop-blur-xl bg-background/80 border-border" : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="font-display text-[15px] font-bold tracking-tight shrink-0" aria-label={`${PROFILE.name} — home`}>
          Muhammad Asim
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.hash;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                  isActive ? "text-foreground bg-accent font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Discoverability for ⌘K — a shortcut nobody knows about isn't a feature. */}
          <span
            aria-hidden
            className="hidden lg:inline-flex items-center gap-1 tag font-mono text-[10px] mr-1"
            title="Press Command-K or Control-K"
          >
            ⌘K
          </span>
          <Link href="/resume" className="hidden sm:inline-flex btn btn-primary !py-1.5 !px-3.5 !text-[13px]">
            Résumé
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden h-9 w-9 flex flex-col items-center justify-center gap-1 rounded-full hairline bg-card"
          >
            <span
              className="block h-px w-3.5 bg-foreground transition-transform"
              style={open ? { transform: "translateY(2.5px) rotate(45deg)" } : undefined}
            />
            <span
              className="block h-px w-3.5 bg-foreground transition-transform"
              style={open ? { transform: "translateY(-2.5px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[55] md:hidden bg-background pt-20 px-6 pb-10 overflow-y-auto animate-fade-up"
        >
          <ul className="divide-y divide-border border-y border-border">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between py-5 font-display font-bold text-2xl text-foreground"
                >
                  {l.label}
                  <span aria-hidden className="text-muted-foreground text-base">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-2.5">
            <Link href="/resume" onClick={close} className="btn btn-primary">
              Résumé
            </Link>
            <a href={`mailto:${PROFILE.email}`} onClick={close} className="btn btn-brand">
              Email me
            </a>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" onClick={close} className="btn btn-ghost">
              GitHub
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" onClick={close} className="btn btn-ghost">
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </>
  );
}
