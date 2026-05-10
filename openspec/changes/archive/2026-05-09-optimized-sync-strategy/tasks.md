## 1. Preparation

- [x] 1.1 Update `useCollection.js` to include a `syncQueue` (useRef) and `isSyncing` state.
- [x] 1.2 Remove the immediate Supabase call from `updateStickerCount`.

## 2. Implementation

- [x] 2.1 Add a `useEffect` with a 2-second debounce timer that watches for changes in the `syncQueue`.
- [x] 2.2 Implement the `syncBatch` function to send all queued changes to Supabase in a single `upsert`.
- [x] 2.3 Add `beforeunload` event listener to ensure pending changes are saved when closing the tab.

## 3. UI Feedback

- [x] 3.1 Update `App.jsx` to show a subtle "Saving..." or "Synced" indicator in the Header or Footer.

## 4. Verification

- [x] 4.1 Verify that clicking multiple stickers quickly only triggers 1 network request after 2 seconds.
- [x] 4.2 Verify that data is correctly persisted after the batch sync.
