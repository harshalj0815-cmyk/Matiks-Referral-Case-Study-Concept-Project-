export type TextPart = {
  text: string;
  highlight?: boolean;
  emphasis?: boolean;
};

export type StackPart = {
  id: string;
  partTitle: string;
  as?: "h2" | "h3";
  descriptionParts: TextPart[];
  moreParagraphs?: TextPart[][];
  asBullets?: boolean;
  visualCaption: string;
  visualSrc?: string;
  visualAlt?: string;
  /** Min height for tall stacked visuals (width stays board width). */
  visualMinHeight?: number;
  /** Override slot corner radius. Use 0 for square corners. */
  visualRadius?: number | string;
  links?: { label: string; href: string }[];
};

export type StackSection = {
  id: string;
  label: string;
  sectionTitle: string;
  parts: StackPart[];
};

export const hero = {
  sectionTitle: "Thumbnail",
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
  visualCaption: "Share the Thrill: Matiks Referral at Excite Moments",
  visualSrc: "/case/thumbnail.png",
  visualAlt:
    "Share the Thrill: Matiks Referral at Excite Moments — concept case study cover with phones and mascot",
};

export const featureContext: StackSection = {
  id: "feature-context",
  label: "Feature Context",
  sectionTitle: "Feature Context",
  parts: [
    {
      id: "what-is-feature",
      partTitle: "What is the feature?",
      as: "h2",
      descriptionParts: [
        { text: "Referral here is a " },
        { text: "situation-based slide-up", highlight: true },
        {
          text: ". It asks players to share what they just felt by ",
        },
        {
          text: "referring friends and family with a tracked invite, instead of only recommending the game in conversation",
          highlight: true,
        },
        {
          text: ". It shows up in the regular flow of play, ",
        },
        { text: "after a good moment in the game", highlight: true },
        {
          text: ", while that feeling is still fresh.",
        },
      ],
      visualCaption: "Peak moment → refer ask → invite sent.",
      visualSrc: "/case/what-is-feature.png",
      visualAlt:
        "What is the feature: peak moment, refer ask with reward discovery, then invite sent",
      visualRadius: 0,
      visualMinHeight: 540,
    },
    {
      id: "context",
      partTitle: "Where it sits?",
      as: "h3",
      descriptionParts: [
        { text: "For habitual players, the feature " },
        { text: "sits in daily flow", highlight: true },
        {
          text: ", not tucked into a Settings corner they have to go hunting for. The ",
        },
        { text: "slide-ups show up in certain situations", highlight: true },
        {
          text: ": winning a close game, breaking your own puzzle completion record, or hitting a 50 day or 100 day streak. Even in that regular rhythm, the ask is capped so those slide-ups only ",
        },
        {
          text: "appear once a week for any one of the situations",
          highlight: true,
        },
        { text: "." },
      ],
      visualCaption: "Excite moments in daily play — close win, personal best, streak.",
      visualSrc: "/case/where-it-sits.png",
      visualAlt:
        "Where it sits: referral slide-ups in daily play for close win, personal best, and streak",
    },
  ],
};

export const problemSection = {
  id: "problem",
  label: "Problem",
  sectionTitle: "Specific problem this feature solves",
  partTitle: "Problem with the current referral feature",
  descriptionParts: [
    { text: "Problem Statement: ", emphasis: true },
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
  ] as TextPart[],
  visualCaption: "Interview quotes on talk-only share, late discovery, math pitch, and Play Store.",
  visualSrc: "/case/problem.png",
  visualAlt:
    "Problem evidence: six interview sticky notes on Play Store share, late discovery, math pitch, unused referrals, settings find, and Hindi Play Store note",
  solves: {
    id: "how-redesign-solves-it",
    partTitle: "How redesign solves it",
    descriptionParts: [
      { text: "These moments are when players are " },
      { text: "most excited and most willing to refer", highlight: true },
      {
        text: ". A close win feels like success worth sharing. A personal best on a puzzle, or a streak milestone, carries the same charge of having done something. Timing the ask there makes ",
      },
      { text: "a real refer more likely", highlight: true },
      {
        text: ". People who arrived through a referral get their own slide-up later, asking them to refer someone. That is how the ",
      },
      { text: "acquisition loop continues", highlight: true },
      { text: "." },
    ] as TextPart[],
    visualCaption: "Peak moments — thrill, pride, sense of achievement — and the refer ask.",
    visualSrc: "/case/how-it-works.png",
    visualAlt:
      "How redesign solves it: three referral slide-ups for close win, personal best, and streak milestone",
  },
};

