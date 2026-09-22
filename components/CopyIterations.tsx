"use client";

import { useEffect, useState } from "react";
import { HyperText } from "@/components/HyperText";
import type { CopyVariant } from "@/content/iterations";

const ink = "#282828";
const mute = "#555555";
const CYCLE_MS = 4800;
const COPY_WIDTH = 260;
/** Fixed body height — longest variants + scramble can't grow the board. */
const COPY_BODY_HEIGHT = 152;

export function CopyIterations({
  variants,
  autoplay = true,
  autoplayOffset = 0,
}: {
  variants: readonly CopyVariant[];
  autoplay?: boolean;
  autoplayOffset?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = variants.length;
  const active = variants[index] ?? variants[0];

  useEffect(() => {
    if (!autoplay || count < 2 || paused) return;
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % count);
      }, CYCLE_MS);
    }, autoplayOffset);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [autoplay, autoplayOffset, count, paused]);

  if (!active) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        width: COPY_WIDTH,
        maxWidth: "100%",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          height: COPY_BODY_HEIGHT,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <HyperText
            as="h3"
            duration={900}
            animateOnHover={false}
            style={{
              margin: "0 0 8px",
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: ink,
            }}
          >
            {active.title}
          </HyperText>
          <HyperText
            as="p"
            duration={1100}
            delay={80}
            animateOnHover={false}
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: mute,
            }}
          >
            {active.description}
          </HyperText>
        </div>
      </div>
      {count > 1 ? (
        <p
          aria-live="polite"
          style={{
            margin: "10px 0 0",
            fontSize: 11,
            fontWeight: 600,
            color: mute,
            letterSpacing: "-0.01em",
          }}
        >
          {index + 1} / {count}
        </p>
      ) : null}
    </div>
  );
}
