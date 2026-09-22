"use client";

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
  return (
    <div
      id="ai-prototype"
      className={`${montserrat.variable} ${bebasNeue.variable} ${montserrat.className} prototype-canvas prototype-canvas--embed`}
      style={{ scrollMarginTop: 96 }}
    >
      <div className="prototype-desktop-gate" role="status">
        <p className="prototype-desktop-gate__eyebrow">Interactive prototype</p>
        <h1 className="prototype-desktop-gate__title">Open this on a desktop</h1>
        <p className="prototype-desktop-gate__body">
          The phone mockup and controls sit side by side, so they need a wider
          screen. Come back on a laptop to try the flows.
        </p>
      </div>
      <div className="prototype-desktop-gate__content">
        <PrototypeFlow />
      </div>
    </div>
  );
}
