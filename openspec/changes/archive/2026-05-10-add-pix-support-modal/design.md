# Design: SupportModal Component

## Components

### `SupportModal.jsx`
- **Props**: `isOpen`, `onClose`.
- **Content**:
  - Icon: `Coffee` or `Heart`.
  - Heading: "Apoie o Projeto".
  - Subtext: Why support matters.
  - Image: `public/pix-qr.png` (Static QR Code).
  - Copy Section: Input-like field showing the PIX key with a "Copiar" button.
- **Styling**: Same glassmorphic/premium style as `AuthModal`.

## Integration Points

### `App.jsx`
- Manage `isSupportModalOpen` state.
- Pass `setIsSupportModalOpen` down to `Footer` and `SidebarNav`.

### `Footer.jsx`
- Add a "Apoiar Projeto" button in the credits section.

### `SidebarNav.jsx`
- Add a "Apoiar" button at the bottom of the team list.

## Assets
- Need a `pix-qr.png` file in the `public` folder.
