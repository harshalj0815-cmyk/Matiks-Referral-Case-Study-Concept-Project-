"use client";

import { useEffect, useState } from "react";
import CloseGameSlideUp from "@/components/prototype/screens/CloseGameSlideUp";

function avatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 58% 42%)`;
}

function initials(name: string) {
  const parts = name.replace(/\./g, " ").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`;
}

function RankUpIcon() {
  return (
    <svg
      className="duel-victory__rank-icon"
      width="10"
      height="9"
      viewBox="0 0 10 9"
      aria-hidden
    >
      <path
        d="M5 1.2L9.2 7.8H0.8L5 1.2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RankDownIcon() {
  return (
    <svg
      className="duel-victory__rank-icon"
      width="10"
      height="9"
      viewBox="0 0 10 9"
      aria-hidden
    >
      <path
        d="M5 7.8L0.8 1.2H9.2L5 7.8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DuelVictoryScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSheetOpen(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const winner = {
    score: 3,
    name: "harshal_ja...",
    rating: 1215,
    delta: 12,
  };
  const loser = {
    score: 2,
    name: "Mathelete",
    rating: 1224,
    delta: -12,
  };

  return (
    <div className="duel-victory">
        <div className="duel-victory__flair-spin" aria-hidden>
          <img
            className="duel-victory__flair"
            src="/prototype/matiks/elements/flair-duel-victory.png"
            alt=""
          />
        </div>

      <div className="duel-victory__top">
        <button type="button" className="duel-victory__chip">
          <img
            src="/prototype/matiks/icons/caret-left.svg"
            alt=""
            aria-hidden
          />
          Home
        </button>
        <button type="button" className="duel-victory__icon-btn" aria-label="Share">
          <img
            src="/prototype/matiks/icons/arrow-bend-up-right.svg"
            alt=""
            aria-hidden
          />
        </button>
      </div>

      <div className="duel-victory__stage">
        <div className="duel-victory__card-stack">
          <img
            className="duel-victory__mascot"
            src="/prototype/matiks/elements/duel-victory-mascot.png"
            alt=""
            aria-hidden
          />

          <section className="duel-victory__card" aria-label="Victory summary">
            <h1 className="duel-victory__title">Victory</h1>

            <div className="duel-victory__score-row">
              <div className="duel-victory__side">
                <div className="duel-victory__score duel-victory__score--win">
                  {winner.score}
                </div>
                <div className="duel-victory__user-pill">
                  <span
                    className="duel-victory__avatar"
                    style={{ background: avatarColor(winner.name) }}
                  >
                    {initials(winner.name)}
                  </span>
                  <span className="duel-victory__username">{winner.name}</span>
                </div>
                <div className="duel-victory__rating">
                  <span>({winner.rating})</span>
                  <span className="duel-victory__delta--up">
                    <RankUpIcon />
                    {winner.delta}
                  </span>
                </div>
              </div>

              <div className="duel-victory__vs">vs</div>

              <div className="duel-victory__side">
                <div className="duel-victory__score duel-victory__score--lose">
                  {loser.score}
                </div>
                <div className="duel-victory__user-pill">
                  <span
                    className="duel-victory__avatar"
                    style={{ background: avatarColor(loser.name) }}
                  >
                    {initials(loser.name)}
                  </span>
                  <span className="duel-victory__username">{loser.name}</span>
                </div>
                <div className="duel-victory__rating">
                  <span>({loser.rating})</span>
                  <span className="duel-victory__delta--down">
                    <RankDownIcon />
                    {Math.abs(loser.delta)}
                  </span>
                </div>
              </div>
            </div>

            <div className="duel-victory__stats">
              <div className="duel-victory__stat">
                <span className="duel-victory__stat-label">Total Rating</span>
                <span className="duel-victory__stat-value">
                  1215
                  <span className="duel-victory__stat-delta">+12</span>
                </span>
              </div>
              <div className="duel-victory__stat-divider" aria-hidden />
              <div className="duel-victory__stat">
                <span className="duel-victory__stat-label">Total XP</span>
                <span className="duel-victory__stat-value">
                  100
                  <span className="duel-victory__stat-delta">+20</span>
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="duel-victory__actions">
          <button type="button" className="duel-victory__btn duel-victory__btn--secondary">
            Rematch
          </button>
          <button type="button" className="duel-victory__btn duel-victory__btn--primary">
            New Duel
          </button>
        </div>
      </div>

      <button
        type="button"
        className="duel-victory__feedback"
        aria-label="Send feedback"
      >
        <span className="duel-victory__feedback-window">
          <img src="/prototype/matiks/icons/smiley.svg" alt="" aria-hidden />
        </span>
      </button>

      <CloseGameSlideUp open={sheetOpen} onDismiss={() => setSheetOpen(false)} />
    </div>
  );
}
