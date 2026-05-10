## Context

Guest users currently see regional swap data, which undermines the incentive to register. Light Mode uses high-contrast gold on white, which can feel "harsh" or "cheap" compared to the sleek Dark Mode.

## Goals / Non-Goals

**Goals:**
- Differentiate guest/authenticated data visibility.
- Soften the Light Mode color palette.
- Improve readability of charts in Light Mode.

**Non-Goals:**
- Changing the layout of the app.
- Adding new complex features.

## Decisions

- **Guest Data**: In `useCollection.js`, set `cityDuplicates` to `[]` if no `user` is present.
- **Light Mode Colors**: 
    - `background`: `#f8fafc` (Slate 50) instead of `#ffffff`.
    - `card-bg`: `#ffffff`.
    - `gold`: Use a slightly more "bronze" or "muted gold" for light mode to avoid the "neon" look on white.
    - `text-primary`: `#0f172a` (Slate 900).
- **Chart Refinement**: Use CSS variables for Recharts colors so they adapt automatically to the theme.

## Risks / Trade-offs

- **Color Consistency**: Changing theme variables might affect contrast in some components (e.g., progress bars). We must audit all views.
