"use client";

import { useEffect, useRef, useState } from "react";

const CODE_LINES: Array<[string, string]> = [
  ["01", `<span class="cm">// ChefOS — real-time restaurant ops</span>`],
  ["02", `<span class="kw">import</span> <span class="cl">React</span>, { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`],
  ["03", `<span class="kw">import</span> { <span class="fn">io</span> } <span class="kw">from</span> <span class="str">'socket.io-client'</span>`],
  ["04", ``],
  ["05", `<span class="kw">const</span> <span class="fn">Dashboard</span> = ({ <span class="cl">user</span> }) <span class="op">=&gt;</span> {`],
  ["06", `&nbsp;&nbsp;<span class="kw">const</span> [<span class="wh">orders</span>, setOrders] = <span class="fn">useState</span>([])`],
  ["07", `&nbsp;&nbsp;<span class="kw">const</span> <span class="wh">socket</span> = <span class="fn">io</span>(<span class="str">API_URL</span>)`],
  ["08", ``],
  ["09", `&nbsp;&nbsp;<span class="fn">useEffect</span>(() <span class="op">=&gt;</span> {`],
  ["10", `&nbsp;&nbsp;&nbsp;&nbsp;socket.<span class="fn">on</span>(<span class="str">'order:new'</span>, (data) <span class="op">=&gt;</span> {`],
  ["11", `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">setOrders</span>(p <span class="op">=&gt;</span> [...p, data])`],
  ["12", `&nbsp;&nbsp;&nbsp;&nbsp;})`],
  ["13", `&nbsp;&nbsp;}, [])`],
  ["14", ``],
  ["15", `&nbsp;&nbsp;<span class="kw">return</span> <span class="op">&lt;</span><span class="cl">OrderBoard</span> <span class="wh">orders</span><span class="op">={</span>orders<span class="op">}</span> <span class="op">/&gt;</span>`],
  ["16", `}<span class="cursor-blink"></span>`],
];

