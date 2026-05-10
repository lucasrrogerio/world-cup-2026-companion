## 1. Theme System (Dark/Light Mode)

- [x] 1.1 Update `src/index.css` to define CSS variables (colors, backgrounds, borders) for both dark and light modes.
- [x] 1.2 Refactor core components (Dashboard, StickerCard, ProgressChart) to use CSS variables instead of hardcoded hex colors.
- [x] 1.3 Add theme state management in `App.jsx` and apply the theme class/attribute to the root element.

## 2. Redesign Authentication Flow

- [x] 2.1 Extract the login/register form from `App.jsx` into a new `AuthModal` or `AuthView` component.
- [x] 2.2 Update `Dashboard.jsx` to include a prominent call-to-action (CTA) button that triggers the authentication view.
- [x] 2.3 Modify `App.jsx` to display the informational `Dashboard` as the landing page for unauthenticated users.

## 3. Navigation Streamlining

- [x] 3.1 Update `Header.jsx` to hide the "Início" tab and show a "Login" button (when unauthenticated) or a theme toggle.
- [x] 3.2 Update `MobileNav.jsx` to remove the "Início" tab for logged-in users.
- [x] 3.3 Ensure `App.jsx` defaults to the "Album" view immediately after a successful login.

## 4. UI Polish & Testing

- [x] 4.1 Verify that the light mode looks premium and maintains high readability.
- [x] 4.2 Test the login flow to ensure the transition from landing page to album is smooth.
- [x] 4.3 Ensure all Lucide icons (Sun, Moon, etc.) are correctly integrated for the theme toggle.
