## 1. Localization

- [x] 1.1 Add guest mode related strings to all locale files (`auth.continue_guest`, `auth.guest_warning`, `common.local_only`, etc.).

## 2. Inventory Hook

- [x] 2.1 Update `useCollection.js` to handle unauthenticated state by reading/writing to `localStorage`.
- [x] 2.2 Implement a "Local Only" status in the `isSyncing` logic.

## 3. UI Implementation

- [x] 3.1 Update `AuthModal.jsx` to include a prominent "Guest Mode" entry and explain cloud sync benefits.
- [x] 3.2 Add a "Sync to Cloud" button/banner in the Dashboard for guest users.
- [x] 3.3 Update `Header.jsx` to show a "Guest Mode" badge when no user is logged in.

## 4. Verification

- [x] 4.1 Verify that stickers updated as guest persist after page reload.
- [x] 4.2 Verify that logging in correctly switches from local data to cloud data (and optionally prompts for migration).
