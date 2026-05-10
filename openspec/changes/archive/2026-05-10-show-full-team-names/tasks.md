## 1. Data Mapping

- [x] 1.1 Add `TEAM_NAMES` constant to `src/data/stickers.js` with all 48 country names in Portuguese.
- [x] 1.2 Export `TEAM_NAMES` for use in components.

## 2. Component Integration

- [x] 2.1 Update `src/components/StickerGrid.jsx` to import `TEAM_NAMES`.
- [x] 2.2 Modify `StickerGrid.jsx` to render `TEAM_NAMES[teamName]` instead of just `{teamName}` in the team headers.
- [x] 2.3 Ensure fallback logic for non-team categories (FWC, Coca-Cola).

## 3. Analytics Integration

- [x] 3.1 Update `src/components/ProgressChart.jsx` (if applicable) or any other component that displays team names to ensure consistency.

## 4. Verification

- [x] 4.1 Verify that the team list displays "BRASIL", "MÉXICO", etc.
- [x] 4.2 Confirm that the 3-letter badge (BRA, MEX) is still visible and correct.
