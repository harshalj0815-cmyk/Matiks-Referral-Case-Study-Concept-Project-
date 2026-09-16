export const hero = {
  titleParts: [
    { text: "Refer " },
    { text: "inside play", highlight: true },
  ],
  descriptionParts: [
    {
      text: "Habitual Matiks players already tell friends about the game. Tracked referrals still fail when they share the name, send people to Play Store search, or lead with \"math game\".",
    },
  ],
  meta: "Concept case study · Paper to lo-fi · About five screens",
  visualCaption: "Project thumbnail. Screenshot not in yet.",
};

export const brief = {
  sectionTitle: "Brief",
  partTitle: "Refer inside play",
  descriptionParts: [
    {
      text: "A 20 to 25 year old habitual Matiks user struggles with getting friends to try the game (and creating a tracked referral), because they did not know or ",
    },
    { text: "did not find the refer feature", highlight: true },
    { text: " so they only " },
    { text: "share the app name in conversation", highlight: true },
    { text: " or tell them to " },
    { text: "search on the Play Store", highlight: true },
    { text: ", or they " },
    { text: "introduced it as a math game", highlight: true },
    { text: ", so interest dies before giving a try." },
  ],
  visualCaption: "Play to a sent link. Screenshot not in yet.",
};

export const aboutProduct = {
  sectionTitle: "Product Overview",
  partTitle: "What is matiks",
  product: {
    introParts: [
      {
        text: "Matiks is a math gaming app built around ",
      },
      { text: "competition and puzzle-solving", highlight: true },
      {
        text: ". It sharpens your thinking while you play and gives you something better to do than doomscroll. Instead of losing time on your phone, you are actually building a skill.",
      },
    ],
    whyParts: [
      { text: "Why Matiks?", emphasis: true },
      {
        text: " Because I have been ",
      },
      { text: "playing it for more than 300 days", highlight: true },
      {
        text: ", and it has genuinely made me better at mental math. That kind of daily use also means I ",
      },
      { text: "know the app inside out", highlight: true },
      {
        text: ": every feature, every quirk, which made writing this case study a lot easier.",
      },
    ],
    visualCaption: "Product still or play moment. Screenshot not in yet.",
  },
  feature: {
    partTitle: "Refer Feature: Current State",
    descriptionParts: [
      {
        text: "The refer feature ",
      },
      { text: "already exists", highlight: true },
      {
        text: " in Matiks, but it ",
      },
      {
        text: "does not feel like part of the core experience",
        highlight: true,
      },
      {
        text: ". It feels more like an afterthought. Instead of being visible on the main screen, it is ",
      },
      { text: "hidden inside settings", highlight: true },
      {
        text: " or ",
      },
      { text: "tucked into a corner", highlight: true },
      {
        text: " you only find after scrolling around looking for it. For something that could genuinely bring in new users, it deserves a lot more visibility than it currently gets.",
      },
    ],
    visualCaption: "Where refer lives today. Screenshot not in yet.",
  },
};

export type TextPart = {
  text: string;
  highlight?: boolean;
  emphasis?: boolean;
};

export type CaseSectionContent = {
  sectionTitle: string;
  partTitle: string;
  descriptionParts: TextPart[];
  visualCaption: string;
};

export const sections = [
  { id: "about-product", label: "Product Overview", stub: false },
] as const;
