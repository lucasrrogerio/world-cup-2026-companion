## Why

Currently, the web (desktop) layout displays the Dashboard and the Sticker Grid simultaneously on a single page. This results in a cluttered interface where statistics and management tools are "too close together," making it harder for users to focus on a specific task. In contrast, the mobile layout already uses a tabbed navigation system that provides a cleaner experience.

## What Changes

- **Desktop View Toggling**: Enable the `activeView` state logic for desktop layouts, allowing users to switch between the Dashboard and the Album/Sticker Grid just like on mobile.
- **Desktop Navigation Tabs**: Add a navigation system (tabs or links) for desktop users to switch between views. This will likely be integrated into the existing `Header` or as a new desktop-specific navigation component.
- **Layout Consistency**: Ensure that the layout remains responsive and that the transition between mobile and desktop navigation feels seamless.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `mobile-navigation`: Extend the navigation capability to include desktop view switching, ensuring consistent behavior across all devices.

## Impact

- **App Layout**: `src/App.jsx` will be updated to respect `activeView` regardless of the `isMobile` status.
- **Navigation**: `src/components/Header.jsx` or a new component will provide the desktop view switching interface.
- **UX**: Improved focus and clarity on desktop screens by separating statistics from collection management.
