"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Blobs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full animate-blob"
        style={{
          width: 560, height: 560, top: -180, left: -180,
          background: "var(--blue)", filter: "blur(110px)", opacity: 0.18,
        }}
      />
      <div
        className="absolute rounded-full animate-blob"
        style={{
          width: 480, height: 480, top: "16%", right: -140,
          background: "var(--green)", filter: "blur(110px)", opacity: 0.18,
          animationDelay: "-3s",
        }}
      />
      <div
        className="absolute rounded-full animate-blob"
        style={{
          width: 420, height: 420, bottom: "10%", left: "20%",
          background: "var(--orange)", filter: "blur(110px)", opacity: 0.16,
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute rounded-full animate-blob"
        style={{
          width: 340, height: 340, bottom: -80, right: "14%",
          background: "var(--yellow)", filter: "blur(110px)", opacity: 0.18,
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-[68px]" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative h-10 w-[68px] rounded-full border-2 border-foreground bg-card transition-transform hover:-translate-y-0.5 dark:border-white/30"
    >
      <span
        className="absolute top-0.5 left-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono font-bold transition-all duration-300"
        style={{
          transform: theme === "dark" ? "translateX(28px)" : "translateX(0)",
          background:
            theme === "dark"
              ? "var(--blue)"
              : "var(--yellow)",
          color: "var(--color-foreground)",
        }}
      >
        {theme === "dark" ? "D" : "L"}
      </span>
    </button>
  );
}

export function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Stack" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 backdrop-blur-md bg-background/70 border-b border-border">
      <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
        <span className="text-foreground">MA</span>
        <span className="text-grad-mint">/</span>
        <span className="text-foreground">dev</span>
        <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[var(--green)] animate-pulse" />
      </a>
      <div className="hidden md:flex items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
}
