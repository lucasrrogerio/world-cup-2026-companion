## 1. Mobile Navigation Component

- [x] 1.1 Create `src/components/MobileNav.jsx` with icons for Dashboard and Stickers/Album.
- [x] 1.2 Implement state management to switch between Dashboard and Sticker Grid views via the bottom nav.
- [x] 1.3 Add responsive visibility: show `MobileNav` only on screens `< 768px`.

## 2. Dashboard Refinement

- [x] 2.1 Update `Dashboard.jsx` grid classes from `grid-cols-2 md:grid-cols-4` to a more robust responsive setup if needed, or refine the internal padding of `StatCard`.
- [x] 2.2 Reduce font sizes for stat values on small screens (`text-lg` or `text-xl` instead of `text-2xl`).
- [x] 2.3 Optimize the "Smart Recommendation Card" for narrow widths.

## 3. Sticker Grid Optimization

- [x] 3.1 Update `StickerGrid.jsx` to use `grid-cols-3` for viewports `< 375px`.
- [x] 3.2 Ensure the team headers are properly sized and aligned on mobile.

## 4. Sticker Card Interaction

- [x] 4.1 Update `StickerCard.jsx` to include a small, semi-transparent "minus" button that appears when `count > 0`.
- [x] 4.2 Ensure the "minus" button is large enough to be a valid tap target (min 24x24px within the card).
- [x] 4.3 Add a subtle "active" scale animation for touch feedback using Framer Motion.

## 5. Layout and Header Cleanup

- [x] 5.1 Update `src/App.jsx` to integrate the new `MobileNav`.
- [x] 5.2 Ensure the `Header` or top `Navigation` is hidden or minimized when `MobileNav` is active to save space.
- [x] 5.3 Add `pb-20` (or similar) to the main container to prevent content from being hidden behind the fixed bottom nav.
