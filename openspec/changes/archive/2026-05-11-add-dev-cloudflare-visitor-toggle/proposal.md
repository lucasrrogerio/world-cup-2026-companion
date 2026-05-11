## Why

O fluxo de entrada como visitante depende do Cloudflare Turnstile para criar a sessão anônima. Isso atrapalha testes locais e depuração quando o captcha falha, não está configurado no ambiente dev ou apenas adiciona atrito desnecessário para validar o fluxo de visitante.

## What Changes

- Adicionar um controle visível apenas em modo de desenvolvimento para desabilitar temporariamente a verificação do Cloudflare no login de visitante.
- Permitir que o fluxo "Continuar como Visitante" abra o aplicativo em modo visitante local quando esse controle de desenvolvimento estiver ativado.
- Manter o comportamento atual em produção e em desenvolvimento quando o bypass não estiver habilitado explicitamente.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `anonymous-auth`: ajustar a proteção do login anônimo para permitir bypass manual do captcha em ambiente de desenvolvimento, sem alterar a exigência padrão fora desse contexto.

## Impact

- `src/components/AuthModal.jsx`: novo botão/estado de modo dev para controlar a exibição e exigência do Turnstile no fluxo de visitante.
- `src/App.jsx`: suporte a um estado de visitante local de desenvolvimento para liberar o uso do app sem sessão Supabase.
- `src/services/supabase.js`: manutenção do fluxo de autenticação anônima padrão sem alterar a exigência real do backend em produção.
- Fluxo de autenticação anônima no Supabase/Cloudflare Turnstile: sem mudanças para produção, com fallback local apenas para desenvolvimento.
