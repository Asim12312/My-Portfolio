export function About() {
  const chips = ["React.js", "Node.js", "MongoDB", "Docker", "Socket.io", "JWT", "TypeScript", "CI/CD"];
  const chipColors = ["green", "cyan", "yellow", "blue", "orange", "green", "cyan", "yellow"] as const;

  return (
    <section id="about" className="relative px-6 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground px-3 py-1.5 rounded-full bg-[var(--green)] border-2 border-foreground mb-6">
            02 — about
          </div>
          <h2 className="font-display font-extrabold text-[clamp(44px,7vw,96px)] leading-[0.92] tracking-tight mb-8">
            engineer.{" "}
            <span className="inline-block text-grad-mint">builder.</span>{" "}
            <span className="inline-block text-foreground/40">shipper.</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-5">
            I'm a <strong className="text-foreground">Full-Stack MERN Developer</strong> with a{" "}
            <span className="px-1.5 rounded bg-[var(--yellow)] text-foreground font-semibold">BS Software Engineering · 3.54 GPA</span>{" "}
            from University of Central Punjab. I don't just push code — I architect systems that scale.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-5">
            From <strong className="text-foreground">real-time restaurant dashboards</strong> to{" "}
            <strong className="text-foreground">ML-powered movie engines</strong> — I build things that
            actually ship and hold up under load.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            {chips.map((c, i) => (
              <span
                key={c}
                className="font-mono text-[11px] font-bold px-3 py-1.5 rounded-full border-2 border-foreground text-foreground transition-transform hover:-translate-y-1"
                style={{
                  background: `var(--${chipColors[i]})`,
                  boxShadow: "3px 3px 0 0 var(--color-foreground)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Visual collage */}
        <div className="relative h-[520px] hidden lg:block">
          <div
            className="absolute top-4 left-4 w-72 rounded-2xl border-2 border-foreground p-5 card-sticker-hover bg-[var(--cyan)]"
            style={{ boxShadow: "8px 8px 0 0 var(--color-foreground)", transform: "rotate(-4deg)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 mb-2">// stack</div>
            <div className="font-display font-extrabold text-3xl text-foreground">MERN +<br/>Socket.io</div>
          </div>

          <div
            className="absolute top-12 right-2 w-60 rounded-2xl border-2 border-foreground p-5 bg-[var(--yellow)] card-sticker-hover"
            style={{ boxShadow: "8px 8px 0 0 var(--color-foreground)", transform: "rotate(5deg)" }}
          >
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-display font-extrabold text-2xl text-foreground leading-tight">3.54 GPA</div>
            <div className="font-mono text-[10px] mt-1 text-foreground/70">UCP · Software Eng.</div>
          </div>

          <div
            className="absolute bottom-32 left-12 w-64 rounded-2xl border-2 border-foreground p-5 bg-[var(--orange)] card-sticker-hover"
            style={{ boxShadow: "8px 8px 0 0 var(--color-foreground)", transform: "rotate(3deg)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 mb-2">// realtime</div>
            <div className="font-display font-extrabold text-xl text-foreground leading-tight">Sub-100ms sync</div>
            <div className="font-mono text-[10px] mt-1 text-foreground/70">Socket.io · Redux · MVC</div>
          </div>

          <div
            className="absolute bottom-6 right-10 w-56 rounded-2xl border-2 border-foreground p-5 bg-[var(--green)] card-sticker-hover"
            style={{ boxShadow: "8px 8px 0 0 var(--color-foreground)", transform: "rotate(-6deg)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 mb-2">// devops</div>
            <div className="font-display font-extrabold text-xl text-foreground leading-tight">Docker → CI/CD</div>
            <div className="font-mono text-[10px] mt-1 text-foreground/70">build · ship · iterate</div>
          </div>

          {/* center monogram */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-2xl border-4 border-foreground flex items-center justify-center font-display font-extrabold text-5xl text-foreground"
            style={{
              background: "var(--background)",
              boxShadow: "8px 8px 0 0 var(--color-foreground)",
            }}
          >
            MA
          </div>
        </div>

        {/* mobile compact stickers */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {[
            { icon: "//", title: "Real-time", sub: "Socket.io · Redux", bg: "var(--orange)" },
            { icon: "{}", title: "Docker CI/CD", sub: "ship fast", bg: "var(--green)" },
            { icon: "()", title: "3.54 GPA", sub: "UCP · SE", bg: "var(--yellow)" },
            { icon: "<>", title: "MERN", sub: "+ Next + TS", bg: "var(--cyan)" },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border-2 border-foreground p-5 text-foreground"
              style={{ background: c.bg, boxShadow: "5px 5px 0 0 var(--color-foreground)" }}
            >
              <div className="font-mono font-bold text-xl mb-1 opacity-60">{c.icon}</div>
              <div className="font-display font-extrabold text-lg">{c.title}</div>
              <div className="font-mono text-[10px] opacity-80">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