export function Hero() {
  const [lines, setLines] = useState<Array<[string, string]>>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    let isActive = true;
    let t: ReturnType<typeof setTimeout>;
    
    const tick = () => {
      if (!isActive) return;
      if (i >= CODE_LINES.length) {
        // restart for endless loop after pause
        t = setTimeout(() => {
          if (!isActive) return;
          i = 0;
          setLines([]);
          t = setTimeout(tick, 600);
        }, 4000);
        return;
      }
      
      const nextLine = CODE_LINES[i];
      if (nextLine) {
        setLines((prev) => [...prev, nextLine]);
      }
      i++;
      
      setTimeout(() => {
        if (!isActive) return;
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
      }, 20);
      
      t = setTimeout(tick, 220);
    };
    
    t = setTimeout(tick, 900);
    return () => {
      isActive = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {/* sticker tags */}
      <div className="absolute top-28 left-[6%] hidden md:block animate-float-y" style={{ animationDelay: "0s" }}>
        <Sticker color="green" rotate={-6}>● available for hire</Sticker>
      </div>
      <div className="absolute top-40 right-[6%] hidden md:block animate-float-y" style={{ animationDelay: "-1.4s" }}>
        <Sticker color="orange" rotate={5}>remote / lahore</Sticker>
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground/60 mb-5 px-4 py-1.5 rounded-full border-2 border-foreground bg-card">
        <span className="inline-block h-2 w-2 rounded-full bg-[var(--green)] mr-2 animate-pulse" />
        Full-Stack MERN Dev · Lahore + Remote
      </span>

      <h1 className="w-full font-display font-extrabold leading-[0.92] tracking-tight text-[clamp(30px,7.5vw,80px)] mb-6 mx-auto px-1">
        <span className="block break-keep">Muhammad</span>
        <span className="block text-grad-juicy animate-grad-pan break-keep">Asim.</span>
      </h1>

      <p className="max-w-xl text-base sm:text-lg text-muted-foreground mb-10">
        I build <em className="not-italic font-semibold text-foreground">real-time systems</em>,{" "}
        <em className="not-italic font-semibold text-foreground">ML-powered apps</em>, and ship code
        that's <span className="px-1.5 py-0.5 rounded-md bg-[var(--green)] text-foreground font-semibold">clean and fast</span>.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        <a
          href="#projects"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-6 py-3.5 rounded-full bg-foreground text-background border-2 border-foreground card-sticker-hover"
        >
          see the work →
        </a>
        <a
          href="#contact"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-6 py-3.5 rounded-full bg-[var(--green)] text-foreground border-2 border-foreground card-sticker-hover"
        >
          hire me
        </a>
        <a
          href="/assets/resume.pdf"
          download="MuhammadAsim_Resume.pdf"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-6 py-3.5 rounded-full bg-[var(--pink)] text-foreground border-2 border-foreground card-sticker-hover flex items-center justify-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          resume
        </a>
      </div>

      {/* Laptop */}
      <div className="relative w-full max-w-[720px] mx-auto">
        <FloatingBadge className="-top-4 -left-6 sm:-left-16" color="green" rotate={-6}>node.js</FloatingBadge>
        <FloatingBadge className="top-1/3 -right-4 sm:-right-20" color="cyan" rotate={5}>react</FloatingBadge>
        <FloatingBadge className="-bottom-2 -left-2 sm:-left-14" color="orange" rotate={-4}>socket.io</FloatingBadge>
        <FloatingBadge className="-bottom-6 right-2 sm:right-0" color="yellow" rotate={7}>mongodb</FloatingBadge>

        <div className="relative">
          <div
            className="relative w-full rounded-t-2xl overflow-hidden border-2 border-foreground"
            style={{
              aspectRatio: "16/10",
              background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
              boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.45), 0 0 60px rgba(34, 211, 238, 0.18)",
            }}
          >
            {/* traffic dots */}
            <div className="absolute top-3 left-4 flex gap-1.5 z-10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="absolute inset-2 mt-6 rounded-lg bg-[#0a0a14] overflow-hidden">
              <div
                ref={ref}
                className="h-full w-full overflow-hidden p-4 font-mono text-[clamp(9px,1.3vw,12.5px)] leading-[1.65] text-white/85"
              >
                {lines.map((line, idx) => {
                  if (!Array.isArray(line)) return null;
                  const [ln, content] = line;
                  return (
                    <div key={idx} className="flex">
                      <span className="text-white/25 mr-3 w-6 text-right shrink-0">{ln}</span>
                      <span dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* base */}
          <div
            className="mx-auto h-4 rounded-b-xl border-2 border-t-0 border-foreground"
            style={{
              width: "104%",
              marginLeft: "-2%",
              background: "linear-gradient(180deg, #1e1e2e, #141424)",
            }}
          >
            <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      <style>{`
        .kw{color:#FF79C6}.fn{color:#50FA7B}.str{color:#F1FA8C}.cl{color:#8BE9FD}
        .cm{color:#6272A4;font-style:italic}.wh{color:#fff}.op{color:#FF79C6}.num{color:#BD93F9}
        .cursor-blink{display:inline-block;width:8px;height:1em;background:#8BE9FD;vertical-align:text-bottom;margin-left:2px;animation:blink 1s steps(1) infinite}
      `}</style>
    </section>
  );
}

function Sticker({
  children, color, rotate = 0,
}: { children: React.ReactNode; color: "pink" | "yellow" | "cyan" | "green" | "orange"; rotate?: number }) {
  const bg: Record<string, string> = {
    pink: "var(--pink)", yellow: "var(--yellow)", cyan: "var(--cyan)",
    green: "var(--green)", orange: "var(--orange)",
  };
  return (
    <span
      className="inline-block px-3 py-1.5 rounded-full font-mono text-[11px] font-bold border-2 border-foreground text-foreground"
      style={{ background: bg[color], transform: `rotate(${rotate}deg)`, boxShadow: "3px 3px 0 0 var(--color-foreground)" }}
    >
      {children}
    </span>
  );
}

function FloatingBadge({
  children, className = "", color, rotate = 0,
}: { children: React.ReactNode; className?: string; color: "pink" | "yellow" | "cyan" | "green" | "orange"; rotate?: number }) {
  const bg: Record<string, string> = {
    pink: "var(--pink)", yellow: "var(--yellow)", cyan: "var(--cyan)", green: "var(--green)", orange: "var(--orange)",
  };
  return (
    <span
      className={`absolute z-20 px-3 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-bold border-2 border-foreground text-foreground animate-float-y ${className}`}
      style={{ background: bg[color], transform: `rotate(${rotate}deg)`, boxShadow: "3px 3px 0 0 var(--color-foreground)" }}
    >
      {children}
    </span>
  );
}
