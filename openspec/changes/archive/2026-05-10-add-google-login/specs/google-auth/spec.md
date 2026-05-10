## ADDED Requirements

### Requirement: Autenticação via Google
O sistema deve permitir que o usuário inicie o processo de login usando uma conta do Google.

#### Scenario: Início do fluxo de login com Google
- **WHEN** o usuário clica no botão "Entrar com Google"
- **THEN** o usuário é redirecionado para a página de consentimento do Google via Supabase.

#### Scenario: Sucesso no login com Google
- **WHEN** o usuário autoriza o acesso no Google e é redirecionado de volta
- **THEN** o usuário deve ser autenticado no aplicativo e redirecionado para a página principal.

#### Scenario: Falha no login com Google
- **WHEN** ocorre um erro no processo de autenticação OAuth
- **THEN** uma mensagem de erro deve ser exibida ao usuário.
