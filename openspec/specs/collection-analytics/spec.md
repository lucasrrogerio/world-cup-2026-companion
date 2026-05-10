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

### Requirement: Collection Summary Cards
The analytics view must include a summary of the user's collection status at a glance.

#### Scenario: Displaying key metrics
- **WHEN** the user views the progress section
- **THEN** the system must display cards for:
    - Overall completion percentage.
    - Total stickers pasted.
    - Total missing stickers.
    - Total duplicates owned.

### Requirement: Progress Visualization
A visual progress bar should complement the detailed chart.

#### Scenario: Displaying completion bar
- **WHEN** the user views the progress section
- **THEN** a gradient progress bar should visually represent the total percentage of completion.

### Requirement: Integrated Swap Recommendations
Insights about potential swaps based on geography should be part of the analytics.

#### Scenario: Displaying swap tips
- **GIVEN** that recommendations are available for the user's city
- **WHEN** the user views the progress section
- **THEN** a recommendation card should be visible, showing potential teams to swap in their region.

