## MODIFIED Requirements

### Requirement: Navigation Bar
#### Scenario: Desktop Sidebar Index
- **WHEN** the user is on a desktop device
- **THEN** the system MUST display a sticky vertical sidebar on the left.
- **AND** the sidebar MUST list all navigation items (Groups or Selections based on mode).
- **AND** the sidebar MUST sync its highlight with the active scroll position.

#### Scenario: Mobile Fast Scrubber
- **WHEN** the user is on a mobile device
- **THEN** the system MUST display a vertical "Fast Scrubber" on the right edge.
- **AND** dragging on the scrubber MUST show a large preview bubble of the current item.
- **AND** releasing the drag MUST jump to that section with a smooth animation.

#### Scenario: View Controls Redesign
- **WHEN** viewing the navigation toolbar
- **THEN** the system MUST show segmented controls for filtering (All, Missing, Duplicates).
- **AND** the controls MUST use smooth motion transitions for active states.
