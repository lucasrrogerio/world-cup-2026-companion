# Capability: Navigation

## Purpose
Gerenciar a navegação global entre as diferentes áreas do aplicativo.

## Requirements

### Requirement: Navegação Global
O sistema deve permitir a alternância entre as principais visualizações do aplicativo e MUST manter consistência de estado visual nos controles de navegação relacionados ao modo ativo.

#### Scenario: Inclusão da aba Sobre
- **GIVEN** a barra de navegação no Header
- **WHEN** o sistema é renderizado
- **THEN** a opção "Sobre" deve estar disponível como destino de navegação.

#### Scenario: Indicador visual consistente no seletor de ordenação
- **WHEN** o usuário alterna entre os modos de ordenação por grupos e alfabética
- **THEN** o controle de modo MUST destacar visualmente o modo atualmente ativo de forma simétrica.

#### Scenario: Navegação lateral coerente com o modo ativo
- **WHEN** o modo de ordenação é alterado
- **THEN** a navegação lateral MUST atualizar o item ativo para um item válido no contexto do novo modo.
