"use client";

import { useEffect, useState } from "react";

const DEFAULT_SRC = "/cursors/default.svg?v=20261122e";
const CLICK_SRC = "/cursors/on-click.svg?v=20261122e";

/**
 * Custom Matiks cursor (Default / On Click SVGs).
 * Both assets stay mounted so press never flashes blank while a new src loads.
 * Disabled on touch / coarse pointers and when reduced motion is preferred.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    // Preload so the first click already has the pointed tip ready.
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    preload(DEFAULT_SRC);
    preload(CLICK_SRC);

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") setPressed(true);
    };
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setPressed(false);
    };
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  // Tip of the cursor art sits near the upper-left of the SVG viewBox.
  const hotspotX = 12;
  const hotspotY = 8;
  const style = {
    transform: `translate3d(${pos.x - hotspotX}px, ${pos.y - hotspotY}px, 0)`,
    opacity: visible ? 1 : 0,
  } as const;

  return (
    <>
      <img
        src={DEFAULT_SRC}
        alt=""
        aria-hidden
        className="custom-cursor"
        style={{
          ...style,
          visibility: pressed ? "hidden" : "visible",
        }}
        draggable={false}
      />
      <img
        src={CLICK_SRC}
        alt=""
        aria-hidden
        className="custom-cursor is-pressed"
        style={{
          ...style,
          visibility: pressed ? "visible" : "hidden",
        }}
        draggable={false}
      />
    </>
  );
}
