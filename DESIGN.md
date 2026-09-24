# Design language (locked — last iteration)

Use this for every new section. Do not invent a second type scale, palette, or card language.

## Palette

| Role | Hex | Use |
|------|-----|-----|
| Page / board | `#f5f5f7` | `html`, `body`, page root |
| Ink | `#282828` | Titles, emphasis, highlight text |
| Mute | `#555555` | Body copy, meta, captions |
| Wash | `#f4f4f4` | Nav pill, empty visual slots, quote/cluster cards |
| Green | `#16c45a` | Section labels only (uppercase) |
| Highlight chip | `#DFFBBF` | Background behind highlighted phrases |
| On-ink | `#ffffff` | Text on dark chips (Concept pill) |
| Scrollspy bar | `#c8c8c8` | Idle and active (no glow; active is wider only) |

## Type (Figtree)

| Element | Size | Weight | Tracking / leading |
|---------|------|--------|--------------------|
| Section label | `clamp(18px, 2.5vw, 22px)` | 700 | `-0.02em`, uppercase, green |
| Part title `h2` | `clamp(34px, 5vw, 48px)` | 800 | `-0.04em`, lh `1.05` |
| Part title `h3` | `clamp(32px, 4.5vw, 44px)` | 800 | `-0.03em`, lh `1.08` |
| Body | `17px` | 400 | lh `1.7`, mute |
| Emphasis in body | inherit | 600 | ink |
| Highlight in body | inherit | 500 | ink on `#DFFBBF`, radius `6px`, pad `0.08em 0.28em` |
| Quote body | `16px` | 400 | lh `1.6`, ink |
| Quote / meta footer | `13px` | 600 | mute |
| Nav wordmark | `18px` | 700 | `-0.03em` |
| Nav mid / Concept | `13px` | 500 / 600 | — |

## Shape

- Content column: `min(920px, calc(100% - 40px))`, centered
- Cover thumbnail: `min(1100px, calc(100% - 48px))`, height `calc(100svh - 72px)`, peek of next section
- Visual boards / empty slots: `border-radius: 48px`, wash fill when empty, `min-height: 420` when empty
- Quote cards: `border-radius: 32px`, wash, padding `28`
- Cluster / insight cards: `border-radius: 28px`, wash
- Nav: pill `border-radius: 999`, wash, `min-height: 52`, padding `10px 14px 10px 22px`
- Concept chip: pill `border-radius: 999`, ink fill, on-ink text
- Highlight chip: `border-radius: 6px` (inline, not a card)

## Spacing (open stack)

| Gap | Value |
|-----|-------|
| Section label → part title | `36px` |
| Part title → body | `16px` |
| Between body paragraphs | `10px` |
| Body → visual | `16px` |
| Subsection break (e.g. feature) | `80px` |
| Cover under nav | padding-top `88px`, bottom `16px` |
| Band start after cover | padding-top `64px` |
| Section bottom | `96px` on last block of a band |
| Scrollspy | fixed left `18px`, bars `22×4` idle / `34×4` active, gap `11` |

## Layout rhythm

1. Green uppercase section label
2. Large black part title
3. Short mute body (optional second line)
4. Rounded visual under the copy

No cards in the hero. No green glow. No purple. Page stays light (`#f5f5f7`).

## Shell behavior

- Fixed center nav; fades out when `html.page-scrolled`
- Left scrollspy fades in when scrolled; grey bars only
- `overflow-x: hidden` on page root

## Assets

Store case images under `public/case/`. Prefer PNG with alpha when the art needs page board to show through.