export const researchSection: StackSection = {
  id: "research",
  label: "Research",
  sectionTitle: "Research",
  parts: [
    {
      id: "qualitative",
      partTitle: "Qualitative research",
      as: "h2",
      descriptionParts: [
        {
          text: "I spoke with habitual Matiks players I already knew, and others from Discord and LinkedIn. Calls were transcribed, broken into atomic notes, and sorted into ",
        },
        { text: "affinity clusters", highlight: true },
        {
          text: " around share and refer friction. Five clusters came out of that work. The ones I kept were where friends lose interest after a bad pitch, and where people stick to ",
        },
        {
          text: "talk or Play Store instead of the referral link",
          highlight: true,
        },
        {
          text: ". Refer also looked ",
        },
        { text: "hard to notice", highlight: true },
        {
          text: " in normal play, so discoverability stayed as an in-the-moment issue. I demoted the stronger claim that nobody knows the feature exists.",
        },
      ],
      visualCaption: "Affinity clusters from interview notes — keep, demote, eliminate.",
      visualSrc: "/case/qualitative.png",
      visualAlt:
        "Qualitative research: affinity cluster cards from interview notes showing keep, demote, and eliminate themes",
    },
    {
      id: "quantitative",
      partTitle: "Quantitative research",
      as: "h3",
      descriptionParts: [
        {
          text: "Quantitative research was a survey meant to ",
        },
        { text: "triangulate", highlight: true },
        {
          text: " what the interviews had shown. Responses came from Reddit, Discord, in-game chat, LinkedIn, and friends. Early replies were few and did not line up with qualitative research, so the sample got expanded. Even then, a lot of people said they ",
        },
        { text: "already knew refer existed", highlight: true },
        {
          text: ", which sat oddly next to interviews where it was ",
        },
        { text: "hard to discover", highlight: true },
        {
          text: ". Some of that gap may be priming, or people who don't want to look uninformed. I still moved ahead on the qualitative signal that discoverability was the real issue in play.",
        },
      ],
      visualCaption: "Survey vs interview tension on refer awareness.",
      visualSrc: "/case/quantitative.png",
      visualAlt:
        "Quantitative research: survey findings contrasted with interview discoverability tension",
    },
    {
      id: "insights",
      partTitle: "Insights",
      as: "h3",
      descriptionParts: [
        {
          text: "After the research, the main issue looked like ",
        },
        { text: "discoverability", highlight: true },
        {
          text: ". Few people were already referring through direct conversation, often because they were unaware of the feature, and because it sat deep inside Settings. The interview clusters also pointed at how to implement referral. Users get ",
        },
        { text: "excited at a particular moment", highlight: true },
        {
          text: " in the app. They also want to ",
        },
        { text: "share at a particular moment", highlight: true },
        { text: "." },
      ],
      visualCaption: "Player excitement triggers and Matiks referral experiences.",
      visualSrc: "/case/insights.png",
      visualAlt:
        "Insights: AI summaries of player excitement triggers and Matiks referral experiences with interview sticky notes",
    },
  ],
};

