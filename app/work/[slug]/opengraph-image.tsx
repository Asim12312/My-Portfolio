import { ImageResponse } from "next/og";
import { FEATURED_PROJECTS, PROFILE, getProject } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Engineering case study by Muhammad Asim";

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
}

/* next/og can't read CSS variables, so the brand accent is inlined here.
   Keep in sync with `--brand` (dark) in app/globals.css. */
const ACCENT = "#3ddc97";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const accent = ACCENT;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #030712 0%, #0f1b3d 55%, #0a1f2e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 800, color: "#f9fafb", letterSpacing: 2 }}>
            <span style={{ color: "#4ade80" }}>MA</span>
            <span style={{ color: "#22d3ee", margin: "0 4px" }}>/</span>
            <span>dev</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: `2px solid ${accent}`,
              color: accent,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            CASE STUDY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 900, color: "#f9fafb", lineHeight: 1 }}>
            {project?.title ?? "Case study"}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: accent, marginTop: 20, maxWidth: 980 }}>
            {project?.tagline ?? ""}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9ca3af", marginTop: 18 }}>
            {project?.status ?? ""} · {project?.timeline ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {(project?.pills ?? []).slice(0, 4).map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 12,
                  border: "2px solid #374151",
                  color: "#f9fafb",
                  fontSize: 22,
                  fontWeight: 700,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {pill}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9ca3af" }}>{PROFILE.name}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
