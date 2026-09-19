"use client";

import { useEffect, useState } from "react";
import {
  MatiksButton,
  MatiksChip,
  MatiksTextLink,
  MatiksToast,
} from "@/components/prototype/ui";

type CloseGameSlideUpProps = {
  open: boolean;
  onDismiss: () => void;
  artSrc?: string;
  /** Invite sheet layout — matches Puzzle Completion / Paper 1MG-0 */
  variant?: "duel" | "puzzle";
  /** cover = crop to 305px slot; natural = show Paper art as authored (default) */
  artFit?: "cover" | "natural";
  title?: string;
  /** Plain body before the lime highlight */
  bodyBefore?: string;
  /** Lime-highlighted close of the body */
  highlight?: string;
  /** Extra class for screen-specific spacing (e.g. Loom) */
  className?: string;
};

export default function CloseGameSlideUp({
  open,
  onDismiss,
  artSrc = "/prototype/matiks/elements/close-game-slide-up.png",
  variant = "duel",
  artFit = "natural",
  title = "Pass the Thrill, Earn Together",
  bodyBefore = "That was a nail-biter and you made it. Invite a friend and you'll both",
  highlight = "get 50 Pies.",
  className = "",
}: CloseGameSlideUpProps) {
  const [visible, setVisible] = useState(open);
  const [entered, setEntered] = useState(false);
  const [sending, setSending] = useState(false);
  const [inviteFailed, setInviteFailed] = useState(false);

  useEffect(() => {
    if (open) {
      setSending(false);
      setInviteFailed(false);
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

  useEffect(() => {
    if (!sending) return undefined;
    const fail = window.setTimeout(() => {
      setSending(false);
      setInviteFailed(true);
    }, 1600);
    return () => window.clearTimeout(fail);
  }, [sending]);

  if (!visible) return null;

  const rootClass = [
    "close-game",
    "close-game--invite",
    variant === "duel" ? "close-game--duel-art" : "close-game--puzzle-art",
    artFit === "natural" ? "close-game--art-natural" : "",
    entered && open ? "close-game--open" : "",
    className,
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
        {!inviteFailed ? <MatiksChip>See Terms</MatiksChip> : null}
      </div>

      {inviteFailed ? (
        <div className="close-game__toast">
          <MatiksToast
            variant="failed"
            onRetry={() => {
              setInviteFailed(false);
              setSending(true);
            }}
          />
        </div>
      ) : null}

      <div className="close-game__sheet">
        <div className="close-game__art-wrap">
          <img className="close-game__art" src={artSrc} alt="" />
        </div>

        <h2 id="close-game-title" className="close-game__title">
          {title}
        </h2>

        <p className="close-game__body">
          {bodyBefore}{" "}
          <span className="close-game__highlight">{highlight}</span>
        </p>

        <MatiksTextLink className="close-game__link">
          What Are Pies? Learn More
        </MatiksTextLink>

        <div className="close-game__actions">
          <MatiksButton
            variant="primary"
            fullWidth
            onClick={() => {
              setInviteFailed(false);
              setSending(true);
            }}
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
