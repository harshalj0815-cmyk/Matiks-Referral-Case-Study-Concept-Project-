"use client";

import { useEffect, useState } from "react";
import CloseGameSlideUp from "@/components/prototype/screens/CloseGameSlideUp";

/** Paper 1UJ-0 — Loom Slide up over Daily Challenges home */
export default function LoomSlideUpScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setSheetOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

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
      <CloseGameSlideUp
        open={sheetOpen}
        onDismiss={() => setSheetOpen(false)}
        variant="puzzle"
        artFit="natural"
        artSrc="/prototype/matiks/elements/pass-thrill-art-loom.png"
        title="Pass It On, Champ!"
        bodyBefore="Remember a friend brought you in Sero says it's your turn. Invite one and"
        highlight="earn 50 Pies!"
        className="close-game--loom"
      />
    </div>
  );
}
