"use client";

import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import MorphSwap from "@/components/prototype/ui/MorphSwap";

type MatiksChipProps = {
  children: ReactNode;
  leadingIcon?: ReactNode;
  iconOnly?: boolean;
  /** Cube-flip when label/icon change. Default on. */
  morph?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

function imgSrc(node: ReactNode): string {
  if (!isValidElement<{ src?: unknown }>(node)) return "";
  return typeof node.props.src === "string" ? node.props.src : "";
}

function chipFingerprint(label: ReactNode, leadingIcon?: ReactNode) {
  const text =
    typeof label === "string" || typeof label === "number" ? String(label) : "";
  return `${text}|${imgSrc(leadingIcon)}`;
}

const PRESS_MIN_MS = 120;

export default function MatiksChip({
  children,
  leadingIcon,
  iconOnly = false,
  morph = true,
  className = "",
  type = "button",
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  disabled,
  ...rest
}: MatiksChipProps) {
  const fingerprint = chipFingerprint(children, leadingIcon);
  const [pressing, setPressing] = useState(false);
  const downAt = useRef(0);
  const releaseTimer = useRef<number | null>(null);
  const stuck =
    rest["aria-pressed"] === true || rest["aria-pressed"] === "true";

  useEffect(() => {
    return () => {
      if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    };
  }, []);

  function startPress(event: PointerEvent<HTMLButtonElement>) {
    onPointerDown?.(event);
    if (disabled || event.defaultPrevented || event.button !== 0) return;
    if (releaseTimer.current) {
      window.clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
    }
    downAt.current = performance.now();
    setPressing(true);
  }

  function endPress(
    event: PointerEvent<HTMLButtonElement>,
    forward?: (e: PointerEvent<HTMLButtonElement>) => void,
  ) {
    forward?.(event);
    if (!downAt.current) return;
    const held = performance.now() - downAt.current;
    const remain = Math.max(0, PRESS_MIN_MS - held);
    if (remain === 0) {
      setPressing(false);
      downAt.current = 0;
      return;
    }
    const started = downAt.current;
    releaseTimer.current = window.setTimeout(() => {
      if (downAt.current !== started) return;
      setPressing(false);
      downAt.current = 0;
      releaseTimer.current = null;
    }, remain);
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`mk-chip${iconOnly ? " mk-chip--icon" : ""}${stuck ? " mk-chip--pressed" : ""}${pressing ? " mk-chip--pressing" : ""}${className ? ` ${className}` : ""}`}
      onPointerDown={startPress}
      onPointerUp={(e) => endPress(e, onPointerUp)}
      onPointerCancel={(e) => endPress(e, onPointerCancel)}
      onPointerLeave={(e) => endPress(e, onPointerLeave)}
      {...rest}
    >
      <span className="mk-chip__face">
        {iconOnly ? (
          <>
            {leadingIcon ? (
              <span className="mk-chip__icon">{leadingIcon}</span>
            ) : null}
            <span className="sr-only">{children}</span>
          </>
        ) : (
          <MorphSwap fingerprint={fingerprint} enabled={morph}>
            <>
              {leadingIcon ? (
                <span className="mk-chip__icon">{leadingIcon}</span>
              ) : null}
              <span className="mk-chip__label">{children}</span>
            </>
          </MorphSwap>
        )}
      </span>
    </button>
  );
}
