## Context

The application currently uses 3-letter FIFA codes (e.g., BRA, MEX) as the primary identifier for teams in the data layer. These codes are rendered directly in the UI headers, leading to a redundant display like "MEX MEX" (badge + title) and making it harder for users to identify certain teams.

## Goals / Non-Goals

**Goals:**
- Provide a clear mapping from 3-letter codes to full Portuguese country names.
- Update the UI to show the full name as the primary title in `StickerGrid`.
- Maintain the 3-letter code badge for aesthetic consistency and quick reference.

**Non-Goals:**
- Changing the data structure of existing stickers (IDs will remain the same).
- Multi-language support for team names (only Portuguese for now).

## Decisions

### Team Name Mapping
A `TEAM_NAMES` constant will be added to `src/data/stickers.js`. This mapping will include all 48 team codes and special categories like `FWC` (which will map to "FIFA World Cup").

### UI Update in StickerGrid
The `teamName` variable in `StickerGrid.jsx` will be used as a key to look up the full name in the mapping. If no mapping exists (e.g., for 'Coca-Cola'), it will fallback to the original ID.

## Risks / Trade-offs

- **Maintenance**: Adding new teams would require updating the mapping. However, for a fixed 48-team tournament, this is low risk.
- **Label Length**: Some names might be long (e.g., "REPÚBLICA TCHECA"). The grid layout must handle this without breaking.
