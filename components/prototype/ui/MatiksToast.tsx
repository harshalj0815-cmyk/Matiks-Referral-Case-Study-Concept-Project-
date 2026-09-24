"use client";

import { useEffect, useRef, useState } from "react";
import MatiksChip from "@/components/prototype/ui/MatiksChip";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";
import { playPrototypeSfx } from "@/components/prototype/sfx";

const TOAST_TTL_MS = 5000;
const TOAST_EXIT_MS = 200;

type MatiksToastBase = {
  className?: string;
};

type MatiksToastProps =
  | ({
      variant: "friend";
      title?: string;
      body?: string;
      onClick?: () => void;
      onAutoDismiss?: () => void;
    } & MatiksToastBase)
  | ({
      variant: "failed";
      title?: string;
      body?: string;
      onRetry?: () => void;
      onAutoDismiss?: () => void;
    } & MatiksToastBase)
  | ({
      variant: "wifi";
      title?: string;
      body?: string;
      onRetry?: () => void;
      onAutoDismiss?: () => void;
    } & MatiksToastBase);

function toastClass(
  variant: string,
  className: string,
  entered: boolean,
  exiting: boolean,
  clickable = false,
) {
  return [
    "mk-toast",
    `mk-toast--${variant}`,
    clickable ? "mk-toast--clickable" : "",
    entered && !exiting ? "mk-toast--entered" : "",
    exiting ? "mk-toast--exiting" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function ToastTimer({ active }: { active: boolean }) {
  return (
    <span
      className={`mk-toast__timer${active ? " mk-toast__timer--run" : ""}`}
      aria-hidden
    >
      <span className="mk-toast__timer-bar" />
    </span>
  );
}

export default function MatiksToast(props: MatiksToastProps) {
  const className = props.className ?? "";
  const { soundOn, animationsOn } = usePrototypePrefs();
  const [entered, setEntered] = useState(!animationsOn);
  const [exiting, setExiting] = useState(false);
  const [timerRun, setTimerRun] = useState(false);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animationsOn) {
      setEntered(true);
      return undefined;
    }
    setEntered(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [animationsOn]);

  useEffect(() => {
    if (!soundOn) return;
    if (props.variant === "friend") playPrototypeSfx("success");
    else if (props.variant === "failed" || props.variant === "wifi") {
      playPrototypeSfx("retry");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
  }, []);

  const autoDismiss = props.onAutoDismiss;

  const beginExit = (after?: () => void) => {
    if (exiting) return;
    if (!animationsOn) {
      after?.();
      return;
    }
    setExiting(true);
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
    }
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      after?.();
    }, TOAST_EXIT_MS);
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoDismiss || !entered || exiting) return undefined;
    setTimerRun(false);
    const start = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTimerRun(true));
    });
    const done = window.setTimeout(() => {
      beginExit(() => autoDismiss());
    }, TOAST_TTL_MS);
    return () => {
      cancelAnimationFrame(start);
      window.clearTimeout(done);
      setTimerRun(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- beginExit is stable enough per render
  }, [autoDismiss, entered, exiting, animationsOn]);

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
          className={toastClass("friend", className, entered, exiting, true)}
          onClick={() => {
            beginExit(() => props.onClick?.());
          }}
        >
          {body}
          <ToastTimer active={timerRun} />
        </button>
      );
    }

    return (
      <div
        className={toastClass("friend", className, entered, exiting)}
        role="status"
      >
        {body}
        <ToastTimer active={timerRun} />
      </div>
    );
  }

  if (props.variant === "failed") {
    return (
      <div
        className={toastClass("failed", className, entered, exiting)}
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
          <MatiksChip
            onClick={() => {
              beginExit(() => props.onRetry?.());
            }}
          >
            Retry
          </MatiksChip>
        </div>
        <ToastTimer active={timerRun} />
      </div>
    );
  }

  return (
    <div
      className={toastClass("wifi", className, entered, exiting)}
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
        <MatiksChip
          onClick={() => {
            beginExit(() => props.onRetry?.());
          }}
        >
          Retry
        </MatiksChip>
      </div>
      <ToastTimer active={timerRun} />
    </div>
  );
}
