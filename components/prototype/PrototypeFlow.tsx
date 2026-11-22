"use client";

import { useCallback, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Motion01Icon,
  ReloadIcon,
  VolumeHighIcon,
  VolumeMute01Icon,
} from "@hugeicons/core-free-icons";
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

  const resetToStart = useCallback(() => {
    setFlow("slideup1");
    setToast("success");
    setTrackState("full");
    setTrackReturnTo("slideup1");
    setReloadKey((n) => n + 1);
  }, []);

  useEffect(() => {
    setPrototypeSfxEnabled(soundOn);
  }, [soundOn]);

  useEffect(() => {
    let lastResetAt = 0;
    const onReset = () => {
      const now = performance.now();
      if (now - lastResetAt < 600) return;
      lastResetAt = now;
      resetToStart();
    };
    window.addEventListener("matiks-prototype-reset", onReset);
    return () => {
      window.removeEventListener("matiks-prototype-reset", onReset);
    };
  }, [resetToStart]);

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
                <HugeiconsIcon
                  icon={ReloadIcon}
                  size={15}
                  color="currentColor"
                  strokeWidth={1.75}
                />
              </button>
              <div className="prototype-flow__toggles" role="group" aria-label="Tools">
                <button
                  type="button"
                  className={`prototype-flow__toggle${soundOn ? " prototype-flow__toggle--on" : ""}`}
                  aria-pressed={soundOn}
                  onClick={() => setSoundOn(!soundOn)}
                >
                  <span className="prototype-flow__toggle-copy">
                    <HugeiconsIcon
                      icon={VolumeHighIcon}
                      altIcon={VolumeMute01Icon}
                      showAlt={!soundOn}
                      size={15}
                      color="currentColor"
                      strokeWidth={1.75}
                    />
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
                    <HugeiconsIcon
                      icon={Motion01Icon}
                      size={15}
                      color="currentColor"
                      strokeWidth={1.75}
                      style={{ opacity: animationsOn ? 1 : 0.55 }}
                    />
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
