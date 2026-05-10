## MODIFIED Requirements

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
