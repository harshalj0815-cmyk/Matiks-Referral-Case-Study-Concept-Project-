"use client";

import { useState, type ReactNode } from "react";
import { CopyIterations } from "@/components/CopyIterations";
import { IterationCarousel } from "@/components/IterationCarousel";
import { copyVariants, iterationGroups } from "@/content/iterations";

const mute = "#555555";
const ink = "#282828";

function GroupLabel({ children }: { children: string }) {
  return (
    <p
      style={{
        margin: "0 0 8px",
        fontSize: 11,
        fontWeight: 600,
        color: mute,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </p>
  );
}

function Slot({
  title,
  children,
  pad = 26,
}: {
  title: string;
  children: ReactNode;
  pad?: number;
}) {
  return (
    <div style={{ paddingLeft: pad, paddingRight: pad, minWidth: 0 }}>
      <GroupLabel>{title}</GroupLabel>
      {children}
    </div>
  );
}

function RotateIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ opacity: on ? 1 : 0.55 }}
    >
      <path
        d="M11.5 4.2A5.2 5.2 0 0 0 3.4 3.6M2.5 9.8a5.2 5.2 0 0 0 8.1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 1.8v2.6H8.9M2.5 12.2V9.6h2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Component explorations board — shared by /iterations and the case landing. */
export function IterationsBoard({
  className = "iterations-board",
}: {
  className?: string;
}) {
  const { card, card2, tile, cta, toast, buttons } = iterationGroups;
  const [rotateOn, setRotateOn] = useState(true);

  return (
    <>
      <div className="iter-board-wrap" style={{ width: "100%" }}>
        <div className="iter-board__gate" role="status">
          <p className="iter-board__gate-eyebrow">Design iterations</p>
          <h2 className="iter-board__gate-title">Open this on a desktop</h2>
          <p className="iter-board__gate-body">
            The component board needs a wider screen to browse cards, toasts,
            and copy side by side. Come back on a laptop to explore the
            iterations.
          </p>
        </div>

        <div className="iter-board__desktop">
          <div className="iter-board__toolbar">
            <button
              type="button"
              className={`iter-board__toggle${rotateOn ? " iter-board__toggle--on" : ""}`}
              aria-pressed={rotateOn}
              aria-label={
                rotateOn
                  ? "Rotate on — click to stop autoplay"
                  : "Rotate off — click to resume autoplay"
              }
              onClick={() => setRotateOn((v) => !v)}
            >
              <span className="iter-board__toggle-copy">
                <RotateIcon on={rotateOn} />
                Rotate
              </span>
              <span className="iter-board__switch" aria-hidden>
                <span className="iter-board__switch-knob" />
              </span>
            </button>
          </div>

          <div
            className={className}
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "clamp(16px, 4.5vw, 48px)",
              boxSizing: "border-box",
              padding: "28px 32px",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gridTemplateRows: "auto auto",
              columnGap: 48,
              rowGap: 20,
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "stretch",
              overflow: "hidden",
            }}
          >
        <div
          style={{
            gridColumn: 1,
            gridRow: "1 / 3",
            alignSelf: "start",
            justifySelf: "start",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minWidth: 0,
          }}
        >
          <Slot title={card.title} pad={16}>
            <IterationCarousel
              slides={[...card.slides]}
              label={card.title}
              frameWidth={card.frameWidth}
              autoplay={rotateOn}
              autoplayOffset={0}
              arrowInset={-22}
            />
          </Slot>
          <Slot title={toast.title} pad={16}>
            <IterationCarousel
              slides={[...toast.slides]}
              label={toast.title}
              frameWidth={toast.frameWidth}
              autoplay={rotateOn}
              autoplayOffset={3500}
              arrowInset={-22}
            />
          </Slot>
        </div>

        <div
          style={{
            gridColumn: 2,
            gridRow: 1,
            alignSelf: "start",
            justifySelf: "start",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "20px 36px",
            minWidth: 0,
            marginLeft: -20,
          }}
        >
          <Slot title={tile.title} pad={16}>
            <IterationCarousel
              slides={[...tile.slides]}
              label={tile.title}
              frameWidth={tile.frameWidth}
              autoplay={rotateOn}
              autoplayOffset={700}
            />
          </Slot>
          <Slot title={buttons.title} pad={20}>
            <IterationCarousel
              slides={[...buttons.slides]}
              label={buttons.title}
              frameWidth={buttons.frameWidth}
              arrowInset={-20}
              autoplay={rotateOn}
              autoplayOffset={1400}
            />
          </Slot>
        </div>

        <div
          style={{
            gridColumn: 2,
            gridRow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 20,
            minWidth: 0,
            width: "100%",
            marginLeft: -56,
          }}
        >
          {/* Card variants | Copy side-by-side; shift left so both fit */}
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "flex-start",
              gap: 16,
              minWidth: 0,
              alignSelf: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <Slot title={card2.title} pad={8}>
                <IterationCarousel
                  slides={[...card2.slides]}
                  label={card2.title}
                  frameWidth={card2.frameWidth}
                  autoplay={rotateOn}
                  autoplayOffset={2100}
                />
              </Slot>
            </div>
            <div style={{ flexShrink: 0, marginLeft: 48 }}>
              <Slot title="Copy" pad={8}>
                <CopyIterations
                  variants={copyVariants}
                  autoplay={rotateOn}
                  autoplayOffset={3200}
                />
              </Slot>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              boxSizing: "border-box",
              paddingRight: 8,
            }}
          >
            <Slot title={cta.title} pad={12}>
              <IterationCarousel
                slides={[...cta.slides]}
                label={cta.title}
                frameWidth={cta.frameWidth}
                autoplay={rotateOn}
                autoplayOffset={2800}
              />
            </Slot>
          </div>
        </div>
      </div>
      </div>
      </div>

      <style>{`
        .iter-board-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .iter-board__gate {
          display: none;
          box-sizing: border-box;
          width: min(360px, 100%);
          margin: 0 auto;
          padding: 8px 4px;
          text-align: center;
        }
        .iter-board__gate-eyebrow {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #16c45a;
        }
        .iter-board__gate-title {
          margin: 0 0 12px;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: ${ink};
        }
        .iter-board__gate-body {
          margin: 0;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.55;
          color: ${mute};
        }
        .iter-board__desktop {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .iter-board__toolbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
        }
        .iter-board__toggle {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          height: 36px;
          min-width: 132px;
          padding: 0 10px 0 14px;
          border: none;
          border-radius: 999px;
          background: #f0f0f2;
          color: ${mute};
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
        }
        .iter-board__toggle-copy {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .iter-board__switch {
          position: relative;
          flex: 0 0 auto;
          width: 34px;
          height: 20px;
          border-radius: 999px;
          background: #c8c8c8;
          transition: background 160ms ease;
        }
        .iter-board__switch-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #ffffff;
          transition: transform 160ms ease;
        }
        .iter-board__toggle--on {
          color: ${ink};
          background: #f0f0f2;
        }
        .iter-board__toggle--on .iter-board__switch {
          background: ${ink};
        }
        .iter-board__toggle--on .iter-board__switch-knob {
          transform: translateX(14px);
        }
        .iter-board__toggle:focus-visible {
          outline: 2px solid #16c45a;
          outline-offset: 2px;
        }
        @media (max-width: 640px) {
          .iter-board__gate {
            display: block;
          }
          .iter-board__desktop {
            display: none;
          }
        }
        @media (min-width: 641px) and (max-width: 820px) {
          .${className} {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            align-content: start !important;
            overflow: auto !important;
            row-gap: 16px !important;
          }
          .${className} > div {
            grid-column: 1 !important;
            grid-row: auto !important;
            justify-self: start !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
