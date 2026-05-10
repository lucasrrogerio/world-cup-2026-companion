## Why

The current UI is responsive but doesn't prioritize the mobile experience. Since sticker collectors often use their phones while trading or checking their collection in person, a "mobile-first" approach is essential. This change will shift the design focus to small screens, ensuring better ergonomics, clearer tap targets, and more intuitive interactions for mobile users.

## What Changes

- **Navigation Overhaul**: Transition from a top-scrolling nav to a bottom navigation bar for primary actions on mobile.
- **Enhanced Dashboard**: Redesign the statistics cards and progress bars to be more legible on small screens.
- **Optimized Sticker Grid**: Adjust grid layouts and card sizes to better fit mobile viewports (e.g., 3-4 columns instead of 4).
- **Mobile-Friendly Interactions**: Refine the `StickerCard` interaction model to be more intuitive for touch devices (e.g., better visual feedback for long-press or clear adjustment controls).
- **Typography and Spacing**: Global adjustments to ensure comfortable reading and interaction on mobile devices.

## Capabilities

### New Capabilities
- `mobile-navigation`: A new bottom navigation component specifically designed for mobile users to quickly switch between Dashboard and Sticker Grid views.
- `responsive-grid-system`: A refined grid system that automatically adjusts based on the device's screen size, prioritizing the mobile experience.

### Modified Capabilities
- `dashboard-view`: Update the dashboard to use a more compact, card-based layout on mobile.
- `sticker-management`: Refine the `StickerCard` to handle touch interactions better, providing clearer feedback when a sticker count is updated.

## Impact

- **Components**: `Dashboard.jsx`, `Navigation.jsx`, `StickerGrid.jsx`, `StickerCard.jsx`, `Header.jsx`.
- **Styles**: `App.css`, `index.css`.
- **User Experience**: Significant improvement in ease of use for mobile collectors.
