## Why

As users' collections grow, navigating the entire album to find specific stickers (like duplicates for swapping or missing ones to fill gaps) becomes difficult. Adding quick filters allows users to focus on the subset of data they care about at any given moment, improving the utility of the "My Album" view.

## What Changes

- **Filter UI**: Add a filter selector (segmented control or buttons) in the `Album` view.
- **Filtering Logic**: Update `StickerGrid.jsx` or the main `Album` component to filter the `stickers` array based on the selected mode:
    - **All**: Show all 994 stickers.
    - **Missing**: Show only stickers with `count === 0`.
    - **Duplicates**: Show only stickers with `count > 1`.
- **Localization**: Add labels for these filters in all supported languages.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `sticker-inventory`: Add advanced filtering to the album view.

## Impact

- `src/components/Album.jsx`: Update to include the new filter state and UI.
- `src/components/StickerGrid.jsx`: Modify to handle the filtered list of stickers.
- `src/locales/*.json`: Add filter labels (`album.filter_all`, `album.filter_missing`, `album.filter_duplicates`).
