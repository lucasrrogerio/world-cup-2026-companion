## Context

O Supabase permite autenticação anônima que cria um registro na tabela `auth.users` sem e-mail/senha. O Turnstile da Cloudflare será usado como desafio de captcha para validar a criação desses usuários.

## Goals / Non-Goals

**Goals:**
- Persistir a sessão do visitante após refresh da página.
- Permitir que visitantes salvem figurinhas diretamente no banco de dados.
- Implementar o widget de captcha de forma não intrusiva.

**Non-Goals:**
- Manter suporte ao LocalStorage legado (exceto para migração inicial, se necessário).
- Alterar o esquema do banco de dados (as tabelas `profiles` e `collections` já suportam IDs de usuários).

## Decisions

- **Turnstile Placement**: O widget será renderizado dentro do `AuthModal` e o token será capturado no momento do clique em "Continuar como Visitante".
- **Session Persistence**: Usaremos o gerenciamento nativo de cookies/localStorage do Supabase Auth.
- **Sticker Sync**: O `useCollection` passará a considerar qualquer `user` (anônimo ou não) como elegível para sincronização via Supabase, eliminando o modo `local-only` manual.

## Risks / Trade-offs

- **Dependência do Cloudflare**: Se o serviço de captcha estiver fora do ar, novos visitantes não poderão entrar (usuários já logados continuam funcionando).
- **Limpeza de Banco**: O Supabase manterá registros de usuários anônimos. Pode ser necessária uma política de limpeza periódica no futuro para usuários anônimos inativos há muito tempo.
