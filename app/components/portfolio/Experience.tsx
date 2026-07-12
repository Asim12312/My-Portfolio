const ROLES = [
  {
    n: "01",
    role: "Software Engineer Intern",
    company: "VentureDive",
    period: "Feb 2026 — Present",
    location: "Lahore",
    color: "var(--cyan)",
    badge: "current",
    points: [
      "Building scalable, AI-powered digital solutions combining modern web development with intelligent systems.",
      "Implementing RAG pipelines, CI/CD workflows, full-stack features & system design in production codebases.",
    ],
    pills: ["RAG", "System Design", "CI/CD", "Full-Stack", "AI Systems"],
  },
  {
    n: "02",
    role: "Software Engineer — AI & Automation",
    company: "Upwork · Freelance",
    period: "May 2025 — Present",
    location: "Remote",
    color: "var(--pink)",
    points: [
      "Designed AI-powered automation solutions with Python and modern AI APIs — intelligent chatbots & AI agents that automate business workflows.",
      "Built backend services on AWS, automated repetitive processes with APIs, webhooks & workflow tools for clients worldwide.",
    ],
    pills: ["Python", "AI Agents", "AWS", "Automation", "Chatbots"],
  },
  {
    n: "03",
    role: "Full-Stack Software Engineer",
    company: "Upwork · Freelance",
    period: "Nov 2022 — Present",
    location: "Remote",
    color: "var(--green)",
    points: [
      "3+ years shipping responsive, scalable web apps with React, Next.js, Node, Express & MongoDB for international clients.",
      "Delivered end-to-end: REST APIs, auth & authorization, third-party integrations, SEO & performance optimization — on time, every time.",
    ],
    pills: ["React", "Next.js", "Node.js", "MongoDB", "REST APIs"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground px-3 py-1.5 rounded-full bg-[var(--pink)] border-2 border-foreground mb-6">
        03 — experience
      </div>
      <h2 className="font-display font-extrabold text-[clamp(44px,8vw,110px)] leading-[0.92] tracking-tight mb-12">
        where I've <span className="text-grad-juicy">shipped.</span>
      </h2>

      <div className="grid gap-6">
        {ROLES.map((r) => (
          <article
            key={r.n}
            className="group relative rounded-3xl border-2 border-foreground bg-card p-6 sm:p-9 card-sticker-hover"
            style={{ boxShadow: "6px 6px 0 0 var(--color-foreground)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <span
                  className="h-12 w-12 rounded-xl border-2 border-foreground flex items-center justify-center font-mono font-extrabold text-sm text-foreground shrink-0"
                  style={{ background: r.color, boxShadow: "3px 3px 0 0 var(--color-foreground)" }}
                >
                  {r.n}
                </span>
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground leading-tight">
                    {r.role}
                  </h3>
                  <div className="font-mono text-xs text-muted-foreground mt-1">
                    {r.company} · {r.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {r.badge && (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--green)] border-2 border-foreground text-foreground">
                    ● {r.badge}
                  </span>
                )}
                <span className="font-mono text-[11px] font-bold px-3 py-1.5 rounded-full border-2 border-foreground bg-background text-foreground whitespace-nowrap">
                  {r.period}
                </span>
              </div>
            </div>

            <ul className="space-y-2 mb-5 max-w-3xl">
              {r.points.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed">
                  <span className="font-mono font-bold shrink-0" style={{ color: r.color }}>→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {r.pills.map((pill) => (
                <span
                  key={pill}
                  className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-md border border-foreground/30 text-foreground"
                  style={{ background: `color-mix(in oklab, ${r.color} 18%, transparent)` }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
