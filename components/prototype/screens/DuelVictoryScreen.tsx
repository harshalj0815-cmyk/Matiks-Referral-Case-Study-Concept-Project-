"use client";

import { useEffect, useState } from "react";
import CloseGameSlideUp from "@/components/prototype/screens/CloseGameSlideUp";
import { MatiksButton, MatiksChip, MatiksToast } from "@/components/prototype/ui";


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

type DuelVictoryScreenProps = {
  /** Pass the Thrill slide-up hero art */
  sheetArtSrc?: string;
  /** How slide-up art fills the slot — natural keeps Paper framing */
  sheetArtFit?: "cover" | "natural";
  sheetTitle?: string;
  sheetBodyBefore?: string;
  /** When false, skip the timed friend toast (flow controls handle toasts) */
  autoToast?: boolean;
};

export default function DuelVictoryScreen({
  sheetArtSrc = "/prototype/matiks/elements/close-game-slide-up.png",
  sheetArtFit = "natural",
  sheetTitle,
  sheetBodyBefore,
  autoToast = true,
}: DuelVictoryScreenProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [friendToast, setFriendToast] = useState(false);

  useEffect(() => {
    const toastTimer = autoToast
      ? window.setTimeout(() => setFriendToast(true), 700)
      : undefined;
    const sheetTimer = window.setTimeout(() => setSheetOpen(true), 2000);
    return () => {
      if (toastTimer !== undefined) window.clearTimeout(toastTimer);
      window.clearTimeout(sheetTimer);
    };
  }, [autoToast]);

  const winner = {
    score: 3,
    name: "harshal_ja...",
    rating: 1215,
    delta: 12,
    avatar: "/prototype/matiks/elements/avatar-suyash.jpg",
  };
  const loser = {
    score: 2,
    name: "Mathelete",
    rating: 1224,
    delta: -12,
    avatar: "/prototype/matiks/elements/avatar-referral-2.jpg",
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

      {friendToast && !sheetOpen ? (
        <div className="duel-victory__toast">
          <MatiksToast variant="friend" />
        </div>
      ) : null}

      <div className="duel-victory__top">
        <MatiksChip
          leadingIcon={
            <img
              src="/prototype/matiks/icons/caret-left.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Home
        </MatiksChip>
        <MatiksChip
          iconOnly
          aria-label="Share"
          leadingIcon={
            <img
              src="/prototype/matiks/icons/share-bend.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Share
        </MatiksChip>
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
                  <img
                    className="duel-victory__avatar"
                    src={winner.avatar}
                    alt=""
                  />
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
                  <img
                    className="duel-victory__avatar"
                    src={loser.avatar}
                    alt=""
                  />
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
          <MatiksButton variant="secondary" fullWidth size="md">
            Rematch
          </MatiksButton>
          <MatiksButton variant="primary" fullWidth size="md">
            New Duel
          </MatiksButton>
        </div>
      </div>

      <div className="duel-victory__feedback">
        <MatiksChip
          iconOnly
          aria-label="Send feedback"
          leadingIcon={
            <img
              src="/prototype/matiks/icons/smiley.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Feedback
        </MatiksChip>
      </div>

      <CloseGameSlideUp
        open={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        variant="duel"
        artSrc={sheetArtSrc}
        artFit={sheetArtFit}
        title={sheetTitle}
        bodyBefore={sheetBodyBefore}
      />
    </div>
  );
}
