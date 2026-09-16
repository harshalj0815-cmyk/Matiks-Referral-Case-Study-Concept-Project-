# PRD: Matiks referral case study site

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Draft 4 (one PRD per phase in `/prd`)  
**Phase PRDs:** [`prd/README.md`](prd/README.md)  
**Ship:** Concept case study website on Vercel. This is not a live Matiks feature.  
**Build:** Five phases. Each phase has a slice of the page, a done check, and an explicit stop. Do not start the next phase until the current one passes.

---

## 1. What this is

A single long-form website that tells the Matiks referral project as a case study. A reader should be able to follow, in order: where referral sits in the product, the problem, the research, the ideas that died, the lock, the screens (when images exist), edge cases, handoff, and what was measured or learned.

The site is the product this PRD specifies. The Matiks referral feature is the story the site tells. Matiks itself stays a native store game. We do not ship referral into production from this work.

Source of truth for copy:

- `C:\Users\Harshal\Desktop\Matiks Case Study\SCOPE.md`
- `C:\Users\Harshal\Desktop\Matiks Case Study\RESEARCH.md`
- `C:\Users\Harshal\Desktop\Matiks Case Study\BRIEF.md`
- `C:\Users\Harshal\Desktop\Matiks Case Study\LOG.md`

If a sentence is not in those files, it does not go on the site as a fact. Open items stay open. Screens and research photos arrive from Harshal one by one.

---

## 2. Why it exists

Portfolio / course case study for a feature added to an existing product (Matiks, Type B mind sport).

A recruiter or facilitator should finish the page knowing:

1. The user is a 20- to 25-year-old in Mumbai who already plays and already recommends Matiks in casual conversation.
2. Tracked referrals fail because people share the app name or a Play Store search, or they introduce it as a math game and interest dies before a try.
3. The locked design is Idea 1 (refer at excite moments in play) + Idea 3 light (non-math first game after the existing tutorial) + Idea 19 (later "your turn to share").
4. Earlier bets (refer-to-restore after a streak break; Play Store Instant) were killed with reasons.
5. This remains a concept case study: paper to lo-fi, about five screens, no fake launch numbers.

The number the original bet cares about is referrals per person per month. Core play must not get worse. The site reports that as the intended metric and guardrail. It does not invent a result.

---

## 3. Who it is for

**Primary reader:** hiring manager or design interviewer skimming a case study on a phone or laptop.

**Secondary:** course facilitator checking that the write-up matches SCOPE / RESEARCH / BRIEF / LOG.

**Not a user of this site:** Matiks players. They never see this page as part of the game.

---

## 4. Locked design bar (site)

Bar: Long-form Matiks referral case study. White page, lots of white space, playful but calm, one Matiks-green accent, rounded containers. Each section is a title, a short description, then a visual underneath, unless Harshal changes a given section.

Reference: https://ente.com/ for rhythm (sparse type, rounded cards, one accent). Do not copy Ente's photos, logo, or product copy.

Check: Screenshot the live page next to ente.com. Same white field, one accent, rounded cards, title-copy-visual. All nine sections present. Quotes and clusters match RESEARCH. Locked idea is Idea 1 + Idea 3 light + Idea 19. Scroll weight is about 40% problem (how we found it, how we researched), 40% solutions and iterations, 20% outcome and metrics. `vercel` can deploy.

---

## 5. Goals and non-goals

### Goals

- Host on Vercel as a static / Next.js site.
- Nine sections in a fixed order (section 6), weighted 40 / 40 / 20 (section 5b).
- Copy traceable to the four markdown files.
- Image slots that stay empty until files are provided.
- Readable on desktop first; usable on a phone without a second layout system.
- Sticky section nav so a reader can jump.

### Non-goals

- Shipping referral inside Matiks.
- Redesigning the whole Matiks product, pie/reward economy, ads, or influencer acquisition.
- Recreating every game mode on the web.
- Dark mode.
- Generic purple "SaaS portfolio" look.
- Pretending the restore-streak or Instant-trial bets are still the story.
- Invented post-launch metrics, conversion rates, or "we increased X%".
- Inventing which 2-3 excite moments, which non-math mode, or the exact "few days" for Idea 19. Those are still open in BRIEF.

