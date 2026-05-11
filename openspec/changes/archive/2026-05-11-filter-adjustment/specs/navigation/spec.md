## MODIFIED Requirements

### Requirement: Navegacao Global
O sistema deve permitir a alternancia entre as principais visualizacoes do aplicativo e MUST manter consistencia de estado visual nos controles de navegacao relacionados ao modo ativo.

#### Scenario: Inclusao da aba Sobre
- **GIVEN** a barra de navegacao no Header
- **WHEN** o sistema e renderizado
- **THEN** a opcao "Sobre" deve estar disponivel como destino de navegacao.

#### Scenario: Indicador visual consistente no seletor de ordenacao
- **WHEN** o usuario alterna entre os modos de ordenacao por grupos e alfabetica
- **THEN** o controle de modo MUST destacar visualmente o modo atualmente ativo de forma simetrica.

#### Scenario: Navegacao lateral coerente com o modo ativo
- **WHEN** o modo de ordenacao e alterado
- **THEN** a navegacao lateral MUST atualizar o item ativo para um item valido no contexto do novo modo.
