## Context

The application currently lacks a footer. The user wants to add a simple but elegant footer that credits the creator and links to their GitHub.

## Goals / Non-Goals

**Goals:**
- Add a persistent footer at the bottom of the page.
- Link "Lucas Rogerio" to https://github.com/lucasrrogerio.
- Ensure the footer is localized.
- Maintain the premium aesthetic with subtle animations.

**Non-Goals:**
- Adding complex navigation links to the footer.
- Implementing a multi-column "mega footer".

## Decisions

- **Component Name**: `Footer.jsx`.
- **Placement**: Inside `App.jsx`, below the main content area but above the `MobileNav`.
- **Styling**: Use Tailwind CSS and CSS variables for theme consistency. It will have a subtle border-top and a backdrop blur.
- **i18n**: Add `common.created_by` and `common.developer_name` (if needed) to locale files.
- **Animation**: Use `framer-motion` for a subtle fade-in when the page loads.

## Risks / Trade-offs

- **Mobile View**: The footer must not interfere with the `MobileNav` (bottom navigation bar). I will add extra padding-bottom to the footer on mobile to ensure visibility.
