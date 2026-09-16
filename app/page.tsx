"use client";

import { useEffect, useState } from "react";
import {
  AboutProductSection,
  ProjectThumbnailSection,
} from "@/components/CaseSection";
import { sections } from "@/content/case";

const green = "#16c45a";
const ink = "#282828";
const mute = "#969696";
const wash = "#f4f4f4";
const board = "#ffffff";
const barIdle = "#c8c8c8";
const contentWidth = "min(920px, calc(100% - 40px))";

export default function Page() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.2, 0.4, 0.6],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: board,
        color: ink,
        fontFamily: "inherit",
        margin: 0,
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
            background: wash,
            borderRadius: 999,
            padding: "10px 14px 10px 22px",
            minHeight: 52,
          }}
        >
          <a
            href="#top"
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: ink,
              textDecoration: "none",
              letterSpacing: "-0.03em",
            }}
          >
            matiks
          </a>
          <span
            className="nav-mid"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: mute,
            }}
          >
            Referral case study
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: board,
              background: ink,
              borderRadius: 999,
              padding: "10px 16px",
              lineHeight: 1,
            }}
          >
            Concept
          </span>
        </nav>
      </header>

      <nav
        aria-label="Section map"
        className="scrollspy"
        style={{
          position: "fixed",
          left: 18,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              title={s.label}
              aria-label={s.label}
              aria-current={active ? "true" : undefined}
              style={{
                width: active ? 34 : 22,
                height: 4,
                borderRadius: 999,
                background: active ? green : barIdle,
                boxShadow: active ? `0 0 12px ${green}88` : "none",
                display: "block",
              }}
            />
          );
        })}
      </nav>

      <div
        style={{
          width: contentWidth,
          margin: "0 auto",
          padding: "0 0 96px",
        }}
      >
        <ProjectThumbnailSection />
        <AboutProductSection />
      </div>
    </div>
  );
}
