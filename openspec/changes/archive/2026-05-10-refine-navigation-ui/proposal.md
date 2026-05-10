## Why

The current horizontal carousel for group navigation can be tedious to use, especially on mobile, as users have to scroll significantly to find a specific group. A more "list-like" or "grid-like" selection interface (e.g., a modal or a compact grid) would provide better scannability and faster access to teams.

## What Changes

- **Navigation UI**: Replace the horizontal scroll bar in `Navigation.jsx` with a **sticky vertical sidebar** (or side list).
- **Group Selection**: Implement a vertical "Table of Contents" style list that allows independent scrolling and quick jumps to sections.
- **Layout Adjustments**: Adjust the main album container to accommodate the sidebar on desktop while maintaining a clean mobile experience (e.g., using a drawer or floating menu).

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `sticker-inventory`: Improve the efficiency of navigating the album.

## Impact

- `src/components/Navigation.jsx`: Major overhaul of the UI structure.
- `src/components/Header.jsx`: Potential integration if the picker is moved to the header.
- `src/index.css`: Add new animations and layout utilities for the list/grid view.
