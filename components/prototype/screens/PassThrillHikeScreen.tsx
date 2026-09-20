"use client";

import DuelVictoryScreen from "@/components/prototype/screens/DuelVictoryScreen";
import type { InviteToastOutcome } from "@/components/prototype/screens/CloseGameSlideUp";

type PassThrillHikeScreenProps = {
  autoToast?: boolean;
  inviteOutcome?: InviteToastOutcome | null;
  onSuccessToastClick?: () => void;
};

/** Paper 1CW-0 — Duel Victory → 50 Days Strong slide-up (hiking art) */
export default function PassThrillHikeScreen({
  autoToast = true,
  inviteOutcome,
  onSuccessToastClick,
}: PassThrillHikeScreenProps) {
  return (
    <DuelVictoryScreen
      sheetArtSrc="/prototype/matiks/elements/pass-thrill-art-hike.png"
      sheetArtFit="natural"
      sheetTitle="50 Days Strong"
      sheetBodyBefore="That kind of habit is rare. Bring a friend in on it you'll both"
      autoToast={autoToast}
      inviteOutcome={inviteOutcome}
      onSuccessToastClick={onSuccessToastClick}
    />
  );
}
