## Why

Allow users to try and use the application without the friction of creating an account immediately. This "Guest Mode" increases user retention and trust by letting them explore the features first, while clearly communicating the benefits of signing up (cloud sync and regional exchange data).

## What Changes

- Introduce a "Local-Only" or "Guest" mode that uses `localStorage` for all sticker data.
- Add a "Continue as Guest" option to the Auth landing screen.
- Implement a clear notification or banner explaining that data is stored locally and won't be synced until they log in.
- Update the `useCollection` hook to handle local storage fallback when no user is authenticated.

## Capabilities

### New Capabilities
- `guest-mode`: Allow full application usage with persistence in `localStorage` without authentication.

### Modified Capabilities
- `user-auth`: Update the login screen to include a "Guest Mode" entry point and explain benefits of logging in.
- `sticker-inventory`: Modify data fetching and saving logic to support local-only storage.

## Impact

- `src/hooks/useCollection.js`: Logic to toggle between Supabase and localStorage.
- `src/components/Dashboard.jsx`: Update CTA to support guest entry.
- `src/components/AuthModal.jsx`: Add messaging about cloud sync benefits.
- `src/components/Header.jsx`: Show "Guest Mode" indicator with a "Login to Sync" prompt.
