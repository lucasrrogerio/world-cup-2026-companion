## 1. Desktop Navigation Components

- [x] 1.1 Update `src/components/Header.jsx` to accept `activeView` and `setActiveView` as props.
- [x] 1.2 Implement a desktop-only navigation section in `Header.jsx` with "Dashboard" and "Álbum" buttons.
- [x] 1.3 Add active state styling (e.g., border-b-2 or color change) to the desktop nav buttons.

## 2. App Layout Refactoring

- [x] 2.1 Pass `activeView` and `setActiveView` props to the `Header` component in `App.jsx`.
- [x] 2.2 Refactor the conditional rendering logic in `App.jsx` to respect `activeView` for both mobile and desktop users.
- [x] 2.3 Wrap the rendered views in a `motion.div` from `framer-motion` to provide smooth entry/exit animations when switching views.

## 3. UI Polishing

- [x] 3.1 Ensure the `Navigation` component (sticker groups) is correctly spaced when it becomes the primary top element in the "album" view on desktop.
- [x] 3.2 Verify that the `pb-20` padding is only applied on mobile to avoid extra space on desktop.
