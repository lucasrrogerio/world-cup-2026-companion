# Proposal: Refine PIX Support UI

## Problem
The previous implementation of the support modal included a "Copy to Clipboard" field for the PIX key. Since we transitioned to a PixGG link, the focus should be on direct navigation (clicking the link) and scanning the QR code, making the copy field redundant and cluttered.

## Goals
- Simplify the Support Modal UI.
- Remove the copy-to-clipboard functionality.
- Prioritize the clickable link and the QR code.

## Proposed Solution
- Update `SupportModal.jsx` to remove the state and logic for copying.
- Redesign the modal to feature a prominent "Acessar via Link" button and the QR code, with a simpler text link fallback.
