## 1. Auth modal dev bypass

- [x] 1.1 Adicionar no `AuthModal` um controle visível apenas em `import.meta.env.DEV` para ativar/desativar o bypass de Cloudflare no fluxo de visitante.
- [x] 1.2 Atualizar o estado e a UI do fluxo "Continuar como Visitante" para ocultar ou desabilitar o Turnstile e sinalizar visualmente quando o bypass estiver ativo.

## 2. Anonymous auth behavior

- [x] 2.1 Ajustar o fluxo de visitante para usar um modo local de desenvolvimento quando o bypass estiver ativo, sem depender de sessão Supabase.
- [x] 2.2 Conectar o `AuthModal` ao novo comportamento para que o login anônimo continue exigindo captcha no fluxo padrão e siga em modo local apenas no bypass de desenvolvimento.

## 3. Validation

- [ ] 3.1 Validar manualmente em desenvolvimento que o visitante consegue entrar com o Turnstile ativo e também com o bypass ativado.
- [x] 3.2 Confirmar que o controle de bypass não aparece fora do modo de desenvolvimento e que erros do Supabase continuam sendo exibidos normalmente.
