import { Blobs, Nav } from "@/app/components/portfolio/Chrome";
import { Hero } from "@/app/components/portfolio/Hero";
import { About } from "@/app/components/portfolio/About";
import { Skills } from "@/app/components/portfolio/Skills";
import { Projects } from "@/app/components/portfolio/Projects";
import { Ticker } from "@/app/components/portfolio/Ticker";
import { Contact } from "@/app/components/portfolio/Contact";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Blobs />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Ticker />
          <Contact />
        </main>
        <footer className="relative z-10 px-6 sm:px-10 py-6 flex flex-wrap justify-between items-center gap-2 border-t border-border font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <span>© 2026 Muhammad Asim · MERN Dev</span>
          <span>built with passion · Lahore · open to remote 🌍</span>
        </footer>
      </div>
    </div>
  );
}
