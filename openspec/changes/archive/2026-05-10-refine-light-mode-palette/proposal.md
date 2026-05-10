## Why

The current light mode palette has poor contrast in several areas (notably borders, secondary text, and some background elements). This impacts readability and accessibility, making the app feel "muddy" or "washed out" in light mode. A higher-contrast, cleaner palette is needed to maintain the premium feel of the application.

## What Changes

- Redefine light mode CSS variables for better contrast (AA/AAA accessibility standards).
- Sharpen borders and increase the depth of primary/secondary text.
- Adjust background tints to ensure clear separation between cards and the main container.

## Capabilities

### Modified Capabilities
- `app`: The UI aesthetic requirements for Light Mode are changing to prioritize contrast.

## Impact

- `src/index.css`: The `[data-theme="light"]` section will be updated with more deliberate color choices.
