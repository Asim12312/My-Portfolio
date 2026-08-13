"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/content";
import { usePrefersReducedMotion } from "./hooks";
import { ArrowIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

/* Tokenised rather than raw HTML — same look, no dangerouslySetInnerHTML. */
type Tok = [cls: string, text: string];
const CODE_LINES: Tok[][] = [
  [["cm", "// grounded answer — retrieve, then reason"]],
  [["kw", "const"], ["", " "], ["fn", "answer"], ["", " = "], ["kw", "async"], ["", " ("], ["cl", "query"], ["", ") "], ["op", "=>"], ["", " {"]],
  [["", "  "], ["kw", "const"], ["", " "], ["wh", "vector"], ["", " = "], ["kw", "await"], ["", " "], ["fn", "embed"], ["", "(query)"]],
  [["", "  "], ["kw", "const"], ["", " "], ["wh", "docs"], ["", "   = "], ["kw", "await"], ["", " store."], ["fn", "search"], ["", "(vector, {"]],
  [["", "    topK: "], ["num", "5"], ["", ", minScore: "], ["num", "0.78"], ["", ","]],
  [["", "  })"]],
  [],
  [["", "  "], ["kw", "if"], ["", " (!docs.length) "], ["kw", "return"], ["", " "], ["str", "NO_GROUNDS"]],
  [],
  [["", "  "], ["kw", "return"], ["", " llm."], ["fn", "complete"], ["", "({"]],
  [["", "    "], ["wh", "system"], ["", ": "], ["str", "CITE_OR_ABSTAIN"], ["", ","]],
  [["", "    "], ["wh", "context"], ["", ": docs."], ["fn", "map"], ["", "(toChunk),"]],
  [["", "    "], ["wh", "query"], ["", ","]],
  [["", "  })"]],
  [["", "}"]],
];

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [typedCount, setTypedCount] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  /* With reduced motion the sample renders complete instead of typing itself. */
  const count = reducedMotion ? CODE_LINES.length : typedCount;

  useEffect(() => {
    if (reducedMotion) return;

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      if (i >= CODE_LINES.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          i = 0;
          setTypedCount(0);
          timer = setTimeout(tick, 700);
        }, 5000);
        return;
      }
      i += 1;
      setTypedCount(i);
      if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
      timer = setTimeout(tick, 190);
    };

    timer = setTimeout(tick, 800);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <section id="top" className="relative px-6 sm:px-10 pt-36 pb-20 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
        <div className="min-w-0">
          {/* Availability first — it's the one fact that decides whether a
              recruiter keeps reading. */}
          <p className="inline-flex items-center gap-2 label mb-7 px-3 py-1.5 rounded-full hairline bg-card">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            {PROFILE.availability.label}
          </p>

          <h1 className="font-display font-extrabold text-[clamp(2.6rem,6.4vw,4.6rem)] leading-[1.02] mb-6">
            Muhammad Asim
          </h1>

          <p className="lead mb-7">
            Software Engineer at{" "}
            <a href="https://venturedive.com" target="_blank" rel="noreferrer" className="link-underline font-medium text-foreground">
              VentureDive
            </a>
            , working on retrieval pipelines and AI agents. Before that I spent a year and a half
            building client software under an experienced developer&apos;s review — which is where I
            learned that shipping is the easy half.
          </p>

          <p className="prose-block mb-9">
            Four projects are written up here in full: a statutory e-invoicing platform, a
            restaurant operating system, an auction agent that bids within a ceiling it is given,
            and a campus marketplace. Each write-up covers the constraint, the architecture and
            the trade-offs I took deliberately.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            <a href="#work" className="btn btn-primary">
              Read the case studies
              <ArrowIcon />
            </a>
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DownloadIcon />
              Résumé
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors">
                <MailIcon /> {PROFILE.email}
              </a>
            </li>
            <li>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors">
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors">
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Quiet terminal panel. The previous version wrapped this in a fake
            laptop with floating sticker badges — decoration that read junior. */}
        <div className="surface overflow-hidden min-w-0">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/60">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
              <span className="h-2 w-2 rounded-full bg-foreground/20" />
            </span>
            <span className="font-mono text-[11px] text-muted-foreground ml-1 truncate">lib/rag/answer.ts</span>
          </div>
          <div
            ref={scroller}
            aria-hidden
            /* overflow-x auto rather than hidden: the longest line is ~46
               characters, which clips on a 360px phone. */
            className="code-sample h-[300px] sm:h-[340px] overflow-y-hidden overflow-x-auto px-4 py-4 font-mono text-[10.5px] sm:text-[12.5px] leading-[1.8] bg-[#0d1117] text-[#c9d1d9]"
          >
            {CODE_LINES.slice(0, count).map((toks, idx) => (
              <div key={idx} className="flex">
                <span className="text-[#4d5765] mr-4 w-4 text-right shrink-0 select-none">{idx + 1}</span>
                <span className="whitespace-pre min-w-0">
                  {toks.map(([cls, text], j) => (
                    <span key={j} className={cls}>{text}</span>
                  ))}
                  {idx === count - 1 && <span className="cursor-blink" />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Illustrative code sample: a retrieval-augmented generation helper that embeds a query,
        searches a vector store for the five closest documents above a similarity threshold,
        abstains when nothing relevant is found, and otherwise asks a language model to answer
        using only those retrieved chunks.
      </p>
    </section>
  );
}
