## ADDED Requirements

### Requirement: Google OAuth Login
Autenticação simplificada via Google.

#### Scenario: Login Flow
- **WHEN** o usuário clica em "Entrar com Google"
- **THEN** o sistema deve redirecionar para o fluxo OAuth do Supabase.
- **AND** após o sucesso, o usuário deve ser redirecionado para seu dashboard pessoal.
