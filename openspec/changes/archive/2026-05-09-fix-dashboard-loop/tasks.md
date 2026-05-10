## 1. Dashboard Stabilization

- [x] 1.1 Move `StatCard` definition outside the `Dashboard` function in `src/components/Dashboard.jsx`.
- [x] 1.2 Wrap `StatCard` in `React.memo` to further prevent unnecessary re-renders.

## 2. Testing Utilities

- [x] 2.1 Add a "Mock Login" button to the login screen in `App.jsx`.
- [x] 2.2 Implement a handler for mock login that sets a fake user object: `{ id: 'mock-id', email: 'mock@test.com' }`.

## 3. Verification

- [x] 3.1 Use the mock login to access the Dashboard.
- [x] 3.2 Verify that the "reloading" flickering has stopped.
- [x] 3.3 Verify that switching between views (Dashboard/Album) remains stable.
