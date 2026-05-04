"use client";

import { useEffect, useState } from "react";

const NODES = [
  { id: "react", label: "React", angle: 30, r: 130, color: "var(--cyan)" },
  { id: "node", label: "Node", angle: 120, r: 130, color: "var(--green)" },
  { id: "mongo", label: "Mongo", angle: 210, r: 130, color: "var(--green)" },
  { id: "ts", label: "TS", angle: 300, r: 130, color: "var(--blue)" },
  { id: "docker", label: "Docker", angle: 60, r: 210, color: "var(--blue)" },
  { id: "socket", label: "Socket", angle: 150, r: 210, color: "var(--pink)" },
  { id: "next", label: "Next", angle: 240, r: 210, color: "var(--purple)" },
  { id: "jwt", label: "JWT", angle: 330, r: 210, color: "var(--orange)" },
];

export function Skills() {
  const [t, setT] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const tick = () => {
      setT((p) => p + 0.003);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cards = [
    { key: "fe", icon: "FE", title: "Frontend", color: "var(--cyan)", tags: ["React", "Next.js", "TypeScript", "Redux", "Tailwind", "Canvas"] },
    { key: "be", icon: "BE", title: "Backend", color: "var(--green)", tags: ["Node.js", "Express", "Socket.io", "REST", "JWT", "MVC"] },
    { key: "db", icon: "DB", title: "Database", color: "var(--yellow)", tags: ["MongoDB", "MySQL", "Mongoose", "Aggregation"] },
    { key: "dv", icon: "DX", title: "DevOps & QA", color: "var(--orange)", tags: ["Docker", "CI/CD", "Render", "Jest", "Selenium"] },
    { key: "se", icon: "SE", title: "BS Software Eng.", color: "var(--pink)", tags: ["Data Structures", "Algorithms", "Architecture", "SDLC", "Agile", "UML"] },
  ];

  return (
    <section id="skills" className="relative px-6 sm:px-10 py-28 max-w-7xl mx-auto">
      <div className="inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground px-3 py-1.5 rounded-full bg-[var(--cyan)] border-2 border-foreground mb-6">
        03 — stack
      </div>
      <h2 className="font-display font-extrabold text-[clamp(44px,8vw,110px)] leading-[0.92] tracking-tight mb-16">
        the <span className="text-grad-sun">arsenal.</span>
      </h2>

      {/* orbit */}
      <div className="relative mx-auto h-[480px] w-full max-w-[560px] mb-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[260px] w-[260px] rounded-full border-2 border-dashed border-foreground/20 animate-spin-slow" />
          <div className="absolute h-[420px] w-[420px] rounded-full border-2 border-dashed border-foreground/15 animate-spin-slow-rev" />
          <div
            className="relative z-10 h-32 w-32 rounded-2xl border-2 border-foreground flex flex-col items-center justify-center text-center font-display font-extrabold text-foreground"
            style={{
              background: "var(--background)",
              boxShadow: "6px 6px 0 0 var(--color-foreground)",
            }}
          >
            <span className="text-[10px] font-mono opacity-60">// stack</span>
            <span className="text-2xl leading-none">MERN</span>
            <span className="text-[10px] font-mono opacity-60">v.2026</span>
          </div>
          {mounted && NODES.map((n) => {
            const rad = ((n.angle - 90) * Math.PI) / 180 + t * (n.r === 130 ? 1 : -0.7);
            const x = Math.cos(rad) * n.r;
            const y = Math.sin(rad) * n.r;
            return (
              <div
                key={n.id}
                className="absolute font-mono text-[11px] font-extrabold rounded-full border-2 border-foreground flex items-center justify-center text-foreground transition-transform hover:scale-125"
                style={{
                  width: "68px", height: "68px",
                  background: n.color,
                  left: `calc(50% + ${x}px - 34px)`,
                  top: `calc(50% + ${y}px - 34px)`,
                  boxShadow: "4px 4px 0 0 var(--color-foreground)",
                }}
              >
                {n.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {cards.map((c) => (
          <div
            key={c.key}
            className="rounded-2xl border-2 border-foreground p-6 bg-card card-sticker-hover"
            style={{ boxShadow: `5px 5px 0 0 var(--color-foreground)` }}
          >
            <div
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground mb-4 font-mono font-extrabold text-sm text-foreground"
              style={{ background: c.color }}
            >
              {c.icon}
            </div>
            <h3 className="font-display font-extrabold text-xl mb-3 text-foreground">{c.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
