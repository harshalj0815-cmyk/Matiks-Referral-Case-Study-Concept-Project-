"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/case";

const ink = "#282828";
const barIdle = "#c8c8c8";
const barActive = "#8a8a8a";

export function ScrollSpyNav() {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const updateActive = () => {
      const marker = window.innerHeight * 0.28;
      let current = sections[0].id;

      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top;
        if (top <= marker) current = section.id;
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const goTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Section map"
      className="scrollspy"
      style={{
        position: "fixed",
        left: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {sections.map((s) => {
        const active = s.id === activeId;
        const hovered = s.id === hoveredId;

        return (
          <div
            key={s.id}
            className="scrollspy-item"
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              minHeight: 18,
              paddingRight: 12,
            }}
          >
            <button
              type="button"
              aria-label={s.label}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(s.id)}
              style={{
                margin: 0,
                padding: "7px 0",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: active || hovered ? 34 : 22,
                  height: 4,
                  borderRadius: 999,
                  background: active ? barActive : barIdle,
                  display: "block",
                  transition: "width 0.2s ease, background 0.2s ease",
                }}
              />
            </button>

            <div
              role="tooltip"
              aria-hidden={!hovered}
              onClick={() => goTo(s.id)}
              style={{
                position: "absolute",
                left: 40,
                top: "50%",
                transform: hovered
                  ? "translateY(-50%) translateX(0)"
                  : "translateY(-50%) translateX(-4px)",
                opacity: hovered ? 1 : 0,
                pointerEvents: hovered ? "auto" : "none",
                transition: "opacity 0.15s ease, transform 0.15s ease",
                background: "#ffffff",
                borderRadius: 16,
                padding: "12px 16px",
                minWidth: 140,
                boxShadow: "0 8px 24px rgba(40, 40, 40, 0.08)",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: ink,
                }}
              >
                {s.label}
              </p>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
