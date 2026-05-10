## Why

Atualmente, o aplicativo oferece apenas login por email e senha. A integração com o Google simplifica o processo de entrada para o usuário, aumentando a conversão e melhorando a experiência do usuário ao evitar a necessidade de gerenciar mais uma senha.

## What Changes

- Adição de suporte para autenticação via OAuth com Google no Supabase.
- Implementação de uma nova função de login no serviço do Supabase.
- Adição de um botão "Entrar com Google" na interface de login/cadastro.

## Capabilities

### New Capabilities
- `google-auth`: Permite que os usuários se autentiquem usando suas contas do Google através do Supabase OAuth.

### Modified Capabilities
- `user-auth`: Extensão da capacidade de autenticação existente para incluir provedores OAuth.

## Impact

- `src/services/supabase.js`: Nova função `signInWithGoogle`.
- Componentes de Login/Cadastro: Novo botão de ação.
- Configurações do Supabase: Requer configuração de credenciais no dashboard.
