# Edge cases and state designs

Status: approved · locked (incl. Sending invite) · not in live case study yet

## Covered in the visual

1. Invite fail — technical / server-side error during referral
2. Slow internet state
3. Return prompt after leaving the app to refer
4. UI skeleton on referral tracking while data loads
5. Track referral empty — no referrals to show yet
6. Double-tap / repeat tap on refer — "Sending invite" copy so the user knows the action is in progress

## Notes

- Share with visual stays in Key design decisions, not here.
- Return nudge is both a decision and shown as a state frame here.

## Final (site copy)

Refer looks fine on the happy path. These frames cover the awkward ones: an **Invite fail** when something breaks on the technical or server side, a **slow internet** state, and a prompt to **get back into the app** after someone leaves to refer. Referral tracking needs a **UI skeleton** while data is loading, and an **empty state** when there is nothing to show yet. If someone taps refer again before anything happens, **Sending invite** copy shows so they know the action is working.

### Highlight spans

1. `Invite fail`
2. `slow internet state`
3. `UI skeleton`
4. `empty state`
5. `Sending invite`
