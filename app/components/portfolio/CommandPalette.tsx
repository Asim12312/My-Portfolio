"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FEATURED_PROJECTS, NAV_LINKS, PROFILE } from "@/lib/content";

type Command = {
  id: string;
  label: string;
  group: "Case studies" | "Navigate" | "Contact";
  hint?: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl-K navigation.
 *
 * With six pages and four case studies this is genuinely faster than the nav,
 * and it degrades cleanly: everything reachable here is also reachable by
 * ordinary links, so nothing depends on the palette existing.
 */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const external = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };

    return [
      ...FEATURED_PROJECTS.map((p) => ({
        id: `cs-${p.slug}`,
        label: p.title,
        group: "Case studies" as const,
        hint: p.tagline,
        run: go(`/work/${p.slug}`),
      })),
      { id: "nav-home", label: "Home", group: "Navigate", run: go("/") },
      { id: "nav-work", label: "All work", group: "Navigate", run: go("/work") },
      { id: "nav-resume", label: "Résumé", group: "Navigate", run: go("/resume") },
      ...NAV_LINKS.map((l) => ({
        id: `sec-${l.hash}`,
        label: l.label,
        group: "Navigate" as const,
        hint: "Section",
        run: go(l.href),
      })),
      {
        id: "c-email",
        label: "Email me",
        group: "Contact",
        hint: PROFILE.email,
        run: () => {
          close();
          window.location.href = `mailto:${PROFILE.email}`;
        },
      },
      { id: "c-github", label: "GitHub", group: "Contact", run: external(PROFILE.links.github) },
      { id: "c-linkedin", label: "LinkedIn", group: "Contact", run: external(PROFILE.links.linkedin) },
      { id: "c-pdf", label: "Download résumé (PDF)", group: "Contact", run: external(PROFILE.resume) },
    ];
  }, [router, close]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  /* Open with ⌘K / Ctrl-K, unless the user is typing in a field. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        const el = document.activeElement;
        const typing =
          el instanceof HTMLElement &&
          (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
        if (typing && open === false) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  /* Keep the highlighted row in view when navigating by keyboard. */
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  let renderedGroup = "";

  return (
    <div className="fixed inset-0 z-[110] no-print" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm cursor-default"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="surface relative mx-auto mt-[12vh] w-[92%] max-w-lg overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span aria-hidden className="text-muted-foreground text-sm">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Jump to a case study, section or link…"
            aria-label="Search commands"
            className="grow bg-transparent outline-none text-[15px] text-foreground placeholder:text-muted-foreground"
          />
          <kbd className="tag">esc</kbd>
        </div>

        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-[14px] text-muted-foreground">
              Nothing matches “{query}”.
            </li>
          )}
          {results.map((c, i) => {
            const showGroup = c.group !== renderedGroup;
            renderedGroup = c.group;
            return (
              <li key={c.id}>
                {showGroup && <p className="label px-4 pt-3 pb-1.5">{c.group}</p>}
                <button
                  type="button"
                  data-index={i}
                  onMouseEnter={() => setCursor(i)}
                  onClick={c.run}
                  aria-current={i === cursor ? "true" : undefined}
                  className={`w-full text-left px-4 py-2.5 flex items-baseline gap-3 cursor-pointer transition-colors ${
                    i === cursor ? "bg-accent" : ""
                  }`}
                >
                  <span className="text-[14.5px] text-foreground shrink-0">{c.label}</span>
                  {c.hint && (
                    <span className="text-[12.5px] text-muted-foreground truncate min-w-0">{c.hint}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
