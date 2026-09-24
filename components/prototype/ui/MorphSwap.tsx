"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePrototypePrefs } from "@/components/prototype/PrototypePrefs";

type MorphLayer = {
  fingerprint: string;
  children: ReactNode;
};

/** Cube-flip swap when `fingerprint` changes. */
export default function MorphSwap({
  fingerprint,
  enabled = true,
  children,
}: {
  fingerprint: string;
  enabled?: boolean;
  children: ReactNode;
}) {
  const { animationsOn } = usePrototypePrefs();
  const live = enabled && animationsOn;
  const [active, setActive] = useState<MorphLayer>({ fingerprint, children });
  const [leaving, setLeaving] = useState<MorphLayer | null>(null);
  const [showEnter, setShowEnter] = useState(true);
  const [leaveActive, setLeaveActive] = useState(false);

  useEffect(() => {
    if (fingerprint === active.fingerprint) return;

    if (!live) {
      setActive({ fingerprint, children });
      setLeaving(null);
      setLeaveActive(false);
      setShowEnter(true);
      return;
    }

    setLeaving(active);
    setLeaveActive(false);
    setActive({ fingerprint, children });
    setShowEnter(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLeaveActive(true);
        setShowEnter(true);
      });
    });
    const done = window.setTimeout(() => {
      setLeaving(null);
      setLeaveActive(false);
    }, 220);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fingerprint-gated
  }, [fingerprint, live]);

  if (!live) {
    return (
      <span className="mk-morph mk-morph--static">{active.children}</span>
    );
  }

  return (
    <span className="mk-morph">
      {leaving ? (
        <span
          key={`leave-${leaving.fingerprint}`}
          className={`mk-morph__layer${leaveActive ? " mk-morph__layer--leave" : ""}`}
        >
          {leaving.children}
        </span>
      ) : null}
      <span
        key={active.fingerprint}
        className={`mk-morph__layer${showEnter ? " mk-morph__layer--show" : " mk-morph__layer--enter"}`}
      >
        {active.children}
      </span>
    </span>
  );
}
