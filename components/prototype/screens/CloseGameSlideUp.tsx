"use client";

import { useEffect, useState } from "react";
import {
  MatiksButton,
  MatiksChip,
  MatiksTextLink,
  MatiksToast,
} from "@/components/prototype/ui";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";

export type InviteToastOutcome = "success" | "fail1" | "fail2";

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
  /**
   * Which toast to show after Invite Now → Sending Invite…
   * Defaults to fail1 when omitted (standalone routes).
   */
  inviteOutcome?: InviteToastOutcome | null;
  /** Fired when the success (friend) toast is clicked */
  onSuccessToastClick?: () => void;
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
  inviteOutcome = "fail1",
  onSuccessToastClick,
}: CloseGameSlideUpProps) {
  const { animationsOn } = usePrototypePrefs();
  const [visible, setVisible] = useState(open);
  const [entered, setEntered] = useState(open && !animationsOn);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<InviteToastOutcome | null>(null);

  useEffect(() => {
    if (open) {
      setSending(false);
      setResult(null);
      setVisible(true);
      if (!animationsOn) {
        setEntered(true);
        return undefined;
      }
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setEntered(false);
    if (!animationsOn) {
      setVisible(false);
      return undefined;
    }
    const hide = window.setTimeout(() => setVisible(false), 280);
    return () => window.clearTimeout(hide);
  }, [open, animationsOn]);

  useEffect(() => {
    if (!sending) return undefined;
    const outcome = inviteOutcome ?? "fail1";
    const delay = animationsOn ? 1600 : 0;
    const done = window.setTimeout(() => {
      setSending(false);
      setResult(outcome);
    }, delay);
    return () => window.clearTimeout(done);
    // Capture outcome when send starts — changing Toast control mid-send
    // must not swap the toast; next Invite Now uses the new selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [sending]);

  // Toast control only picks the next outcome; clear any visible toast until Invite Now
  useEffect(() => {
    setResult(null);
  }, [inviteOutcome]);

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

  const retry = () => {
    setResult(null);
    setSending(true);
  };

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
        {!result ? <MatiksChip>See Terms</MatiksChip> : null}
      </div>

      {result === "success" ? (
        <div className="close-game__toast">
          <MatiksToast
            variant="friend"
            onClick={onSuccessToastClick}
            onAutoDismiss={() => setResult(null)}
          />
        </div>
      ) : null}
      {result === "fail1" ? (
        <div className="close-game__toast">
          <MatiksToast
            variant="failed"
            onRetry={retry}
            onAutoDismiss={() => setResult(null)}
          />
        </div>
      ) : null}
      {result === "fail2" ? (
        <div className="close-game__toast">
          <MatiksToast
            variant="wifi"
            onRetry={retry}
            onAutoDismiss={() => setResult(null)}
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
            shine={!sending}
            onClick={() => {
              setResult(null);
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
