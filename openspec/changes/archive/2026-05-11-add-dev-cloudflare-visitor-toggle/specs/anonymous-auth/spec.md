## MODIFIED Requirements

### Requirement: Autenticação Anônima Persistente
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

#### Scenario: Recarregamento de página (Refresh)
- **GIVEN** um usuário logado anonimamente
- **WHEN** a página é recarregada
- **THEN** o aplicativo deve recuperar a sessão anônima automaticamente e manter o progresso da coleção.

### Requirement: Proteção via Captcha
O login anônimo deve ser protegido contra abusos automatizados, exceto quando um bypass de desenvolvimento estiver ativado explicitamente em ambiente de desenvolvimento.

#### Scenario: Validação de Captcha no fluxo padrão
- **WHEN** o processo de login anônimo é iniciado sem bypass de desenvolvimento ativo
- **THEN** um token do Cloudflare Turnstile deve ser enviado ao Supabase para verificação.

#### Scenario: Bypass de Captcha em desenvolvimento
- **GIVEN** o aplicativo está em ambiente de desenvolvimento
- **AND** o usuário ativou manualmente o bypass de captcha para visitante
- **WHEN** o processo de login anônimo é iniciado
- **THEN** o fluxo não deve exigir renderização nem envio de token do Cloudflare Turnstile.
- **AND** o aplicativo deve operar em modo visitante local até que o usuário escolha entrar em uma conta real.

## ADDED Requirements

### Requirement: Controle Explícito de Bypass em Desenvolvimento
O sistema SHALL expor um controle explícito para desabilitar a proteção do Cloudflare no login de visitante apenas em ambiente de desenvolvimento.

#### Scenario: Controle aparece somente em desenvolvimento
- **WHEN** a tela de autenticação é exibida em um build que não está em modo de desenvolvimento
- **THEN** nenhum controle de bypass de captcha para visitante deve ser exibido.

#### Scenario: Controle sinaliza bypass ativo
- **GIVEN** a tela de autenticação está em ambiente de desenvolvimento
- **WHEN** o usuário ativa o bypass de captcha para visitante
- **THEN** a interface deve indicar visualmente que o login de visitante está operando sem Cloudflare.
