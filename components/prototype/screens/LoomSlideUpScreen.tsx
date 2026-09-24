"use client";

import { useEffect, useState } from "react";
import CloseGameSlideUp from "@/components/prototype/screens/CloseGameSlideUp";
import type { InviteToastOutcome } from "@/components/prototype/screens/CloseGameSlideUp";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";

type LoomSlideUpScreenProps = {
  inviteOutcome?: InviteToastOutcome | null;
  onSuccessToastClick?: () => void;
};

/** Paper 1UL-0 — Loom Slide up over Daily Challenges home */
export default function LoomSlideUpScreen({
  inviteOutcome,
  onSuccessToastClick,
}: LoomSlideUpScreenProps) {
  const { animationsOn } = usePrototypePrefs();
  const [sheetOpen, setSheetOpen] = useState(!animationsOn);
  const [scrimClear, setScrimClear] = useState(!animationsOn);

  useEffect(() => {
    if (!animationsOn) {
      setScrimClear(true);
      setSheetOpen(true);
      return undefined;
    }

    // Hold the dim for one frame, then fade it off so the home reveals.
    setScrimClear(false);
    const reveal = window.setTimeout(() => setScrimClear(true), 80);
    const sheet = window.setTimeout(() => setSheetOpen(true), 1500);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(sheet);
    };
  }, [animationsOn]);

  return (
    <div className="loom-slide">
      <button
        type="button"
        className="loom-slide__home-btn"
        onClick={() => setSheetOpen(true)}
        aria-label="Show invite"
      >
        <img
          className="loom-slide__home"
          src="/prototype/matiks/elements/daily-challenges-home.jpg"
          alt=""
        />
      </button>
      <div
        className={`loom-slide__scrim${scrimClear ? " loom-slide__scrim--clear" : ""}`}
        aria-hidden
      />
      <CloseGameSlideUp
        open={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        variant="puzzle"
        artFit="natural"
        artSrc="/prototype/matiks/elements/pass-thrill-art-loom.png"
        title="Pass It On, Champ!"
        bodyBefore="Remember a friend brought you in. Sero says it's your turn. Invite one and"
        highlight="earn 50 Pies!"
        className="close-game--loom"
        inviteOutcome={inviteOutcome}
        onSuccessToastClick={onSuccessToastClick}
      />
    </div>
  );
}
