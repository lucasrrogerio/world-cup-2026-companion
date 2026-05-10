# i18n: Internationalization System

## Purpose
Provide a multi-language experience for users from different backgrounds living in Brazil.

## Requirements

### Requirement: Language Selection
The system SHALL allow the user to choose their preferred language.

#### Scenario: Switching Language
- **WHEN** the user selects a new language in the menu
- **THEN** all UI strings MUST be updated instantly.
- **AND** the preference MUST be saved for future visits.

### Requirement: Content Localization
All textual content, including team names and swap tips, MUST be translated.

#### Scenario: Localized Team Names
- **GIVEN** the selected language is English (EN)
- **WHEN** viewing the sticker list
- **THEN** the system MUST display "BRAZIL" instead of "BRASIL".

### Requirement: Supported Locales
The system MUST initially support:
- Portuguese (pt-BR)
- English (en-US)
- Spanish (es-ES)
- Japanese (ja-JP)
- French (fr-FR)
