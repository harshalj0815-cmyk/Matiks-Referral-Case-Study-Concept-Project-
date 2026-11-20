"use client";

import { useEffect, useRef } from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import PrototypeFlow from "@/components/prototype/PrototypeFlow";
import "@/components/prototype/prototype.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
});

/** Interactive Matiks prototype, sized for the case study Final design section. */
export function EmbeddedPrototype() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.4;
        if (visible && !inViewRef.current) {
          inViewRef.current = true;
          window.dispatchEvent(new Event("matiks-prototype-reset"));
        } else if (!entry.isIntersecting) {
          inViewRef.current = false;
        }
      },
      { threshold: [0, 0.4, 0.6] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      id="ai-prototype"
      className={`${montserrat.variable} ${bebasNeue.variable} ${montserrat.className} prototype-canvas prototype-canvas--embed`}
      style={{ scrollMarginTop: 96 }}
    >
      <div className="prototype-desktop-gate" role="status">
        <p className="prototype-desktop-gate__eyebrow">Interactive prototype</p>
        <h1 className="prototype-desktop-gate__title">Open this on a desktop</h1>
        <p className="prototype-desktop-gate__body">
          The phone mockup and controls sit side by side, so they need a wider
          screen. Come back on a laptop to try the flows. Screen inventory is
          also in <a href="/case.md">/case.md</a>.
        </p>
      </div>
      <div className="sr-only">
        Interactive prototype flows: duel victory and puzzle completion hosts;
        excite-moment invite overlays for close win, level-up, and streak; pass
        it on for referred users; friend-arrived toast; track invites with 150
        XP progress; sending invite waiting state; invite fail and weak internet
        toasts. Concept only — no live KPI results. Full text at /case.md.
      </div>
      <div className="prototype-desktop-gate__content">
        <PrototypeFlow />
      </div>
    </div>
  );
}
