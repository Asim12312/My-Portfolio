import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muhammad Asim — Software Engineer & AI Engineer";

/* Keep in sync with `--brand` (dark) in app/globals.css. */
const ACCENT = "#3ddc97";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background: "#0a0a0c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#f4f3f1" }}>
            {PROFILE.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "9px 20px",
              borderRadius: 999,
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Open to Software / AI Engineer roles
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 800, color: "#f4f3f1", lineHeight: 1.05, letterSpacing: -3 }}>
            I build the parts that
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 800, color: ACCENT, lineHeight: 1.05, letterSpacing: -3 }}>
            have to keep working.
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#a1a1ad", marginTop: 26, maxWidth: 900, lineHeight: 1.45 }}>
            Software Engineer at VentureDive · RAG pipelines, AI agents and full-stack
            product engineering.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 21, color: "#a1a1ad" }}>
          {[
            "Mohasib — live SaaS",
            "Next.js · Node · Python · AWS",
            "BS Software Eng · 3.61 CGPA",
            "Lahore · Remote",
          ].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 34 }}>
              {i > 0 && <span style={{ color: "#3a3a44" }}>/</span>}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
