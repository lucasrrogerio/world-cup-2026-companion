## Context

The album is a continuous list of sections identified by IDs like `section-A`, `section-FWC`, etc.

## Decisions

- **ScrollSpy with IntersectionObserver**: 
    - Implement a `useEffect` in `App.jsx` that observes all `[id^="section-"]` elements.
    - Use a `threshold` and `rootMargin` (e.g., `rootMargin: "-20% 0px -70% 0px"`) to detect the section closest to the top of the viewport.
    - Update `activeGroup` state based on the intersecting section's ID.
- **Anchor Scroll Lock**: Temporarily disable the ScrollSpy observer when a manual jump-to (button click) is performed to prevent jitter.
- **Nav Auto-scroll**: In `Navigation.jsx`, when `activeGroup` changes, the horizontal scroll container should scroll to the active button if it's out of view.

## Implementation Details

- **App.jsx**:
    - Manage the `IntersectionObserver` instance.
    - Filter out "mock" or "duplicate" events.
- **Navigation.jsx**:
    - Use `useRef` on buttons to scroll them into view using `scrollIntoView({ inline: 'center' })`.
