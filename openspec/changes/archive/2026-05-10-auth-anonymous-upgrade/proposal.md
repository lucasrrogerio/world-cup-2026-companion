## Why

O sistema atual de usuários "Visitantes" utiliza um usuário mock fixo (`mock-user-123`), o que causa vários problemas:
1. **Falta de persistência**: Como o Supabase não reconhece o usuário mock, a sessão é perdida ao atualizar a página (refresh).
2. **Conflito de dados**: Todos os visitantes compartilham o mesmo ID, impedindo o salvamento individual de figurinhas no banco de dados.
3. **Complexidade no Código**: O hook `useCollection` precisa de lógica duplicada para lidar com LocalStorage e Supabase.

A implementação do **Supabase Anonymous Auth** resolve esses problemas ao fornecer identidades reais e persistentes para visitantes, permitindo uma transição suave para contas permanentes.

## What Changes

- Substituição do login mock pelo login anônimo oficial do Supabase.
- Integração do **Cloudflare Turnstile** para proteção contra bots.
- Implementação do fluxo de **"Upgrade" de conta** (conversão de anônimo para permanente).
- Atualização da UI para incentivar usuários anônimos a salvarem seu progresso.
- Refatoração do `useCollection.js` para simplificar a lógica de persistência.

## Capabilities

### New Capabilities
- `anonymous-auth`: Suporte para identidades anônimas protegidas por captcha.

### Modified Capabilities
- `user-auth`: Extensão da autenticação para suportar login sem credenciais iniciais.
- `sticker-inventory`: Simplificação da persistência de figurinhas.

## Impact

- `src/services/supabase.js`: Adição de `signInAnonymously`.
- `src/components/AuthModal.jsx`: Adição do widget Turnstile e nova lógica de login de visitante.
- `src/hooks/useCollection.js`: Remoção da lógica complexa de fallback de LocalStorage.
- `.env`: Adição da `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`.
