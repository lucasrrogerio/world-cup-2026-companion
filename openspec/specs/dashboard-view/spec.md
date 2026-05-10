# Dashboard View

Purpose: Exibir as estatísticas de progresso da coleção do usuário de forma responsiva.

## Requirements

### Requirement: Stacked Stat Cards
Dashboard statistic cards should be organized to avoid horizontal overflow on narrow screens.

#### Scenario: Mobile dashboard layout
- **WHEN** the viewport width is less than 640px
- **THEN** statistic cards are displayed in a 2x2 grid.
- **AND** font sizes are reduced (e.g., text-lg for values) to ensure labels and values don't overlap.
