## Context

The current `Dashboard.jsx` acts as the primary data overview, while `ProgressChart.jsx` (the Analytics tab) only contains the progress chart. The user wants to swap this so that the Home tab is purely informational/introductory, and the Progress tab is the "command center" for collection data.

## Goals / Non-Goals

**Goals:**
- Clearer separation between app introduction and data analytics.
- Enhanced Home tab with meaningful content about the app's purpose.
- Centralized data view in the Progress tab.

**Non-Goals:**
- Changing the underlying state management in `useCollection.js`.
- Adding new complex features during this restructure.

## Decisions

### 1. Refactor `ProgressChart.jsx` into a full Analytics Dashboard
- Rename or keep as `ProgressChart.jsx` but expand its scope.
- It will now receive `stats`, `cityDuplicates`, and `profile` from `App.jsx`.
- The `StatCard` component will be moved here (or made a shared component).
- The statistics grid (percentage, owned, missing, duplicates) and the progress bar will be placed above the line chart.
- The "Smart Recommendation" logic and card will be integrated into this view.

### 2. Redesign `Dashboard.jsx` (Início)
- It will no longer display the statistics grid or recommendations.
- New content will include:
    - A hero section with a welcoming message.
    - "Nosso Objetivo": A description of why this app exists (managing the FIFA 2026 album easily and connecting collectors).
    - "Como Funciona": Brief cards explaining:
        1. **Gerencie**: Marque suas figurinhas e repetidas.
        2. **Acompanhe**: Veja seu progresso detalhado.
        3. **Troque**: Encontre dicas de troca na sua cidade.

### 3. Component Communication
- `App.jsx` will be updated to pass the relevant data to the new analytics view and simplified data (or none) to the home view.

## Risks / Trade-offs

- **Redundancy**: If a user just wants to see their % quickly, they now have to click the "Progresso" tab instead of seeing it immediately on login. We'll mitigate this by ensuring the transition is fast and the navigation is prominent.
