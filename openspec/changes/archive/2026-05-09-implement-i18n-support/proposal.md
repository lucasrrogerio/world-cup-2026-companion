## Why

As the FIFA 2026 Sticker Tracker gains popularity among residents and immigrants in Brazil, there is a growing need to support multiple languages beyond Portuguese. Supporting the most common languages used by residents (Portuguese, English, Spanish, Japanese, and French) will make the app more inclusive and accessible to a diverse user base.

## What Changes

- Implement a multi-language system (i18n).
- Add translation files for PT, EN, ES, JA, and FR.
- Introduce a language selector in the UI (Header/Settings).
- Refactor all UI strings (headers, labels, buttons, tips) to use the i18n system.
- Internationalize the team name mapping.

## Capabilities

### New Capabilities
- `i18n`: Core internationalization system to handle string resolution based on user preference.

### Modified Capabilities
- `app`: The UI requirements are changing to support dynamic language switching.

## Impact

- All UI components will need to replace hardcoded strings with translation keys.
- `src/data/stickers.js`: Team names will need to be localized.
- New `src/i18n/` directory for configuration and locale files.
