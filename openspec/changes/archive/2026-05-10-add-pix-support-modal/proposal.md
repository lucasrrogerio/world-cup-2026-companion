# Proposal: Add PIX Support Modal

## Problem
The app is a community project and could benefit from voluntary donations to cover server costs. Currently, there is no integrated way for users to support the project via PIX without leaving the app.

## Goals
- Create a premium "Support the Project" experience.
- Provide a clear and easy way to donate via PIX (QR Code and Copy/Paste).
- Keep the user within the app context.

## Proposed Solution
- Implement a `SupportModal` component that displays a static QR Code and a "Copy PIX Key" button.
- Add entry points for the modal in the `Footer` and `SidebarNav`.
- Use `framer-motion` for smooth animations and consistent UI with the current brand identity.
