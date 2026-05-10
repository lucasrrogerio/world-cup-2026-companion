# Capability: Anonymous Authentication

## Purpose
Permitir que novos usuários experimentem o aplicativo e comecem sua coleção instantaneamente sem a necessidade de criar uma conta formal, garantindo ao mesmo tempo a persistência dos dados entre sessões.

## Requirements

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
- **WHEN** o usuário seleciona "Salvar com Google" no modo Vincular
- **THEN** a conta anônima deve ser vinculada à identidade do Google.
- **AND** o progresso da coleção e o perfil (cidade/estado) devem ser mantidos.

#### Scenario: Conversão para E-mail/Senha
- **GIVEN** um usuário logado anonimamente
- **WHEN** o usuário fornece um e-mail e senha para salvar o progresso
- **THEN** a conta anônima deve ser atualizada para uma conta permanente.
- **AND** o e-mail deve ser sincronizado automaticamente para o perfil do usuário no banco de dados.

#### Scenario: Modal com dois modos para usuário anônimo
- **GIVEN** um usuário logado anonimamente
- **WHEN** o modal de autenticação é aberto
- **THEN** o modal DEVE exibir dois modos selecionáveis via abas:
  - **"Vincular conta"** (padrão, destaque verde): executa `upgradeToEmailAccount`, mantendo todos os dados locais mesclados à conta.
  - **"Já tenho conta"** (destaque âmbar): executa `signInWithEmail` normal, sem migração de dados.

#### Scenario: Banner de aviso no modo Vincular
- **WHEN** o modo "Vincular conta" está selecionado
- **THEN** um banner verde SHALL ser exibido informando que a coleção atual é mesclada à conta e os dados são mantidos.

#### Scenario: Banner de aviso no modo Entrar
- **WHEN** o modo "Já tenho conta" está selecionado
- **THEN** um banner âmbar SHALL ser exibido alertando que o progresso feito como visitante ficará apenas neste aparelho e não será unido à conta existente.

#### Scenario: Botão Google adapta-se ao modo selecionado
- **WHEN** o usuário anônimo está no modo "Vincular conta"
- **THEN** o botão Google SHALL executar `setPendingMigration` antes de autenticar (para mesclar dados).
- **WHEN** o usuário anônimo está no modo "Já tenho conta"
- **THEN** o botão Google SHALL autenticar sem salvar migration (dados locais não são migrados).

#### Scenario: E-mail já cadastrado no modo Vincular
- **GIVEN** um usuário anônimo no modo "Vincular conta"
- **WHEN** o e-mail fornecido já possui uma conta existente
- **THEN** o sistema SHALL exibir mensagem orientando o usuário a usar o modo "Entrar em conta existente", com aviso sobre a não migração dos dados.

