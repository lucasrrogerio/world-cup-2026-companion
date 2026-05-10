# guest-mode: Unauthenticated Access

## Purpose
Allow users to use the application without logging in, providing an immediate value proposition while encouraging cloud synchronization for data safety.

## Requirements

### Requirement: Guest Access
The system SHALL allow users to use the application without logging in.

#### Scenario: Continue as Guest
- **WHEN** the user chooses "Continue as Guest" on the authentication screen
- **THEN** they MUST be redirected to the main application view.
- **AND** all subsequent sticker tracking actions MUST be persisted in `localStorage`.

### Requirement: Sync Awareness
The system SHALL inform guest users of the benefits of creating an account.

#### Scenario: Sync Benefits Messaging
- **WHEN** in Guest Mode
- **THEN** the UI MUST display a non-intrusive message or indicator highlighting:
    - Data safety (Cloud Sync)
    - Regional insights (Swap tracking in their area)

### Requirement: Data Persistence
Sticker inventory data for guest users MUST be persisted across browser sessions.

#### Scenario: Reloading as Guest
- **WHEN** a guest user returns to the application
- **THEN** their previous sticker counts MUST be loaded from `localStorage`.
