- [x] 1.1 Extract `StatCard` component and the grid layout from `Dashboard.jsx` to `ProgressChart.jsx`.
- [x] 1.2 Move the `percentage` progress bar from `Dashboard.jsx` to `ProgressChart.jsx`.
- [x] 1.3 Move the "Smart Recommendation" logic and card rendering from `Dashboard.jsx` to `ProgressChart.jsx`.
- [x] 1.4 Update `ProgressChart.jsx` props to accept `stats`, `profile`, and `cityDuplicates`.

## 2. Redesign Dashboard (Home)

- [x] 2.1 Clear existing data-heavy content from `Dashboard.jsx`.
- [x] 2.2 Implement a new "Welcome" hero section with premium typography.
- [x] 2.3 Add a section explaining the "Objetivo do App" (managing collection, tracking progress, connecting for swaps).
- [x] 2.4 Add illustrative cards for "Como Funciona" to guide the user.

## 3. App Level Updates

- [x] 3.1 Update `src/App.jsx` to pass `stats`, `profile`, and `cityDuplicates` to `ProgressChart`.
- [x] 3.2 Adjust `Dashboard` call in `App.jsx` to pass only necessary info (like user profile for greeting).

## 4. Final Polish

- [x] 4.1 Ensure all icons used (Lucide) are imported correctly in the new locations.
- [x] 4.2 Verify responsive behavior (2x2 grid for stats on mobile) in the new Progress view.
- [x] 4.3 Check that animations (Framer Motion) are still smooth after moving components.
