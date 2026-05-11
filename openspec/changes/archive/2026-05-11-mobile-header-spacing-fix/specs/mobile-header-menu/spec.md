## ADDED Requirements

### Requirement: Menu hamburger visível no mobile
O header SHALL exibir um ícone de menu hamburger (☰) no lugar dos ícones individuais de idioma/tema/perfil quando a tela for menor que 768px (breakpoint md).

#### Scenario: Hamburger aparece em tela mobile
- **WHEN** usuário acessa o app em tela com largura < 768px
- **THEN** o header exibe o ícone hamburger e oculta os ícones de idioma, tema e perfil individualmente

#### Scenario: Hamburger não aparece em tela desktop
- **WHEN** usuário acessa o app em tela com largura >= 768px
- **THEN** o header exibe os ícones de idioma, tema e perfil normalmente (comportamento atual)

### Requirement: Menu dropdown abre ao tocar hamburger
O app SHALL exibir um menu dropdown com todas as ações disponíveis ao tocar o ícone hamburger.

#### Scenario: Menu abre com animação
- **WHEN** usuário toca no ícone hamburger
- **THEN** o menu dropdown SHALL aparecer com animação suave (fade + slide)

#### Scenario: Menu contém todas as ações
- **WHEN** menu está aberto
- **THEN** o menu SHALL exibir:
  - Selector de idioma (atual)
  - Botão de alternar tema (atual)
  - Botão de perfil (se logado)
  - Botão de logout (se logado)
  - Botão de login (se não logado)

### Requirement: Menu fecha ao tocar fora ou selecionar ação
O app SHALL fechar o menu dropdown quando o usuário tocar fora da área do menu ou selecionar uma ação.

#### Scenario: Fechar ao tocar fora
- **WHEN** menu está aberto e usuário toca na área preta sobre o conteúdo
- **THEN** o menu SHALL fechar com animação

#### Scenario: Fechar ao selecionar idioma
- **WHEN** menu está aberto e usuário seleciona um idioma
- **THEN** o idioma SHALL ser alterado E o menu SHALL fechar

#### Scenario: Fechar ao selecionar tema
- **WHEN** menu está aberto e usuário toca no botão de tema
- **THEN** o tema SHALL ser alternado E o menu SHALL fechar

### Requirement: Sync indicator ocultado no mobile
O indicador de sincronização (Salvando/Salvo) SHALL ser ocultado no mobile para reduzir clutter no header.

#### Scenario: Indicador oculto no mobile
- **WHEN** usuário está em tela < 768px
- **THEN** o indicador de sync não SHALL ser exibido no header

#### Scenario: Indicador visível no desktop
- **WHEN** usuário está em tela >= 768px
- **THEN** o indicador de sync SHALL ser exibido normalmente