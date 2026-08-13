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
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#fdb913",
            }}
          />
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
