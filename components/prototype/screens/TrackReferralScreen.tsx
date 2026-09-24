"use client";

import { useEffect, useRef, useState } from "react";
import {
  MatiksButton,
  MatiksChip,
  MatiksReferralCard,
  MatiksToast,
} from "@/components/prototype/ui";
import type { InviteToastOutcome } from "@/components/prototype/screens/CloseGameSlideUp";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";

type TrackReferralScreenProps = {
  empty?: boolean;
  /** Toast shown after Invite Now → Sending Invite… */
  inviteOutcome?: InviteToastOutcome;
  /** Fired when the friend-arrived toast lands (empty → full). */
  onFriendArrived?: () => void;
  /** Return chip — back to the slide-up that opened this screen. */
  onReturn?: () => void;
};

function ReferralCardSkeleton({ mode }: { mode: "claim" | "progress" }) {
  return (
    <article
      className={`mk-referral mk-referral--skeleton mk-referral--skeleton-${mode}`}
      aria-hidden
    >
      <div className="mk-referral__header">
        <span className="mk-skel mk-skel--avatar" />
        <div className="mk-referral__meta">
          <span className="mk-skel mk-skel--name" />
          <span className="mk-skel mk-skel--joined" />
        </div>
        <span className="mk-skel mk-skel--chip" />
      </div>
      {mode === "claim" ? (
        <span className="mk-skel mk-skel--claim" />
      ) : (
        <div className="mk-referral__progress">
          <span className="mk-skel mk-skel--bar" />
          <span className="mk-skel mk-skel--xp" />
        </div>
      )}
    </article>
  );
}

export default function TrackReferralScreen({
  empty = false,
  inviteOutcome = "success",
  onFriendArrived,
  onReturn,
}: TrackReferralScreenProps) {
  const { animationsOn } = usePrototypePrefs();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<InviteToastOutcome | null>(null);
  const [cardsReady, setCardsReady] = useState(!animationsOn);
  const cardsRevealedRef = useRef(!animationsOn);

  // Friend-arrived toast means referrals exist — leave empty even if the
  // control still says Empty until the parent flips to Full.
  const showEmpty = empty && result !== "success";

  useEffect(() => {
    if (!sending) return undefined;
    const outcome = inviteOutcome;
    const delay = animationsOn ? 1600 : 0;
    const done = window.setTimeout(() => {
      setSending(false);
      setResult(outcome);
      if (outcome === "success") {
        onFriendArrived?.();
      }
    }, delay);
    return () => window.clearTimeout(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- capture on send start
  }, [sending]);

  useEffect(() => {
    setResult(null);
  }, [inviteOutcome]);

  useEffect(() => {
    if (showEmpty) {
      cardsRevealedRef.current = false;
      setCardsReady(false);
      return undefined;
    }
    // Invite toast already on screen — show cards immediately, no skeleton.
    if (result !== null || !animationsOn) {
      cardsRevealedRef.current = true;
      setCardsReady(true);
      return undefined;
    }
    // Toast dismissed: keep cards. Don't re-run the skeleton load.
    if (cardsRevealedRef.current) {
      setCardsReady(true);
      return undefined;
    }
    setCardsReady(false);
    const ready = window.setTimeout(() => {
      cardsRevealedRef.current = true;
      setCardsReady(true);
    }, 900);
    return () => window.clearTimeout(ready);
  }, [showEmpty, animationsOn, result]);

  const retry = () => {
    setResult(null);
    setSending(true);
  };

  return (
    <div className="track-referral">
      {result === "success" ? (
        <div className="track-referral__toast">
          <MatiksToast
            variant="friend"
            onAutoDismiss={() => setResult(null)}
          />
        </div>
      ) : null}
      {result === "fail1" ? (
        <div className="track-referral__toast">
          <MatiksToast
            variant="failed"
            onRetry={retry}
            onAutoDismiss={() => setResult(null)}
          />
        </div>
      ) : null}
      {result === "fail2" ? (
        <div className="track-referral__toast">
          <MatiksToast
            variant="wifi"
            onRetry={retry}
            onAutoDismiss={() => setResult(null)}
          />
        </div>
      ) : null}

      <div className="track-referral__top">
        <MatiksChip
          leadingIcon={
            <img
              src="/prototype/matiks/icons/caret-left.svg"
              alt=""
              aria-hidden
            />
          }
          onClick={onReturn}
        >
          Return
        </MatiksChip>
        <MatiksChip
          leadingIcon={
            <img
              src="/prototype/matiks/icons/podium.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Leaderboard
        </MatiksChip>
      </div>

      {showEmpty ? (
        <div className="track-referral__empty">
          <h1 className="track-referral__empty-title">
            No Referrals Yet, Start Inviting!
          </h1>
          <p className="track-referral__empty-body">
            Once you invite a friend, you&apos;ll see all your progress right
            here.
          </p>
        </div>
      ) : (
        <div className="track-referral__body" aria-busy={!cardsReady}>
          <section
            className="track-referral__section"
            aria-labelledby="ready-to-claim"
          >
            <h2 id="ready-to-claim" className="track-referral__section-title">
              Ready to Claim
            </h2>
            {cardsReady ? (
              <MatiksReferralCard
                mode="claim"
                name="Suyash"
                joinedLabel="Joined in July, 2026"
                avatarSrc="/prototype/matiks/elements/avatar-suyash.jpg"
              />
            ) : (
              <ReferralCardSkeleton mode="claim" />
            )}
          </section>

          <section
            className="track-referral__section"
            aria-labelledby="in-progress"
          >
            <div className="track-referral__divider" aria-hidden />
            <h2 id="in-progress" className="track-referral__section-title">
              In Progress
            </h2>
            <div className="track-referral__cards">
              {cardsReady ? (
                <>
                  <MatiksReferralCard
                    mode="progress"
                    name="Kabir"
                    joinedLabel="Joined in July, 2026"
                    xp={43}
                    avatarSrc="/prototype/matiks/elements/avatar-referral-2.jpg"
                  />
                  <MatiksReferralCard
                    mode="progress"
                    name="Rohan"
                    joinedLabel="Joined in June, 2026"
                    xp={40}
                    avatarSrc="/prototype/matiks/elements/avatar-referral-3.jpg"
                  />
                </>
              ) : (
                <>
                  <ReferralCardSkeleton mode="progress" />
                  <ReferralCardSkeleton mode="progress" />
                </>
              )}
            </div>
          </section>
        </div>
      )}

      <div className="track-referral__footer">
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
      </div>
    </div>
  );
}