---

## 5a. Phases

Work is serial. The buildable spec for each phase is a separate PRD:

- [prd/00-spec.md](prd/00-spec.md)
- [prd/01-shell.md](prd/01-shell.md)
- [prd/02-problem.md](prd/02-problem.md)
- [prd/03-solution-outcome.md](prd/03-solution-outcome.md)
- [prd/04-media.md](prd/04-media.md)
- [prd/05-ship.md](prd/05-ship.md)

Index: [prd/README.md](prd/README.md)

| Phase | File | Stop until |
|-------|------|------------|
| 0 | Spec | Harshal accepts bar, 40/40/20 as whole-page weight, section order |
| 1 | Shell | `npm run build`; ente rhythm; empty frames |
| 2 | Problem ~40% | Quotes/clusters/methods match RESEARCH |
| 3 | Solution ~40% + outcome ~20% | No invented screens or live metrics |
| 4 | Media | Each provided file is in its slot |
| 5 | Ship | Harshal asks to deploy |

Do not start a phase until the previous one's PRD "Done" list passes. Detail, in/out, and done checks live in those files, not here. If a phase fails, fix that phase. Do not fill it with later-phase images.

---

## 5b. Content budget (40 / 40 / 20)

This is a page-weight rule for the **whole case study**, not a recipe inside each section. A section is not 40% problem / 40% solution / 20% outcome. `#research` stays research; `#ideation` stays ideas; `#impact` stays outcome. The percentages are the share of the full scroll (copy + visuals) those bands take.

- **40% on the problem:** what it is, how it was found, how research was done, what the notes actually said.
- **40% on the solutions:** ideas, what was thrown away, iterations, the lock, the screens, edge cases.
- **20% on the outcome:** handoff status, the metric we would watch, learnings. Not a fake results dashboard.

Measure as share of scroll height and of visual slots (quotes, tables, images), not as nine equal ente-style blocks.

### Band map

| Band | Share | Anchors | What gets space | What stays thin |
|------|-------|---------|-----------------|-----------------|
| Problem | ~40% | `#context`, `#problem`, `#research` | Methods (9 interviews, survey ~63, what was dropped), clusters C1-C5 with keep/cut/demote, quotes, insights I2-I4, survey vs interview tension, kill-the-bet lines | `#context` is orientation only (a few sentences + one diagram slot). Do not let "where it sits" eat the research. |
| Solution | ~40% | `#ideation`, `#decisions`, `#designs`, `#edges` | Idea grid, thrown-away, survived screens, LOG decision cards, five design slots, open locks | Do not turn decisions into a second research essay. Restore/Instant belong here as killed options, not as a retelling of all notes. |
| Outcome | ~20% | `#handoff`, `#impact` | Metric name, guardrail, what would prove the bet wrong, LOG learnings, "concept / no live numbers" | Handoff is a short checklist. Impact does not grow to 40% by inventing charts. If this band is short because there is no ship data, leave it short. |

Hero (`#top`) sits outside the 40/40/20. It is a landing strip, not a fourth band.

### Layout implications

- `#research` may use several rounded visuals in a row (quote grid, cluster cards, empty slots for research photos). Other sections stay at one visual unless Harshal adds files.
- `#impact` is one compact block. No full-width empty chart pretending there are results.
- Phase 1 shell should not give every section the same `min-height`. Problem/research frames can be taller; impact/handoff frames shorter.
- Sticky nav can group labels: Problem / Solution / Outcome, with the nine anchors still underneath or as the real links.

### What this does not change

- Source-of-truth files.
- No invented metrics to "fill" the last 20%.
- Section order in §6.

---

## 6. Site information architecture

One route: `/`. Optional later: no extra pages unless a screen needs its own URL.

Order on the page:

