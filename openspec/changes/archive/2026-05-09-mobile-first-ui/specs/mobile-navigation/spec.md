## ADDED Requirements

### Requirement: Bottom Navigation Bar
A fixed navigation bar must be present at the bottom of the screen on mobile devices.

#### Scenario: Mobile user switches views
- **WHEN** the screen width is less than 768px
- **THEN** a bottom navigation bar with "Dashboard" and "Album" icons/labels is visible.
- **AND** clicking an item switches the active view.

### Requirement: Active State Highlighting
The current active view must be clearly highlighted in the bottom navigation.

#### Scenario: Visual feedback for active tab
- **WHEN** the user is on the "Dashboard"
- **THEN** the Dashboard icon/label in the bottom nav is highlighted with the primary theme color (#4B0082).
