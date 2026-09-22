"use client";

import { IterationsBoard } from "@/components/IterationsBoard";

const ink = "#282828";
const board = "#f5f5f7";
const green = "#16c45a";

export default function IterationsBoardPage() {
  return (
    <div
      style={{
        height: "100dvh",
        background: board,
        color: ink,
        fontFamily: "inherit",
        margin: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px 24px",
      }}
    >
      <header
        style={{
          width: "min(1100px, 100%)",
          margin: "0 auto 16px",
          flexShrink: 0,
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: green,
            lineHeight: 1.1,
          }}
        >
          Design iterations
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: ink,
          }}
        >
          Component explorations
        </h1>
      </header>

      <div
        style={{
          width: "min(1100px, 100%)",
          margin: "0 auto",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, minHeight: 0, display: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "auto",
            }}
          >
            <IterationsBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
