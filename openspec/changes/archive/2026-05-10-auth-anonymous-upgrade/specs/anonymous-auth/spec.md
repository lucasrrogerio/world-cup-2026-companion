## ADDED Requirements

### Requirement: Autenticação Anônima Persistente
O sistema deve permitir que o usuário entre no aplicativo sem fornecer credenciais, mantendo sua identidade entre sessões do navegador.

#### Scenario: Primeiro acesso como visitante
- **GIVEN** um usuário não autenticado
- **WHEN** o usuário clica em "Continuar como Visitante"
- **AND** o captcha do Turnstile é validado
- **THEN** o Supabase deve criar uma sessão anônima persistente.

#### Scenario: Recarregamento de página (Refresh)
- **GIVEN** um usuário logado anonimamente
- **WHEN** a página é recarregada
- **THEN** o aplicativo deve recuperar a sessão anônima automaticamente e manter o progresso da coleção.

### Requirement: Proteção via Captcha
O login anônimo deve ser protegido contra abusos automatizados.

#### Scenario: Validação de Captcha
- **WHEN** o processo de login anônimo é iniciado
- **THEN** um token do Cloudflare Turnstile deve ser enviado ao Supabase para verificação.

### Requirement: Upgrade de Conta (Conversão)
O sistema deve permitir que um usuário anônimo converta sua conta para uma permanente sem perda de dados.

#### Scenario: Vincular Conta Google
- **GIVEN** um usuário logado anonimamente com progresso no álbum
- **WHEN** o usuário seleciona "Salvar com Google"
- **THEN** a conta anônima deve ser vinculada à identidade do Google.
- **AND** o progresso da coleção e o perfil (cidade/estado) devem ser mantidos.

#### Scenario: Conversão para E-mail/Senha
- **GIVEN** um usuário logado anonimamente
- **WHEN** o usuário fornece um e-mail e senha para salvar o progresso
- **THEN** a conta anônima deve ser atualizada para uma conta permanente.
- **AND** o e-mail deve ser sincronizado automaticamente para o perfil do usuário no banco de dados.
