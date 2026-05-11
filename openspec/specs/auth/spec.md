# Capability: Authentication

## Purpose
Gerenciar autenticação de usuários com suporte a conta Google, e-mail/senha, acesso visitante, autenticação anônima persistente e conversão de conta sem perda de dados.

## Requirements

### Requirement: Authentication Methods
O sistema deve suportar métodos de autenticação modernos para persistência de dados na nuvem.

#### Scenario: Google OAuth Login
- **WHEN** o usuário clica em "Entrar com Google"
- **THEN** o sistema deve redirecionar para o fluxo OAuth do Supabase.
- **AND** após o sucesso, o usuário deve retornar autenticado ao aplicativo.

#### Scenario: Email and Password Login
- **WHEN** o usuário fornece e-mail e senha válidos
- **THEN** o sistema deve autenticar o usuário e carregar sua coleção.

### Requirement: Entry Point (Landing Page)
O sistema deve prover uma landing page informativa para usuários não autenticados.

#### Scenario: Informational Landing Page
- **GIVEN** um usuário não logado
- **WHEN** ele visita a URL raiz do aplicativo
- **THEN** ele deve visualizar o conteúdo introdutório e um botão proeminente para entrar.

#### Scenario: Login Modal/View
- **WHEN** o usuário clica em "Entrar"
- **THEN** um modal ou seção dedicada deve exibir opções de login por e-mail/senha, OAuth e visitante.

### Requirement: Guest Access
The system SHALL allow users to use the application without logging in.

#### Scenario: Continue as Guest
- **WHEN** the user chooses "Continuar como Visitante" on the authentication screen
- **THEN** they MUST be redirected to the main application view.
- **AND** subsequent sticker tracking actions MUST be persisted locally when no cloud session exists.

#### Scenario: Reloading as Guest
- **WHEN** a guest user returns to the application
- **THEN** their previous sticker counts MUST be loaded from local storage or an existing anonymous session.

### Requirement: Persistent Anonymous Authentication
O sistema deve permitir que o usuário entre no aplicativo sem fornecer credenciais, mantendo sua identidade entre sessões do navegador.

#### Scenario: Primeiro acesso como visitante em fluxo padrão
- **GIVEN** um usuário não autenticado
- **WHEN** o usuário clica em "Continuar como Visitante"
- **AND** o captcha do Turnstile é validado
- **THEN** o Supabase deve criar uma sessão anônima persistente.

#### Scenario: Primeiro acesso como visitante com bypass de desenvolvimento
- **GIVEN** um usuário não autenticado em ambiente de desenvolvimento
- **AND** o bypass de captcha para visitante está ativado manualmente
- **WHEN** o usuário clica em "Continuar como Visitante"
- **THEN** o aplicativo deve abrir em modo visitante local sem exigir token do Turnstile.

#### Scenario: Recarregamento de página
- **GIVEN** um usuário logado anonimamente
- **WHEN** a página é recarregada
- **THEN** o aplicativo deve recuperar a sessão anônima automaticamente e manter o progresso da coleção.

### Requirement: Captcha Protection
O login anônimo deve ser protegido contra abusos automatizados, exceto quando um bypass de desenvolvimento estiver ativado explicitamente em ambiente de desenvolvimento.

#### Scenario: Validação de Captcha no fluxo padrão
- **WHEN** o processo de login anônimo é iniciado sem bypass de desenvolvimento ativo
- **THEN** um token do Cloudflare Turnstile deve ser enviado ao Supabase para verificação.

#### Scenario: Bypass de Captcha em desenvolvimento
- **GIVEN** o aplicativo está em ambiente de desenvolvimento
- **AND** o usuário ativou manualmente o bypass de captcha para visitante
- **WHEN** o processo de login anônimo é iniciado
- **THEN** o fluxo não deve exigir renderização nem envio de token do Cloudflare Turnstile.

### Requirement: Account Upgrade
O sistema deve permitir que um usuário anônimo converta sua conta para uma permanente sem perda de dados.

#### Scenario: Vincular Conta Google
- **GIVEN** um usuário logado anonimamente com progresso no álbum
- **WHEN** o usuário seleciona "Salvar com Google" no modo vincular
- **THEN** a conta anônima deve ser vinculada à identidade do Google.
- **AND** o progresso da coleção e o perfil devem ser mantidos.

#### Scenario: Conversão para E-mail/Senha
- **GIVEN** um usuário logado anonimamente
- **WHEN** o usuário fornece um e-mail e senha para salvar o progresso
- **THEN** a conta anônima deve ser atualizada para uma conta permanente.
- **AND** o e-mail deve ser sincronizado automaticamente para o perfil do usuário no banco de dados.

#### Scenario: Modal com dois modos para usuário anônimo
- **GIVEN** um usuário logado anonimamente
- **WHEN** o modal de autenticação é aberto
- **THEN** o modal deve exibir modo de vincular conta e modo de entrar em conta existente.

#### Scenario: Botão Google adapta-se ao modo selecionado
- **WHEN** o usuário anônimo está no modo "Vincular conta"
- **THEN** o botão Google SHALL preparar migração antes de autenticar.
- **WHEN** o usuário anônimo está no modo "Já tenho conta"
- **THEN** o botão Google SHALL autenticar sem preparar migração.

### Requirement: Sync Awareness
The system SHALL inform guest users of the benefits of creating an account.

#### Scenario: Sync Benefits Messaging
- **WHEN** in Guest Mode
- **THEN** the UI MUST display a non-intrusive message or indicator highlighting data safety and regional insights.
