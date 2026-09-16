# PRD Phase 3: Solution (~40%) then outcome (~20%)

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Ready after Phase 2  
**Depends on:** [02-problem.md](02-problem.md)  
**Unblocks:** [04-media.md](04-media.md), [05-ship.md](05-ship.md)

---

## Goal

Fill `#ideation`, `#decisions`, `#designs`, `#edges` so that band is about **40% of the whole page**, comparable to the problem band.

Then fill `#handoff` and `#impact` as about **20%**. Keep them short. If there is no ship data, this tail stays short. Do not invent charts to fill 20%.

This is the first "whole case study" URL without photos.

## Language

Copy S1/S2 from Phase 1. Idea tables, decision cards, and screen slots use the same type, spacing, and palette. They are not a new component system. No named tokens. No extra color (no status red on "killed" ideas, no chart colors on impact).

## Sources

`BRIEF.md`, `LOG.md`, `SCOPE.md` (metric, kill conditions, constraints). Same copy rules as Phase 2.

## In: solution band

### `#ideation`

**Title:** Design exploration and ideation

Locked 2026-08-21 then updated 2026-08-30: Idea 1 + Idea 3 light + Idea 19. Process: paper then lo-fi. Concept case study.

Visual: empty slot for paper photos / idea grid. Until then, a rounded table of ideas with status.

Kept / locked:

- Idea 1: Refer after a win / in play flow. Move: change when it happens. Score 9. Screens 1-2.
- Idea 3: Referred first open to a less "math" mode. Move: change where you begin. Score 7. Screens 1-2. Light version only: one-screen first-game nudge after the existing tutorial, not a new walkthrough.
- Idea 19: Pay-it-forward card for referred users. Move: change who starts it. Student idea. Score 3. One screen. Parked, then un-parked 2026-08-30.

Out because they already exist in Matiks: Idea 2, 6, 7.

Out as copy/surface: Idea 8, 10 (product already owns non-math SMS).

Same move as Idea 1, so Idea 1 kept: Idea 4, 5, 12, 15.

Parked if Idea 1 makes the link the default path: Idea 9, 11, 18.

Deferred: Idea 14 (browser one-round try then Play Store).

Merged: Idea 12 into 1; Idea 17 into 3.

Survived (~5 screens):

1-3. Refer popup, 2-3 excite moments, interview-based copy/visual variants, one pattern. Sharer sends the link at peak moments.  
4. Start / suggest a non-math game after the existing tutorial. Friend's first play doesn't lead with math.  
5. After a few days: "your turn to share". Referred person becomes the next sharer.

Optional frame: win celebration then refer (same Idea 1 beat).

Tradeoffs: variant popups vs one popup; nudge vs full onboarding; Idea 19 amplifies growth and does not fix sharer friction on its own; WhatsApp/Play Store mapped, not designed.

### `#decisions`

**Title:** Key design decisions and rationale

The bet moved when research and platform facts moved. Visual: timeline or stacked rounded cards (LOG dates). Do not retell all research notes here.

Required:

- 2026-08-01: Refer-to-restore after a 3-6 day streak break is dead. Survey: 40/63 have not missed a streak; miss frequency Never for 42/63; "once a week" for 3/63. Consecutive-day gap length was never asked. Scope card rewritten 2026-08-03 to refer-in-play.
- 2026-08-02: Play Store Instant trial is gone. Instant / try-before-install and metrics tied to pre-install trial are worthless for this project.
- 2026-08-03: Scope Card 2 locked: refer in normal play flow with non-math copy. User: casual-conversation sharer in Mumbai. Metric: referrals per person per month. Student-owned card.
- 2026-08-03: Problem statement A locked. Confidence: saw it. Traces to n01-n04 (C2), n05-n11 (C3).
- 2026-08-21: Idea 1 + Idea 3. Student: Idea 1 alone too thin for a case study; Idea 3 fits math cool-off for the referred person; together about two screens without bloat; can switch if a better idea appears.
- 2026-08-30: Idea 19 un-parked as one growth-loop screen. Full referred walkthrough dropped; weird next to Matiks' existing tutorial.

