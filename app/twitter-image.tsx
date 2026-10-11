import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — personal site`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f3f1",
          color: "#121212",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a8a8a",
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 28, color: "#5e5e5e", maxWidth: 820 }}>
            Purdue University · Computer Science, Data Science, and Mathematics
          </div>
        </div>
      </div>
    ),
    size,
  );
}
