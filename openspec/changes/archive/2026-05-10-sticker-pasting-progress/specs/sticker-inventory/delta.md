# Delta: Sticker Inventory

## ADDED Requirements

### Requirement: Paste Timestamp Tracking
The inventory system must record the exact time a sticker is first marked as pasted.

#### Scenario: First-time paste recording
- **GIVEN** a sticker with count 0
- **WHEN** the user increments the count to 1
- **THEN** the system must store the current date/time as the `pasted_at` timestamp for that sticker.

#### Scenario: Maintaining timestamp on count increase
- **GIVEN** a sticker with count 1 and a `pasted_at` timestamp
- **WHEN** the user increments the count to 2 (duplicate)
- **THEN** the `pasted_at` timestamp must remain unchanged.

#### Scenario: Removing a sticker
- **GIVEN** a sticker with count 1
- **WHEN** the user decrements the count to 0
- **THEN** the `pasted_at` timestamp should be cleared/removed.
