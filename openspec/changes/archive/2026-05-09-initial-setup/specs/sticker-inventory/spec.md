## ADDED Requirements

### Requirement: Global Sticker Set
O sistema deve conter um conjunto fixo de 994 figurinhas.

#### Scenario: Verify Total Count
- **WHEN** o sistema é inicializado
- **THEN** deve haver 960 figurinhas de seleções (48 times x 20), 20 figurinhas FWC e 14 figurinhas Coca-Cola.

### Requirement: Duplicates Counter
Exibir a contagem de repetidas excluindo a unidade colada.

#### Scenario: Display Duplicate Count
- **GIVEN** que o usuário marcou 3 unidades da figurinha `BRA 10`
- **THEN** o sistema deve exibir um badge `+2` sobre a figurinha.
