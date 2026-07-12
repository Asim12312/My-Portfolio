import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muhammad Asim — Software Engineer & AI Engineer";

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
          padding: "72px",
          background: "linear-gradient(135deg, #030712 0%, #0f1b3d 55%, #0a1f2e 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "#f9fafb",
              letterSpacing: 2,
            }}
          >
            <span style={{ color: "#4ade80" }}>MA</span>
            <span style={{ color: "#22d3ee", margin: "0 4px" }}>/</span>
            <span>dev</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid #4ade80",
              color: "#4ade80",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ● SWE Intern @ VentureDive
          </div>
        </div>

        {/* name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 900, color: "#f9fafb", lineHeight: 1 }}>
            Muhammad Asim
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#22d3ee", marginTop: 18 }}>
            Software Engineer · AI Engineer
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9ca3af", marginTop: 14 }}>
            RAG &amp; Agents · Next.js · MERN · Python · AWS — building products that ship
          </div>
        </div>

        {/* tag row */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            ["RAG / Agentic AI", "#f472b6"],
            ["Full-Stack", "#4ade80"],
            ["Live SaaS: mohasib.online", "#22d3ee"],
            ["3.60 GPA", "#facc15"],
          ].map(([label, color]) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 14,
                border: "2px solid #374151",
                color: "#f9fafb",
                fontSize: 24,
                fontWeight: 700,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span style={{ color: color as string, marginRight: 10 }}>●</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
