## Context

The current `useCollection` hook uses a debounced batch sync (2 seconds). If the user closes the tab or navigates away too quickly, the `beforeunload` listener is supposed to catch it, but this is often unreliable in modern browsers unless using `navigator.sendBeacon` (which Supabase doesn't use directly).

## Goals / Non-Goals

**Goals:**
- Ensure every sticker update is eventually persisted to Supabase.
- Fix any mismatch in database schema vs. application data.
- Improve reliability of the sync queue.

**Non-Goals:**
- Changing the database provider.
- Implementing a full offline-first sync engine (like RxDB).

## Decisions

- **Immediate Persistence**: For single sticker updates, we will trigger an immediate `upsert` instead of batching, OR reduce the debounce time to 500ms.
- **Sync Visuals**: Ensure the `isSyncing` indicator accurately reflects the network state.
- **Database Check**: Verify that the `collections` table has a composite unique key on `(user_id, sticker_id)`.
- **LocalStorage Sync**: When logged in, we should NOT be saving to `localStorage` to avoid stale data taking over upon page reload before the Supabase fetch finishes.

## Risks / Trade-offs

- **API Rate Limits**: Immediate saves increase the number of requests. We'll use a short debounce (500ms) to balance reliability and performance.
