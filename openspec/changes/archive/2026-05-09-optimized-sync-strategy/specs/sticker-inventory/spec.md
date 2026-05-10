## MODIFIED Requirements

### Requirement: Inventory Management
O sistema deve garantir a persistência eficiente dos dados.

#### Scenario: Debounced Batch Sync
- **GIVEN** que o usuário está logado
- **WHEN** o usuário altera a quantidade de múltiplas figurinhas rapidamente
- **THEN** o sistema deve atualizar o estado local instantaneamente.
- **AND** aguardar 2 segundos de inatividade antes de enviar os dados ao servidor.
- **AND** enviar todas as alterações acumuladas em uma única requisição de lote (batch).
