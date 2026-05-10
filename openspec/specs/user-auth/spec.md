# User Authentication

Purpose: Prover autenticação segura para persistência de dados do usuário na nuvem.

## Requirements

### Requirement: Authentication Methods
O sistema deve suportar métodos de autenticação modernos.

#### Scenario: Google OAuth Login
- **WHEN** o usuário clica em "Entrar com Google"
- **THEN** o sistema deve redirecionar para o fluxo OAuth do Supabase.
- **AND** após o sucesso, o usuário deve ser redirecionado para seu dashboard pessoal.

#### Scenario: Email and Password Login
- **WHEN** o usuário fornece e-mail e senha válidos
- **THEN** o sistema deve autenticar o usuário e carregar sua coleção.

### Requirement: Entry Point (Landing Page)
O sistema deve prover uma landing page informativa para usuários não autenticados.

#### Scenario: Informational Landing Page
- **GIVEN** um usuário não logado
- **WHEN** ele visita a URL raiz do aplicativo
- **THEN** ele deve visualizar o conteúdo introdutório (objetivo do app, como funciona).
- **AND** um botão de "Entrar" proeminente deve estar disponível para abrir o formulário de autenticação.

#### Scenario: Login Modal/View
- **WHEN** o usuário clica em "Entrar"
- **THEN** um overlay ou seção dedicada deve exibir as opções de login por e-mail/senha e OAuth.

