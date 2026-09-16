# PRD Phase 1: Shell

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Ready after Phase 0  
**Depends on:** [00-spec.md](00-spec.md)  
**Unblocks:** [02-problem.md](02-problem.md)

---

## Goal

Stand up a Next.js page that matches the ente photos in [ente-photos.md](ente-photos.md): white field, one green on a few words in the hero, grey one-liner, title then picture on a very round white board. All nine sections exist as **stubs**. Research quotes, idea tables, and real photos wait.

## Who

Hiring-manager skim on laptop or phone. Not Matiks players.

## In

- Scaffold Next.js (App Router) + Tailwind in `C:\Users\Harshal\Desktop\Case Study`
- One result card, used on S1 and S2 (hero plus the first section, or two stacked section cards): title, short description, rounded visual. That card is the look later phases copy. Put the numbers on the card in the CSS next to those elements. Do not collect them into a named token file or a `--bg` / `--accent` system. One card is not a design system.
- Colors on the card, and nowhere else: white page, near-black title, muted grey short line, one Matiks green on a single accent word or link. Placeholder green until a Matiks screenshot exists. Rounded clip on the visual (large radius, in the ente ballpark). Lots of white space around the three parts.
- Type: large bold title, lighter smaller description, one sans. No serif essay theme unless asked.
- Components: `Nav`, `Section`, `ImageSlot` as copies of that card, not as a token library
- Hero + nine section shells: title, one-line stub, empty rounded visual
- `content/case.ts` with ids and stub strings only
- `public/case/.gitkeep`
- Sticky nav. Group labels Problem / Solution / Outcome are allowed; the nine `#` anchors are the real links
- Unequal min-heights: `#research` frame taller; `#handoff` and `#impact` shorter. Do not make nine equal blocks.

### File sketch

```
app/layout.tsx
app/page.tsx
app/globals.css
components/Section.tsx
components/Nav.tsx
components/ImageSlot.tsx
content/case.ts
public/case/.gitkeep
```

### Hero stub

Title: Refer inside play. One accent phrase only (`inside play` or `refer`). Description one line about name-share / Play Store / math game. Empty visual slot. Meta: concept case study, paper to lo-fi, about five screens.

### Section stubs (titles only)

1. Where this sits in the product  
2. The problem this feature solves  
3. User research and insight  
4. Design exploration and ideation  
5. Key design decisions and rationale  
6. Final feature designs  
7. Edge cases and stated design  
8. Handoff  
9. Feature impact, metrics, and learnings  

Footer stub: "Concept case study. Not a live Matiks ship."

### Section pattern

1. Title  
2. Short description  
3. Rounded visual  

### Motion and breakpoints

Minimal motion. Sticky nav. Anchor scroll. `prefers-reduced-motion`. Desktop: nav in a row; quote/idea grids may be 2-up later. Phone: stack; nav can be a horizontal scroll of anchors. Do not hide sections.

### ImageSlot empty state

Rounded pale field, one-line caption of what will go there. No fake Matiks UI. No stock photos.

## Out

- Full research quotes, cluster essays, idea tables, LOG timeline
- Vercel deploy
- Real photos
- CMS, auth, analytics
- Dark mode, purple gradients, glassmorphism, emoji headings, Ente photography
- Sign up / Login chrome (that is Ente, not this site)

## May change

Layout, token values (temp green), component APIs.

## Must not change

Source-of-truth facts (there should be almost none on the page yet). Section order. Do not add a fifth color. Do not publish a token list from this card.

## Open (do not block this phase)

Exact Matiks green hex. Wordmark "Matiks" vs "Harshal" vs both. Whether sticky nav hides the hero title. Font choice beyond system/geometric sans.

## Done

- `/` scrolls through `#top` and `#context` … `#impact`
- Title / short line / rounded visual on every section
- White page, one accent, large radius
- Problem/research shells taller than handoff/impact
- Phone: sections stack; nav reachable (44px if tap targets)
- `npm run build` succeeds

## Git (if used)

Branch `phase-1-shell`.
