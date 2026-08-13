import { Blobs, Nav } from "@/app/components/portfolio/Chrome";
import { Hero } from "@/app/components/portfolio/Hero";
import { Stats } from "@/app/components/portfolio/Stats";
import { About } from "@/app/components/portfolio/About";
import { Experience } from "@/app/components/portfolio/Experience";
import { Projects } from "@/app/components/portfolio/Projects";
import { Approach } from "@/app/components/portfolio/Approach";
import { Contact } from "@/app/components/portfolio/Contact";
import { Footer } from "@/app/components/portfolio/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Blobs />
      <div className="relative z-10">
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main">
          <Hero />
          <Stats />
          <About />
          <Experience />
          {/* Work sits right after experience — it's what recruiters came for. */}
          <Projects />
          <Approach />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
