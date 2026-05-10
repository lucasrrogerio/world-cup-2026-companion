## Context

The `useCollection` hook manages the user's sticker collection, syncing with either Supabase (if logged in) or LocalStorage (if guest). Current logic for loading data from these sources relies on mapping over the "previous" state, which can lead to persistence issues if a record is deleted or if the state is not properly reset between user sessions.

## Goals / Non-Goals

**Goals:**
- Ensure that setting a sticker count to 0 in the UI is reliably reflected after a page refresh or re-login.
- Prevent state leakage between different users on the same machine.
- Make the loading logic deterministic by using a clean base state.

**Non-Goals:**
- Change the database schema.
- Implement complex offline-first sync (simple LocalStorage fallback is sufficient).

## Decisions

- **Deterministic Load**: In the `useEffect` that loads data, we will map over `INITIAL_STICKERS` instead of the `prev` state. This ensures that any sticker not present in the persisted data (Supabase or LocalStorage) defaults to its initial value (0).
- **Explicit State Reset**: Upon a change in the `user` object (e.g., login or logout), the `stickers` state will be immediately reset to `INITIAL_STICKERS`. This prevents stickers from User A appearing in User B's UI before the fetch completes.
- **Robust LocalStorage Handling**: Ensure that the `localStorage` loading logic treats a missing key as a count of 0 for that specific sticker.
- **Improved Loading Guard**: Remove the `if (data && data.length > 0)` guard in `fetchCollection`. Instead, always process the `data` array (even if empty) to ensure the state reflects the current database reality (which might be an empty collection).

## Database Schema

The `collections` table must exist in the `public` schema with the following structure:
- `user_id`: UUID (REFERENCES auth.users)
- `sticker_id`: TEXT
- `count`: INTEGER
- **Constraint**: Unique on `(user_id, sticker_id)` to allow `upsert` via `onConflict`.

## Risks / Trade-offs

- **Re-rendering**: Explicitly resetting the state on user change might cause an extra re-render. However, this is necessary for correctness and data privacy.
- **Performance**: Mapping over all stickers (~1000 items) on every load is negligible in terms of performance on modern devices.
