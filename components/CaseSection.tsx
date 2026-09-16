import type { TextPart } from "@/content/case";
import { aboutProduct, hero } from "@/content/case";

const green = "#16c45a";
const ink = "#282828";
const mute = "#969696";
const wash = "#f4f4f4";

function Description({
  parts,
  marginBottom = 48,
}: {
  parts: TextPart[];
  marginBottom?: number;
}) {
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
      {parts.map((part, i) => {
        if (part.emphasis) {
          return (
            <span
              key={i}
              style={{ color: ink, fontWeight: 600 }}
            >
              {part.text}
            </span>
          );
        }
        if (part.highlight) {
          return (
            <span key={i} style={{ color: green, fontWeight: 500 }}>
              {part.text}
            </span>
          );
        }
        return <span key={i}>{part.text}</span>;
      })}
    </p>
  );
}

function VisualSlot({
  caption,
  minHeight = 420,
  fill = false,
}: {
  caption: string;
  minHeight?: number;
  fill?: boolean;
}) {
  return (
    <div
      style={{
        background: wash,
        borderRadius: 48,
        minHeight: fill ? 0 : minHeight,
        flex: fill ? 1 : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        width: "100%",
      }}
    >
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
    </div>
  );
}

export function ProjectThumbnailSection() {
  return (
    <section
      id="top"
      style={{
        height: "calc(100svh - 88px)",
        boxSizing: "border-box",
        paddingTop: 100,
        paddingBottom: 24,
        display: "flex",
        flexDirection: "column",
        scrollMarginTop: 96,
      }}
    >
      <VisualSlot caption={hero.visualCaption} fill />
    </section>
  );
}

export function AboutProductSection() {
  return (
    <section
      id="about-product"
      style={{ paddingBottom: 96, scrollMarginTop: 96 }}
    >
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
        {aboutProduct.sectionTitle}
      </p>
      <h2
        style={{
          margin: "0 0 16px",
          fontSize: "clamp(34px, 5vw, 48px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          textAlign: "left",
          color: ink,
        }}
      >
        {aboutProduct.partTitle}
      </h2>
      <Description
        parts={aboutProduct.product.introParts}
        marginBottom={10}
      />
      <Description parts={aboutProduct.product.whyParts} marginBottom={16} />
      <VisualSlot caption={aboutProduct.product.visualCaption} />

      <div id="feature" style={{ marginTop: 80, scrollMarginTop: 96 }}>
        <h3
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(32px, 4.5vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            textAlign: "left",
            color: ink,
          }}
        >
          {aboutProduct.feature.partTitle}
        </h3>
        <Description
          parts={aboutProduct.feature.descriptionParts}
          marginBottom={16}
        />
        <VisualSlot caption={aboutProduct.feature.visualCaption} />
      </div>
    </section>
  );
}
