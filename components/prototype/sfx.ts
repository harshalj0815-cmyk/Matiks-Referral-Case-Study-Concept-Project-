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
export async function unlockPrototypeSfx(): Promise<boolean> {
  try {
    return (await getPlayer()?.unlock()) ?? false;
  } catch {
    return false;
  }
}

/** Mute / unmute the shared player. */
export function setPrototypeSfxEnabled(enabled: boolean) {
  try {
    getPlayer()?.setEnabled(enabled);
  } catch {
    // ignore
  }
}

/** Play a semantic cue. Returns null if locked, muted, or unavailable. */
export function playPrototypeSfx(cue: CueName) {
  try {
    return getPlayer()?.play(cue) ?? null;
  } catch {
    return null;
  }
}
