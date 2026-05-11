# Capability: Navigation

## Purpose
Gerenciar a navegação global entre as diferentes áreas do aplicativo, com suporte a desktop, mobile, ações do header e estado de navegação do álbum.

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

### Requirement: Header Actions Menu (Mobile)
O header SHALL exibir um menu hamburger no mobile para agrupar ações globais de idioma, tema, perfil e autenticação.

#### Scenario: Hamburger aparece em tela mobile
- **WHEN** usuário acessa o app em tela com largura < 768px
- **THEN** o header exibe o ícone hamburger e oculta os ícones individuais de idioma, tema e perfil.

#### Scenario: Hamburger não aparece em tela desktop
- **WHEN** usuário acessa o app em tela com largura >= 768px
- **THEN** o header exibe os controles de idioma, tema e perfil normalmente.

#### Scenario: Menu contém ações globais
- **WHEN** o menu hamburger está aberto
- **THEN** o menu SHALL exibir seletor de idioma, alternância de tema e ações aplicáveis de perfil, login ou logout.

#### Scenario: Menu fecha ao fechar explicitamente
- **WHEN** o menu está aberto e usuário toca no botão de fechar
- **THEN** o menu SHALL fechar com animação.

#### Scenario: Menu permanece aberto ao selecionar ação
- **WHEN** o menu está aberto e usuário seleciona idioma ou tema
- **THEN** a ação SHALL ser executada.
- **AND** o menu SHALL permanecer aberto.

#### Scenario: Sync indicator oculto no mobile
- **WHEN** usuário acessa o app em tela com largura < 768px
- **THEN** o indicador de sincronização não SHALL ser exibido no header.

### Requirement: Bottom Navigation Bar (Mobile)
O sistema deve prover navegação para alternância de visões em todos os dispositivos, incluindo acesso ao perfil do usuário autenticado em mobile.

#### Scenario: Mobile user switches views
- **WHEN** the screen width is less than 768px
- **THEN** a bottom navigation bar with "Album", "Progress" and "Sobre" icons/labels is visible.
- **AND** clicking an item switches the active view.

#### Scenario: Mobile authenticated user sees profile tab
- **WHEN** the screen width is less than 768px
- **AND** the user is authenticated and not anonymous
- **THEN** a "Perfil" tab SHALL be visible in the bottom navigation bar showing the User icon and the username (email prefix before @).
- **AND** clicking the "Perfil" tab SHALL trigger the profile modal/panel (onProfileClick).

#### Scenario: Mobile anonymous or unauthenticated user does NOT see profile tab
- **WHEN** the screen width is less than 768px
- **AND** the user is anonymous or not logged in
- **THEN** the bottom navigation bar SHALL NOT display a "Perfil" tab.

#### Scenario: Desktop view switching
- **WHEN** o usuário está em um dispositivo desktop (largura >= 768px)
- **THEN** o cabeçalho (Header) deve exibir abas para "Album" e "Sobre".
- **AND** apenas a visão ativa deve ser renderizada no conteúdo principal.

#### Scenario: Profile button visible from small breakpoint in Header
- **WHEN** the screen width is >= 640px (sm breakpoint)
- **AND** the user is authenticated and not anonymous
- **THEN** the profile button in the Header SHALL be visible (not hidden).

### Requirement: Active State Highlighting
A visão ativa deve ser claramente destacada tanto no menu mobile quanto no menu desktop.

#### Scenario: Visual feedback for active tab (Mobile)
- **WHEN** the user is on the "Album"
- **THEN** the Album icon/label in the bottom nav is highlighted with the primary theme color.

#### Scenario: Visual feedback on Desktop
- **WHEN** a visão ativa é "album"
- **THEN** o botão "Album" no cabeçalho deve exibir um destaque visual.

### Requirement: Mode-specific active navigation state
The system MUST maintain valid active navigation selections for group and alphabetical sorting modes.

#### Scenario: Switching from group to alphabetical
- **WHEN** the user switches sorting from group mode to alphabetical mode
- **THEN** the highlighted navigation item MUST belong to the alphabetical item list.
- **AND** the page scroll SHALL return to the top of the album list.

#### Scenario: Switching from alphabetical to group
- **WHEN** the user switches sorting from alphabetical mode to group mode
- **THEN** the highlighted navigation item MUST belong to the group item list.
- **AND** the page scroll SHALL return to the top of the album list.

### Requirement: Deterministic fallback for invalid active item
The system MUST apply a deterministic fallback when the stored active item is not available in the current mode list.

#### Scenario: Group mode fallback
- **WHEN** group mode is active and the stored group-mode active item is missing from the current group list
- **THEN** the system MUST set the active navigation item to `FWC`, or to the first available group item if `FWC` is unavailable.

#### Scenario: Alphabetical mode fallback
- **WHEN** alphabetical mode is active and the stored alphabetical active item is missing from the current alphabetical list
- **THEN** the system MUST set the active navigation item to the first item according to the current alphabetical sort direction.
