## Why

The current team list displays only the 3-letter FIFA codes (e.g., MEX, BRA). For many users, these codes are not immediately recognizable, especially for teams outside the top global ranking. Additionally, the UI currently shows "MEX MEX" because it displays the code as both a badge and a label, which looks redundant. Providing full country names (e.g., "MÉXICO", "BRASIL") significantly improves usability and accessibility.

## What Changes

- A new team name dictionary will be added to provide human-readable names for all 48 FIFA codes in the 2026 World Cup.
- The `StickerGrid` component will be updated to display the full name next to the 3-letter code badge.
- The mapping will support Portuguese names as requested by the user.

## Capabilities

### Modified Capabilities
- `app`: The UI requirements for team display are changing to include full names alongside codes.

## Impact

- `src/data/stickers.js`: Will need a mapping object for team codes to full names.
- `src/components/StickerGrid.jsx`: Will need to use the mapping to render labels.
