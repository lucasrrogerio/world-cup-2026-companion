## 1. Infrastructure

- [x] 1.1 Create `src/contexts/LanguageContext.jsx` with the `t` function and state management.
- [x] 1.2 Create locale files in `src/locales/` (pt.json, en.json, es.json, ja.json, fr.json).
- [x] 1.3 Wrap the application in `LanguageProvider` in `App.jsx`.

## 2. Localization Content

- [x] 2.1 Extract all strings from `Dashboard.jsx`, `Header.jsx`, `Navigation.jsx`, and `ProgressChart.jsx` into locale files.
- [x] 2.2 Migrate `TEAM_NAMES` from `stickers.js` into the locale system.

## 3. UI Implementation

- [x] 3.1 Add a language selector to the `Header` (Desktop) and `MobileNav` (Mobile).
- [x] 3.2 Update all components to use the `useLanguage` hook.

## 4. Verification

- [x] 4.1 Verify that the language persists after refreshing the page.
- [x] 4.2 Check for layout breaks in Japanese and French.
