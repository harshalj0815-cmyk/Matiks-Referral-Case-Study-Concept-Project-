"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { StackPart, StackSection, TextPart } from "@/content/case";
import {
  hero,
  problemSection,
  stackSections,
} from "@/content/case";

const green = "#16c45a";
const ink = "#282828";
const mute = "#555555";
const wash = "#f4f4f4";
const pageBg = "#f5f5f7";
/** Scales with image width so corners stay proportional on mobile. */
const mediaRadius = "clamp(16px, 4.5vw, 48px)";

function TextSpans({ parts }: { parts: TextPart[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.emphasis) {
          return (
            <span key={i} style={{ color: ink, fontWeight: 600 }}>
              {part.text}
            </span>
          );
        }
        if (part.highlight) {
          return (
            <span
              key={i}
              style={{
                color: ink,
                fontWeight: 500,
                background: "#DFFBBF",
                borderRadius: 6,
                padding: "0.08em 0.28em",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}
            >
              {part.text}
            </span>
          );
        }
        return <span key={i}>{part.text}</span>;
      })}
    </>
  );
}

function ExpandableBlock({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setExpanded(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = bodyRef.current;
    if (!node || !isMobile) {
      setClamped(false);
      return;
    }

    const measure = () => {
      if (expanded) return;
      setClamped(node.scrollHeight > node.clientHeight + 1);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [expanded, children, isMobile]);

  const collapsed = isMobile && !expanded;
  const showToggle = isMobile && (clamped || expanded);

  return (
    <div
      style={{
        position: "relative",
        marginBottom: 16,
        fontSize: 17,
        lineHeight: 1.7,
      }}
    >
      <div
        ref={bodyRef}
        className={collapsed ? "expandable-body is-collapsed" : "expandable-body"}
        style={
          collapsed
            ? {
                maxHeight: "calc(1.7em * 4)",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {children}
      </div>
      {showToggle && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            height: "1.7em",
            margin: 0,
            padding: "0 0 0 2.75em",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            background: `linear-gradient(to right, transparent, ${pageBg} 32%)`,
            color: ink,
            fontSize: 17,
            fontWeight: 700,
            fontFamily: "inherit",
            lineHeight: 1.7,
            cursor: "pointer",
          }}
        >
          Read more
        </button>
      ) : null}
      {showToggle && expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-expanded={true}
          style={{
            margin: "6px 0 0",
            padding: 0,
            border: "none",
            background: "transparent",
            color: ink,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Show less
        </button>
      ) : null}
    </div>
  );
}

function Description({
  parts,
  marginBottom = 48,
}: {
  parts: TextPart[];
  marginBottom?: number;
}) {
  if (!parts.length) return null;
  return (
    <p
      style={{
        margin: `0 0 ${marginBottom}px`,
        fontSize: 17,
        fontWeight: 400,
        lineHeight: 1.7,
        color: mute,
        width: "100%",
        textAlign: "left",
      }}
    >
      <TextSpans parts={parts} />
    </p>
  );
}

function BulletList({ items }: { items: TextPart[][] }) {
  return (
    <ul
      style={{
        margin: 0,
        padding: "0 0 0 1.35em",
        fontSize: 17,
        fontWeight: 400,
        lineHeight: 1.7,
        color: mute,
        width: "100%",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {items.map((parts, index) => (
        <li key={index} style={{ paddingLeft: 4 }}>
          <TextSpans parts={parts} />
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: number;
  children: string;
}) {
  return (
    <p
      style={{
        margin: "0 0 36px",
        fontSize: "clamp(18px, 2.5vw, 22px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        color: green,
        lineHeight: 1.1,
      }}
    >
      {number}. {children}
    </p>
  );
}

function PartTitle({
  as = "h2",
  children,
}: {
  as?: "h2" | "h3";
  children: string;
}) {
  const Tag = as;
  return (
    <Tag
      style={{
        margin: "0 0 16px",
        fontSize:
          as === "h2"
            ? "clamp(34px, 5vw, 48px)"
            : "clamp(32px, 4.5vw, 44px)",
        fontWeight: 800,
        lineHeight: as === "h2" ? 1.05 : 1.08,
        letterSpacing: as === "h2" ? "-0.04em" : "-0.03em",
        textAlign: "left",
        color: ink,
      }}
    >
      {children}
    </Tag>
  );
}

function VisualSlot({
  caption,
  minHeight = 420,
  fill = false,
  src,
  alt,
}: {
  caption: string;
  minHeight?: number;
  fill?: boolean;
  src?: string;
  alt?: string;
}) {
  return (
    <div
      style={{
        background: src ? "transparent" : wash,
        borderRadius: mediaRadius,
        minHeight: fill ? 0 : src ? undefined : minHeight,
        flex: fill ? 1 : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: src ? 0 : 32,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || caption}
          style={{
            display: "block",
            width: "100%",
            height: fill ? "100%" : "auto",
            minHeight: fill ? 0 : undefined,
            objectFit: fill ? "cover" : "contain",
          }}
        />
      ) : (
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 400,
            color: mute,
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

function LinkRow({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 16,
      }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: ink,
            background: "#DFFBBF",
            borderRadius: 999,
            padding: "10px 16px",
            textDecoration: "none",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function ProjectThumbnailSection() {
  return (
    <section
      id="thumbnail"
      style={{
        boxSizing: "border-box",
        width: "min(1100px, calc(100% - 48px))",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "88px 0 16px",
        display: "flex",
        flexDirection: "column",
        scrollMarginTop: 96,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.visualSrc}
        alt={hero.visualAlt}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: mediaRadius,
        }}
      />
    </section>
  );
}

function OpenStackPart({
  part,
  showVisual = true,
}: {
  part: StackPart;
  showVisual?: boolean;
}) {
  const trailingParas = part.moreParagraphs ?? [];
  const bulletItems = part.asBullets
    ? [part.descriptionParts, ...trailingParas]
    : null;

  return (
    <div id={part.id} style={{ scrollMarginTop: 96 }}>
      <PartTitle as={part.as ?? "h2"}>{part.partTitle}</PartTitle>
      <ExpandableBlock>
        {bulletItems ? (
          <BulletList items={bulletItems} />
        ) : (
          <>
            <Description
              parts={part.descriptionParts}
              marginBottom={trailingParas.length ? 10 : 0}
            />
            {trailingParas.map((parts, index) => (
              <Description
                key={index}
                parts={parts}
                marginBottom={
                  index === trailingParas.length - 1 ? 0 : 10
                }
              />
            ))}
          </>
        )}
      </ExpandableBlock>
      {part.links?.length ? <LinkRow links={part.links} /> : null}
      {showVisual ? (
        <VisualSlot caption={part.visualCaption} />
      ) : null}
    </div>
  );
}

export function OpenStackSection({
  section,
  number,
  isLast = false,
}: {
  section: StackSection;
  number: number;
  isLast?: boolean;
}) {
  return (
    <section
      id={section.id}
      style={{
        paddingTop: 64,
        paddingBottom: isLast ? 96 : 64,
        scrollMarginTop: 96,
      }}
    >
      <SectionLabel number={number}>{section.sectionTitle}</SectionLabel>
      {section.parts.map((part, index) => (
        <div key={part.id}>
          {index > 0 ? <div style={{ height: 80 }} /> : null}
          <OpenStackPart part={part} />
        </div>
      ))}
    </section>
  );
}

export function ProblemSection({ number }: { number: number }) {
  return (
    <section
      id={problemSection.id}
      style={{ paddingTop: 64, paddingBottom: 64, scrollMarginTop: 96 }}
    >
      <SectionLabel number={number}>{problemSection.sectionTitle}</SectionLabel>
      <PartTitle>{problemSection.partTitle}</PartTitle>
      <ExpandableBlock>
        <Description
          parts={problemSection.descriptionParts}
          marginBottom={10}
        />
        <Description
          parts={problemSection.implicationParts}
          marginBottom={0}
        />
      </ExpandableBlock>
      <VisualSlot caption={problemSection.visualCaption} />

      <div style={{ height: 80 }} />
      <div id={problemSection.solves.id} style={{ scrollMarginTop: 96 }}>
        <PartTitle as="h3">{problemSection.solves.partTitle}</PartTitle>
        <ExpandableBlock>
          <Description
            parts={problemSection.solves.descriptionParts}
            marginBottom={0}
          />
        </ExpandableBlock>
        <VisualSlot caption={problemSection.solves.visualCaption} />
      </div>
    </section>
  );
}

export function CaseStudyBody() {
  const feature = stackSections[0];
  const afterProblem = stackSections.slice(1);

  return (
    <>
      <OpenStackSection section={feature} number={1} />
      <ProblemSection number={2} />
      {afterProblem.map((section, index) => (
        <OpenStackSection
          key={section.id}
          section={section}
          number={index + 3}
          isLast={index === afterProblem.length - 1}
        />
      ))}
    </>
  );
}
