## MODIFIED Requirements

### Requirement: Inventory Navigation
#### Scenario: Filter by Collection Status
- **GIVEN** the user is viewing the album
- **WHEN** the user selects the "Missing" filter
- **THEN** only stickers with count 0 MUST be displayed.
- **AND** teams with no missing stickers MUST be hidden.

#### Scenario: Filter by Duplicates
- **GIVEN** the user is viewing the album
- **WHEN** the user selects the "Duplicates" filter
- **THEN** only stickers with count > 1 MUST be displayed.
- **AND** teams with no duplicates MUST be hidden.

#### Scenario: Show All
- **WHEN** the user selects the "All" filter
- **THEN** the entire collection MUST be displayed (default behavior).
