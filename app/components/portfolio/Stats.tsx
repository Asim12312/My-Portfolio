const STATS = [
  { value: "3+", label: "years shipping", sub: "freelance + intern", color: "var(--green)" },
  { value: "1", label: "live SaaS", sub: "mohasib.online", color: "var(--cyan)" },
  { value: "10+", label: "projects shipped", sub: "web · ai · devops", color: "var(--orange)" },
  { value: "3.60", label: "gpa / 4.0", sub: "bs software eng · ucp", color: "var(--yellow)" },
];

export function Stats() {
  return (
    <section aria-label="Key stats" className="relative px-6 sm:px-10 -mt-8 mb-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="rounded-2xl border-2 border-foreground bg-card p-5 sm:p-6 card-sticker-hover"
            style={{
              boxShadow: "5px 5px 0 0 var(--color-foreground)",
              transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
            }}
          >
            <div
              className="font-display font-extrabold text-4xl sm:text-5xl leading-none mb-2"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="font-mono text-[11px] uppercase font-bold tracking-[0.14em] text-foreground">
              {s.label}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
