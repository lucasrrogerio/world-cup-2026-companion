## Context

Light mode was recently added as part of the theme system. However, the current color choices (especially the borders and secondary text) blend too much into the background, making the UI feel flat and difficult to read in bright environments.

## Goals / Non-Goals

**Goals:**
- Increase contrast between text and background.
- Make borders more distinct to define UI structure.
- Maintain the brand identity (Gold/Purple) in a way that works with high-contrast light backgrounds.

**Non-Goals:**
- Changing the Dark Mode palette.
- Changing component structures.

## Decisions

### New Light Palette (Portuguese Standard)
- **Background**: `#F8FAFC` (Clean Slate)
- **Card Background**: `#FFFFFF` (Pure White)
- **Text Primary**: `#0F172A` (Deep Slate - for high readability)
- **Text Secondary**: `#475569` (Medium Slate - for sub-info)
- **Borders**: `#CBD5E1` (Defined but subtle)
- **Accent**: `#4338CA` (Deep Indigo)
- **Gold**: `#854D0E` (A more saturated, deeper gold for light backgrounds)

## Risks / Trade-offs

- Some users might find the higher contrast too "sharp" compared to the previous version, but this is a necessary trade-off for accessibility.
