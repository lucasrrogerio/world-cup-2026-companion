## Context

The current album view shows all stickers grouped by team. Filtering should preserve this grouping but omit the teams/groups that have no matching stickers in the selected filter mode.

## Goals / Non-Goals

**Goals:**
- Provide 3 filter modes: All, Missing, Duplicates.
- Ensure the UI feels fast and responsive.
- Maintain consistent grouping and sorting.

**Non-Goals:**
- Adding text-based search (this might be a future change).
- Complex multi-select filters.

## Decisions

- **Filter State**: Move the `filterMode` state into the `Album` component.
- **UI Element**: Use a pill-style toggle or a button group next to the "Sort" options in the sub-header.
- **Empty States**: If a filter returns no results (e.g., "Missing" when the album is full), show a clear empty state message.
- **Team Visibility**: In `StickerGrid.jsx`, if a team has 0 stickers after filtering, hide the team header and section entirely.

## Risks / Trade-offs

- **Layout Shifts**: Omission of sections might cause large layout shifts when switching filters. We'll use `Framer Motion`'s `layout` prop to smooth the transitions.
