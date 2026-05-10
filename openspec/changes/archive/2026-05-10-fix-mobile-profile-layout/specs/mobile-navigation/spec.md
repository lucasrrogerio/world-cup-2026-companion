## MODIFIED Requirements

### Requirement: Bottom Navigation Bar
O sistema deve prover navegação para alternância de visões em todos os dispositivos, incluindo acesso ao perfil do usuário autenticado em mobile.

#### Scenario: Mobile user switches views
- **WHEN** the screen width is less than 768px
- **THEN** a bottom navigation bar with "Dashboard", "Album" and "Sobre" icons/labels is visible.
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
- **THEN** o cabeçalho (Header) deve exibir abas para "Dashboard" e "Álbum".
- **AND** apenas a visão ativa deve ser renderizada no conteúdo principal.

#### Scenario: Profile button visible from small breakpoint in Header
- **WHEN** the screen width is >= 640px (sm breakpoint)
- **AND** the user is authenticated and not anonymous
- **THEN** the profile button in the Header SHALL be visible (not hidden).
