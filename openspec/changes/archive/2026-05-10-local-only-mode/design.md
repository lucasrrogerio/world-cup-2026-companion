## Context

Currently, the app requires a login (or a mock login) to function. Users who don't want to sign up immediately are blocked from using the tracker.

## Goals / Non-Goals

**Goals:**
- Enable full sticker tracking functionality for unauthenticated users.
- Persist data in `localStorage` for guest users.
- Clearly differentiate between "Guest Mode" and "Authenticated Mode".
- Motivate users to log in by highlighting cloud sync and regional insights.

**Non-Goals:**
- Implementing server-side storage for guests.
- Automatic migration of local data to account (this will be a follow-up or handled via a simple prompt).

## Decisions

- **State Management**: Modify `useCollection.js` to detect `null` user and switch to `localStorage` methods.
- **Sync Visuals**: The `isSyncing` indicator in the header will be replaced with a "Local Only" status when in guest mode.
- **Onboarding**: Guest users will still see the onboarding (city selection) so they can see regional data, but it will be stored locally.
- **Auth Modal**: Add a prominent "Guest Mode" section explaining:
    - Cloud Sync (Safety)
    - Regional Exchange Insights
- **Data Key**: Use `panini-sticker-inventory-guest` as the localStorage key to avoid conflicts with other app data.

## Risks / Trade-offs

- **Data Loss**: If the user clears their browser cache, guest data is gone. We must add a warning about this in the UI.
- **Migration Complexity**: If a user later signs up, their local stickers might conflict with existing cloud data. For this version, we will focus on keeping them separate or providing a simple "Upload local data to account" button.
