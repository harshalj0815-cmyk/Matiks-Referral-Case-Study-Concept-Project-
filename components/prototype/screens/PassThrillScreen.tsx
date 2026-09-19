"use client";

import { useState } from "react";
import { MatiksButton, MatiksChip } from "@/components/prototype/ui";

export default function PassThrillScreen() {
  const [sending, setSending] = useState(false);

  return (
    <div className="pass-thrill">
      <div className="pass-thrill__top">
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
        <MatiksChip>See Terms</MatiksChip>
      </div>

      <div className="pass-thrill__panel">
        <div className="pass-thrill__art-wrap">
          <img
            className="pass-thrill__art"
            src="/prototype/matiks/elements/paper-art-3.png"
            alt=""
          />
        </div>

        <div className="pass-thrill__sheet">
          <h1 className="pass-thrill__title">Pass the Thrill, Earn Together</h1>

          <p className="pass-thrill__body">
            That was a nail-biter and you made it. Invite a friend and
            you&apos;ll both get 50 Pies.
          </p>

          <button type="button" className="pass-thrill__link">
            What Are Pies? Learn More
          </button>

          <div className="pass-thrill__actions">
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
              disabled={sending}
            >
              Maybe Later, Sero
            </MatiksButton>
          </div>
        </div>
      </div>
    </div>
  );
}
