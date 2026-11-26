"use client";

import {
  CaseStudyBody,
  ProjectThumbnailSection,
} from "@/components/CaseSection";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import SiteFooter from "@/components/SiteFooter";

const ink = "#282828";
const mute = "#555555";
const board = "#f5f5f7";
const contentWidth = "min(920px, calc(100% - 40px))";

export default function Page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: board,
        color: ink,
        fontFamily: "inherit",
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <header
        className="site-header"
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <nav
          aria-label="Case study"
          style={{
            width: contentWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            background: "#ffffff",
            borderRadius: 999,
            padding: "10px 14px 10px 22px",
            minHeight: 52,
          }}
        >
          <a
            href="#thumbnail"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: ink,
              textDecoration: "none",
              letterSpacing: "-0.03em",
            }}
          >
            Matiks (Referral)
          </a>
          <span
            className="nav-mid"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: mute,
            }}
          >
            Concept case study
          </span>
          <a href="#ai-prototype" className="nav-cta">
            AI-Prototype
          </a>
          <span
            className="nav-desktop-tag"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: mute,
              background: "#ebebef",
              borderRadius: 999,
              padding: "8px 12px",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Desktop View Recommended
          </span>
        </nav>
      </header>

      <ScrollSpyNav />

      <ProjectThumbnailSection />
      <div
        style={{
          width: contentWidth,
          margin: "0 auto",
          padding: "0 0 96px",
        }}
      >
        <CaseStudyBody />
      </div>
      <SiteFooter />
    </div>
  );
}
