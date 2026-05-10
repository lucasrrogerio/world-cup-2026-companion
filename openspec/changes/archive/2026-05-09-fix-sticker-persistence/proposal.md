## Why

Users have reported that removing stickers (setting their count to 0) in the UI does not consistently persist across sessions. This leads to a frustrating experience where a user's collection doesn't accurately reflect their changes after a refresh or re-login.

## What Changes

- **Persistence Logic Fix**: Update the `useCollection` hook to correctly handle stickers with a count of 0 during the sync and load processes.
- **State Reset on Auth Change**: Ensure that the stickers state is properly reset or reloaded from the correct source (Supabase or LocalStorage) whenever the user's authentication state changes (login/logout).
- **Functional State Updates**: Refine how the collection is merged from persistence into the local state to ensure that missing records are treated as 0 instead of retaining previous values.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `sticker-inventory`: Refine the logic for persisting and loading sticker counts, specifically ensuring that a count of 0 is correctly represented and persisted.

## Impact

- **Hooks**: `src/hooks/useCollection.js`
- **Database**: `collections` table in Supabase (logic only, no schema change required).
- **User Experience**: Reliable persistence of all sticker count changes, including removals.
