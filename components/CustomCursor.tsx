"use client";

import { useEffect, useState } from "react";

/**
 * Custom Matiks cursor (Default / On Click SVGs).
 * CSS url() cursors reject these assets (size + filters), so we follow the pointer instead.
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

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  // Tip of the cursor art sits near the upper-left of the SVG viewBox.
  const hotspotX = 12;
  const hotspotY = 8;

  return (
    <img
      src={pressed ? "/cursors/on-click.svg" : "/cursors/default.svg"}
      alt=""
      aria-hidden
      className="custom-cursor"
      style={{
        transform: `translate3d(${pos.x - hotspotX}px, ${pos.y - hotspotY}px, 0)`,
        opacity: visible ? 1 : 0,
      }}
      draggable={false}
    />
  );
}
