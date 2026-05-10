## Context

The application currently has all UI strings hardcoded in Portuguese. To support multiple languages, we need a centralized way to manage translations and a mechanism to switch languages at runtime.

## Goals / Non-Goals

**Goals:**
- Centralize all UI strings in locale files.
- Support 5 languages: Portuguese (BR), English (US), Spanish (ES), Japanese (JP), and French (FR).
- Persist language preference in `localStorage`.
- Provide a smooth UI for switching languages.

**Non-Goals:**
- Server-side translation (all translations will be bundled in the client).
- RTL (Right-to-Left) support for now (not required by the 5 selected languages).

## Decisions

### i18n Implementation: Custom LanguageContext
We will implement a `LanguageContext` in `src/contexts/LanguageContext.jsx`. This avoids adding heavy dependencies while providing a clean `useLanguage()` hook with a `t(key)` function.

### Directory Structure
```
src/
  locales/
    en.json
    pt.json
    es.json
    ja.json
    fr.json
  contexts/
    LanguageContext.jsx
```

### Team Name Localization
The `TEAM_NAMES` in `stickers.js` will be moved to the locale files or handled by a mapping that accepts the current language.

### UI Integration
- **Header**: Add a language dropdown or toggle.
- **Components**: Wrap the app in `LanguageProvider` and update all text nodes.

## Risks / Trade-offs

- **Translation Quality**: Machine-translated strings for JA/FR/ES might need review.
- **Layout Shifts**: Japanese characters or long French words might affect layout. We will use flexible containers.
