"use client";

import { useState } from "react";
import IPhoneFrame from "@/components/prototype/IPhoneFrame";
import CaseSegmentedControl from "@/components/prototype/CaseSegmentedControl";
import DuelVictoryScreen from "@/components/prototype/screens/DuelVictoryScreen";
import LoomSlideUpScreen from "@/components/prototype/screens/LoomSlideUpScreen";
import PassThrillHikeScreen from "@/components/prototype/screens/PassThrillHikeScreen";
import PuzzleCompletionScreen from "@/components/prototype/screens/PuzzleCompletionScreen";
import TrackReferralScreen from "@/components/prototype/screens/TrackReferralScreen";
import { MatiksToast } from "@/components/prototype/ui";

type FlowId =
  | "slideup1"
  | "slideup2"
  | "slideup3"
  | "slideup4"
  | "track-referral";

type ToastId = "off" | "friend" | "failed" | "wifi";
type TrackState = "full" | "empty";

const FLOW_OPTIONS: { value: FlowId; label: string }[] = [
  { value: "slideup1", label: "SlideUp1" },
  { value: "slideup2", label: "SlideUp2" },
  { value: "slideup3", label: "SlideUp3" },
  { value: "slideup4", label: "SlideUp4" },
  { value: "track-referral", label: "Track Referral" },
];

const TOAST_OPTIONS: { value: ToastId; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "friend", label: "Friend" },
  { value: "failed", label: "Failed" },
  { value: "wifi", label: "Wifi" },
];

const TRACK_OPTIONS: { value: TrackState; label: string }[] = [
  { value: "full", label: "Full" },
  { value: "empty", label: "Empty" },
];

export default function PrototypeFlow() {
  const [flow, setFlow] = useState<FlowId>("slideup1");
  const [toast, setToast] = useState<ToastId>("off");
  const [trackState, setTrackState] = useState<TrackState>("full");

  const trackSelected = flow === "track-referral";

  let screen = null;
  switch (flow) {
    case "slideup1":
      screen = <DuelVictoryScreen autoToast={false} />;
      break;
    case "slideup2":
      screen = <PassThrillHikeScreen autoToast={false} />;
      break;
    case "slideup3":
      screen = <LoomSlideUpScreen />;
      break;
    case "slideup4":
      screen = <PuzzleCompletionScreen />;
      break;
    case "track-referral":
      screen = <TrackReferralScreen empty={trackState === "empty"} />;
      break;
  }

  return (
    <div className="prototype-flow">
      <IPhoneFrame>
        <div className="prototype-flow__stage" key={flow}>
          {screen}
          {toast !== "off" && !trackSelected ? (
            <div className="prototype-flow__toast">
              {toast === "friend" ? <MatiksToast variant="friend" /> : null}
              {toast === "failed" ? <MatiksToast variant="failed" /> : null}
              {toast === "wifi" ? <MatiksToast variant="wifi" /> : null}
            </div>
          ) : null}
        </div>
      </IPhoneFrame>

      <aside className="prototype-flow__controls" aria-label="Prototype controls">
        <CaseSegmentedControl
          label="Flow"
          value={flow}
          options={FLOW_OPTIONS}
          onChange={setFlow}
        />
        <CaseSegmentedControl
          label="Toast"
          value={toast}
          options={TOAST_OPTIONS}
          onChange={setToast}
          disabled={trackSelected}
        />
        <CaseSegmentedControl
          label="Track Referral"
          value={trackState}
          options={TRACK_OPTIONS}
          onChange={setTrackState}
          disabled={!trackSelected}
        />
      </aside>
    </div>
  );
}
