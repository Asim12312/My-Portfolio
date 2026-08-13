import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <section aria-label="Key figures" className="relative px-6 sm:px-10 pb-8 max-w-6xl mx-auto">
      <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-border">
        {STATS.map((s) => (
          <div key={s.label} className="border-b border-border sm:border-b-0 lg:border-r last:border-r-0 border-border py-6 pr-6">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display font-extrabold text-4xl leading-none tracking-tight mb-2 text-foreground">
                {s.value}
              </span>
              <span className="block text-sm font-medium text-foreground">{s.label}</span>
              <span className="block font-mono text-[11px] text-muted-foreground mt-1">{s.sub}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
