# i18n Full Coverage

## Purpose

Define requirements for complete internationalization of all UI strings in the application.

## ADDED Requirements

### Requirement: All UI strings use i18n
All user-facing text in the application SHALL be internationalized using the `t()` function from LanguageContext.

#### Scenario: Mobile navigation shows translated "About"
- **WHEN** user changes language to English
- **THEN** "Sobre" becomes "About" in mobile navigation

#### Scenario: Onboarding shows translated labels
- **WHEN** user changes language to Spanish
- **THEN** "Cidade" becomes "Ciudad" and "Estado (UF)" becomes "Estado"

#### Scenario: Header buttons are translated
- **WHEN** user changes language to French
- **THEN** "Vincular E-mail" becomes "Associer un e-mail" and "Salvar progresso" becomes "Sauvegarder la progression"

#### Scenario: Auth modal text is translated
- **WHEN** user changes language
- **THEN** all security and migration warnings display in the selected language

#### Scenario: About page content is translated
- **WHEN** user changes language to Japanese
- **THEN** all feature descriptions display in Japanese

### Requirement: Fallback works correctly
The system SHALL fall back to Portuguese when a translation key is missing in the selected language.

#### Scenario: Missing translation key falls back to Portuguese
- **WHEN** a translation key exists in Portuguese but is missing in the selected language
- **THEN** the Portuguese text is displayed