## MODIFIED Requirements

### Requirement: Responsive Theme
#### Scenario: Light Mode Aesthetics
- **WHEN** Light Mode is active
- **THEN** the background MUST be a soft off-white (`#f8fafc`).
- **AND** interactive cards MUST be pure white (`#ffffff`).
- **AND** gold accents MUST be adjusted for high readability against light backgrounds.

### Requirement: Guest Data Privacy
#### Scenario: Hide Regional Swaps
- **WHEN** in Guest Mode (unauthenticated)
- **THEN** the system MUST NOT display "city duplicates" or swap availability icons.
- **AND** the Dashboard MUST explicitly state that regional insights require logging in.
