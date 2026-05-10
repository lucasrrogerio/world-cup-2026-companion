## 1. ScrollSpy Implementation

- [x] 1.1 Implement `IntersectionObserver` in `src/App.jsx` to track visible sections.
- [x] 1.2 Update `activeGroup` state based on the current visible section.
- [x] 1.3 Implement a "manual scroll lock" to prevent ScrollSpy from fighting with anchor clicks.

## 2. Navigation Synchronization

- [x] 2.1 Update `src/components/Navigation.jsx` to automatically scroll the active button into view when updated via ScrollSpy.
- [x] 2.2 Refine the `activeGroup` highlight styling to be more visible.

## 3. Grid Adjustments

- [x] 3.1 Ensure all sections have unique IDs in `src/components/StickerGrid.jsx`.
- [x] 3.2 Add a bit of top margin/padding to sections to account for the sticky header.

## 4. Verification

- [x] 4.1 Verify that scrolling the album updates the highlighted group in the nav bar.
- [x] 4.2 Verify that clicking a group button scrolls to the section and highlights it.
- [x] 4.3 Verify that the active button scrolls into view in the horizontal bar on mobile.