| ID | Anchor | Band | Section title (sentence case) | Job |
|----|--------|------|-------------------------------|-----|
| 0 | `#top` | (outside) | Hero | Name the project, that it is a concept case study, one-line problem. |
| 1 | `#context` | Problem 40% | Where referral sits | Short: feature inside normal play, not Settings. |
| 2 | `#problem` | Problem 40% | The problem | Locked problem statement and what it means for design. |
| 3 | `#research` | Problem 40% | Research and insight | Bulk of this band: interviews, survey, clusters, quotes, insights. |
| 4 | `#ideation` | Solution 40% | Exploration and ideation | Idea table, what was thrown away, what survived. |
| 5 | `#decisions` | Solution 40% | Design decisions | Why restore and Instant died; why this lock. |
| 6 | `#designs` | Solution 40% | Final feature designs | ~5 screens; empty until images arrive. |
| 7 | `#edges` | Solution 40% | Edge cases and stated design | Open locks, friend without the app, attribution guess. |
| 8 | `#handoff` | Outcome 20% | Handoff | Short: what engineering would need; paper to lo-fi status. |
| 9 | `#impact` | Outcome 20% | Impact, metrics, and learnings | Short: metric, kill conditions, LOG learnings. No fake charts. |

Header: wordmark "Matiks case study". Nav can group Problem / Solution / Outcome, with the nine anchors as the real links. No Sign up / Login (those are Ente chrome; we are not Ente).

Footer: "Concept case study. Not a live Matiks ship." Source file dates: SCOPE 2026-08-03, BRIEF 2026-08-30.

---

## 7. Content requirements by section

Use Harshal's wording. Shorten for the web. Do not upgrade claims.

### 7.0 Hero

**Title:** Refer inside play.

**Accent word:** one phrase in Matiks green, same idea as Ente putting one word in green. Candidate: "inside play" or "refer". Pick one. Do not paint the whole headline green.

**Description:** Habitual 20-25 Matiks players already tell friends about the game. Tracked referrals still fail when they share the name, send people to the Play Store search, or lead with "math game".

**Visual:** Empty rounded slot labeled for a product still or a simple flow diagram. No fake UI.

**Meta:** Concept case study. Paper to lo-fi. About five screens.

### 7.1 Where referral sits

**Band:** Problem 40%. Keep this short so `#research` can carry the weight.

**Title:** Where this sits in the product

**Description:** Matiks is a Type B mind sport. The feature is a referral option in the user's normal play flow, with share copy that does not lead with "math game". Stage: Referral. The working flow (still assumed on the scope card): playing, then a share-ready moment in that flow, then refer, then send, then the friend joins.

**Visual:** Empty slot for a product map or annotated screenshot (home / play / settings vs in-flow prompt). Caption: "Referral is meant to appear during play, not only when someone hunts Settings."

**Must include:** User is 20-25, Mumbai, already recommends through casual conversation. Metric name: referrals per person per month.

**Must not include:** Refer-to-restore as the current bet.

### 7.2 The problem

**Title:** The problem this feature solves

**Description (locked, student words):** A 20-25-year-old habitual Matiks user struggles with getting friends to try the game (and creating a tracked referral), because they didn't know or didn't find the refer feature so they only share the app name in conversation or tell them to search on the Play Store, or they introduced it as a "math game", so interest dies before giving a try.

**Second line (design implication):** The path from "I want my friend to try Matiks" to "my friend actually tries it" has to get shorter and clearer, and that path can't depend on a spoken math pitch or the friend doing the homework alone.

**Visual:** Quote cards (rounded) from RESEARCH, at least:

- U5: "I tell them that it's a maths game, people's reaction was not that good." (n01)
- U5: "I have never used referrals actually. I have just telling them that there is app and we should play it" (n05)
- U7: "No, I just told them that there is a game you can download from Play Store. I never sent them the link or something." (n07)

Keep original grammar in quotes.

**Problem covers:** clusters C2 and C3; C4 as support in the "because". Out: C1. Demoted: C5.

