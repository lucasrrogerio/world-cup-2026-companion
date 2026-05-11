## 1. State Model Updates

- [x] 1.1 Introduce mode-specific active navigation state in the app/container layer for group and alphabetical contexts.
- [x] 1.2 Add deterministic fallback resolution for missing active items in both modes (`group` and `alpha`).
- [x] 1.3 Ensure mode switch logic derives a valid `activeNavItem` for the newly selected mode.

## 2. Navigation UI Consistency

- [x] 2.1 Update sorting mode toggle styling so both modes render active/inactive states symmetrically.
- [x] 2.2 Update sidebar and mobile scrubber active-item handling to consume mode-appropriate active state.
- [x] 2.3 Validate jump-to-section behavior remains correct after switching sorting modes.

## 3. Scroll and Synchronization Behavior

- [x] 3.1 Align ScrollSpy updates with the active sorting mode so observer updates do not apply stale mode selections.
- [x] 3.2 Preserve manual-scroll lock behavior while preventing visual desync during mode transitions.

## 4. Verification

- [x] 4.1 Add or update tests covering mode switching, active item restoration, and fallback behavior.
- [x] 4.2 Perform manual verification on desktop and mobile for: initial state, mode switches, active highlight, and section anchoring.