export const ideationSection: StackSection = {
  id: "ideation",
  label: "Ideation",
  sectionTitle: "Ideation",
  parts: [
    {
      id: "idea-explore",
      partTitle: "Idea explore",
      as: "h2",
      descriptionParts: [
        {
          text: "Before locking situation slide-ups, I explored a ",
        },
        { text: "wide set of referral ideas", highlight: true },
        {
          text: " on paper. One early bet was ",
        },
        { text: "streak revoke", highlight: true },
        {
          text: ", where referrals would help restore a long broken streak. There was a ",
        },
        { text: "browser trial", highlight: true },
        {
          text: " so friends could try before install, and a ",
        },
        { text: "Play Store Instant option", highlight: true },
        {
          text: " that was removed by Play Store earlier. Another direction was a ",
        },
        { text: "Hyrox-like monthly tournament", highlight: true },
        {
          text: ": an event you enter with a ticket, and that ticket comes from referring someone. More ideas showed up along the way. Most died on research or platform limits. What stayed pointed at refer in play, rather than building a whole new acquisition product around events or trials.",
        },
      ],
      visualCaption: "Paper ideas and killed bets.",
      visualSrc: "/case/idea-explore.png",
      visualAlt:
        "Idea explore: paper referral ideas including streak revoke, browser trial, Play Store Instant, and Hyrox-like tournament",
    },
    {
      id: "design-iterations",
      partTitle: "Design iterations",
      as: "h3",
      descriptionParts: [
        {
          text: "Design iterations were about tightening the pieces once the direction was clearer. I explored a lot of ",
        },
        { text: "card variations", highlight: true },
        {
          text: ", both look and feel and what the card could do, plus options for the CTA, ",
        },
        { text: "copywriting", highlight: true },
        {
          text: " variants, and multiple toast treatments. Separately, because I was building on the previous version of the Matiks app, I also redesigned the ",
        },
        { text: "victory and puzzle completion", highlight: true },
        {
          text: " screens the slide-up would ride on.",
        },
      ],
      visualCaption: "Component explorations — cards, CTA, copy, toast, and tiles.",
    },
  ],
};

export const decisionsSection: StackSection = {
  id: "decisions",
  label: "Decisions",
  sectionTitle: "Key design decisions",
  parts: [
    {
      id: "decisions-calls",
      partTitle: "Decisions",
      as: "h2",
      descriptionParts: [
        {
          text: "Some of the important calls sat outside pure layout. I decided referred players should ",
        },
        { text: "start with a non-math first game", highlight: true },
        {
          text: " after the existing tutorial, so the first taste is not a cold math pitch. I decided that when someone shares a refer, it should ",
        },
        { text: "go out with the visual", highlight: true },
        {
          text: " from that moment, so the invite carries what they just felt, not only a bare link. I also decided that if a player leaves the app to refer, they get a ",
        },
        { text: "return nudge within about five minutes", highlight: true },
        {
          text: ", so the loop does not die in another app's share sheet.",
        },
      ],
      visualCaption: "Decision board / FigJam. Visual not in yet.",
    },
    {
      id: "trade-offs",
      partTitle: "Trade-offs",
      as: "h3",
      descriptionParts: [
        {
          text: "I chose refer slide-ups after peak moments in play over a ",
        },
        { text: "streak-revoke referral feature", highlight: true },
        {
          text: " because survey data showed people ",
        },
        { text: "do not miss streaks very often", highlight: true },
        {
          text: ". The trade-off I accepted was a possible hit to how many people ",
        },
        { text: "start a new game right away", highlight: true },
        {
          text: ". That was acceptable because the metric is referrals per person per month, core play is a guardrail that must not get worse, and the ask only ",
        },
        { text: "appears about once a week", highlight: true },
        { text: "." },
      ],
      visualCaption: "Chosen path vs killed options. Visual not in yet.",
    },
  ],
};

export const finalDesignSection: StackSection = {
  id: "final-design",
  label: "Final design",
  sectionTitle: "Final feature design",
  parts: [
    {
      id: "final-feature-design",
      partTitle: "Final feature design",
      as: "h2",
      descriptionParts: [
        {
          text: "This is an ",
        },
        { text: "interactive prototype", highlight: true },
        {
          text: " of the locked direction: ",
        },
        { text: "refer at peak moments", highlight: true },
        {
          text: ", with the follow-on beats in the flow. You can ",
        },
        { text: "drive the states yourself", highlight: true },
        {
          text: ". A few moments have light sound, and the motion is tuned so the slide-ups and toasts feel like the app, not a slideshow. Built as a concept on Matiks patterns, not the live product.",
        },
      ],
      visualCaption: "Interactive prototype",
    },
  ],
};

