## Why

The current user experience forces an immediate login screen upon visiting the app, which is less engaging for new users. By turning the informational Dashboard into the landing page, we can showcase the app's value before requiring authentication. Additionally, removing the redundant Dashboard tab once logged in simplifies the navigation.

## What Changes

- **Landing Page**: The unauthenticated state will now display the `Dashboard` component (introductory content) instead of just a login form.
- **Login Integration**: Add a prominent "Get Started" or "Login" button to the landing page that opens the authentication form.
- **Navigation Redesign**: Remove the "Home" (Início) tab from the header and mobile navigation when the user is logged in.
- **Logged-in Default**: The app will default to the "Album" view upon login.
- **Dark Mode**: Implement a theme toggle to switch between the premium dark theme and a refined light theme.

## Capabilities

### Modified Capabilities
- `user-auth`: Redesigning the entry point and flow.
- `app-structure`: Removing the home tab for logged-in users and changing the default view.
- `ui-theme`: Adding support for light/dark mode switching.

## Impact

- **Onboarding**: Improved conversion by showing the app's value first.
- **UX**: Cleaner interface for power users who only need the album and analytics.
- **Aesthetics**: More flexibility with a light mode option.
