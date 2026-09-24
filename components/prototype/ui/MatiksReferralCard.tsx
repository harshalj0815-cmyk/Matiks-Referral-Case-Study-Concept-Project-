"use client";

import { useState } from "react";
import MatiksButton from "@/components/prototype/ui/MatiksButton";
import MatiksChip from "@/components/prototype/ui/MatiksChip";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";
import { useSound } from "@/hooks/use-sound";
import { iMoneyDialogOpenSound } from "@/sounds/i-money-dialog-open";

type MatiksReferralCardProps = {
  name?: string;
  joinedLabel?: string;
  avatarSrc?: string;
  avatarColor?: string;
  mode: "progress" | "claim";
  xp?: number;
  xpGoal?: number;
  milestones?: number[];
  onAdd?: () => void;
  onClaim?: () => void;
  className?: string;
};

export default function MatiksReferralCard({
  name = "Suyash",
  joinedLabel = "Joined in July, 2026",
  avatarSrc = "/prototype/matiks/elements/avatar-suyash.jpg",
  avatarColor = "#7a1fa2",
  mode,
  xp = 43,
  xpGoal = 150,
  milestones = [50, 100],
  onAdd,
  onClaim,
  className = "",
}: MatiksReferralCardProps) {
  const { soundOn } = usePrototypePrefs();
  const [sent, setSent] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [playClaimSound] = useSound(iMoneyDialogOpenSound, {
    soundEnabled: soundOn,
    interrupt: true,
  });
  const progress = Math.max(0, Math.min(100, (xp / xpGoal) * 100));

  return (
    <article
      className={`mk-referral${className ? ` ${className}` : ""}`}
      aria-label={`${name} referral`}
    >
      <div className="mk-referral__header">
        {avatarSrc ? (
          <img className="mk-referral__avatar" src={avatarSrc} alt="" />
        ) : (
          <span
            className="mk-referral__avatar mk-referral__avatar--fallback"
            style={{ background: avatarColor }}
            aria-hidden
          />
        )}
        <div className="mk-referral__meta">
          <p className="mk-referral__name">{name}</p>
          <p className="mk-referral__joined">{joinedLabel}</p>
        </div>
        <MatiksChip
          leadingIcon={
            <img
              src={
                sent
                  ? "/prototype/matiks/icons/x.svg"
                  : "/prototype/matiks/icons/user-plus.svg"
              }
              alt=""
              aria-hidden
            />
          }
          onClick={() => {
            if (sent) {
              setSent(false);
              return;
            }
            setSent(true);
            onAdd?.();
          }}
          aria-pressed={sent}
          aria-label={sent ? "Sent, click to undo" : `Add ${name}`}
        >
          {sent ? "Sent" : "Add"}
        </MatiksChip>
      </div>

      {mode === "progress" ? (
        <div className="mk-referral__progress">
          <div className="mk-referral__track" aria-hidden>
            <span
              className="mk-referral__fill"
              style={{ width: `${progress}%` }}
            />
            {milestones.map((mark) => (
              <span
                key={`tick-${mark}`}
                className="mk-referral__tick"
                style={{ left: `${(mark / xpGoal) * 100}%` }}
              />
            ))}
            {milestones.map((mark) => (
              <span
                key={mark}
                className="mk-referral__mark"
                style={{ left: `${(mark / xpGoal) * 100}%` }}
              >
                {mark}
              </span>
            ))}
          </div>
          <p className="mk-referral__xp">
            {xp}/{xpGoal} XP
          </p>
        </div>
      ) : (
        <MatiksButton
          variant="secondary"
          fullWidth
          disabled={claimed}
          trailingIcon={
            <img
              src={
                claimed
                  ? "/prototype/matiks/icons/check.svg"
                  : "/prototype/matiks/icons/gift.svg"
              }
              alt=""
              aria-hidden
            />
          }
          onClick={() => {
            if (claimed) return;
            playClaimSound();
            setClaimed(true);
            onClaim?.();
          }}
        >
          {claimed ? "Claimed" : "Claim Reward"}
        </MatiksButton>
      )}
    </article>
  );
}