Won't change: native store game; existing refer link and non-math SMS/copy exist; no whole-product redesign; no thin web remake of all modes.

At that moment: sharer mid-play or just won, phone in hand, may be talking to a friend. Fast send, not Settings.

Any answer must work when the friend does not have Matiks installed yet.

Product knowledge (flag as guess): can attach a refer path to the sharer; can know a new user arrived via refer. Exact attribution is a guess.

### `#designs`

**Title:** Final feature designs

About five screens. Paper to lo-fi. Images in Phase 4.

| Slot | Screen | Empty caption |
|------|--------|----------------|
| A | Refer popup, excite moment 1 | Screen 1 of 3. Excite moment not locked. |
| B | Refer popup, excite moment 2 | same |
| C | Refer popup, excite moment 3 (if used) | Optional third variant |
| D | Non-math first game nudge | Mode not locked |
| E | "Your turn to share" after a few days | Timing not locked |

Do not generate fake Matiks UI.

### `#edges`

**Title:** Edge cases and stated design

Open: which 2-3 excite moments from interview quotes; which mode is "non-math" for screen 4; exact "few days" for screen 5; in-flow moment still assumed (after a win is a working guess).

Must work: friend without the app; sharer in conversation while sending; fast send; existing tutorial remains (Idea 3 is a nudge after it); attribution may be imperfect.

Out of this design: Idea 14; pie/reward education as the main feature; only-in-app-share-earns-reward (Idea 11/16).

Visual: empty slot or a rounded list as above.

## In: outcome band (short)

### `#handoff`

**Title:** Handoff

Concept, not production. No shipping API spec. Reuse existing refer link and non-math SMS.

Main path in words: play / win (assumed) → refer popup → share sheet → friend install → existing tutorial → non-math first-game nudge → days later, growth-loop popup.

Empty/error states for the *feature* were not finished in molades-brief (LOG). Say they are unfinished. Do not invent them.

Copy variants on screens 1-3 are in scope. WhatsApp and Play Store mapped, not designed. No DESIGN_LANGUAGE.md in the Matiks folder yet.

Visual: empty slot for a checklist crop.

### `#impact`

**Title:** Feature impact, metrics, and learnings

Intended metric, not a launch dashboard. One compact block. No full-width empty chart.

Metric: referrals per person per month (not "increase the percentage of…").

Guardrail: that number should go up without making core play worse.

What would prove the bet wrong: already find the link and won't send; casual conversation already converts; friends drop for other reasons.

Learnings (LOG):

- Restore-by-referral was the wrong bet. Survey does not show 3-6 day streak misses as a pattern.
- Instant apps are not a design option anymore.
- Survey awareness of referral is high; interviews still show name-only share and late discovery in Settings. Both stay.
- Insight 2 cannot say "most"; U1 and U5 carry the math cool-off quotes.
- Cluster 1 failed so-what and was cut.
- A disproven scope card has to be rewritten (learned 2026-08-01/03).

Rounded "no live numbers" note is allowed. BRIEF is still a draft; say screen/state work is still open.

## Out

- Fake lo-fi Matiks UI
- Fake percentages
- Finishing feature empty/error states that do not exist in LOG
- Growing `#impact` until it matches `#research`
- Turning `#decisions` into a second research essay

## May change

Copy in sections 4-9, slot labels. Keep 8-9 short.

## Must not change

Invented screens or metrics. Problem-band copy from Phase 2 except to fix a factual error against source files.

## Done

- Sections 4-7 comparable in length to sections 1-3
- Sections 8-9 clearly shorter
- Locked idea names Idea 1, Idea 3 light, Idea 19
- Restore and Instant appear only as killed bets with LOG reasons
- Empty slots labeled, not filled with invented UI
- No numeric impact that is missing from SCOPE/LOG/BRIEF/RESEARCH

## Git (if used)

Branch `phase-3-outcome`.
