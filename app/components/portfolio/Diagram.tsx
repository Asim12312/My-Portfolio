import type { Diagram as DiagramType } from "@/lib/projects";

/**
 * A layered architecture diagram rendered as semantic HTML rather than SVG:
 * it reflows to a single column on mobile, inherits theme tokens, is
 * selectable and searchable, and reads correctly to a screen reader as an
 * ordered list of tiers.
 */
export function Diagram({ diagram }: { diagram: DiagramType }) {
  return (
    <figure className="my-2">
      <div className="hairline rounded-2xl bg-card overflow-hidden">
        <ol className="flex flex-col lg:flex-row">
          {diagram.tiers.map((tier, i) => (
            <li
              key={tier.label}
              className={`flex-1 min-w-0 p-4 sm:p-5 border-border ${
                i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""
              } ${tier.accent ? "bg-[var(--brand-soft)]" : ""}`}
            >
              <p className="label mb-3 flex items-center gap-2">
                <span aria-hidden className="tabular-nums opacity-60">{i + 1}</span>
                {tier.label}
              </p>
              <ul className="space-y-1.5">
                {tier.nodes.map((node) => (
                  <li
                    key={node}
                    className={`rounded-lg px-2.5 py-2 text-[12.5px] leading-snug border ${
                      tier.accent
                        ? "border-[color-mix(in_oklab,var(--brand)_35%,transparent)] text-foreground font-medium"
                        : "border-border text-prose"
                    } bg-background`}
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {diagram.crosscutting && (
          <div className="border-t border-border px-4 sm:px-5 py-3.5 bg-muted/40">
            <p className="label mb-2">Cross-cutting</p>
            <ul className="flex flex-wrap gap-1.5">
              {diagram.crosscutting.map((c) => (
                <li key={c} className="tag">{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed max-w-[68ch]">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
