## Context

Owned stickers are currently distinguished by color and a border glow. The user wants them to be "lighter" in dark mode to stand out more.

## Goals / Non-Goals

**Goals:**
- Make owned stickers significantly more prominent than unowned ones in Dark Mode.
- Use a lighter background for owned cards to create depth.

**Non-Goals:**
- Changing the grayscale logic for unowned stickers.

## Decisions

### Theme Variable Updates
A new `--card-owned-bg` variable will be added.

- **Dark Mode**: 
  - `--card-bg`: `#1A1A1A`
  - `--card-owned-bg`: `#2A2A2A` (or a subtle purple-gray mix)
- **Light Mode**:
  - `--card-bg`: `#FFFFFF`
  - `--card-owned-bg`: `#FFFFFF` (no change needed for luminance, but maybe a shadow adjustment)

### StickerCard Implementation
The `StickerCard` will apply `bg-[var(--card-owned-bg)]` when `isOwned` is true, and `bg-[var(--card-bg)]` otherwise.

## Risks / Trade-offs

- Making the background too light might conflict with text readability if not careful. We will ensure the gold/white text remains legible.
