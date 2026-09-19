"use client";

import { useEffect, useState } from "react";
import { MatiksButton, MatiksChip } from "@/components/prototype/ui";

type CloseGameSlideUpProps = {
  open: boolean;
  onDismiss: () => void;
  artSrc?: string;
  /** Visual variant — puzzle-complete invite matches Paper 1MG-0 */
  variant?: "duel" | "puzzle";
};

export default function CloseGameSlideUp({
  open,
  onDismiss,
  artSrc = "/prototype/matiks/elements/close-game-slide-up.png",
  variant = "duel",
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

  const rootClass = [
    "close-game",
    variant === "puzzle" ? "close-game--puzzle" : "",
    entered && open ? "close-game--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
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
        <MatiksChip>See Terms</MatiksChip>
      </div>

      <div className="close-game__sheet">
        <div className="close-game__art-wrap">
          <img className="close-game__art" src={artSrc} alt="" />
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
          <MatiksButton
            variant="primary"
            fullWidth
            onClick={() => setSending(true)}
            aria-busy={sending}
          >
            {sending ? "Sending Invite..." : "Invite Now"}
          </MatiksButton>
          <MatiksButton
            variant={sending ? "disabled" : "secondary"}
            fullWidth
            onClick={onDismiss}
            disabled={sending}
          >
            Maybe Later, Sero
          </MatiksButton>
        </div>
      </div>
    </div>
  );
}
