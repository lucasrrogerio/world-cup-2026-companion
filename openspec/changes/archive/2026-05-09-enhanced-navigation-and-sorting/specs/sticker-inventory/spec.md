## MODIFIED Requirements

### Requirement: Navigation Bar
O sistema deve prover uma navegação fluida e intuitiva entre os grupos de figurinhas.

#### Scenario: Visual Scroll Indicators (Mobile)
- **GIVEN** que o usuário está em um dispositivo móvel
- **THEN** o sistema deve exibir gradientes de "fade" nas bordas laterais da barra de grupos para indicar conteúdo oculto.

#### Scenario: Responsive Layout (Desktop)
- **GIVEN** que o usuário está em um desktop
- **THEN** o sistema deve exibir todos os grupos visíveis (com quebra de linha se necessário) em vez de usar scroll horizontal.

#### Scenario: ScrollSpy Synchronization
- **WHEN** o usuário rola o álbum manualmente
- **THEN** o sistema deve atualizar automaticamente o destaque na barra de navegação para o grupo atualmente visível.

#### Scenario: Jump-to Navigation
- **WHEN** o usuário clica em um grupo na barra de navegação
- **THEN** o sistema deve fazer um scroll suave até a seção correspondente no álbum.

### Requirement: Inventory Sorting
O sistema deve permitir que o usuário escolha a ordem de visualização das figurinhas.

#### Scenario: Alphabetical Sort
- **WHEN** o usuário seleciona a opção de ordenação "Alfabética"
- **THEN** todas as figurinhas devem ser exibidas em uma lista contínua ordenada alfabeticamente.
- **AND** os filtros de grupos devem ser ocultados.

#### Scenario: Sort Direction
- **WHEN** o usuário está no modo alfabético
- **THEN** o sistema deve permitir alternar entre ordem Crescente (A-Z) e Decrescente (Z-A).
