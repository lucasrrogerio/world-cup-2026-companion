## MODIFIED Requirements

### Requirement: Bottom Navigation Bar
O sistema deve prover navegação para alternância de visões em todos os dispositivos.

#### Scenario: Desktop view switching
- **WHEN** o usuário está em um dispositivo desktop (largura >= 768px)
- **THEN** o cabeçalho (Header) deve exibir abas para "Dashboard" e "Álbum".
- **AND** apenas a visão ativa deve ser renderizada no conteúdo principal.

### Requirement: Active State Highlighting
A visão ativa deve ser claramente destacada tanto no menu mobile quanto no menu desktop.

#### Scenario: Visual feedback on Desktop
- **WHEN** a visão ativa é "album"
- **THEN** o botão "Álbum" no cabeçalho deve exibir um destaque visual (cor primária #4B0082 ou borda inferior).
