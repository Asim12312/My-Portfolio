import Link from "next/link";
import { COLOPHON, PROFILE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-8">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
        {/* Colophon — answers the question every engineer has when reading
            another engineer's site, and costs four lines to answer. */}
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 mb-10">
          {[
            { k: "Built with", v: COLOPHON.stack },
            { k: "Set in", v: COLOPHON.type },
            { k: "Hosting", v: COLOPHON.hosting },
          ].map((row) => (
            <div key={row.k} className="min-w-0">
              <dt className="label mb-1.5">{row.k}</dt>
              <dd className="text-[13px] text-prose leading-relaxed">{row.v}</dd>
            </div>
          ))}
          <div className="min-w-0">
            <dt className="label mb-1.5">Source</dt>
            <dd className="text-[13px]">
              <a href={COLOPHON.source} target="_blank" rel="noreferrer" className="link-underline text-prose">
                This site on GitHub
              </a>
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-[13px] text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.shortTitle}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-[13px]">
            <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
              Work
            </Link>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
