## Why

The current guest mode shows swap hints (regional duplicates) that aren't actually verified since the guest hasn't logged in to confirm their location/identity. Hiding these hints for guests makes the "Login" value proposition stronger. Additionally, the Light Mode theme needs refinement to ensure better contrast and a more premium feel, as the gold/dark-on-white combination currently looks inconsistent.

## What Changes

- **Guest UX**: Hide the "duplicates in your city" indicator and specific swap hints in the `StickerGrid` and `ProgressChart` when the user is not logged in.
- **Visuals**: Refine the Light Mode CSS variables. Transition from pure white backgrounds to subtle grays or off-whites, and adjust gold/dark colors to be more harmonious with light backgrounds.
- **Progress Chart**: Update the chart colors and text contrast for Light Mode to ensure better readability.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `guest-mode`: Restrict access to regional swap data.
- `theme-system`: Refine Light Mode color tokens and component styling.

## Impact

- `index.css`: Update Light Mode variables.
- `src/components/StickerGrid.jsx`: Add conditional check for guest status before showing swap icons.
- `src/components/ProgressChart.jsx`: Update Recharts colors and layout for Light Mode.
- `src/hooks/useCollection.js`: Ensure `cityDuplicates` is empty for guests.
