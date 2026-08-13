import { PROFILE, ROLES } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="02 — experience"
        lead="Two roles, listed with what I actually owned rather than what the team did."
      >
        Where I&apos;ve worked.
      </SectionHeading>

      <ol className="border-t border-border">
        {ROLES.map((r) => (
          <Reveal as="li" key={r.n} className="block border-b border-border">
            <article className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 py-9">
              {/* Timeline column — kept narrow and out of the reading measure. */}
              <div className="lg:pt-1">
                <p className="font-mono text-[13px] text-muted-foreground">{r.period}</p>
                <p className="font-mono text-[12px] text-muted-foreground/80 mt-1">{r.location}</p>
                {r.badge && (
                  <p className="mt-2.5 inline-flex items-center gap-1.5 tag tag-brand">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {r.badge}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug">
                  {r.role}
                </h3>
                <p className="text-[15px] text-muted-foreground mt-1.5 mb-4">
                  {r.companyUrl ? (
                    <a href={r.companyUrl} target="_blank" rel="noreferrer" className="link-underline text-foreground font-medium">
                      {r.company}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{r.company}</span>
                  )}
                </p>

                <p className="text-[15px] text-foreground font-medium measure mb-4 leading-relaxed">
                  {r.summary}
                </p>

                <ul className="space-y-2.5 measure mb-5">
                  {r.points.map((p, idx) => (
                    <li key={idx} className="flex gap-3 text-[15px] text-prose leading-relaxed">
                      <span aria-hidden className="text-muted-foreground shrink-0 select-none mt-[0.45em] h-px w-3 bg-border" />
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-1.5">
                  {r.pills.map((pill) => (
                    <li key={pill} className="tag">{pill}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}

        {/* Education, same rhythm — so a recruiter screening for a degree
            never has to open the PDF. */}
        <Reveal as="li" className="block border-b border-border">
          <article className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 py-9">
            <div className="lg:pt-1">
              <p className="font-mono text-[13px] text-muted-foreground">Graduated 2026</p>
              <p className="font-mono text-[12px] text-muted-foreground/80 mt-1">{PROFILE.education.location}</p>
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug">
                {PROFILE.education.degree}
              </h3>
              <p className="text-[15px] text-muted-foreground mt-1.5 mb-4">
                {PROFILE.education.school}
              </p>
              <p className="text-[15px] text-prose measure leading-relaxed">
                Graduated with a <strong className="text-foreground font-semibold">{PROFILE.education.grade}</strong>.
                Coursework in data structures, algorithms, system design, databases and software
                engineering process.
              </p>
            </div>
          </article>
        </Reveal>
      </ol>
    </section>
  );
}
