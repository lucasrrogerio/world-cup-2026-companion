## Context

The application currently tracks sticker counts but lacks historical data to visualize progress over time. Users want to see how their collection has grown since they started.

## Goals / Non-Goals

**Goals:**
- Track the exact date/time each sticker was first pasted.
- Display a visually appealing progress chart (cumulative total over time).
- Provide options to view progress by day or by week.
- Ensure progress data persists across sessions.

**Non-Goals:**
- Tracking the timestamp of every single duplicate added (only the first paste is needed for progress).
- Complex predictive analytics (e.g., "when will I finish the album").

## Decisions

### 1. Data Schema Update
- The sticker state and persistence layer will be updated to include a `pasted_at` field.
- **Local Storage**: The `panini_collection` object will change from `{ [id]: count }` to `{ [id]: { count, pastedAt } }`.
- **Supabase**: A new column `pasted_at` (timestamp with time zone) will be added to the `collections` table.

### 2. Chart Library: Recharts
- `recharts` will be used for its ease of use with React, responsiveness, and clean aesthetics.
- A `LineChart` will represent cumulative progress.
- Area charts with gradients will be used for a more premium look (Rich Aesthetics).

### 3. UI Implementation
- A new `CollectionAnalytics` component will be created.
- This component will be accessible via a new "Analytics" button in the `Header` or a dedicated section at the top of the album.
- Use smooth transitions and micro-animations when switching between daily/weekly views.

### 4. Logic
- When a sticker count goes from 0 to 1, `pasted_at` is set to `new Date().toISOString()`.
- When a sticker count goes from 1 to 0, `pasted_at` is set to `null`.
- If count increases from 1 to 2+, `pasted_at` remains unchanged.

## Risks / Trade-offs

- **Data Migration**: Existing users won't have timestamps for previously pasted stickers. We will treat them as "legacy" and assign them a default past date (e.g., the day the feature is released) or leave them as null (making them not appear in the historical chart until new ones are added). We'll choose to default them to the current date if `pasted_at` is missing but `count > 0`, to ensure the chart isn't empty.
- **Supabase Schema**: We need to ensure the Supabase table is updated. If we cannot run SQL, the app should handle the absence of the column gracefully (only local tracking).
