## Why

Users have reported that the Dashboard "reloads non-stop" (visual flickering or infinite loop). This degrades the user experience and can lead to performance issues or browser crashes.

## What Changes

- **Component Stabilization**: Move the `StatCard` component definition outside of the `Dashboard` component. Defining components inside others causes them to unmount and remount on every parent render, leading to unnecessary re-animations and potential side-effect loops.
- **Mock Login for Debugging**: Implement a "Mock Login" button in the development environment to allow for consistent testing without relying on external authentication services.
- **Dependency Audit**: Review `App.jsx` and `useCollection.js` for unstable dependencies in `useEffect` and `useMemo` hooks.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `app`: Improve stability and performance of the main views.

## Impact

- `Dashboard.jsx`: Component refactoring.
- `App.jsx`: Auth flow update (optional mock).
- `useCollection.js`: Logic verification.
