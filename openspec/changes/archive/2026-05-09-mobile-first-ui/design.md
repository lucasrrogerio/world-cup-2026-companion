## Context

The current application has a responsive layout using Tailwind CSS, but the navigation is at the top and stickers can feel cramped on very small screens. The interaction for decreasing sticker counts relies on right-click/ctrl-click, which is not mobile-friendly.

## Goals / Non-Goals

**Goals:**
- Improve mobile ergonomics by moving primary navigation to the bottom.
- Optimize the dashboard layout for small screens.
- Enhance the sticker management experience on touch devices.
- Ensure all interactive elements follow mobile accessibility standards (tap target size).

**Non-Goals:**
- Completely redesign the desktop experience.
- Add new features unrelated to mobile usability (e.g., social features, trading engine).

## Decisions

- **Bottom Navigation**: Introduce a `MobileNav` component that appears only on screens `< 768px`. It will contain "Dashboard" and "Album" (Stickers) links.
- **Dashboard Layout**: On mobile, the four stat cards will use a 2x2 grid with reduced padding and `text-lg` for values instead of `text-2xl` to prevent overflow and maintain balance.
- **Sticker Card Interaction**: 
    - Implement a "Tap and Hold" gesture or a clear toggle mechanism.
    - For simplicity and speed, maintain the "Click to add" but add a small, accessible "minus" icon button on the card when `count > 0` specifically for mobile users.
- **Grid Density**: Adjust `StickerGrid` to use `grid-cols-3` on very small screens (`< 375px`) and `grid-cols-4` on standard mobile screens to ensure tap targets are large enough.
- **Safe Area Insets**: Ensure the bottom navigation accounts for "home indicator" areas on modern mobile devices (iOS/Android) using `pb-safe` or equivalent padding.

## Risks / Trade-offs

- **Screen Real Estate**: A bottom nav takes up vertical space. This will be mitigated by making it slim and using high-contrast icons.
- **Interaction Complexity**: Adding a minus button to the small sticker cards might make them look cluttered. We will use a subtle, semi-transparent design for the minus button.
