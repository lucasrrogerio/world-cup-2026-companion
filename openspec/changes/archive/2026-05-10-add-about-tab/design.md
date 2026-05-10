## Context

O aplicativo evoluiu significativamente com a adição de autenticação anônima, sincronização em nuvem e proteção por captcha. Atualmente, não existe um local centralizado onde o usuário possa entender essas funcionalidades ou ver informações sobre o projeto.

## Goals / Non-Goals

**Goals:**
- Criar uma aba "Sobre" com design premium e informativo.
- Explicar de forma lúdica o funcionamento do modo Visitante vs. Conta Permanente.
- Listar as tecnologias principais (React, Supabase, Cloudflare, Framer Motion).
- Fornecer links úteis ou créditos.

**Non-Goals:**
- Criar um sistema de help desk ou chat.
- Adicionar documentação técnica exaustiva.

## Decisions

- **Arquitetura**: Criar o componente `AboutView.jsx` que será renderizado condicionalmente pelo `activeView` no `App.jsx`.
- **Navegação**: Adicionar o item "Sobre" ao lado de "Álbum" e "Progresso" no Header. No mobile, usaremos apenas um ícone ou um menu compacto se o espaço for insuficiente.
- **Estética**: Manter o uso de Glassmorphism, gradientes dourados/roxos e animações suaves com Framer Motion para que a página de informações seja tão atraente quanto o álbum.
- **Conteúdo Dinâmico**: O conteúdo deve mudar levemente dependendo se o usuário é anônimo ou registrado (ex: destacar as vantagens de vincular o e-mail se for visitante).

## Risks / Trade-offs

- **Espaço no Header**: Adicionar mais um item pode poluir o cabeçalho em telas muito pequenas. 
- **Solução**: Garantir que o Header seja responsivo e oculte labels se necessário.
