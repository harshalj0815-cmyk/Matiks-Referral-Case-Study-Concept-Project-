"use client";

import { createUISFX, type CueName, type UISFXPlayer } from "uisfx";

let player: UISFXPlayer | null = null;

function getPlayer(): UISFXPlayer | null {
  if (typeof window === "undefined") return null;
  if (!player) {
    player = createUISFX({
      pack: "minimal",
      volume: 0.7,
      preferences: { key: "matiks-prototype:sound" },
    });
  }
  return player;
}

/** Resume Web Audio from a pointer/keyboard gesture. */
export function unlockPrototypeSfx(): Promise<boolean> {
  return getPlayer()?.unlock() ?? Promise.resolve(false);
}

/** Mute / unmute the shared player. */
export function setPrototypeSfxEnabled(enabled: boolean) {
  getPlayer()?.setEnabled(enabled);
}

/** Play a semantic cue. Returns null if locked, muted, or unavailable. */
export function playPrototypeSfx(cue: CueName) {
  return getPlayer()?.play(cue) ?? null;
}
