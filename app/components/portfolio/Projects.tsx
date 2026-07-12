const PROJECTS = [
  {
    n: "01",
    title: "Mohasib",
    desc: "FBR-compliant digital invoicing SaaS for Pakistani businesses — live in production. Real-time invoice transmission to PRAL with instant 22-digit invoice numbers & QR codes, bulk Excel/CSV import with validation, sandbox testing mode, and a multi-client portal for tax consultants.",
    pills: ["Next.js", "Node.js", "MongoDB", "PRAL / FBR API", "SaaS", "REST"],
    metric: "Live",
    metricLabel: "paying-user saas",
    color: "var(--green)",
    emoji: "🧾",
    githubUrl: "https://github.com/Asim12312",
    liveUrl: "https://mohasib.online"
  },
  {
    n: "02",
    title: "ChefOS",
    desc: "Real-time restaurant operations platform. Role-based access for admin, manager & staff. Live order sync across kitchen, billing & inventory via Socket.io. Redux for complex multi-user workflows.",
    pills: ["React", "Node", "Socket.io", "MongoDB", "JWT", "Docker"],
    metric: "3",
    metricLabel: "user roles",
    color: "var(--orange)",
    emoji: "🍽️",
    githubUrl: "https://github.com/Asim12312/ChefOS.git",
    liveUrl: "https://chefos.pro"
  },
  {
    n: "03",
    title: "StudentSphere",
    desc: "Full-stack university ecosystem. Features clubs with real-time chats, academic forum, peer-to-peer Stripe-powered marketplace, and robust admin oversight.",
    pills: ["React", "Express", "Node", "MongoDB", "Socket.io", "Stripe"],
    metric: "All-in-1",
    metricLabel: "campus portal",
    color: "var(--pink)",
    emoji: "🎓",
    githubUrl: "https://github.com/Asim12312/student-sphere-app.git"
  },
  {
    n: "04",
    title: "UCP DevOps Project",
    desc: "A modern, high-performance web portal built with a cutting-edge DevOps mindset. Complete software development lifecycle with fully automated CI/CD pipeline.",
    pills: ["HTML5", "CSS3", "JavaScript", "Parcel", "GitHub Actions", "Docker", "Nginx"],
    metric: "CI/CD",
    metricLabel: "fully automated",
    color: "var(--yellow)",
    emoji: "🚀",
    githubUrl: "https://github.com/Asim12312/ucp-devops-project.git"
  },
  {
    n: "05",
    title: "Movie Discovery Engine",
    desc: "ML-powered recommendation engine using Cosine Similarity. Dynamic React UI with lazy loading, animations & search filtering. Python/Flask backend with caching.",
    pills: ["React", "Python", "Flask", "ML / Cosine", "REST"],
    metric: "<200ms",
    metricLabel: "response",
    color: "var(--cyan)",
    emoji: "</>",
    githubUrl: "https://github.com/Asim12312"
  },
  {
    n: "06",
    title: "Automated UI Verifier",
    desc: "Self-contained Selenium testing suite for 50+ edge cases. Binary pass/fail rubrics for regression testing — cut QA time by 40% on CI runs.",
    pills: ["Python", "Selenium", "JavaScript", "CI/CD"],
    metric: "40%",
    metricLabel: "qa time saved",
    color: "var(--green)",
    emoji: "[ ]",
    githubUrl: "https://github.com/Asim12312"
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground px-3 py-1.5 rounded-full bg-[var(--orange)] border-2 border-foreground mb-6">
        05 — work
      </div>
      <h2 className="font-display font-extrabold text-[clamp(44px,8vw,110px)] leading-[0.92] tracking-tight mb-12">
        selected <span className="text-grad-mint">projects.</span>
      </h2>

      <div className="grid gap-6">
        {PROJECTS.map((p, i) => (
          <article
            key={p.n}
            className="group relative grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 rounded-3xl border-2 border-foreground bg-card p-6 sm:p-9 card-sticker-hover"
            style={{
              boxShadow: "6px 6px 0 0 var(--color-foreground)",
              transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)`,
            }}
          >
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <div
                className="h-16 w-16 rounded-2xl border-2 border-foreground flex items-center justify-center font-mono font-extrabold text-xl text-foreground"
                style={{ background: p.color, boxShadow: "3px 3px 0 0 var(--color-foreground)" }}
              >
                {p.emoji}
              </div>
              <span className="font-mono font-extrabold text-3xl md:text-5xl text-foreground/15 group-hover:text-foreground/40 transition-colors">
                {p.n}
              </span>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-2 text-foreground">
                {p.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.pills.map((pill) => (
                  <span
                    key={pill}
                    className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-md border border-foreground/30 text-foreground"
                    style={{ background: `color-mix(in oklab, ${p.color} 18%, transparent)` }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[11px] font-bold px-4 py-2 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer card-sticker-hover text-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[11px] font-bold px-4 py-2 rounded-full bg-[var(--green)] text-foreground border-2 border-foreground hover:-translate-y-1 transition-transform cursor-pointer card-sticker-hover" style={{ boxShadow: "3px 3px 0 0 var(--color-foreground)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live
                  </a>
                )}
              </div>
            </div>

            <div className="md:text-right">
              <div
                className="font-display font-extrabold text-4xl sm:text-5xl"
                style={{ color: p.color }}
              >
                {p.metric}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                {p.metricLabel}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
