## MODIFIED Requirements

### Requirement: Cloud Synchronization
#### Scenario: Reliable Persistence
- **WHEN** an authenticated user updates a sticker count
- **THEN** the update MUST be sent to the cloud database within 1 second.
- **AND** the UI MUST show a "Saving" indicator.
- **AND** if the sync fails, the system MUST NOT clear the sync queue until success is confirmed.
