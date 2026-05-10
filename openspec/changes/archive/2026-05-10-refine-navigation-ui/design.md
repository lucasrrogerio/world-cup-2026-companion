## Context

The current `Navigation` uses a horizontal scroll for 14+ items. This is inefficient for direct access.

## Goals / Non-Goals

**Goals:**
- Replace horizontal scroll with a compact, scannable interface.
- Improve the visual distinction between "Group" and "Alphabetical" modes.
- Ensure the "current group" is still clearly indicated (ScrollSpy support).

**Non-Goals:**
- Removing the sticky behavior.
- Adding complex search filters here (already in `Album`).

## Decisions

- **Sticky Sidebar**: Instead of a top bar, we will use a **vertical navigation column** on the side (desktop) or a floating jump-menu (mobile).
- **Independent Scroll**: The sidebar list will have its own scroll (if needed) and won't interfere with the main album scroll.
- **Refined Toggle**: The "Group/Alpha" toggle will be integrated into the top of the sidebar or the main header.
- **Animation**: Use `Framer Motion` for smooth sidebar transitions and entry effects.

## Risks / Trade-offs

- **Vertical Space**: A grid takes more vertical space than a single scroll bar. We'll compensate by making the buttons more compact.
