## ADDED Requirements

### Requirement: Global Footer
The system SHALL display a footer at the bottom of all main views.

#### Scenario: Creator Credit
- **WHEN** the footer is visible
- **THEN** it MUST display "Created by Lucas Rogerio" (localized).
- **AND** "Lucas Rogerio" MUST be a link to `https://github.com/lucasrrogerio`.

### Requirement: Footer Responsiveness
The footer MUST adjust its layout for mobile devices.

#### Scenario: Mobile Spacing
- **WHEN** viewed on a mobile device
- **THEN** the footer MUST have enough bottom padding to not be obscured by the bottom navigation bar.
