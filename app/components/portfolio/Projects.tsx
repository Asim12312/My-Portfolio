import Link from "next/link";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";
import { GithubIcon, ExternalIcon, ArrowIcon } from "./icons";

export function Projects() {
  return (
    <section id="work" className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="03 — work"
        lead="Three projects written up properly: the constraint, the architecture, the trade-offs I chose on purpose, and what it cost. Everything else is listed underneath."
      >
        Selected work.
      </SectionHeading>

      <div className="border-t border-border">
        {FEATURED_PROJECTS.map((p, i) => (
          <Reveal as="article" key={p.slug} delay={i * 60} className="block border-b border-border">
            <div className="grid lg:grid-cols-[200px_1fr] gap-5 lg:gap-12 py-10">
              <div className="lg:pt-1.5">
                <p className="font-mono text-[13px] text-muted-foreground">{p.timeline}</p>
                <p className="mt-2.5 tag tag-brand">{p.status}</p>
              </div>

              <div className="min-w-0">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight mb-2">
                  <Link href={`/work/${p.slug}`} className="hover:text-brand transition-colors">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[17px] text-muted-foreground mb-5 measure leading-snug">{p.tagline}</p>

                <p className="prose-block mb-6">{p.desc}</p>

                {p.impact && (
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-6 max-w-2xl border-y border-border py-5">
                    {p.impact.map((m) => (
                      <div key={m.label} className="min-w-0">
                        <dt className="font-display font-bold text-lg leading-none text-foreground mb-1.5">
                          {m.value}
                        </dt>
                        <dd className="text-[12px] text-muted-foreground leading-snug">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="flex flex-wrap gap-1.5 mb-6">
                  {p.pills.map((pill) => (
                    <li key={pill} className="tag">{pill}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2.5">
                  <Link href={`/work/${p.slug}`} className="btn btn-primary">
                    Read case study
                    <ArrowIcon />
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                      <ExternalIcon />
                      Live site
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                      <GithubIcon />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="label mb-6">Also built</h3>
        <ul className="grid sm:grid-cols-3 gap-x-8 gap-y-8">
          {OTHER_PROJECTS.map((p) => (
            <li key={p.slug} className="min-w-0">
              <p className="font-display font-bold text-[17px] text-foreground mb-1.5">{p.title}</p>
              <p className="text-sm text-prose leading-relaxed mb-3">{p.tagline}</p>
              <ul className="flex flex-wrap gap-1.5 mb-3">
                {p.pills.slice(0, 3).map((pill) => (
                  <li key={pill} className="tag">{pill}</li>
                ))}
              </ul>
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-brand transition-colors"
                >
                  <GithubIcon size={13} />
                  Source
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