**Rejected problem lines:** B (math only), C (informal path only). Student kept A because B and C each miss one of the two core issues.

### 7.3 Research and insight

**Band:** Problem 40%. Largest section on the page.

**Title:** User research and insight

**Description:** Nine interviews (atomic notes) and a survey of about 63 people. Notes kept are share-friction only. About 40 notes on streaks, favourite games, and play times were dropped because they had no share friction.

**Visual:** Empty slot(s) for research photos Harshal will add (notes, clustering, survey). Until then, show structured quote/cluster blocks, not grey "lorem" phones.

**Clusters (student document indexing):**

- C1 Personal game, not something to share. Eliminated. n21-n22, mostly U4. So-what failed; about one person.
- C2 Friends lose interest (math / not into games). Keep. n01-n04. U1, U5. What they did: introduce Matiks in a way that loses the friend before a try.
- C3 Share by talk / Play Store name, not the referral link. Keep. n05-n11. What they did: share outside the tracked path; friend searches and downloads alone.
- C4 Find referral by chance / not aware. Demoted against the survey. n12-n15. Counterweight: n17, n18, n23. Many people do know or use it. Keep as in-the-moment findability, not "the feature is secret".
- C5 Know a reward exists but not how to use it. Demoted. n19, n20, n24.

**Survey tension (must stay visible):** Most survey respondents say they are aware of refer-a-friend; many report having used it. Among referrers, "Wanted to play with them" and "Liked the reward" show up. Facilitator called this a clash with interview Cluster 4. Student: minority still unaware; some aware still unused; form priming unmeasured. The site must not flatten this into "nobody knows referral exists".

**Insights to show (student-owned wording, shortened only if needed):**

- I2 (C2): Referred people lose interest as soon as they hear it is a "math game", even before trying. Design should reframe how the game is introduced. Ground in U1/U5. Do not say "most".
- I3 (C3): Casual recommendation stays the name of the game; the friend has to search, download, then try, which they often don't. Design should give a clear way to get and try the game.
- I4 (C4, demoted vs survey): Referral can be found by chance, not during normal use. Design should put it in the flow where the user would notice it.
- I1 blank (cluster eliminated). I5 demoted (pies/how to use reward). Do not make I5 the hero.

**Jobs:** J2 and J3 are in scope for the story. J4 is soft (missing feature sitting in the want). J1 dropped with C1. J5 demoted.

**Kill / disprove lines from SCOPE (show near research or impact):** They already find the link and still won't send it. Casual conversation already converts fine. Friends drop for reasons other than search/download effort or the math label.

### 7.4 Exploration and ideation

**Title:** Design exploration and ideation

**Description:** Locked 2026-08-21 then updated 2026-08-30: Idea 1 + Idea 3 light + Idea 19. Process: paper then lo-fi. Concept case study.

**Visual:** Empty slot for paper photos / idea grid. Until then, a rounded table of ideas with status.

**Must list (from BRIEF):**

Kept / locked:

- Idea 1: Refer after a win / in play flow. Move: change when it happens. Score 9. Screens 1-2.
- Idea 3: Referred first open to a less "math" mode. Move: change where you begin. Score 7. Screens 1-2. Light version only: one-screen first-game nudge after the existing tutorial, not a new walkthrough.
- Idea 19: Pay-it-forward card for referred users. Move: change who starts it. Student idea. Score 3. One screen. Parked, then un-parked 2026-08-30.

Out because they already exist in Matiks: Idea 2 (SMS share copy), Idea 6 (spoken share script), Idea 7 (share score card / replay).

Out as copy/surface: Idea 8, Idea 10 (product already owns non-math SMS).

Same move as Idea 1, so Idea 1 kept: Idea 4, 5, 12, 15.

Parked if Idea 1 makes the link the default path: Idea 9, 11, 18.

Deferred: Idea 14 (browser one-round try then Play Store). Heavier; different move.

Merged: Idea 12 into 1; Idea 17 into 3.

