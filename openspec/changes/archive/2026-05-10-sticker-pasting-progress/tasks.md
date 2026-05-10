## 1. Environment & Dependencies

- [x] 1.1 Install `recharts` library for progress visualization.
- [x] 1.2 Verify `npm run dev` still works after installation.

## 2. Data Persistence & State Management

- [x] 2.1 Update `useCollection.js` state to include `pastedAt` field in sticker objects.
- [x] 2.2 Modify `updateStickerCount` to set `pastedAt` when count changes from 0 to 1, and clear it when count goes to 0.
- [x] 2.3 Update `localStorage` persistence logic to store/retrieve both `count` and `pastedAt`.
- [x] 2.4 Update Supabase `fetchData` and `syncBatch` to include the `pasted_at` field.
- [x] 2.5 Implement a data migration strategy: if a sticker is owned but `pastedAt` is missing, default it to the current date to populate the chart.

## 3. Analytics Logic

- [x] 3.1 Create a helper function to aggregate stickers by date into a format suitable for Recharts (e.g., `[{ date: '2026-05-10', total: 15 }]`).
- [x] 3.2 Implement "Weekly" aggregation logic to group data points by week start dates.

## 4. UI Implementation

- [x] 4.1 Create `src/components/ProgressChart.jsx` using Recharts `AreaChart` with gradients for a premium look.
- [x] 4.2 Add tooltips and responsive container to the chart.
- [x] 4.3 Update `src/components/Header.jsx` to include an "Analytics" button (using a suitable icon like `ChartBarIcon`).
- [x] 4.4 Create a modal or a slide-over panel to display the `ProgressChart` without cluttering the main album view.
- [x] 4.5 Add a toggle in the UI to switch between "Daily" and "Weekly" views.

## 5. Polish & Visual Excellence

- [x] 5.1 Add smooth entrance animations to the chart using Framer Motion or Recharts built-in animations.
- [x] 5.2 Ensure the color palette of the chart matches the application's theme (FIFA 2026 / Panini aesthetics).
- [x] 5.3 Test on mobile devices to ensure the chart is readable and interactive.
