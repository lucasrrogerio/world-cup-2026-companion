# i18n: Internationalization System

## Purpose
Provide a multi-language experience for users from different backgrounds living in Brazil.

## Requirements

### Requirement: Language Selection
O sistema deve permitir que o usuário escolha seu idioma de preferência.

#### Scenario: Switching Language
- **WHEN** o usuário seleciona um novo idioma no menu
- **THEN** todas as strings da interface devem ser atualizadas instantaneamente.
- **AND** a preferência deve ser salva para visitas futuras.

### Requirement: Content Localization
Todo o conteúdo textual, incluindo nomes de seleções e dicas de troca, deve ser traduzido.

#### Scenario: Localized Team Names
- **GIVEN** o idioma selecionado é Inglês (EN)
- **WHEN** visualizando a lista de figurinhas
- **THEN** o sistema deve exibir "BRAZIL" em vez de "BRASIL".

### Requirement: Supported Locales
O sistema deve suportar inicialmente:
- Português (pt-BR)
- Inglês (en-US)
- Espanhol (es-ES)
- Japonês (ja-JP)
- Francês (fr-FR)
