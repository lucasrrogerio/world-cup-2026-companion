## Context

The UI currently uses a Cyan color which the user finds "non-branded" and "cluttered". The World Cup 2026 album has a specific vibrant identity based on high-contrast colors.

## Goals / Non-Goals

**Goals:**
- Implement a 3-color brand system: Navy, Blue, Lime.
- Align the dark mode palette with the provided album cover image.
- Simplify variables to ensure a clean, premium look.

**Non-Goals:**
- Modifying the layout or functionality of components.
- Changing the light mode palette (unless it conflicts with the 3-color rule).

## Decisions

- **Primary Accent**: Use `#B4FF00` (WC Lime). This is the most distinctive color of the 2026 branding and provides great contrast on dark navy.
- **Secondary Color**: Use `#0076CE` (Vibrant Blue). This matches the primary blue of the FIFA branding.
- **Background**: Keep the Ultra Deep Navy (`#00051A`) as it provides a premium backdrop.
- **Variable Mapping**: 
  - `--accent` -> Lime
  - `--text-secondary` -> Blue
  - `--card-border` -> Blue (low opacity)

## Risks / Trade-offs

- **Readability**: Vibrant Blue on Deep Navy might have lower contrast than Cyan. We should ensure the Blue is bright enough or used mainly for non-textual elements.
