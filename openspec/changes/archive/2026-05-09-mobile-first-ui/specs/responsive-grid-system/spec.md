## ADDED Requirements

### Requirement: Adaptive Column Count
The sticker grid must adapt the number of columns to maintain usable tap targets on different mobile screen sizes.

#### Scenario: Very small screens
- **WHEN** the viewport width is less than 375px
- **THEN** the grid should display 3 columns.

#### Scenario: Standard mobile screens
- **WHEN** the viewport width is between 375px and 640px
- **THEN** the grid should display 4 columns.
