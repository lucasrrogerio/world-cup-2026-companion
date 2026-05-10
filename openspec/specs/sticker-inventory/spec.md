# Sticker Inventory

Purpose: Gerenciar o inventário completo de figurinhas do usuário, incluindo coladas e repetidas.

## Requirements

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

### Requirement: Touch-Friendly Count Adjustment
Sticker cards must provide a way to decrease the count that doesn't rely on desktop-only interactions (like right-click).

#### Scenario: Decreasing count on mobile
- **WHEN** a sticker has a count > 0
- **THEN** a small "minus" button is visible on the card (specifically on mobile/touch view).
- **AND** clicking the minus button decreases the sticker count by 1.

### Requirement: Visual Interaction Feedback
The card must provide clear visual feedback when a touch interaction occurs.

#### Scenario: Tapping a card
- **WHEN** the user taps a card
- **THEN** a ripple effect or scale change provides immediate feedback.

### Requirement: Collection Tracking
O usuário deve ser capaz de gerenciar o estado de cada figurinha individualmente, e as mudanças devem persistir de forma determinística.

#### Scenario: Removing a sticker (decrement to 0)
- **GIVEN** que o usuário possui 1 unidade de uma figurinha
- **WHEN** o usuário decrementa a quantidade para 0
- **THEN** o sistema deve persistir o valor 0 (ou remover o registro) na camada de persistência.
- **AND** após um recarregamento da página, a figurinha deve continuar com quantidade 0.

### Requirement: Multi-User Isolation
O sistema deve garantir que os dados da coleção sejam isolados por usuário e resetados corretamente em trocas de sessão.

#### Scenario: User Logout
- **GIVEN** um usuário logado com figurinhas marcadas
- **WHEN** o usuário realiza logout
- **THEN** a interface deve ser resetada imediatamente para o estado inicial (`INITIAL_STICKERS`) ou carregar os dados do `localStorage` (modo visitante).
- **AND** nenhuma figurinha do usuário anterior deve permanecer visível.

### Requirement: Navigation Bar
O sistema deve prover uma navegação fluida e intuitiva entre os grupos de figurinhas.

#### Scenario: Desktop Sidebar Index
- **WHEN** the user is on a desktop device
- **THEN** the system MUST display a sticky vertical sidebar on the left.
- **AND** the sidebar MUST list all navigation items (Groups or Selections based on mode).
- **AND** the sidebar MUST sync its highlight with the active scroll position.

#### Scenario: Mobile Fast Scrubber
- **WHEN** the user is on a mobile device
- **THEN** the system MUST display a vertical "Fast Scrubber" on the right edge.
- **AND** dragging on the scrubber MUST show a large preview bubble of the current item.
- **AND** releasing the drag MUST jump to that section with a smooth animation.

#### Scenario: Jump-to Navigation
- **WHEN** o usuário clica em um grupo na barra de navegação ou interage com o scrubber
- **THEN** o sistema deve fazer um scroll suave até a seção correspondente no álbum.

#### Scenario: ScrollSpy Synchronization
- **WHEN** o usuário rola o álbum manualmente
- **THEN** o sistema deve atualizar automaticamente o destaque na barra de navegação/sidebar para o grupo atualmente visível.

### Requirement: Inventory Sorting
...
### Requirement: Inventory Filtering
O sistema deve permitir filtrar a visualização por estado de coleção (Todas, Faltando, Repetidas).

#### Scenario: View Controls Redesign
- **WHEN** viewing the navigation toolbar
- **THEN** the system MUST show segmented controls for filtering (All, Missing, Duplicates).
- **AND** the controls MUST use smooth motion transitions for active states.

#### Scenario: Filter by Collection Status
- **GIVEN** o usuário está visualizando o álbum
- **WHEN** o usuário seleciona o filtro "Faltando"
- **THEN** apenas as figurinhas com quantidade 0 devem ser exibidas.
- **AND** os grupos que não possuem figurinhas faltando devem ser ocultados.

#### Scenario: Filter by Duplicates
- **GIVEN** o usuário está visualizando o álbum
- **WHEN** o usuário seleciona o filtro "Repetidas"
- **THEN** apenas as figurinhas com quantidade > 1 devem ser exibidas.
- **AND** os grupos que não possuem figurinhas repetidas devem ser ocultados.

### Requirement: Inventory Management
O sistema deve garantir a persistência eficiente dos dados.

#### Scenario: Debounced Batch Sync
- **GIVEN** que o usuário está logado
- **WHEN** o usuário altera a quantidade de múltiplas figurinhas rapidamente
- **THEN** o sistema deve atualizar o estado local instantaneamente.
- **AND** aguardar 2 segundos de inatividade antes de enviar os dados ao servidor.
- **AND** enviar todas as alterações acumuladas em uma única requisição de lote (batch).
- **AND** a UI MUST show a "Saving" indicator during the process.
- **AND** if the sync fails, the system MUST NOT clear the sync queue until success is confirmed.

### Requirement: Paste Timestamp Tracking
The inventory system must record the exact time a sticker is first marked as pasted.

#### Scenario: First-time paste recording
- **GIVEN** a sticker with count 0
- **WHEN** the user increments the count to 1
- **THEN** the system must store the current date/time as the `pasted_at` timestamp for that sticker.

#### Scenario: Maintaining timestamp on count increase
- **GIVEN** a sticker with count 1 and a `pasted_at` timestamp
- **WHEN** the user increments the count to 2 (duplicate)
- **THEN** the `pasted_at` timestamp must remain unchanged.

#### Scenario: Removing a sticker
- **GIVEN** a sticker with count 1
- **WHEN** the user decrements the count to 0
- **THEN** the `pasted_at` timestamp should be cleared/removed.

