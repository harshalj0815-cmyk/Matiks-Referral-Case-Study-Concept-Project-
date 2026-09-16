# PRD Phase 5: Ship

**Owner:** Harshal  
**Date:** 2026-09-16  
**Status:** Ready after Phase 3. Deploy only when Harshal asks.  
**Depends on:** [03-solution-outcome.md](03-solution-outcome.md) minimum. [04-media.md](04-media.md) if images were promised for the public URL.

---

## Goal

Make the page pass the visual check against ente.com, pass basic a11y, then deploy to Vercel when asked.

## Visual check

Screenshot `/` next to https://ente.com/. Confirm:

- White field
- One accent
- Rounded cards
- Title, then short line, then visual, matching Phase 1 S1/S2 type, spacing, and palette
- No extra colors, no named token sheet in the repo as the source of look
- All nine sections present
- Scroll weight roughly 40% problem, 40% solution, 20% outcome (whole page)
- Quotes/clusters match RESEARCH
- Locked idea is Idea 1 + Idea 3 light + Idea 19

## A11y

- the muted description grey on white still passes at body size; if not, darken that same grey (not a new color)
- Nav is real `<a href="#...">`
- Images have alt
- Phone nav tap targets at least 44px if they are buttons
- Focus visible (accent outline)
- Quotes are `<blockquote>` with attribution
- `prefers-reduced-motion` respected

## SEO

- Title: `Matiks referral · case study`
- Description: locked problem first sentence, truncated
- No analytics required
- No env secrets

## Deploy

- Vercel, default Next settings
- Production URL loads `/`
- Custom domain only if asked
- Do not deploy from this machine until Harshal asks

## Out (never in this PRD set)

CMS, auth, blog, shipping referral inside Matiks. A multi-case index waits for a new PRD if a second case exists.

## May change

A11y nits, metadata, deploy config.

## Must not change

The story.

## Done

- Check list above passes
- `npm run build` is green locally and on Vercel after deploy
- Production URL exists only after Harshal asked

## Git (if used)

Branch `phase-5-ship`.
