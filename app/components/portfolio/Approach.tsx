import { PRINCIPLES } from "@/lib/content";
import { Reveal, SectionHeading } from "./Reveal";

/**
 * Stated engineering positions rather than decorative quotations.
 * A famous quote tells a reader nothing about the candidate; a position
 * is something an interviewer can push on — which is the point.
 */
export function Approach() {
  return (
    <section id="approach" className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="04 — approach"
        lead="Positions I hold about building software, each one traceable to a decision in the work above."
      >
        How I work.
      </SectionHeading>

      <ol className="grid md:grid-cols-2 gap-x-12 gap-y-9 border-t border-border pt-10">
        {PRINCIPLES.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 50} className="block min-w-0">
            <div className="flex gap-4">
              <span aria-hidden className="font-mono text-[12px] text-brand shrink-0 pt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-[17px] text-foreground mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[15px] text-prose leading-relaxed">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
