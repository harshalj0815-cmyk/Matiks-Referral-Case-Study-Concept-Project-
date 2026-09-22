export type IterationSlide = {
  src: string;
  alt: string;
  /** Per-slide display width; falls back to the group frameWidth. */
  width?: number;
};

export type IterationGroup = {
  id: string;
  title: string;
  frameWidth: number;
  slides: IterationSlide[];
};

export type CopyVariant = {
  title: string;
  description: string;
};

function slides(
  folder: string,
  prefix: string,
  count: number,
  label: string,
): IterationSlide[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/case/iterations/${folder}/${prefix}-${n}.png`,
      alt: `${label} iteration ${i + 1}`,
    };
  });
}

/**
 * Referral card copy iterations — title + description only (no field labels).
 */
export const copyVariants: CopyVariant[] = [
  {
    title: "Your Turn to Level Someone Up",
    description:
      "Someone believed you'd be great at this, and you were. Now Sero is handing you the mic. Bring in your people and build your own squad of number-crunchers.",
  },
  {
    title: "Pass It On, Champ!",
    description:
      "Remember when a friend dragged you into this math madness? Sero thinks it's your turn to do the dragging. Who's getting the invite, bestie, sibling, that one competitive coworker?",
  },
  {
    title: "The Torch Is Yours Now",
    description:
      "Someone once opened the gate to Numberland for you. Sero says it's tradition that every explorer brings the next one in. Who deserves their own map?",
  },
  {
    title: "Pass It On, Champ!",
    description:
      "A friend brought you into this math madness; now Sero says it's your time to bring someone in too. Invite a friend, and you'll both earn 50 Pi Coins to keep the fun going.",
  },
  {
    title: "50 Days Strong",
    description:
      "That kind of habit is rare. Bring a friend in on it you'll both get 50 Pies.",
  },
  {
    title: "Your Brain Just Leveled Up",
    description:
      "You're getting sharper a friend could too. Invite them and you'll both get 50 Pies.",
  },
  {
    title: "Pass the Thrill, Earn Together",
    description:
      "That was a nail-biter and you made it. Invite a friend and you'll both get 50 Pies.",
  },
];

/** Compact board-scale widths so the full sheet fits one viewport. */
export const iterationGroups = {
  card: {
    id: "card",
    title: "Card",
    frameWidth: 236,
    slides: slides("card", "card", 7, "Card"),
  },
  card2: {
    id: "card-2",
    title: "Card variants",
    frameWidth: 160,
    slides: slides("card-2", "card-2", 4, "Card variant"),
  },
  tile: {
    id: "tile",
    title: "Tile",
    frameWidth: 280,
    slides: slides("tile", "tile", 3, "Tile"),
  },
  cta: {
    id: "cta",
    title: "CTA",
    frameWidth: 240,
    slides: slides("cta", "cta", 5, "CTA"),
  },
  toast: {
    id: "toast",
    title: "Toast",
    frameWidth: 300,
    slides: slides("toast", "toast", 4, "Toast"),
  },
  buttons: {
    id: "buttons",
    title: "Buttons",
    /** Slot fits text buttons; icons keep a smaller per-slide width. */
    frameWidth: 81,
    slides: [
      {
        src: "/case/iterations/buttons/buttons-01.png",
        alt: "Button iteration 1 — icon",
        width: 40,
      },
      {
        src: "/case/iterations/buttons/buttons-02.png",
        alt: "Button iteration 2 — Home",
        width: 81,
      },
      {
        src: "/case/iterations/buttons/buttons-03.png",
        alt: "Button iteration 3 — icon",
        width: 40,
      },
      {
        src: "/case/iterations/buttons/buttons-04.png",
        alt: "Button iteration 4 — icon",
        width: 40,
      },
      {
        src: "/case/iterations/buttons/buttons-05.png",
        alt: "Button iteration 5 — icon",
        width: 40,
      },
      {
        src: "/case/iterations/buttons/buttons-06.png",
        alt: "Button iteration 6 — text button",
        width: 80,
      },
    ],
  },
} as const satisfies Record<string, IterationGroup>;