**What survived (~5 screens):**

1-3. Refer popup, 2-3 excite moments, interview-based copy/visual variants, one pattern. Job: sharer sends the link at peak moments.
4. Start / suggest a non-math game after the existing tutorial. Job: friend's first play doesn't lead with math.
5. After a few days: "your turn to share". Job: referred person becomes the next sharer.

Optional frame: win celebration then refer (same Idea 1 beat).

**Tradeoffs to name:** variant popups vs one popup; nudge vs full onboarding; Idea 19 amplifies growth and does not fix sharer friction on its own; WhatsApp/Play Store mapped, not designed.

### 7.5 Design decisions

**Title:** Key design decisions and rationale

**Description:** The bet moved when research and platform facts moved.

**Visual:** Timeline or stacked rounded cards (dates from LOG).

**Required decisions:**

- 2026-08-01: Refer-to-restore after a 3-6 day streak break is dead. Survey: 40/63 have not missed a streak; miss frequency Never for 42/63; "once a week" for 3/63. Consecutive-day gap length was never asked. Scope card later rewritten (2026-08-03) to refer-in-play.
- 2026-08-02: Play Store Instant trial is gone as a platform. Instant / try-before-install flow and metrics tied to pre-install trial are worthless for this project.
- 2026-08-03: Locked Scope Card 2: refer in normal play flow with non-math copy. User: casual-conversation sharer in Mumbai. Metric: referrals per person per month. Student-owned card, not facilitator-only drafts as final.
- 2026-08-03: Problem statement A locked. Confidence: saw it. Traces to n01-n04 (C2), n05-n11 (C3).
- 2026-08-21: Idea 1 + Idea 3. Student: Idea 1 alone too thin for a case study; Idea 3 fits math cool-off for the referred person; together about two screens without bloat; can switch if a better idea appears.
- 2026-08-30: Idea 19 un-parked as one growth-loop screen. Full referred walkthrough dropped because it sits weird next to Matiks' existing tutorial.

**Won't change (BRIEF constraints):** Native store game. Existing refer link and non-math SMS/copy already exist. Do not redesign the whole product. Thin web remake of all modes is out.

**At that moment:** Sharer is mid-play or just won, phone in hand, may be talking to a friend. Needs a fast send, not Settings.

**Any answer must:** Work when the friend does not have Matiks installed yet.

**Product knowledge (guess flagged):** Can attach a refer path to the sharer; can know a new user arrived via refer. Exact attribution is a guess.

### 7.6 Final feature designs

**Title:** Final feature designs

**Description:** About five screens. Paper to lo-fi. Images supplied by Harshal.

**Visuals:** Five rounded frames.

| Slot | Screen | Status until image |
|------|--------|--------------------|
| A | Refer popup, excite moment 1 | Empty: "Screen 1 of 3. Excite moment not locked." |
| B | Refer popup, excite moment 2 | Empty: same |
| C | Refer popup, excite moment 3 (if used) | Empty: "Optional third variant" |
| D | Non-math first game nudge | Empty: "Mode not locked" |
| E | "Your turn to share" after a few days | Empty: "Timing not locked" |

When an image arrives, replace that slot only. Do not generate fake Matiks UI to fill the gap.

### 7.7 Edge cases and stated design

**Title:** Edge cases and stated design

**Description:** What the lock already admits it does not know, and what the design still has to survive.

**Stated / open (BRIEF):**

- Which 2-3 excite moments, from interview quotes.
- Which mode counts as "non-math" for screen 4.
- Exact timing for screen 5 ("few days").
- Exact in-flow moment on the scope card is still assumed (after a win is a working guess).

**Must work:**

- Friend does not have the app yet (store install path).
- Sharer is in conversation while sending.
- Fast send; no Settings hunt.
- Existing tutorial remains; Idea 3 is a nudge after it.
- Attribution may be imperfect (flagged as guessing).

**Out of this design:**

