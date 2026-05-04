import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Blobs, Nav } from "@/components/portfolio/Chrome";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Ticker } from "@/components/portfolio/Ticker";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Asim — Full-Stack MERN Developer" },
      { name: "description", content: "Playful portfolio of Muhammad Asim — Full-Stack MERN Developer building real-time systems & ML-powered apps. Open to remote & Lahore roles." },
      { property: "og:title", content: "Muhammad Asim — Full-Stack MERN Developer" },
      { property: "og:description", content: "Real-time systems · ML apps · clean scalable code. Hire me." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
