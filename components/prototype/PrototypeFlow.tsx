"use client";

import { useCallback, useState } from "react";
import IPhoneFrame from "@/components/prototype/IPhoneFrame";
import CaseSegmentedControl from "@/components/prototype/CaseSegmentedControl";
import DuelVictoryScreen from "@/components/prototype/screens/DuelVictoryScreen";
import LoomSlideUpScreen from "@/components/prototype/screens/LoomSlideUpScreen";
import PassThrillHikeScreen from "@/components/prototype/screens/PassThrillHikeScreen";
import PuzzleCompletionScreen from "@/components/prototype/screens/PuzzleCompletionScreen";
import TrackReferralScreen from "@/components/prototype/screens/TrackReferralScreen";
import type { InviteToastOutcome } from "@/components/prototype/screens/CloseGameSlideUp";
import { PrototypePrefsProvider } from "@/components/prototype/PrototypePrefs";
import {
  unlockPrototypeSfx,
  playPrototypeSfx,
  setPrototypeSfxEnabled,
} from "@/components/prototype/sfx";

type FlowId =
  | "slideup1"
  | "slideup2"
  | "slideup3"
  | "slideup4"
  | "track-referral";

type TrackState = "full" | "empty";

const FLOW_OPTIONS: { value: FlowId; label: string }[] = [
  { value: "slideup1", label: "SlideUp1" },
  { value: "slideup2", label: "SlideUp2" },
  { value: "slideup3", label: "SlideUp3" },
  { value: "slideup4", label: "SlideUp4" },
  { value: "track-referral", label: "Track Referral" },
];

const TOAST_OPTIONS: { value: InviteToastOutcome; label: string }[] = [
  { value: "success", label: "Success" },
  { value: "fail1", label: "Fail1" },
  { value: "fail2", label: "Fail2" },
];

const TRACK_OPTIONS: { value: TrackState; label: string }[] = [
  { value: "full", label: "Full" },
  { value: "empty", label: "Empty" },
];

function ReloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19.5 12a7.5 7.5 0 1 1-2.15-5.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M19.5 4.5v5h-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 9.5v5h3.2L12 18.2V5.8L7.7 9.5H4.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {on ? (
        <>
          <path
            d="M15.2 9.2a3.4 3.4 0 0 1 0 5.6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M17.8 6.8a6.2 6.2 0 0 1 0 10.4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d="M15.5 9.5l5 5M20.5 9.5l-5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function MotionIcon({ on }: { on: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      {on ? (
        <>
          {/* Easing curve — motion as design language, not ECG */}
          <path
            d="M4 16c3.2 0 4.2-8 8-8s4.8 8 8 8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M17.5 6.5l2.5 1.5-1.5 2.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M4 12h16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M15.5 8.5l5 5M20.5 8.5l-5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function PrototypeFlow() {
  const [flow, setFlow] = useState<FlowId>("slideup1");
  const [toast, setToast] = useState<InviteToastOutcome>("success");
  const [trackState, setTrackState] = useState<TrackState>("full");
  const [trackReturnTo, setTrackReturnTo] = useState<
    Exclude<FlowId, "track-referral">
  >("slideup1");
  const [reloadKey, setReloadKey] = useState(0);
  const [soundOn, setSoundOnState] = useState(true);
  const [animationsOn, setAnimationsOn] = useState(true);

  const trackSelected = flow === "track-referral";

  const setSoundOn = useCallback((value: boolean) => {
    setSoundOnState(value);
    setPrototypeSfxEnabled(value);
    if (value) void unlockPrototypeSfx();
  }, []);

  const goToTrackReferralFull = () => {
    void unlockPrototypeSfx();
    if (flow !== "track-referral") {
      setTrackReturnTo(flow);
    }
    setTrackState("full");
    setFlow("track-referral");
  };

  const selectFlow = (id: FlowId) => {
    // Switch first so a sound failure never blocks navigation
    if (id === "track-referral" && flow !== "track-referral") {
      setTrackReturnTo(flow);
    }
    setFlow(id);
    try {
      if (
        soundOn &&
        (id === "slideup1" || id === "slideup2" || id === "slideup4")
      ) {
        void unlockPrototypeSfx().then(() => {
          playPrototypeSfx("bonus");
        });
      } else {
        void unlockPrototypeSfx();
      }
    } catch {
      // Sound must never break the prototype controls
    }
  };

  const returnFromTrackReferral = () => {
    selectFlow(trackReturnTo);
  };

  let screen = null;
  switch (flow) {
    case "slideup1":
      screen = (
        <DuelVictoryScreen
          autoToast={false}
          inviteOutcome={toast}
          onSuccessToastClick={goToTrackReferralFull}
        />
      );
      break;
    case "slideup2":
      screen = (
        <PassThrillHikeScreen
          autoToast={false}
          inviteOutcome={toast}
          onSuccessToastClick={goToTrackReferralFull}
        />
      );
      break;
    case "slideup3":
      screen = (
        <LoomSlideUpScreen
          inviteOutcome={toast}
          onSuccessToastClick={goToTrackReferralFull}
        />
      );
      break;
    case "slideup4":
      screen = (
        <PuzzleCompletionScreen
          inviteOutcome={toast}
          onSuccessToastClick={goToTrackReferralFull}
        />
      );
      break;
    case "track-referral":
      screen = (
        <TrackReferralScreen
          empty={trackState === "empty"}
          inviteOutcome={toast}
          onFriendArrived={() => setTrackState("full")}
          onReturn={returnFromTrackReferral}
        />
      );
      break;
  }

  return (
    <PrototypePrefsProvider
      soundOn={soundOn}
      animationsOn={animationsOn}
      setSoundOn={setSoundOn}
      setAnimationsOn={setAnimationsOn}
    >
      <div
        className={`prototype-flow${animationsOn ? "" : " prototype-flow--static"}`}
        onPointerDownCapture={() => {
          void unlockPrototypeSfx();
        }}
      >
        <IPhoneFrame>
          <div
            className="prototype-flow__stage"
            key={`${flow}-${reloadKey}`}
          >
            {screen}
          </div>
        </IPhoneFrame>

        <aside
          className="prototype-flow__controls"
          aria-label="Prototype controls"
        >
          <div className="prototype-flow__tools-block">
            <p className="case-seg__label">Tools</p>
            <div className="case-seg case-seg--tools">
              <div className="prototype-flow__tools-row">
              <button
                type="button"
                className="prototype-flow__reload"
                aria-label="Reload screen"
                title="Reload"
                onClick={() => {
                  void unlockPrototypeSfx();
                  if (
                    soundOn &&
                    (flow === "slideup1" ||
                      flow === "slideup2" ||
                      flow === "slideup4")
                  ) {
                    playPrototypeSfx("bonus");
                  }
                  setReloadKey((n) => n + 1);
                }}
              >
                <ReloadIcon />
              </button>
              <div className="prototype-flow__toggles" role="group" aria-label="Tools">
                <button
                  type="button"
                  className={`prototype-flow__toggle${soundOn ? " prototype-flow__toggle--on" : ""}`}
                  aria-pressed={soundOn}
                  onClick={() => setSoundOn(!soundOn)}
                >
                  <span className="prototype-flow__toggle-copy">
                    <SoundIcon on={soundOn} />
                    Sound
                  </span>
                  <span className="prototype-flow__switch" aria-hidden>
                    <span className="prototype-flow__switch-knob" />
                  </span>
                </button>
                <button
                  type="button"
                  className={`prototype-flow__toggle${animationsOn ? " prototype-flow__toggle--on" : ""}`}
                  aria-pressed={animationsOn}
                  onClick={() => {
                    setAnimationsOn((v) => !v);
                    setReloadKey((n) => n + 1);
                  }}
                >
                  <span className="prototype-flow__toggle-copy">
                    <MotionIcon on={animationsOn} />
                    Motion
                  </span>
                  <span className="prototype-flow__switch" aria-hidden>
                    <span className="prototype-flow__switch-knob" />
                  </span>
                </button>
              </div>
            </div>
            </div>
          </div>

          <CaseSegmentedControl
            label="Flow"
            value={flow}
            options={FLOW_OPTIONS}
            onChange={selectFlow}
          />
          <CaseSegmentedControl
            label="Toast"
            value={toast}
            options={TOAST_OPTIONS}
            onChange={setToast}
            note={
              toast === "success"
                ? "Appears after you leave and reopen the app, when a referred friend has joined. Outside-app steps aren't built here."
                : undefined
            }
          />
          <CaseSegmentedControl
            label="Track Referral"
            value={trackState}
            options={TRACK_OPTIONS}
            onChange={setTrackState}
            disabled={!trackSelected}
            disabledHint="Available for Track Referral flow"
          />
        </aside>
      </div>
    </PrototypePrefsProvider>
  );
}
