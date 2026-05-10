# Capability: App Information

## Purpose
Fornecer transparência e instruções de uso aos usuários sobre as funcionalidades do aplicativo.

## Requirements

### Requirement: Exibição de Informações do App
O sistema deve fornecer uma área dedicada para explicar o funcionamento e as tecnologias do aplicativo.

#### Scenario: Visualização da aba Sobre
- **GIVEN** um usuário na tela principal
- **WHEN** o usuário seleciona a aba "Sobre" no menu de navegação
- **THEN** o sistema deve exibir o conteúdo informativo organizado em seções.

### Requirement: Conteúdo Contextual
O conteúdo da aba Sobre deve se adaptar ao estado de autenticação do usuário.

#### Scenario: Destaque para Visitantes
- **GIVEN** um usuário logado como visitante
- **WHEN** o usuário visualiza a aba Sobre
- **THEN** o sistema deve exibir com destaque as vantagens de vincular um e-mail.
