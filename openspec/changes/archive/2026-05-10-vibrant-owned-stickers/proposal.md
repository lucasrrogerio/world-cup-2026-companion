## Why

In dark mode, owned stickers (colored) and unowned stickers (grayscale) can sometimes look similar in terms of luminance, especially since the card background remains dark (`#1A1A1A`). Making the card background lighter or more vibrant when a sticker is owned will create a stronger visual feedback, rewarding the user for completing their collection.

## What Changes

- Introduce a new CSS variable `--card-owned-bg` to specifically style owned stickers.
- Update `StickerCard` to use this new background when `count > 0`.
- In Dark Mode, this will be a lighter, more premium gray/purple tint.
- In Light Mode, it will maintain its clean white look but perhaps with a subtle glow.

## Capabilities

### Modified Capabilities
- `app`: The visual feedback requirements for owned stickers are being enhanced.

## Impact

- `src/index.css`: New variable definition.
- `src/components/StickerCard.jsx`: Dynamic background styling.
