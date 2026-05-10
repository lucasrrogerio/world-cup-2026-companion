## Why

The album now uses a continuous scroll layout. To make navigation truly intuitive, the top navigation bar should stay in sync with the user's current scroll position, automatically highlighting the group that is currently visible on screen (ScrollSpy). This provides immediate context and a "premium" feel.

## What Changes

- **Responsive Navigation Layout**: Use a multi-row wrapping layout on desktop and horizontal scroll on mobile.
- **Continuous Album View**: Show all groups and categories in a single, continuous scrollable list.
- **ScrollSpy Sync**: Implement a `IntersectionObserver` to detect which group section is currently in view and update the `activeGroup` state accordingly.
- **Jump-to Navigation**: Clicking group buttons scrolls the page to the section.
- **Dynamic Sort Direction**: Allow toggling A-Z / Z-A in alphabetical mode.

## Capabilities

### Modified Capabilities
- `sticker-inventory`: Add ScrollSpy and enhanced navigation.

## Impact

- `App.jsx`: Logic for ScrollSpy.
- `Navigation.jsx`: UI for active state sync.
- `StickerGrid.jsx`: Reliable IDs for sections.
