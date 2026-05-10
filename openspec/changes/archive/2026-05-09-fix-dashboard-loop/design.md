## Context

The Dashboard component currently defines a `StatCard` sub-component within its function body. This is a known React anti-pattern that causes the sub-component to be recreated on every render of the parent. Combined with `framer-motion` animations, this results in constant visual flickering.

## Goals / Non-Goals

**Goals:**
- Eliminate visual flickering in the Dashboard.
- Prevent infinite re-render loops.
- Simplify testing with a mock login.

## Decisions

- **Extract StatCard**: Move `StatCard` to the top level of `Dashboard.jsx` or to a separate file.
- **Stable Props**: Ensure that the `stats` object passed to `Dashboard` is stable unless the underlying data actually changes.
- **Mock Login Mode**: In `App.jsx`, add a temporary button or a hardcoded fallback that simulates a logged-in user if a specific "dev" flag is detected (or just for testing purposes).

## Risks / Trade-offs

- **Mock Security**: Ensure the mock login is only available in development and doesn't bypass real security in production.
