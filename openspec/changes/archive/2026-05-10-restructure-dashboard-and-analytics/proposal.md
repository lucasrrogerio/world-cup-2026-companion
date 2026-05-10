## Why

The user wants to reorganize the application's navigation to better separate informative content from statistical content. The "Home" (Início) tab should serve as an introduction to the app, while the "Progress" (Progresso) tab should contain all the collection statistics and insights that were previously on the home screen.

## What Changes

- Move the collection statistics (owned, missing, duplicates), progress bar, and smart recommendations from `Dashboard.jsx` to `ProgressChart.jsx` (the Progress tab).
- Update `Dashboard.jsx` to display a welcome message and a description of the app's goals.
- Ensure the layout of both tabs remains premium and visually appealing.

## Capabilities

### Modified Capabilities
- `collection-analytics`: Will now include the summary statistics and recommendations in addition to the progress chart.
- `app-structure`: The purpose and content of the "Home" view will be redefined.

## Impact

- **UI/UX**: Better separation of concerns. Home is for onboarding/context, Progress is for data.
- **Component Refactoring**: Logic from `Dashboard.jsx` will be extracted or shared with `ProgressChart.jsx`.
