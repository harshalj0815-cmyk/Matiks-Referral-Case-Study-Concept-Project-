"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent,
} from "react";

const ink = "#282828";
const mute = "#555555";
const AUTOPLAY_MS = 4200;
/** On-screen slide — matches prototype --ease-in-out */
const SLIDE_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
const SLIDE_MS = 280;

export type CarouselSlide = {
  src: string;
  alt: string;
  /** Overrides frameWidth for this slide (e.g. icon vs text button). */
  width?: number;
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={dir === "left" ? "M9 2.5L4.5 7L9 11.5" : "M5 2.5L9.5 7L5 11.5"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IterationCarousel({
  slides,
  label,
  frameWidth,
  showCounter = true,
  autoplay = true,
  /** Stagger start so board carousels don't advance in lockstep. */
  autoplayOffset = 0,
  arrowInset = -28,
}: {
  slides: CarouselSlide[];
  label: string;
  frameWidth: number;
  showCounter?: boolean;
  autoplay?: boolean;
  autoplayOffset?: number;
  arrowInset?: number;
}) {
  const count = slides.length;
  // Track: [cloneLast, ...slides, cloneFirst] — index 1 is first real slide
  const [trackIndex, setTrackIndex] = useState(1);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useRef(false);
  const jumping = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const sync = () => {
      reduceMotion.current = mq.matches;
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Always 0..count-1 — safe even if trackIndex drifts past the clones. */
  const realIndex =
    count < 1 ? 0 : (((trackIndex - 1) % count) + count) % count;

  const snapFromClone = (index: number) => {
    if (count < 2 || jumping.current) return;
    if (index >= count + 1) {
      jumping.current = true;
      setAnimating(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          jumping.current = false;
          setAnimating(true);
        });
      });
    } else if (index <= 0) {
      jumping.current = true;
      setAnimating(false);
      setTrackIndex(count);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          jumping.current = false;
          setAnimating(true);
        });
      });
    }
  };

  // Snap clones after the slide finishes — timeout covers missed transitionend
  useEffect(() => {
    if (count < 2) return;
    if (trackIndex > 0 && trackIndex < count + 1) return;

    if (reduceMotion.current) {
      snapFromClone(trackIndex);
      return;
    }

    const id = window.setTimeout(
      () => snapFromClone(trackIndex),
      SLIDE_MS + 40,
    );
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when track lands on a clone / out of range
  }, [trackIndex, count]);

  useEffect(() => {
    if (!autoplay || count < 2 || paused) return;
    if (reduceMotion.current) return;

    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        // Skip a beat during silent wrap — don't tear down the interval
        if (jumping.current) return;
        setAnimating(true);
        setTrackIndex((i) => i + 1);
      }, AUTOPLAY_MS);
    }, autoplayOffset);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [autoplay, autoplayOffset, count, paused]);

  if (!count) return null;

  const loopSlides =
    count < 2
      ? slides
      : [slides[count - 1], ...slides, slides[0]];

  const trackCount = loopSlides.length;

  const go = (dir: -1 | 1) => {
    if (jumping.current) return;
    setAnimating(true);
    setTrackIndex((i) => i + dir);
  };

  const onTrackTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    snapFromClone(trackIndex);
  };

  const showArrows = count > 1 && (hovered || paused || !autoplay);
  const gutter = Math.max(22, Math.abs(arrowInset));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="iter-carousel"
      onMouseEnter={() => {
        setPaused(true);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(false);
      }}
      onFocusCapture={() => {
        setPaused(true);
        setHovered(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
          setHovered(false);
        }
      }}
      style={{
        /* Content width + side gutters so arrows sit inside the hover hit area */
        width: frameWidth,
        maxWidth: "100%",
        boxSizing: "content-box",
        paddingLeft: gutter,
        paddingRight: gutter,
        marginLeft: -gutter,
        marginRight: -gutter,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "transparent",
            overflow: "hidden",
            width: "100%",
            padding: "4px 0",
            margin: "-4px 0",
          }}
        >
          <div
            onTransitionEnd={onTrackTransitionEnd}
            style={{
              display: "flex",
              width: `${trackCount * 100}%`,
              transform: `translateX(-${(trackIndex * 100) / trackCount}%)`,
              transition:
                animating && !reduceMotion.current
                  ? `transform ${SLIDE_MS}ms ${SLIDE_EASE}`
                  : "none",
            }}
          >
            {loopSlides.map((slide, i) => (
              <div
                key={`${slide.src}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${realIndex + 1} of ${count}`}
                aria-hidden={i !== trackIndex}
                style={{
                  width: `${100 / trackCount}%`,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  padding: "2px 4px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width ?? frameWidth}
                  draggable={false}
                  style={{
                    display: "block",
                    width: slide.width ?? frameWidth,
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label={`Previous ${label}`}
              onClick={() => go(-1)}
              tabIndex={showArrows ? 0 : -1}
              className="iter-carousel__arrow"
              style={arrowStyle("left", showArrows, gutter)}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label={`Next ${label}`}
              onClick={() => go(1)}
              tabIndex={showArrows ? 0 : -1}
              className="iter-carousel__arrow"
              style={arrowStyle("right", showArrows, gutter)}
            >
              <Chevron dir="right" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 && showCounter ? (
        <p
          aria-live="polite"
          style={{
            margin: "6px 0 0",
            fontSize: 11,
            fontWeight: 600,
            color: mute,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          {realIndex + 1} / {count}
        </p>
      ) : null}
    </div>
  );
}

function arrowStyle(
  side: "left" | "right",
  visible: boolean,
  gutter: number,
): CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    /* Sit in the side gutter — outside the component, vertically centered on it */
    [side]: -(gutter - 2),
    transform: "translateY(-50%)",
    width: 22,
    height: 22,
    margin: 0,
    padding: 0,
    border: "none",
    borderRadius: 999,
    background: "#ffffff",
    color: ink,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(40, 40, 40, 0.12)",
    zIndex: 2,
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transition: "opacity 150ms ease",
  };
}
