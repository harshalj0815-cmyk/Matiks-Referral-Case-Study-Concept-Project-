"use client";

import {
  MatiksButton,
  MatiksChip,
  MatiksReferralCard,
} from "@/components/prototype/ui";

type TrackReferralScreenProps = {
  empty?: boolean;
};

export default function TrackReferralScreen({
  empty = false,
}: TrackReferralScreenProps) {
  return (
    <div className="track-referral">
      <div className="track-referral__top">
        <MatiksChip
          leadingIcon={
            <img
              src="/prototype/matiks/icons/caret-left.svg"
              alt=""
              aria-hidden
            />
          }
        >
          Home
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

      {empty ? (
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
        <div className="track-referral__body">
          <section
            className="track-referral__section"
            aria-labelledby="ready-to-claim"
          >
            <h2 id="ready-to-claim" className="track-referral__section-title">
              Ready to Claim
            </h2>
            <MatiksReferralCard mode="claim" />
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
              <MatiksReferralCard
                mode="progress"
                xp={43}
                avatarSrc="/prototype/matiks/elements/avatar-referral-2.jpg"
              />
              <MatiksReferralCard
                mode="progress"
                xp={40}
                avatarSrc="/prototype/matiks/elements/avatar-referral-3.jpg"
              />
            </div>
          </section>
        </div>
      )}

      <div className="track-referral__footer">
        <MatiksButton variant="primary" fullWidth>
          Invite Now
        </MatiksButton>
      </div>
    </div>
  );
}
