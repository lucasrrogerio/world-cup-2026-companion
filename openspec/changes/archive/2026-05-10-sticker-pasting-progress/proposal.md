## Why

The user wants to track their sticker collection progress over time. Currently, there is no way to visualize how many stickers were pasted on specific days or weeks. Adding a progress chart will provide motivation and a clear view of the collection's growth, making the app more engaging.

## What Changes

- Introduce a system to track the timestamp of when stickers are first pasted.
- Create a new analytics dashboard or section featuring a progress chart.
- The chart will show the cumulative total of stickers pasted per day/week.
- Ensure the data persists and is synced for logged-in users.

## Capabilities

### New Capabilities
- `collection-analytics`: Provides visual insights into the collection progress, including charts and historical data of sticker pasting.

### Modified Capabilities
- `sticker-inventory`: Needs to be updated to record timestamps when a sticker is marked as "pasted" (count changes from 0 to 1).

## Impact

- **Database/Persistence**: A new table or field in the user's collection data will be needed to store "pasted_at" timestamps for each sticker.
- **Frontend**: A new component for the chart will be added. We'll likely use `recharts` for a premium, responsive look.
- **State Management**: The `useCollection` hook will need to be updated to handle timestamp tracking.
