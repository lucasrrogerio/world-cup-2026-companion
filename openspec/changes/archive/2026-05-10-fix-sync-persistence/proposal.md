## Why

Sticker updates performed while logged in are reportedly not being persisted. This prevents users from reliably tracking their collection across sessions and devices. The issue likely stems from a failure in the debounced sync logic, an incorrect Supabase `upsert` call, or state-reset race conditions when the user object changes.

## What Changes

- **Sync Logic**: Investigate and fix the `syncBatch` function in `useCollection.js` to ensure data is correctly sent to Supabase.
- **Error Handling**: Add better error reporting and retries for failed sync operations.
- **State Preservation**: Ensure that local updates are not accidentally wiped out by the "reset to initial state" effect before the fetch completes.
- **Immediate Save**: Consider switching from purely debounced sync to an immediate save for critical updates if the debounce window is too long or unreliable.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `sticker-inventory`: Ensure reliable cloud persistence for authenticated users.

## Impact

- `src/hooks/useCollection.js`: Core sync and state management logic.
- `src/services/supabase.js`: Database client and interaction patterns.
- `src/App.jsx`: User authentication and profile state management.
