# Mobile Navigation

Purpose: Prover uma navegação ergonômica e intuitiva para os usuários, permitindo a alternância rápida entre as principais visões do aplicativo (Dashboard e Álbum) em qualquer tamanho de tela.

## Requirements

### Requirement: Bottom Navigation Bar
O sistema deve prover navegação para alternância de visões em todos os dispositivos.

#### Scenario: Mobile user switches views
- **WHEN** the screen width is less than 768px
- **THEN** a bottom navigation bar with "Dashboard" and "Album" icons/labels is visible.
- **AND** clicking an item switches the active view.

#### Scenario: Desktop view switching
- **WHEN** o usuário está em um dispositivo desktop (largura >= 768px)
- **THEN** o cabeçalho (Header) deve exibir abas para "Dashboard" e "Álbum".
- **AND** apenas a visão ativa deve ser renderizada no conteúdo principal.

### Requirement: Active State Highlighting
A visão ativa deve ser claramente destacada tanto no menu mobile quanto no menu desktop.

#### Scenario: Visual feedback for active tab (Mobile)
- **WHEN** the user is on the "Dashboard"
- **THEN** the Dashboard icon/label in the bottom nav is highlighted with the primary theme color (#4B0082).

#### Scenario: Visual feedback on Desktop
- **WHEN** a visão ativa é "album"
- **THEN** o botão "Álbum" no cabeçalho deve exibir um destaque visual (cor primária #4B0082 ou borda inferior).
