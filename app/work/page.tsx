import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_PROJECTS, OTHER_PROJECTS, PROFILE, SITE_URL } from "@/lib/content";
import { Blobs, Nav } from "@/app/components/portfolio/Chrome";
import { Footer } from "@/app/components/portfolio/Footer";
import { ArrowIcon, ExternalIcon, GithubIcon } from "@/app/components/portfolio/icons";

export const metadata: Metadata = {
  title: "Work & case studies",
  description:
    "Engineering case studies by Muhammad Asim — Mohasib (FBR-compliant invoicing SaaS), ChefOS (real-time restaurant operations) and StudentSphere (campus platform). Problem, architecture, trade-offs and outcome for each.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/work`,
    title: `Work & case studies · ${PROFILE.name}`,
  },
};

export default function WorkIndex() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Blobs />
      <div className="relative z-10">
        <a href="#work-index" className="skip-link">Skip to work</a>
        <Nav />

        <main id="work-index" className="px-6 sm:px-10 pt-32 pb-20 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <span aria-hidden>←</span> Home
          </Link>

          <h1 className="font-display font-extrabold text-[clamp(2.4rem,6.5vw,3.75rem)] leading-[1.03] mb-5">
            Work &amp; case studies
          </h1>
          <p className="lead mb-14">
            Each write-up covers the same ground: what the constraint was, how I structured a
            solution around it, which trade-offs I chose on purpose, and what shipped.
          </p>

          <ul className="border-t border-border mb-16">
            {FEATURED_PROJECTS.map((p) => (
              <li key={p.slug} className="border-b border-border">
                <Link href={`/work/${p.slug}`} className="group flex items-start gap-6 py-7 min-w-0">
                  <span className="grow min-w-0">
                    <span className="block font-display font-bold text-2xl sm:text-[1.75rem] text-foreground group-hover:text-brand transition-colors leading-tight">
                      {p.title}
                    </span>
                    <span className="block text-[15px] text-prose mt-2 leading-relaxed measure">
                      {p.tagline}
                    </span>
                    <span className="block label mt-3">
                      {p.status} · {p.timeline}
                    </span>
                  </span>
                  <span className="text-muted-foreground group-hover:text-brand transition-colors shrink-0 mt-2">
                    <ArrowIcon size={20} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="label mb-6">Also built</h2>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {OTHER_PROJECTS.map((p) => (
              <li key={p.slug} className="min-w-0">
                <h3 className="font-display font-bold text-[17px] text-foreground mb-1.5">{p.title}</h3>
                <p className="text-sm text-prose leading-relaxed mb-3">{p.tagline}</p>
                <div className="flex flex-wrap gap-4">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-brand transition-colors">
                      <GithubIcon size={13} /> Source
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-brand transition-colors">
                      <ExternalIcon size={13} /> Live
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </main>

        <Footer />
      </div>
    </div>
  );
}
