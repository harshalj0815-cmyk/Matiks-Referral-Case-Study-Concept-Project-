"use client";

import { useEffect, useState } from "react";

type CloseGameSlideUpProps = {
  open: boolean;
  onDismiss: () => void;
};

export default function CloseGameSlideUp({
  open,
  onDismiss,
}: CloseGameSlideUpProps) {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setSending(false);
      setVisible(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setEntered(false);
    const hide = window.setTimeout(() => setVisible(false), 280);
    return () => window.clearTimeout(hide);
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className={`close-game${entered && open ? " close-game--open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="close-game-title"
    >
      <button
        type="button"
        className="close-game__overlay"
        aria-label="Dismiss"
        onClick={sending ? undefined : onDismiss}
        disabled={sending}
      />

      <div className="close-game__top">
        <button type="button" className="close-game__terms">
          See Terms
        </button>
      </div>

      <div className="close-game__sheet">
        <div className="close-game__art-wrap">
          <img
            className="close-game__art"
            src="/prototype/matiks/elements/close-game-slide-up.png"
            alt=""
          />
        </div>

        <h2 id="close-game-title" className="close-game__title">
          Pass the Thrill, Earn Together
        </h2>

        <p className="close-game__body">
          That was a nail-biter and you made it. Invite a friend and you&apos;ll
          both <span className="close-game__highlight">get 50 Pies.</span>
        </p>

        <button type="button" className="close-game__link">
          What Are Pies? Learn More
        </button>

        <div className="close-game__actions">
          <button
            type="button"
            className="close-game__btn close-game__btn--primary"
            style={{ fontWeight: 600 }}
            onClick={() => setSending(true)}
            aria-busy={sending}
          >
            {sending ? "Sending Invite..." : "Invite Now"}
          </button>
          <button
            type="button"
            className="close-game__btn close-game__btn--secondary"
            style={{ fontWeight: 500 }}
            onClick={onDismiss}
            disabled={sending}
          >
            Maybe Later, Sero
          </button>
        </div>
      </div>
    </div>
  );
}
