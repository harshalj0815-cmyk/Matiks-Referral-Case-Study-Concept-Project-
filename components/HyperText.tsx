"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type CharacterSet = string[] | readonly string[];

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

const motionElements = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

type MotionTag = keyof typeof motionElements;

type HyperTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  delay?: number;
  as?: MotionTag;
  startOnView?: boolean;
  animateOnHover?: boolean;
  uppercase?: boolean;
  characterSet?: CharacterSet;
} & Omit<HTMLMotionProps<"div">, "children" | "ref">;

export function HyperText({
  children,
  className,
  style,
  duration = 800,
  delay = 0,
  as = "div",
  startOnView = false,
  animateOnHover = true,
  uppercase = false,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[as];

  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const sync = () => {
      reduceMotion.current = mq.matches;
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setDisplayText(children.split(""));
    iterationCount.current = 0;
    if (reduceMotion.current) {
      setIsAnimating(false);
      return;
    }
    if (startOnView) return;
    const t = window.setTimeout(() => setIsAnimating(true), delay);
    return () => window.clearTimeout(t);
  }, [children, delay, startOnView]);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating && !reduceMotion.current) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    if (!startOnView || reduceMotion.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setIsAnimating(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!isAnimating) return;

    if (reduceMotion.current) {
      setDisplayText(children.split(""));
      setIsAnimating(false);
      return;
    }

    const maxIterations = Math.max(children.length, 1);
    const startTime = performance.now();
    let frameId = 0;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      iterationCount.current = progress * maxIterations;

      setDisplayText(
        children.split("").map((letter, index) =>
          letter === " "
            ? letter
            : index <= iterationCount.current
              ? letter
              : characterSet[getRandomInt(characterSet.length)]!,
        ),
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef as never}
      className={className}
      style={style}
      onMouseEnter={handleAnimationTrigger}
      aria-label={children}
      {...props}
    >
      {displayText.map((letter, index) => (
        <span
          key={index}
          style={{
            /* inline (not inline-block) so scramble letters don't reflow the wrap */
            whiteSpace: letter === " " ? "pre" : undefined,
          }}
          aria-hidden
        >
          {uppercase ? letter.toUpperCase() : letter}
        </span>
      ))}
    </MotionComponent>
  );
}
