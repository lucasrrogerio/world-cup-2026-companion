## ADDED Requirements

### Requirement: Touch-Friendly Count Adjustment
Sticker cards must provide a way to decrease the count that doesn't rely on desktop-only interactions (like right-click).

#### Scenario: Decreasing count on mobile
- **WHEN** a sticker has a count > 0
- **THEN** a small "minus" button is visible on the card (specifically on mobile/touch view).
- **AND** clicking the minus button decreases the sticker count by 1.

### Requirement: Visual Interaction Feedback
The card must provide clear visual feedback when a touch interaction occurs.

#### Scenario: Tapping a card
- **WHEN** the user taps a card
- **THEN** a ripple effect or scale change provides immediate feedback.
