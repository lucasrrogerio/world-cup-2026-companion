## 1. Reliability Fixes

- [ ] 1.1 Reduce debounce time from 2000ms to 500ms in `useCollection.js`.
- [ ] 1.2 Fix the `localStorage` save condition: only save to `localStorage` if `user` is null.
- [ ] 1.3 Add a "manual sync" trigger or ensuring the `beforeunload` logic is as robust as possible.

## 2. Debugging & Verification

- [ ] 2.1 Add logging to `syncBatch` to identify if Supabase returns any hidden errors.
- [ ] 2.2 Verify that the `upsert` call matches the database schema exactly.
