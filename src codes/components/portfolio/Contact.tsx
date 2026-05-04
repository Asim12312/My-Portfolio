export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
      {/* big sticker accents */}
      <div
        className="absolute top-20 left-[8%] h-32 w-32 rounded-full border-2 border-foreground hidden md:block animate-float-y"
        style={{ background: "var(--yellow)", boxShadow: "6px 6px 0 0 var(--color-foreground)", transform: "rotate(-12deg)" }}
      />
      <div
        className="absolute bottom-32 right-[10%] h-24 w-24 rounded-2xl border-2 border-foreground hidden md:flex items-center justify-center font-mono font-extrabold text-2xl text-foreground animate-float-y"
        style={{
          background: "var(--green)", boxShadow: "6px 6px 0 0 var(--color-foreground)",
          transform: "rotate(8deg)", animationDelay: "-1s",
        }}
      >
        {`</>`}
      </div>

      <span className="font-mono text-[11px] uppercase tracking-[0.4em] px-4 py-1.5 rounded-full border-2 border-foreground bg-card text-foreground mb-6">
        05 — let's talk
      </span>

      <h2 className="font-display font-extrabold leading-[0.92] tracking-tight text-[clamp(56px,11vw,160px)] mb-6">
        <span className="block text-foreground">let's</span>
        <span className="block text-grad-mint">build.</span>
      </h2>

      <p className="text-lg text-muted-foreground mb-12 max-w-xl">
        Full-Stack MERN Developer · open to{" "}
        <span className="px-1.5 rounded bg-[var(--green)] text-foreground font-semibold">remote</span> &{" "}
        <span className="px-1.5 rounded bg-[var(--yellow)] text-foreground font-semibold">Lahore</span> roles
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        <a
          href="mailto:mazammasim@gmail.com"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-7 py-4 rounded-full bg-foreground text-background border-2 border-foreground card-sticker-hover"
          style={{ boxShadow: "6px 6px 0 0 var(--color-foreground)" }}
        >
          → send email
        </a>
        <a
          href="https://github.com/Asim12312"
          target="_blank" rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-7 py-4 rounded-full bg-[var(--green)] text-foreground border-2 border-foreground card-sticker-hover"
          style={{ boxShadow: "6px 6px 0 0 var(--color-foreground)" }}
        >
          ⌨ github
        </a>
        <a
          href="https://linkedin.com"
          target="_blank" rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] font-bold px-7 py-4 rounded-full bg-card text-foreground border-2 border-foreground card-sticker-hover"
          style={{ boxShadow: "6px 6px 0 0 var(--color-foreground)" }}
        >
          in / linkedin
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground">
        <span>📞 +92-343-1611587</span>
        <a href="mailto:mazammasim@gmail.com" className="hover:text-foreground transition-colors">
          📧 mazammasim@gmail.com
        </a>
        <span>📍 Lahore, Pakistan</span>
      </div>
    </section>
  );
}
