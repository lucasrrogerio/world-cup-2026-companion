## 0. Database Setup

- [x] 0.1 Create `collections` table in Supabase with `user_id` and `sticker_id` as unique composite key.
- [x] 0.2 Enable Row Level Security (RLS) and set up policies for user-level access.

## 1. Refactor useCollection Hook

- [x] 1.1 Update the `useEffect` loading logic to use `INITIAL_STICKERS` as the base for mapping when loading from Supabase or LocalStorage.
- [x] 1.2 Implement an explicit state reset to `INITIAL_STICKERS` at the beginning of the `useEffect` when the `user` dependency changes.
- [x] 1.3 Remove the length guard `if (data && data.length > 0)` in `fetchCollection` to ensure empty collections are correctly synced to the state.
- [x] 1.4 Update the `localStorage` load logic to explicitly handle missing stickers as count 0.

## 2. Verification

- [x] 2.1 Verify that marking a sticker as 0 persists after a page refresh (logged in).
- [x] 2.2 Verify that marking a sticker as 0 persists after a page refresh (guest).
- [x] 2.3 Verify that logging out correctly resets the sticker state or switches to the guest's collection without leaking the previous user's data.
