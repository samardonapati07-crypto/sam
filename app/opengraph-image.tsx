import { ImageResponse } from "next/og";

export const alt = "AAROP agentic loop demo, customized and maintained by Samar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          width: "100%", height: "100%", padding: "80px",
          background: "#0b1020", color: "#f3f6ff", fontFamily: "sans-serif",
          borderLeft: "12px solid #60a5fa",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#7dd3fc", letterSpacing: 4 }}>
          MULTI-AGENT ORCHESTRATION
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 30 }}>
          AAROP
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#b7c7e3", marginTop: 20 }}>
          Perceive / Plan / Act / Observe / Reflect / Adapt
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 60 }}>
          Customized and maintained by Samar
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#7dd3fc", marginTop: 16 }}>
          github.com/samardonapati07-crypto/sam
        </div>
      </div>
    ),
    size,
  );
}
