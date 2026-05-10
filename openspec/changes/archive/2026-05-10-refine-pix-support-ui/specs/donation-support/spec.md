## ADDED Requirements

### Requirement: Donation Support Modal
The system SHALL provide a way for users to support the project financially.

#### Scenario: Displaying support options
- **WHEN** the user clicks a "Support Project" button
- **THEN** a modal SHALL appear containing:
  - An icon and supportive heading
  - A PIX QR Code for scanning
  - A prominent "Access via Link" button pointing to a secure external platform (PixGG)
  - A visible text URL for fallback

#### Scenario: External navigation
- **WHEN** the user clicks the "Access via Link" button
- **THEN** the system SHALL open the support URL in a new browser tab/window

### Requirement: Global Entry Points
The system SHALL surface the support option in key areas of the application.

#### Scenario: Visibility for all users
- **WHEN** a user is on the Landing Page or Footer
- **THEN** a "Support Project" button SHALL be visible

#### Scenario: Visibility for logged-in users
- **WHEN** a user is navigating the album sidebar
- **THEN** a "Support Project" button SHALL be visible at the end of the navigation list
