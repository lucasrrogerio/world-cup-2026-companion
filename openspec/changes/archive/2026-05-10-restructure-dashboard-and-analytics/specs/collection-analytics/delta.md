# Delta: Collection Analytics

## ADDED Requirements

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
