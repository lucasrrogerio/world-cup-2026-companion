# Collection Analytics

Purpose: Provide users with visual insights into their sticker collection progress over time.

## Requirements

### Requirement: Progress Over Time Chart
The system must display a chart showing the cumulative number of stickers pasted per day or week.

#### Scenario: Display Daily Progress
- **GIVEN** that the user has pasted stickers over several days
- **WHEN** the user views the analytics section
- **THEN** a line chart should display the growth of the collection, with the X-axis representing dates and the Y-axis representing the total count of pasted stickers.

#### Scenario: Weekly Aggregation
- **WHEN** the user selects the "Weekly" view
- **THEN** the chart should aggregate the data points by week to show broader progress trends.

### Requirement: Real-time Updates
The chart must reflect new stickers as they are marked as pasted.

#### Scenario: Pasting a new sticker
- **GIVEN** a sticker that was previously not owned (count 0)
- **WHEN** the user increments the count to 1
- **THEN** the analytics data must be updated to include the current timestamp.
- **AND** the chart should update to reflect the new total.

### Requirement: Responsive and Premium Visualization
The chart must be responsive and follow the app's rich aesthetic guidelines.

#### Scenario: Viewing on Mobile
- **GIVEN** a small screen device
- **THEN** the chart should resize appropriately and simplify labels if necessary to maintain readability.
- **AND** interactive tooltips should be available to see exact values on touch.