- Browser try-before-install (Idea 14 parked).
- Reward/pie education as the main feature (C5 demoted).
- Forcing only in-app share to earn reward (Idea 11/16 parked).

**Visual:** Empty slot for an edge-case board or annotated flow. Until then, a rounded list as above.

### 7.8 Handoff

**Title:** Handoff

**Description:** What another designer or engineer would need if this ever left the case study.

**Include:**

- Concept, not production.
- Native game; this site does not contain shipping spec for APIs.
- Existing refer link and non-math SMS should be reused, not redesigned from zero.
- Main path (once screens exist): play / win (assumed) → refer popup → share sheet → friend install → existing tutorial → non-math first-game nudge → days later, growth-loop popup.
- Empty/error states for the *feature* were not finished in molades-brief (LOG: brief screens/states still open). Do not invent them. Say they are unfinished.
- Copy variants on screens 1-3 are in scope; WhatsApp and Play Store are mapped, not designed.
- Assets: lo-fi frames + this site. No DESIGN_LANGUAGE.md in the Matiks folder yet.

**Visual:** Empty slot for a handoff checklist screenshot or spec crop.

### 7.9 Impact, metrics, and learnings

**Band:** Outcome 20%. Stay compact. Do not pad with invented results.

**Title:** Feature impact, metrics, and learnings

**Description:** Intended metric and what the work already taught. No launch dashboard.

**Metric:** Referrals per person per month. Prefer this wording over "increase the percentage of…".

**Guardrail:** That number should go up without making core play worse.

**What would prove the bet wrong:** (SCOPE) already find the link and won't send; casual conversation already converts; friends drop for other reasons.

**Learnings that must appear (LOG):**

- Restore-by-referral was the wrong bet. Survey does not show people missing 3-6 day streaks as a pattern.
- Instant apps are not a design option anymore.
- Survey awareness of referral is high; interviews still show name-only share and late discovery in Settings. Both stay in the write-up.
- Insight 2 cannot say "most"; U1 and U5 carry the math cool-off quotes.
- Cluster 1 failed so-what and was cut.
- A scope card that is disproven has to be rewritten; student learned that on 2026-08-01/03.

**Visual:** Empty slot for a metric definition card (formula in words, no fake chart with invented values). A rounded "no live numbers" note is allowed.

---

## 8. Visual and interaction spec (site)

### 8.1 Language (Phase 1 card, not a token system)

The Phase 1 result card on S1 and S2 is the look for the rest of the site. It follows the ente photos in [prd/ente-photos.md](prd/ente-photos.md), not a token list. Repeat that card's type sizes and weights, its title-description-visual spacing, and its palette.

Palette already guided: white page, near-black type, muted grey short line, one Matiks green. Sample that green from a Matiks screenshot when one exists. Do not add another color.

Do not extract a named token system, a type-scale file, or DESIGN_LANGUAGE.md roles. One designed card is not enough to systemize.

Type on the card: large bold title, lighter smaller description, one sans. No serif essay theme unless Harshal asks.

### 8.2 Section pattern

1. Title  
2. Short description (one to three sentences)  
3. Visual (rounded)

Exceptions only when Harshal says so.

### 8.3 Motion

Minimal. No hero video required. Sticky nav. Anchor scroll. Respect `prefers-reduced-motion`.

### 8.4 Breakpoints

- Desktop: nav in one row, titles large, visuals can sit in a 2-up grid inside a section (quotes, idea cards).
- Phone: stack; nav may collapse to a horizontal scroll of anchors or a simple top list. Do not hide sections.

### 8.5 States

| Surface | Empty | Populated | Error |
|---------|-------|-----------|-------|
| Image slot | Rounded pale field, one-line caption of what will go there | Image, `object-fit` contain or cover as appropriate, alt text from Harshal | Broken image: keep caption, no dead icon soup |
| Whole page | N/A (copy is always from markdown) | Default | Build failure only |

No loading skeleton for CMS. Content is compiled in.

### 8.6 Avoid

