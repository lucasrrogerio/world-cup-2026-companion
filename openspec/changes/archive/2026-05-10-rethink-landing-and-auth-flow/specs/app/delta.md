# Delta: FIFA 2026 Sticker Tracker

## MODIFIED Requirements

### Requirement: Navigation Bar
The navigation must be streamlined for logged-in users.

#### Scenario: Removing Home Tab
- **GIVEN** that the user is logged in
- **WHEN** viewing the navigation menu (Header or MobileNav)
- **THEN** the "Home" (Início) tab should NOT be visible.
- **AND** the app should default to the "Album" view if no other view was previously selected.

## ADDED Requirements

### Requirement: Theme Toggle (Dark/Light Mode)
The system must allow users to switch between dark and light visual themes.

#### Scenario: Switching to Light Mode
- **WHEN** the user toggles the theme button
- **THEN** the interface colors should switch to a refined light palette while maintaining the premium aesthetic.
- **AND** the preference should be persisted in local storage.
