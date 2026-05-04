const ROW_1 = [
  ["React.js", "var(--cyan)"], ["Node.js", "var(--green)"], ["MongoDB", "var(--orange)"],
  ["Socket.io", "var(--yellow)"], ["Docker", "var(--cyan)"], ["TypeScript", "var(--green)"],
  ["JWT", "var(--orange)"], ["CI/CD", "var(--yellow)"], ["REST APIs", "var(--cyan)"],
  ["Redux", "var(--green)"], ["Next.js", "var(--orange)"], ["Express", "var(--yellow)"],
] as const;

const ROW_2 = [
  ["Full-Stack Dev", "var(--orange)"], ["BS Software Eng · 3.54 GPA", "var(--cyan)"],
  ["Open to Remote", "var(--green)"], ["Lahore · Pakistan", "var(--orange)"],
  ["MERN Stack", "var(--yellow)"], ["Clean Architecture", "var(--cyan)"],
  ["Problem Solver", "var(--green)"], ["Available Now", "var(--orange)"],
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
