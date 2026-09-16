# PRD Phase 4: Media

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Repeatable. Starts when files arrive.  
**Depends on:** Slot ids from [03-solution-outcome.md](03-solution-outcome.md). Research slots may be filled after [02-problem.md](02-problem.md).  
**Unblocks:** a less empty public URL; [05-ship.md](05-ship.md) if images were promised for launch

---

## Goal

Put Harshal's files into named slots. Match the one Matiks green already on the Phase 1 card from the first real product screenshot. Do not invent pictures.

This phase can run many times. Each drop is its own pass.

## Trigger

Harshal sends a folder or pastes files one by one.

## Slot ids

| Id | Section | What belongs here |
|----|---------|-------------------|
| `hero` | `#top` | Product still or simple flow. No fake UI. |
| `context-1` | `#context` | Product map / annotated screenshot |
| `research-1`, `research-2`, … | `#research` only | Notes, clustering, survey photos |
| `ideation-1` | `#ideation` | Paper / idea grid photos |
| `A` `B` `C` | `#designs` | Refer popup variants |
| `D` | `#designs` | Non-math first-game nudge |
| `E` | `#designs` | "Your turn to share" |
| `edges-1` | `#edges` | Edge-case board |
| `handoff-1` | `#handoff` | Spec / checklist crop |
| `impact-1` | `#impact` | Metric definition in words, not a fake chart |

Map each file to one id in `content/case.ts`. Store files under `public/case/`.

## Rules

- Do not generate substitute product screens.
- Alt text required. If missing, use a factual filename-based caption until Harshal writes alt.
- Research images only in `#research` unless he says otherwise.
- When an image arrives, replace that slot only. Other empty slots keep their captions.
- Open locks (excite moments, non-math mode, "few days") still block calling A-E "finished" even if an image is in the slot. Caption can say the image is a draft.

## Accent

From the first Matiks product screenshot, pick the one green already in the Phase 1 card and match it. Do not add a second accent. Do not rename it as a token in a system file.

## In

- File mapping, alt, sampled hex
- `object-fit` contain or cover as needed so rounded clips do not lie about the crop

## Out

- Generating UI to fill empty slots
- Putting research photos in `#designs`
- Changing copy facts to match a screenshot
- Stock "team collaborating" photos

## May change

`public/case/*`, accent hex, alt text.

## Must not change

Copy facts from Phases 2-3.

## Done (per drop)

Each new file is visible in the named slot. Unused slots stay labeled empty. Accent is sampled once a Matiks screenshot exists.

## Broken image

Keep the caption. Do not pile on decorative error icons.
