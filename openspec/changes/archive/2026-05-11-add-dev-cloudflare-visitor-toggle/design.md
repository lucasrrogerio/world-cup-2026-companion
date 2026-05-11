## Context

O login de visitante é feito via Supabase Anonymous Auth e hoje depende de um token do Cloudflare Turnstile coletado dentro do `AuthModal`. Esse acoplamento protege produção contra abuso automatizado, mas também bloqueia depuração local quando a chave do captcha não está configurada, o widget falha ou o time só precisa validar o restante do fluxo de visitante.

## Goals / Non-Goals

**Goals:**
- Permitir que desenvolvedores desliguem manualmente a exigência do Turnstile durante testes locais.
- Deixar o bypass explícito na interface, evitando que ele seja ativado por engano.
- Preservar o comportamento atual de produção e o comportamento padrão de desenvolvimento quando o bypass estiver desligado.

**Non-Goals:**
- Remover o Cloudflare Turnstile do fluxo padrão de autenticação anônima.
- Alterar políticas ou configuração do Supabase em produção.
- Criar um sistema amplo de feature flags persistidas no aplicativo inteiro.

## Decisions

- Expor um botão/toggle de bypass apenas quando `import.meta.env.DEV` estiver ativo. Isso mantém a affordance fora de produção sem depender apenas de disciplina operacional.
- Manter o bypass local ao `AuthModal`, com estado em memória durante a sessão da interface. Alternativa considerada: persistir em `localStorage`; rejeitada para evitar que o modo dev "vaze" entre sessões e cause confusão durante QA.
- Não tentar forçar `signInAnonymously` sem `captchaToken`, porque o Supabase continua validando captcha no backend e retorna erro. Alternativa considerada: enviar requisição sem token mesmo assim; rejeitada por não funcionar na prática.
- Quando o bypass estiver ativo, esconder o bloco do Turnstile e entrar no app em modo visitante local, reaproveitando o caminho já suportado por `localStorage` no `useCollection`.

## Risks / Trade-offs

- [Bypass ser usado fora do contexto esperado] → Restringir a renderização ao ambiente `DEV` e exigir ativação manual por botão na UI.
- [Diferença entre o fluxo de dev e produção mascarar problemas do Turnstile] → Manter o bypass desligado por padrão e sinalizar visualmente quando ele estiver ativo.
- [Modo visitante local divergir do visitante anônimo real] → Restringir o fallback ao modo `DEV`, sinalizar visualmente que não há sessão Supabase e manter o fluxo padrão como default.
