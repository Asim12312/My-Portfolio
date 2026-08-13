import type { Metadata } from "next";
import Link from "next/link";
import {
  FEATURED_PROJECTS,
  PROFILE,
  ROLES,
  SITE_URL,
  SKILL_GROUPS,
} from "@/lib/content";
import { Nav } from "@/app/components/portfolio/Chrome";
import { Footer } from "@/app/components/portfolio/Footer";
import { DownloadIcon } from "@/app/components/portfolio/icons";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${PROFILE.name} — ${PROFILE.title}. Experience, projects, stack and education.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/resume`,
    title: `Résumé · ${PROFILE.name}`,
  },
};

/**
 * An HTML résumé built from the same data as the rest of the site.
 *
 * Two reasons this exists alongside the PDF: recruiters frequently read in the
 * browser rather than downloading, and applicant tracking systems and search
 * engines can parse text where they cannot parse a PDF. It also prints
 * cleanly — see the @media print rules in globals.css.
 */
export default function ResumePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10">
        <a href="#resume" className="skip-link">Skip to résumé</a>
        <Nav />

        <main id="resume" className="px-6 sm:px-10 pt-32 pb-20 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10 no-print">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <span aria-hidden>←</span> Home
            </Link>
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost !py-1.5 !px-3.5 !text-[13px]">
              <DownloadIcon size={13} />
              Download PDF
            </a>
          </div>

          {/* ── Header ── */}
          <header className="pb-7 border-b border-border mb-9">
            <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,2.75rem)] leading-tight mb-2">
              {PROFILE.name}
            </h1>
            <p className="text-[17px] text-foreground mb-4">{PROFILE.title}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-muted-foreground">
              <li><a href={`mailto:${PROFILE.email}`} className="link-underline">{PROFILE.email}</a></li>
              <li><a href={`tel:${PROFILE.phoneRaw}`} className="link-underline">{PROFILE.phone}</a></li>
              <li>{PROFILE.location}</li>
              <li><a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="link-underline">github.com/Asim12312</a></li>
              <li><a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="link-underline">LinkedIn</a></li>
            </ul>
          </header>

          {/* ── Summary ── */}
          <Section title="Summary">
            <p className="text-[15px] text-prose leading-relaxed">
              Software Engineer at VentureDive building retrieval-augmented generation pipelines
              and full-stack features in production services, following eighteen months of
              mentored client delivery. Ships and maintains software in production, including a
              statutory e-invoicing platform integrated with Pakistan&apos;s FBR and a restaurant
              operating system handling live orders and payments.
              {" "}{PROFILE.availability.label} — {PROFILE.availability.detail}.
            </p>
          </Section>

          {/* ── Experience ── */}
          <Section title="Experience">
            <ol className="space-y-7">
              {ROLES.map((r) => (
                <li key={r.n}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="font-display font-bold text-[16.5px] text-foreground">{r.role}</h3>
                    <span className="font-mono text-[12.5px] text-muted-foreground">{r.period}</span>
                  </div>
                  <p className="text-[14px] text-muted-foreground mb-2.5">
                    {r.company} · {r.location}
                  </p>
                  <ul className="space-y-1.5">
                    {r.points.map((p, i) => (
                      <li key={i} className="flex gap-2.5 text-[14.5px] text-prose leading-relaxed">
                        <span aria-hidden className="shrink-0 mt-[0.62em] h-px w-2.5 bg-border" />
                        <span className="min-w-0">{p}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Projects ── */}
          <Section title="Selected projects">
            <ol className="space-y-6">
              {FEATURED_PROJECTS.map((p) => (
                <li key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="font-display font-bold text-[16.5px] text-foreground">
                      {p.title}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 font-body font-normal text-[13px] text-muted-foreground link-underline"
                        >
                          {p.liveUrl.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </h3>
                    <span className="font-mono text-[12.5px] text-muted-foreground">{p.status}</span>
                  </div>
                  <p className="text-[14.5px] text-prose leading-relaxed mb-2">{p.tagline}.</p>
                  <p className="font-mono text-[12.5px] text-muted-foreground">{p.pills.join(" · ")}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Stack ── */}
          <Section title="Technical skills">
            <dl className="space-y-3">
              {SKILL_GROUPS.map((g) => (
                <div key={g.key} className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-5">
                  <dt className="text-[14px] font-semibold text-foreground">{g.title}</dt>
                  <dd className="text-[14.5px] text-prose leading-relaxed min-w-0">
                    {g.tags.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* ── Education ── */}
          <Section title="Education" last>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
              <h3 className="font-display font-bold text-[16.5px] text-foreground">
                {PROFILE.education.degree}
              </h3>
              <span className="font-mono text-[12.5px] text-muted-foreground">
                {PROFILE.education.grade}
              </span>
            </div>
            <p className="text-[14px] text-muted-foreground">
              {PROFILE.education.school} · {PROFILE.education.location}
            </p>
          </Section>
        </main>

        <div className="no-print">
          <Footer />
        </div>
      </div>
    </div>
  );
}

function Section({
  title, children, last = false,
}: { title: string; children: React.ReactNode; last?: boolean }) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <section aria-labelledby={id} className={last ? "" : "mb-9 pb-9 border-b border-border"}>
      <h2 id={id} className="label mb-4">{title}</h2>
      {children}
    </section>
  );
}
