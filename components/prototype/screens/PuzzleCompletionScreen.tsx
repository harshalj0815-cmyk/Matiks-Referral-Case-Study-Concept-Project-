"use client";

import { useEffect, useRef, useState } from "react";
import {
  MatiksBadge,
  MatiksButton,
  MatiksChip,
  MatiksGameCard,
  MatiksTextLink,
} from "@/components/prototype/ui";
import CloseGameSlideUp from "@/components/prototype/screens/CloseGameSlideUp";
import type { InviteToastOutcome } from "@/components/prototype/screens/CloseGameSlideUp";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";

const PUZZLES = [
  {
    id: "easy-1",
    title: "Cross Math",
    difficulty: "easy" as const,
    imageSrc: "/prototype/matiks/elements/kenken-placeholder.png",
    progress: 0,
  },
  {
    id: "hard-1",
    title: "Ken-Ken",
    difficulty: "hard" as const,
    imageSrc: "/prototype/matiks/elements/kenken-hard.png",
    progress: 50,
  },
  {
    id: "easy-2",
    title: "Math Maze",
    difficulty: "easy" as const,
    imageSrc: "/prototype/matiks/elements/kenken-easy-2.png",
    progress: 0,
  },
];

export default function PuzzleCompletionScreen({
  inviteOutcome,
  onSuccessToastClick,
}: {
  inviteOutcome?: InviteToastOutcome | null;
  onSuccessToastClick?: () => void;
}) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const { animationsOn } = usePrototypePrefs();
  const [sheetOpen, setSheetOpen] = useState(!animationsOn);

  useEffect(() => {
    const row = cardsRef.current;
    if (!row) return;

    const center = () => {
      const card = row.querySelector<HTMLElement>("[data-card-center]");
      if (!card) return;
      card.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "instant",
      });
    };

    center();
    const frame = requestAnimationFrame(center);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!animationsOn) {
      setSheetOpen(true);
      return undefined;
    }

    // Sheet opens 1.5s after mount.
    const timer = window.setTimeout(() => setSheetOpen(true), 1500);
    return () => window.clearTimeout(timer);
  }, [animationsOn]);

  return (
    <div className="puzzle-complete">
      <div className="puzzle-complete__flair-spin" aria-hidden>
        <img
          className="puzzle-complete__flair"
          src="/prototype/matiks/elements/flair-duel-victory.png"
          alt=""
        />
      </div>

      <div className="puzzle-complete__top">
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
        <div className="puzzle-complete__top-right">
          <MatiksChip>Share on Feed</MatiksChip>
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
      </div>

      <div className="puzzle-complete__hero">
        <p className="puzzle-complete__average">
          Today&apos;s Average:
          <span className="puzzle-complete__average-time">02:24</span>
        </p>

        <div className="puzzle-complete__timer-wrap">
          <span className="puzzle-complete__timer-hinge puzzle-complete__timer-hinge--left" />
          <span className="puzzle-complete__timer-hinge puzzle-complete__timer-hinge--right" />
          <div className="puzzle-complete__timer-shell">
            <div className="puzzle-complete__timer-card">
              <div
                className="puzzle-complete__timer"
                aria-label="Time 00 minutes 50 seconds"
              >
                <span className="puzzle-complete__digit puzzle-complete__digit--mm">
                  00
                </span>
                <span className="puzzle-complete__colon" aria-hidden>
                  :
                </span>
                <span className="puzzle-complete__digit puzzle-complete__digit--ss">
                  50
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="puzzle-complete__record">
          <MatiksBadge tone="record">New Record</MatiksBadge>
          <p className="puzzle-complete__previous">
            Your pervious best 00:56
          </p>
        </div>
      </div>

      <div className="puzzle-complete__spacer" aria-hidden />

      <section className="puzzle-complete__more" aria-label="More puzzles">
        <div className="puzzle-complete__more-head">
          <h2 className="puzzle-complete__more-title">More Puzzles</h2>
          <MatiksTextLink
            trailingIcon={
              <img
                src="/prototype/matiks/icons/caret-right.svg"
                alt=""
                aria-hidden
              />
            }
          >
            View All
          </MatiksTextLink>
        </div>

        <div className="puzzle-complete__cards-shell">
          <div className="puzzle-complete__cards" ref={cardsRef}>
            {PUZZLES.map((puzzle, index) => (
              <MatiksGameCard
                key={puzzle.id}
                title={puzzle.title}
                difficulty={puzzle.difficulty}
                imageSrc={puzzle.imageSrc}
                progress={puzzle.progress}
                className="puzzle-complete__card"
                data-card-center={index === 1 ? true : undefined}
              />
            ))}
          </div>
          <div
            className="puzzle-complete__edge puzzle-complete__edge--left"
            aria-hidden
          />
          <div
            className="puzzle-complete__edge puzzle-complete__edge--right"
            aria-hidden
          />
        </div>
      </section>

      <div className="puzzle-complete__footer">
        <MatiksTextLink
          className="puzzle-complete__leaderboard"
          trailingIcon={
            <img
              src="/prototype/matiks/icons/caret-expand.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Leaderboard
        </MatiksTextLink>
        <div className="puzzle-complete__actions">
          <MatiksButton variant="secondary" size="md">
            View Solution
          </MatiksButton>
          <MatiksButton variant="primary" size="md">
            Play More
          </MatiksButton>
        </div>
      </div>

      <CloseGameSlideUp
        open={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        variant="puzzle"
        artFit="natural"
        artSrc="/prototype/matiks/elements/new-record-slide-up.png"
        title="Your Brain Just Leveled Up"
        bodyBefore="You're getting sharper a friend could too. Invite them and you'll both"
        highlight="get 50 Pies."
        inviteOutcome={inviteOutcome}
        onSuccessToastClick={onSuccessToastClick}
      />
    </div>
  );
}
