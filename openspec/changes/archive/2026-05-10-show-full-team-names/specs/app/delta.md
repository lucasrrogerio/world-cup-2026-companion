# Delta: FIFA 2026 Sticker Tracker

## MODIFIED Requirements

### Requirement: Sticker Identification
A identificação das seleções deve exibir o nome completo do país para melhor usabilidade.

#### Scenario: Full Team Name Display
- **GIVEN** uma figurinha de seleção (ex: BRA) ou categoria especial (ex: FWC)
- **WHEN** visualizada no Álbum ou Analytics
- **THEN** o sistema deve exibir o nome completo (ex: BRASIL ou FIFA World Cup) ao lado da sigla FIFA.

#### Scenario: ID Resolution
- **GIVEN** o ID da figurinha
- **WHEN** o sistema precisa renderizar o nome da seleção
- **THEN** ele deve resolver o código de 3 letras para o nome completo correspondente em português.
