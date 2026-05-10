# Design: Donation Link Integration

## UI Components

### 1. Footer Update
- Add a "Apoie o Desenvolvedor" (Support the Developer) block.
- **Visuals**: Use a subtle gradient background for the donation buttons to make them pop but remain elegant.
- **Buttons**:
    - **Buy Me a Coffee**: Icon + Label.
    - **Pix**: Icon + Label.

### 2. Pix Modal/Dialog
- A simple `motion.div` overlay.
- Displays a Pix Key (e.g., an email or random key).
- "Copy Key" button with success toast/feedback.
- QR Code (optional but recommended for a premium feel).

## Logic
- Use `navigator.clipboard.writeText` for copying the Pix key.
- State management in `Footer.jsx` for opening the modal.

## Responsive Design
- On mobile, the buttons should stack or be displayed as iconic buttons to save space.
- The modal must be centered and touch-friendly.
