import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURED_PROJECTS, PROFILE, SITE_URL, getProject } from "@/lib/content";
import { Blobs, Nav } from "@/app/components/portfolio/Chrome";
import { Footer } from "@/app/components/portfolio/Footer";
import { Diagram } from "@/app/components/portfolio/Diagram";
import { Shots } from "@/app/components/portfolio/Shots";
import { ArrowIcon, ExternalIcon, GithubIcon } from "@/app/components/portfolio/icons";

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Case study not found" };

  const description = `${project.tagline}. ${project.desc}`.slice(0, 300);

  return {
    title: `${project.title} — case study`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/${project.slug}`,
      title: `${project.title} — case study · ${PROFILE.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — case study · ${PROFILE.name}`,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.featured) notFound();

  const index = FEATURED_PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = FEATURED_PROJECTS[(index + 1) % FEATURED_PROJECTS.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — ${project.tagline}`,
    description: project.desc,
    url: `${SITE_URL}/work/${project.slug}`,
    author: { "@type": "Person", name: PROFILE.name, url: SITE_URL },
    keywords: project.pills.join(", "),
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Blobs />
      <div className="relative z-10">
        <a href="#case-study" className="skip-link">Skip to case study</a>
        <Nav />

        {/* max-w-3xl keeps the reading column near 68ch — the previous 4xl let
            paragraphs run to ~95 characters, which is where lines get lost. */}
        <main id="case-study" className="px-6 sm:px-10 pt-32 pb-20 max-w-3xl mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <span aria-hidden>←</span> All work
          </Link>

          <header className="mb-14">
            <p className="tag tag-brand mb-5">{project.status}</p>

            <h1 className="font-display font-extrabold text-[clamp(2.4rem,7vw,4rem)] leading-[1.02] mb-4">
              {project.title}
            </h1>
            <p className="lead mb-9">{project.tagline}</p>

            <dl className="divide-y divide-border border-y border-border mb-8">
              {[
                { k: "My role", v: project.role },
                { k: "Timeline", v: project.timeline },
                { k: "Team", v: project.team },
              ].map((row) => (
                <div key={row.k} className="grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-6 py-3.5">
                  <dt className="label sm:pt-0.5">{row.k}</dt>
                  <dd className="text-[15px] text-foreground leading-relaxed min-w-0">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-2.5">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <ExternalIcon />
                  Visit live site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GithubIcon />
                  Source code
                </a>
              )}
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
                className="btn btn-ghost"
              >
                Ask me about this
              </a>
            </div>
          </header>

          {project.impact && (
            <section className="mb-14" aria-labelledby="outcome">
              <h2 id="outcome" className="sr-only">Outcome</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-y border-border py-6">
                {project.impact.map((m) => (
                  <div key={m.label} className="min-w-0">
                    <dt className="font-display font-bold text-xl leading-none text-foreground mb-2">
                      {m.value}
                    </dt>
                    <dd className="text-[12px] text-muted-foreground leading-snug">{m.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Renders only when the project has screenshots. */}
          <Shots media={project.media} />

          {project.context && (
            <Block title="Context" n="01">
              <p>{project.context}</p>
            </Block>
          )}

          {project.problem && (
            <Block title="The problem" n="02">
              <ol className="space-y-4 list-none">
                {project.problem.map((p, i) => (
                  <li key={i} className="flex gap-4 min-w-0">
                    <span aria-hidden className="font-mono text-[13px] text-brand shrink-0 pt-1 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {project.approach && (
            <Block title="How I approached it" n="03">
              <div className="space-y-9">
                {project.approach.map((s) => (
                  <div key={s.heading} className="min-w-0">
                    <h3 className="font-display font-bold text-[19px] text-foreground mb-3 leading-snug">
                      {s.heading}
                    </h3>
                    <div className="space-y-3.5">
                      {s.body.map((b, i) => (
                        <p key={i}>{b}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.architecture && (
            <Block title="Architecture" n="04" wide>
              {project.diagram && (
                <div className="mb-8">
                  <Diagram diagram={project.diagram} />
                </div>
              )}
              <dl className="divide-y divide-border border-y border-border">
                {project.architecture.map((row) => (
                  <div key={row.label} className="grid sm:grid-cols-[110px_1fr] gap-1 sm:gap-6 py-3.5">
                    <dt className="label sm:pt-1">{row.label}</dt>
                    {/* break-words stops long tech strings from pushing the grid wide */}
                    <dd className="text-[15px] text-foreground leading-relaxed min-w-0 break-words">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {project.decisions && (
            <Block title="Trade-offs I chose" n="05" wide>
              <div className="divide-y divide-border border-y border-border">
                {project.decisions.map((d) => (
                  <div key={d.choice} className="py-6 min-w-0">
                    <p className="font-display font-bold text-[17px] text-foreground mb-2.5 leading-snug">
                      {d.choice}
                    </p>
                    <p className="text-[15px] text-prose leading-relaxed">
                      {/* Not `.label` — that utility sets its own colour, and
                          which of the two wins would depend on source order. */}
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand mr-2">
                        Why
                      </span>
                      {d.why}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.learned && (
            <Block title="What I took away" n="06">
              <ul className="space-y-4 list-none">
                {project.learned.map((l, i) => (
                  <li key={i} className="flex gap-4 min-w-0">
                    <span aria-hidden className="shrink-0 mt-[0.7em] h-px w-3 bg-border" />
                    <span className="min-w-0">{l}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <section className="mb-14" aria-labelledby="stack">
            <h2 id="stack" className="label mb-4">Stack</h2>
            <ul className="flex flex-wrap gap-1.5">
              {project.pills.map((pill) => (
                <li key={pill} className="tag">{pill}</li>
              ))}
            </ul>
          </section>

          <nav aria-label="More work" className="border-t border-border pt-8">
            <p className="label mb-4">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between gap-6 py-2 min-w-0"
            >
              <span className="min-w-0">
                <span className="block font-display font-bold text-2xl text-foreground group-hover:text-brand transition-colors">
                  {next.title}
                </span>
                <span className="block text-[15px] text-muted-foreground mt-1">{next.tagline}</span>
              </span>
              <span className="text-muted-foreground group-hover:text-brand transition-colors shrink-0">
                <ArrowIcon size={20} />
              </span>
            </Link>
          </nav>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function Block({
  title, n, children, wide = false,
}: {
  title: string;
  n: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <section className="mb-14" aria-labelledby={id}>
      <div className="flex items-baseline gap-3 mb-5">
        <span aria-hidden className="font-mono text-[12px] text-muted-foreground tabular-nums">{n}</span>
        <h2 id={id} className="font-display font-bold text-[clamp(1.5rem,3.2vw,2rem)] text-foreground leading-tight">
          {title}
        </h2>
      </div>
      {/* `wide` opts out of the 68ch measure for tables and card lists, which
          read worse when squeezed than prose does when widened. */}
      <div className={wide ? "text-[15px] text-prose leading-relaxed" : "prose-block"}>
        {children}
      </div>
    </section>
  );
}