Dark theme, purple gradients, glassmorphism, emoji in headings, Ente photography, fake device mockups with invented UI, stock "team collaborating" photos, bold labels on every list item, a named token sheet, a fifth color.

---

## 9. Technical requirements

- App: Next.js (App Router) + Tailwind in `C:\Users\Harshal\Desktop\Case Study`.
- Deploy: Vercel, default Next settings.
- Images: `public/` (or `public/case/`). Harshal drops files; code maps filenames in one content module.
- Content: a single content file (TS/MD) derived from this PRD, not a CMS.
- SEO: title `Matiks referral · case study`, description from the locked problem's first sentence, truncated.
- Analytics: none required through Phase 5.
- Env secrets: none.

### 9.1 File sketch

```
app/layout.tsx
app/page.tsx
app/globals.css
components/Section.tsx      // title, description, children visual
components/Nav.tsx
components/ImageSlot.tsx    // empty or <Image>
content/case.ts             // strings, quotes, idea rows, slot ids
public/case/.gitkeep
```

---

## 10. Image intake

Harshal provides a folder and pastes assets one by one.

Rules:

- Do not generate substitute product screens.
- Each file gets an id matching slots A-E or research-1, research-2, …
- Alt text is required; if missing, use a factual filename-based caption until Harshal writes alt.
- Research images can appear only in `#research` unless he says otherwise.

---

## 11. Accessibility

- Contrast: the muted description grey on white must still pass at body size. If it fails, darken that same grey. Do not add a new color.
- Nav links are real `<a href="#...">`.
- Images have alt.
- Hit targets on phone nav at least 44px high if they are buttons.
- Focus styles visible (accent outline).
- Quotes marked as `<blockquote>` with attribution (U1, U5, …).

---

## 12. Copy rules (humanizer)

- Prefer Harshal's sentences from the md files.
- No em dashes or en dashes in site copy.
- No "it's not X, it's Y" staging.
- No fake completeness triads.
- No "pivotal", "showcase", "robust", "landscape" filler.
- Quotes keep original wording, including rough English.
- Hindi / mixed quotes (n06, n13, n20) stay as in RESEARCH; do not "clean" them into English unless Harshal provides a translation he owns.

---

## 13. Success criteria (by phase)

Each phase PRD has the real Done list. Recap:

- **Phase 1 done:** all anchors, ente rhythm, empty slots, `npm run build`.
- **Phase 2 done:** sections 1-3 are the largest block; match RESEARCH / problem lines.
- **Phase 3 done:** sections 4-7 comparable in length to 1-3; sections 8-9 clearly shorter; no live metrics. This is the first "whole case study" URL without photos.
- **Phase 4 done:** provided images placed; accent sampled.
- **Phase 5 done:** Check in §4 plus Vercel URL after Harshal asks.

---

## 14. Out of scope until a later phase (or never)

- Phase 5: deploy, custom domain.
- Never in this PRD: CMS, auth, blog, shipping referral inside Matiks.
- After a second case exists: a multi-case index (new PRD).

---

## 15. Open questions (site, not Matiks feature)

- Exact Matiks green hex (sample from first screenshot).
- Wordmark: "Matiks" vs "Harshal" vs both.
- Whether sticky nav should hide the hero title (Ente-style logo left).
- Font: system vs a licensed geometric sans.

Feature open questions stay in section 7.7. They are content. They do not block Phase 1-3 layout. They do block treating screens A-E as finished in Phase 4.

---

## 16. Risks

- Empty visual slots make the page look unfinished next to ente.com's photography. Accept through Phase 3; fill in Phase 4.
- Survey vs interview clash, if smoothed over, makes the case study look dishonest. Keep both.
- BRIEF is still a draft (LOG). The site should say the brief still has open screen/state work.

---

## 17. Implementation order

Follow the files in `prd/`. Do not collapse phases into one PR.

Suggested git (if used): `phase-1-shell`, `phase-2-story`, `phase-3-outcome`, then commits on `main` for each Phase 4 drop, then `phase-5-ship`.
