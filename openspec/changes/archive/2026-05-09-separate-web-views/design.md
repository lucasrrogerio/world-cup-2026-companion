## Context

The current application renders both the `Dashboard` and the `StickerGrid` simultaneously on desktop. While this uses the horizontal space, it creates a visual overload. The goal is to apply the "View Switching" pattern used on mobile to the desktop experience as well.

## Goals / Non-Goals

**Goals:**
- Separate statistics (Dashboard) from the sticker collection (Album) on desktop.
- Provide a clear, premium navigation interface for desktop users to switch views.
- Maintain a single source of truth for the active view (`activeView` state).

**Non-Goals:**
- Move away from the single-page application model.
- Completely hide statistics from the album view if specific "mini-stats" are needed (though not part of this initial request).

## Decisions

- **Unified Render Logic**: Refactor the main content area in `App.jsx` to conditionally render either the `Dashboard` or the `StickerGrid` based on `activeView`, removing the `!isMobile` override that currently forces both to show.
- **Desktop Nav in Header**: Enhance `src/components/Header.jsx` to include a navigation toggle for desktop users. This will consist of "Dashboard" and "Meu Álbum" buttons.
- **Visual Feedback**: The active tab in the header will be highlighted with the primary theme color (#4B0082) and a subtle underline or background glow.
- **Transition Animation**: Wrap the view rendering in a `framer-motion` `AnimatePresence` or simple `motion.div` to ensure that switching between Dashboard and Album feels smooth and premium.

## Risks / Trade-offs

- **Click Count**: Desktop users will now need an extra click to move from stats to stickers. However, this is offset by the improved focus and reduced visual noise.
- **Header Space**: Adding tabs to the header might crowd it on smaller desktop screens (768px - 1024px). We will use responsive classes to ensure it scales correctly.
