# PRD Phase 2: Problem band (~40%)

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Ready after Phase 1  
**Depends on:** [01-shell.md](01-shell.md)  
**Unblocks:** [03-solution-outcome.md](03-solution-outcome.md)

---

## Goal

Fill `#context`, `#problem`, and `#research` from the Matiks markdown. This band is about **40% of the whole page** (scroll + visual slots). `#context` stays short. `#research` is the largest section on the site.

Do not start solutions (ideas, screens, locks) here.

## Language

Repeat the Phase 1 result card from S1 and S2. Same title size and weight, same description size and weight, same gaps, same four colors. More quotes and cluster blocks are extra cards of that kind, not a new type scale. No named tokens. No extra color.

## Sources

`SCOPE.md`, `RESEARCH.md`, `BRIEF.md` (problem lines only). Prefer Harshal's sentences. Shorten for the web. Do not upgrade claims.

## Copy rules

- No em dashes or en dashes in site copy
- No "it's not X, it's Y" staging
- No fake completeness triads
- No "pivotal", "showcase", "robust", "landscape" filler
- Quotes keep original wording, including rough English
- Hindi / mixed quotes (n06, n13, n20) stay as in RESEARCH unless Harshal owns a translation
- Quotes in `<blockquote>` with attribution (U1, U5, …)

## In

### `#context` (thin)

**Title:** Where this sits in the product

Matiks is a Type B mind sport. The feature is a referral option in the user's normal play flow, with share copy that does not lead with "math game". Stage: Referral. Working flow (still assumed on the scope card): playing, then a share-ready moment, then refer, then send, then the friend joins.

Must include: user 20-25, Mumbai, already recommends through casual conversation. Metric name: referrals per person per month.

Must not include: refer-to-restore as the current bet.

Visual: one empty slot for a product map or annotated screenshot. Caption: "Referral is meant to appear during play, not only when someone hunts Settings."

### `#problem`

**Title:** The problem this feature solves

Locked (student words): A 20-25-year-old habitual Matiks user struggles with getting friends to try the game (and creating a tracked referral), because they didn't know or didn't find the refer feature so they only share the app name in conversation or tell them to search on the Play Store, or they introduced it as a "math game", so interest dies before giving a try.

Design implication: The path from "I want my friend to try Matiks" to "my friend actually tries it" has to get shorter and clearer, and that path can't depend on a spoken math pitch or the friend doing the homework alone.

Quote cards (at least):

- U5: "I tell them that it's a maths game, people's reaction was not that good." (n01)
- U5: "I have never used referrals actually. I have just telling them that there is app and we should play it" (n05)
- U7: "No, I just told them that there is a game you can download from Play Store. I never sent them the link or something." (n07)

Covers C2 and C3; C4 as support in the because. Out: C1. Demoted: C5. Rejected lines B (math only) and C (informal path only). Student kept A because B and C each miss one of the two core issues.

### `#research` (bulk)

**Title:** User research and insight

Nine interviews (atomic notes) and a survey of about 63 people. Notes kept are share-friction only. About 40 notes on streaks, favourite games, and play times were dropped because they had no share friction.

Several rounded visuals allowed: quote grid, cluster cards, empty slots for research photos. Until photos exist, use structured quote/cluster blocks, not grey lorem phones.

Clusters (student document indexing):

- C1 Personal game, not something to share. Eliminated. n21-n22, mostly U4. So-what failed; about one person.
- C2 Friends lose interest (math / not into games). Keep. n01-n04. U1, U5. Introduce Matiks in a way that loses the friend before a try.
- C3 Share by talk / Play Store name, not the referral link. Keep. n05-n11. Share outside the tracked path; friend searches and downloads alone.
- C4 Find referral by chance / not aware. Demoted against the survey. n12-n15. Counterweight n17, n18, n23. Many people do know or use it. Keep as in-the-moment findability, not "the feature is secret".
- C5 Know a reward exists but not how to use it. Demoted. n19, n20, n24.

Survey tension (must stay visible): Most survey respondents say they are aware of refer-a-friend; many report having used it. Among referrers, "Wanted to play with them" and "Liked the reward" show up. Facilitator called this a clash with interview Cluster 4. Student: minority still unaware; some aware still unused; form priming unmeasured. Do not flatten this into "nobody knows referral exists".

Insights:

- I2 (C2): Referred people lose interest as soon as they hear it is a "math game", even before trying. Reframe how the game is introduced. Ground in U1/U5. Do not say "most".
- I3 (C3): Casual recommendation stays the name of the game; the friend has to search, download, then try, which they often don't. Give a clear way to get and try the game.
- I4 (C4, demoted vs survey): Referral can be found by chance, not during normal use. Put it in the flow where the user would notice it.
- I1 blank (eliminated). I5 demoted. Do not make I5 the hero.

Jobs: J2 and J3 in scope. J4 is soft. J1 dropped with C1. J5 demoted.

Kill lines from SCOPE (here or wait for impact in Phase 3): they already find the link and still won't send; casual conversation already converts; friends drop for other reasons than search/download or the math label. If shown here, keep them as disprove conditions, not as results.

## Out

- Idea tables, thrown-away ideas, survived screens
- LOG lock timeline (restore dead, Instant gone, Idea 1+3+19)
- Five product screen frames
- Metric charts, invented research photos
- Padding this band with solution copy to make it "look finished"

## May change

Copy and extra quote/cluster visuals in sections 1-3.

## Must not change

Section order. Do not put solution ideas into research to fill space.

## Done

- Sections 1-3 are the largest block on the page
- Facilitator could check against RESEARCH.md and the problem lines in SCOPE/BRIEF and not find a new claim
- Survey vs interview clash is still visible
- `#context` is clearly shorter than `#research`

## Risk

Smoothing the survey/interview clash makes the case study look dishonest. Keep both.

## Git (if used)

Branch `phase-2-problem` (or `phase-2-story` if already named).
