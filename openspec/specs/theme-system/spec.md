# Capability: Theme System

## Purpose
Prover identidade visual consistente e sistema de temas dark/light com boa legibilidade, resposta rápida e estética premium.

## Requirements

### Requirement: Responsive Theme
The system SHALL support multiple visual themes (dark and light) that adapt all UI elements automatically.

#### Scenario: Dark Mode Aesthetics
- **WHEN** Dark Mode is active
- **THEN** the background MUST be a deep navy/slate tone.
- **AND** primary accents MUST remain readable against dark surfaces.
- **AND** no more than 3 main brand colors should be used simultaneously to avoid visual clutter.

#### Scenario: Light Mode Aesthetics
- **WHEN** Light Mode is active
- **THEN** the background MUST be a soft off-white (`#f8fafc`).
- **AND** interactive cards MUST be pure white (`#ffffff`).
- **AND** gold accents MUST be adjusted for high readability against light backgrounds.

#### Scenario: Theme Toggle Persistence
- **WHEN** the user toggles between dark and light theme
- **THEN** the active theme SHALL be stored in localStorage.
- **AND** the stored theme SHALL be applied on next page load.

#### Scenario: Theme Change Responsiveness
- **WHEN** the user toggles theme on mobile or desktop
- **THEN** visible theme colors SHALL update as a single fast transition.
- **AND** the page scroll position SHALL NOT reset due to the theme change.

### Requirement: Guest Data Privacy
The system SHALL protect regional verified data from unauthenticated users.

#### Scenario: Hide Regional Swaps
- **WHEN** in Guest Mode (unauthenticated)
- **THEN** the system MUST NOT display "city duplicates" or swap availability icons.
- **AND** the Dashboard MUST explicitly state that regional insights require logging in.
