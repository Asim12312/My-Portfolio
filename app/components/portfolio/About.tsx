import { PROFILE, SKILL_GROUPS } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <SectionHeading eyebrow="01 — about">
        I build the parts that have to keep working.
      </SectionHeading>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16">
        <Reveal>
          <div className="prose-block">
            <p>
              I&apos;m a Software Engineer at{" "}
              <a href="https://venturedive.com" target="_blank" rel="noreferrer" className="link-underline font-medium">
                VentureDive
              </a>{" "}
              and an AI Engineer, with a {PROFILE.education.degree} and a{" "}
              <strong>{PROFILE.education.gradeShort}</strong> from {PROFILE.education.school}.
            </p>
            <p>
              Most of my work sits at the seam between AI and ordinary product engineering:
              retrieval pipelines that have to return the <strong>right</strong> document rather
              than a plausible one, agents that take real actions, and the unglamorous auth,
              validation and deployment work that decides whether any of it survives contact with
              users.
            </p>
            <p>
              Before VentureDive I spent about a year and a half building client software under an
              experienced developer who owned the client relationships and reviewed everything I
              wrote. That arrangement taught me more than the code did — how to read a vague
              requirement, when to push back on scope, and what &ldquo;done&rdquo; actually means
              when someone else is paying for it.
            </p>
            <p>
              I&apos;d rather write one system carefully than six demos quickly. The three case
              studies on this site are the honest version of what that looks like: what the
              constraint was, what I chose, and what it cost.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="divide-y divide-border border-y border-border">
            {[
              { k: "Currently", v: "Software Engineer Intern, VentureDive — Lahore" },
              { k: "Focus", v: "RAG pipelines, AI agents, full-stack product engineering" },
              { k: "Education", v: `${PROFILE.education.degree}, ${PROFILE.education.school} — ${PROFILE.education.gradeShort}` },
              { k: "Based in", v: PROFILE.location },
              { k: "Open to", v: PROFILE.availability.detail },
            ].map((row) => (
              <div key={row.k} className="py-4">
                <dt className="label mb-1.5">{row.k}</dt>
                <dd className="text-[15px] text-foreground leading-relaxed">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Stack, as a scannable table rather than a rotating orbit of logos. */}
      <Reveal className="mt-16" >
        <h3 className="label mb-6">Stack</h3>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
          {SKILL_GROUPS.map((g) => (
            <div key={g.key}>
              <dt className="text-[15px] font-semibold text-foreground mb-2.5">{g.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {g.tags.map((t) => (
                    <li key={t} className="tag">{t}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