export const edgeCasesSection: StackSection = {
  id: "edge-cases",
  label: "Edge cases",
  sectionTitle: "Edge cases",
  parts: [
    {
      id: "edge-states",
      partTitle: "Edge cases and state designs",
      as: "h2",
      descriptionParts: [
        {
          text: "Refer looks fine on the happy path. These frames cover the awkward ones: an ",
        },
        { text: "Invite fail", highlight: true },
        {
          text: " when something breaks on the technical or server side, a ",
        },
        { text: "slow internet state", highlight: true },
        {
          text: ", and a prompt to get back into the app after someone leaves to refer. Referral tracking needs a ",
        },
        { text: "UI skeleton", highlight: true },
        {
          text: " while data is loading, and an ",
        },
        { text: "empty state", highlight: true },
        {
          text: " when there is nothing to show yet. If someone taps refer again before anything happens, ",
        },
        { text: "Sending invite", highlight: true },
        {
          text: " copy shows so they know the action is working.",
        },
      ],
      visualCaption: "Edge states — skeleton, empty, sending, network, invite fail.",
      visualSrc: "/case/edge-case.png",
      visualAlt:
        "Edge cases: UI skeleton, empty track referral, sending invite, network toast, and invite fail toast",
      // Tall stacked frames (~2.5× board width); grow height, keep width.
      visualMinHeight: 2200,
    },
  ],
};

export const handoffSection: StackSection = {
  id: "handoff",
  label: "Handoff",
  sectionTitle: "Handoff",
  parts: [
    {
      id: "handoff-files",
      partTitle: "Handoff",
      as: "h2",
      descriptionParts: [
        { text: "Figma", highlight: true },
        {
          text: " has the screens and components; ",
        },
        { text: "FigJam", highlight: true },
        {
          text: " has the flows and decision boards. Links below.",
        },
      ],
      visualCaption: "",
      links: [
        {
          label: "Figma",
          href: "https://www.figma.com/design/eqalWEMDFEKbkyeZecVBLE/Matiks-Referral-Redesign?node-id=0-1&t=1JZUuq6d5cS9sjA5-1",
        },
        {
          label: "FigJam",
          href: "https://www.figma.com/board/kYKxqf1OaoS9LU3FGPNTRU/Matiks-Research?node-id=0-1&t=Q7OYH6FMkroe2NWw-1",
        },
      ],
    },
  ],
};

export const learningsSection: StackSection = {
  id: "learnings",
  label: "Learnings",
  sectionTitle: "Learnings",
  parts: [
    {
      id: "learnings-body",
      partTitle: "Learnings",
      as: "h2",
      asBullets: true,
      descriptionParts: [
        {
          text: "The assumptions I make before starting are ",
        },
        { text: "rarely the best decision", highlight: true },
        {
          text: ". Streak revoke looked clever until the survey showed people do not miss streaks that often, and the bet had to move to refer in play.",
        },
      ],
      moreParagraphs: [
        [
          { text: "Interviews and surveys can disagree", highlight: true },
          {
            text: ", and that disagreement is useful. Quantitative replies said many people already knew refer existed; qualitative work still showed it was hard to discover in normal play. Sitting with that tension beat picking the flattering number.",
          },
        ],
        [
          {
            text: "Putting the ask at peak moments helps a tracked refer land, but it ",
          },
          {
            text: "costs something on the path to the next game",
            highlight: true,
          },
          {
            text: ". Caps, empty states, and fail toasts are part of the design, not leftovers.",
          },
        ],
        [
          {
            text: "Building the prototype with AI and Paper (from Figma), plus light sound (UISFX and SoundCN) and tuned motion, made it easier to show the flow instead of only describing it.",
          },
        ],
      ],
      visualCaption: "",
    },
  ],
};

/** Open-stack sections in page order (after thumbnail). */
export const stackSections: StackSection[] = [
  featureContext,
  researchSection,
  ideationSection,
  decisionsSection,
  finalDesignSection,
  edgeCasesSection,
  handoffSection,
  learningsSection,
];

export const sections = [
  { id: "thumbnail", label: "Thumbnail" },
  { id: "feature-context", label: "Feature Context" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "ideation", label: "Ideation" },
  { id: "decisions", label: "Decisions" },
  { id: "final-design", label: "Final design" },
  { id: "edge-cases", label: "Edge cases" },
  { id: "handoff", label: "Handoff" },
  { id: "learnings", label: "Learnings" },
] as const;
