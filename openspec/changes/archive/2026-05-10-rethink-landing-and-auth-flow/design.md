## Context

The current application requires a login before any content is visible. The user wants to flip this: see the content first, then log in to save data. Also, the navigation should be cleaner by removing the introductory tab once the user is already authenticated and using the app.

## Goals / Non-Goals

**Goals:**
- Implement a "Preview-first" landing page using the existing `Dashboard` component.
- Streamline navigation for authenticated users.
- Add a theme toggle for Dark and Light modes.

**Non-Goals:**
- Changing the database schema.
- Implementing social logins beyond what is already supported.

## Decisions

### 1. Landing Page Refactor
- In `App.jsx`, when `user` is null, the `main` content will display the `Dashboard` component.
- A new `LoginModal` or an inline `AuthForm` will be triggered by a "Entrar" button added to the `Dashboard`.
- The `Header` will still be visible but will show the "Login" button instead of the user profile.

### 2. Navigation Cleanup
- When `user` is NOT null, the `activeView` will be constrained to `['album', 'analytics']`.
- If `activeView` was `dashboard` at the moment of login, it will automatically switch to `album`.
- `Header.jsx` and `MobileNav.jsx` will be updated to hide the "Início" tab for logged-in users.

### 3. Dark/Light Mode
- A new `theme` state will be added to `App.jsx`.
- The root `div` will have a class or data-attribute (e.g., `data-theme="light"`).
- `index.css` will be updated with CSS variables for colors (backgrounds, borders, text).
- A theme toggle icon (Sun/Moon) will be added to the `Header`.

### 4. Component Updates
- `Dashboard.jsx`: Add a `onLoginClick` prop.
- `Header.jsx`: Add `theme` and `setTheme` props, and a conditional "Login" button.

## Risks / Trade-offs

- **CSS Variable Migration**: We need to ensure all components use the new CSS variables instead of hardcoded hex values to support theme switching.
- **Onboarding Flow**: The transition from the landing page to the album needs to be seamless after login.
