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

    const centerStarter = () => {
      const card = row.querySelector<HTMLElement>("[data-card-center]");
      if (!card) return;
      card.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "instant",
      });
    };

    centerStarter();
    const frame = requestAnimationFrame(centerStarter);

    const project = (velocity: number, decelerationRate = 0.998) =>
      ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

    const snapTargets = () => {
      const cards = [
        ...row.querySelectorAll<HTMLElement>(".puzzle-complete__card"),
      ];
      return cards.map(
        (card) => card.offsetLeft + card.offsetWidth / 2 - row.clientWidth / 2,
      );
    };

    const nearestTarget = (scroll: number, targets: number[]) => {
      let best = targets[0] ?? 0;
      let bestDist = Infinity;
      for (const target of targets) {
        const dist = Math.abs(target - scroll);
        if (dist < bestDist) {
          bestDist = dist;
          best = target;
        }
      }
      return best;
    };

    const clampScroll = (value: number) => {
      const max = Math.max(0, row.scrollWidth - row.clientWidth);
      return Math.min(max, Math.max(0, value));
    };

    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let dragged = false;
    let settleRaf = 0;

    const layoutScale = () => {
      const width = row.offsetWidth;
      if (!width) return 1;
      return row.getBoundingClientRect().width / width;
    };

    const cancelSettle = () => {
      if (settleRaf) {
        cancelAnimationFrame(settleRaf);
        settleRaf = 0;
      }
    };

    const settleTo = (target: number) => {
      cancelSettle();
      const from = row.scrollLeft;
      const to = clampScroll(target);
      if (!animationsOn || Math.abs(to - from) < 0.5) {
        row.scrollLeft = to;
        row.classList.remove("puzzle-complete__cards--dragging");
        return;
      }

      const start = performance.now();
      const duration = 320;
      const distance = to - from;

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // Soft magnet land — same family as --ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        row.scrollLeft = from + distance * eased;
        if (t < 1) {
          settleRaf = requestAnimationFrame(tick);
        } else {
          row.scrollLeft = to;
          settleRaf = 0;
          row.classList.remove("puzzle-complete__cards--dragging");
        }
      };

      settleRaf = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      // Stop native image-drag / text selection from stealing the gesture
      event.preventDefault();
      window.getSelection()?.removeAllRanges();
      cancelSettle();
      pointerId = event.pointerId;
      startX = event.clientX;
      lastX = event.clientX;
      lastT = performance.now();
      startScroll = row.scrollLeft;
      velocity = 0;
      dragged = false;
      row.classList.add("puzzle-complete__cards--dragging");
      row.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      const scale = layoutScale();
      const delta = (event.clientX - startX) / scale;
      if (Math.abs(event.clientX - startX) > 4) dragged = true;

      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const instant = ((event.clientX - lastX) / scale / dt) * 1000;
      // Light smoothing so flick velocity isn't one noisy sample
      velocity = velocity * 0.7 + instant * 0.3;
      lastX = event.clientX;
      lastT = now;

      row.scrollLeft = clampScroll(startScroll - delta);
    };

    const endPointer = (event: PointerEvent) => {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      if (row.hasPointerCapture(event.pointerId)) {
        row.releasePointerCapture(event.pointerId);
      }

      const targets = snapTargets();
      if (!targets.length) {
        row.classList.remove("puzzle-complete__cards--dragging");
        return;
      }

      // Project where the flick is going, then magnet to the nearest card
      const projected = row.scrollLeft - project(velocity);
      const target = nearestTarget(projected, targets);
      settleTo(target);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", endPointer);
    row.addEventListener("pointercancel", endPointer);
    row.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(frame);
      cancelSettle();
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", endPointer);
      row.removeEventListener("pointercancel", endPointer);
      row.removeEventListener("click", onClickCapture, true);
    };
  }, [animationsOn]);

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
