const ROW_1 = [
  ["RAG", "var(--pink)"], ["AI Agents", "var(--cyan)"], ["Python", "var(--yellow)"],
  ["React.js", "var(--cyan)"], ["Next.js", "var(--orange)"], ["Node.js", "var(--green)"],
  ["MongoDB", "var(--orange)"], ["AWS", "var(--yellow)"], ["Docker", "var(--cyan)"],
  ["TypeScript", "var(--green)"], ["CI/CD", "var(--yellow)"], ["REST APIs", "var(--cyan)"],
] as const;

const ROW_2 = [
  ["SWE Intern @ VentureDive", "var(--green)"], ["AI Engineer", "var(--pink)"],
  ["BS Software Eng · 3.60 GPA", "var(--cyan)"], ["3+ yrs Freelance · Upwork", "var(--yellow)"],
  ["System Design", "var(--orange)"], ["Open to Remote", "var(--green)"],
  ["Lahore · Pakistan", "var(--orange)"], ["Mohasib · Live SaaS", "var(--cyan)"],
] as const;

function Row({ items, reverse = false }: { items: ReadonlyArray<readonly [string, string]>; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max animate-ticker" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {doubled.map(([label, color], i) => (
        <div key={i} className="flex items-center gap-3 px-6 py-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
          <span className="font-mono font-bold text-sm uppercase tracking-[0.12em] text-foreground/70 whitespace-nowrap">
            {label}
          </span>
          <span className="text-foreground/30 font-mono">/</span>
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <section className="relative py-12 border-y-2 border-foreground bg-background overflow-hidden">
      <Row items={ROW_1} />
      <div className="mt-2">
        <Row items={ROW_2} reverse />
      </div>
    </section>
  );
}
