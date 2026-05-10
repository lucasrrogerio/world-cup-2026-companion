## Why

The user expressed dissatisfaction with the previous dark mode accent color (Cyan), stating it didn't align well with the album's visual identity. They requested a maximum of 3 main brand colors to avoid visual clutter and maintain the premium feel of the World Cup 2026 album.

## What Changes

- Refine the dark mode color palette in `src/index.css`.
- Implement a 3-color brand system: Deep Navy (Background), Vibrant FIFA Blue (Secondary/Support), and WC Lime (Primary Accent).
- Ensure consistent use of these colors across all UI components (Footer, Header, Buttons, etc.).
- Remove the "Cyan" color which was deemed too generic and non-branded.

## Capabilities

### Modified Capabilities
- branding-and-theming: Update dark mode palette to adhere to the 3-color album identity rule.

## Impact

- `src/index.css`: Global variable updates.
- All components using `var(--accent)` and `var(--text-secondary)`.
