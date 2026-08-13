import { ImageResponse } from "next/og";

export const alt = "Contourna — business manuals, done automatically";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so the site has a real share card without shipping a
 * hand-made PNG that drifts from the brand colours in `globals.css`.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#373012",
          padding: 80,
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Inline copy of public/images/contourna-mark.svg — ImageResponse cannot load local files */}
          <svg width={56} height={56} viewBox="0 0 48 48">
            <rect fill="#fdb913" width="48" height="48" rx="9" />
            <path
              fill="#414042"
              d="M35.3,24A15.08,15.08,0,1,0,20.23,39.08h7.53V31.53H20.23A7.53,7.53,0,1,1,27.76,24Z"
            />
            <rect fill="#a8a8a8" x="35.32" y="31.53" width="7.53" height="7.54" />
          </svg>
          <div style={{ fontSize: 30, letterSpacing: 6, color: "#faf7ef" }}>CONTOURNA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.1 }}>
            <div>All your business manuals.</div>
            <div style={{ color: "#fdb913" }}>Done automatically.</div>
          </div>
          <div style={{ fontSize: 30, color: "rgba(250, 247, 239, 0.72)", maxWidth: 880 }}>
            AI-assisted document control: draft, review, publish, and prove it with records.
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "rgba(250, 247, 239, 0.6)" }}>
          <div>Policies</div>
          <div>Procedures</div>
          <div>Work instructions</div>
          <div>Forms &amp; records</div>
        </div>
      </div>
    ),
    size,
  );
}
