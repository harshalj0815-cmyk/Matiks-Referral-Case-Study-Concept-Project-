"use client";

import { useEffect } from "react";
import MatiksChip from "@/components/prototype/ui/MatiksChip";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";
import { playPrototypeSfx } from "@/components/prototype/sfx";

type MatiksToastBase = {
  className?: string;
};

type MatiksToastProps =
  | ({
      variant: "friend";
      title?: string;
      body?: string;
      onClick?: () => void;
    } & MatiksToastBase)
  | ({
      variant: "failed";
      title?: string;
      body?: string;
      onRetry?: () => void;
    } & MatiksToastBase)
  | ({
      variant: "wifi";
      title?: string;
      body?: string;
      onRetry?: () => void;
    } & MatiksToastBase);

export default function MatiksToast(props: MatiksToastProps) {
  const className = props.className ?? "";
  const { soundOn } = usePrototypePrefs();

  useEffect(() => {
    if (!soundOn) return;
    if (props.variant === "friend") playPrototypeSfx("success");
    else if (props.variant === "failed" || props.variant === "wifi") {
      playPrototypeSfx("retry");
    }
    // Play once when this toast mounts — not when sound toggles later.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
  }, []);

  if (props.variant === "friend") {
    const body = (
      <div className="mk-toast__row">
        <img
          className="mk-toast__mascot"
          src="/prototype/matiks/elements/friend-arrived-icon.png"
          alt=""
          aria-hidden
        />
        <div className="mk-toast__copy">
          <p className="mk-toast__title">
            {props.title ?? "Your Friend Just Arrived!"}
          </p>
          <p className="mk-toast__body">
            {props.body ?? "Reward unlocks once they reach 150 XP."}
          </p>
        </div>
        <img
          className="mk-toast__chevron"
          src="/prototype/matiks/icons/caret-right-lime.svg"
          alt=""
          aria-hidden
        />
      </div>
    );

    if (props.onClick) {
      return (
        <button
          type="button"
          className={`mk-toast mk-toast--friend mk-toast--clickable${className ? ` ${className}` : ""}`}
          onClick={props.onClick}
        >
          {body}
        </button>
      );
    }

    return (
      <div
        className={`mk-toast mk-toast--friend${className ? ` ${className}` : ""}`}
        role="status"
      >
        {body}
      </div>
    );
  }

  if (props.variant === "failed") {
    return (
      <div
        className={`mk-toast mk-toast--failed${className ? ` ${className}` : ""}`}
        role="alert"
      >
        <div className="mk-toast__row">
          <span className="mk-toast__status-icon" aria-hidden>
            <img src="/prototype/matiks/icons/smiley-sad.svg" alt="" />
          </span>
          <div className="mk-toast__copy">
            <p className="mk-toast__title">
              {props.title ?? "Invite Failed"}
            </p>
            <p className="mk-toast__body">
              {props.body ?? "Couldn't send invite. Try again."}
            </p>
          </div>
          <MatiksChip onClick={props.onRetry}>Retry</MatiksChip>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mk-toast mk-toast--wifi${className ? ` ${className}` : ""}`}
      role="alert"
    >
      <div className="mk-toast__row">
        <span className="mk-toast__wifi-icon" aria-hidden>
          <img src="/prototype/matiks/icons/wifi-off.svg" alt="" />
        </span>
        <div className="mk-toast__copy">
          <p className="mk-toast__title">
            {props.title ?? "Weak Internet Detected"}
          </p>
          <p className="mk-toast__body">
            {props.body ?? "Check your Wi-Fi and try again."}
          </p>
        </div>
        <MatiksChip onClick={props.onRetry}>Retry</MatiksChip>
      </div>
    </div>
  );
}
