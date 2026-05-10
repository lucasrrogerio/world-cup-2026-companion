## Context

O `Header.jsx` exibe o perfil do usuário (nome + cidade/estado) via um botão com `className="hidden lg:flex"`, tornando-o invisível em todos os viewports menores que 1024px (mobile e tablet). O `MobileNav.jsx` (barra de navegação inferior) não recebe as props `user`, `profile` ou `onProfileClick`, e portanto não oferece nenhuma forma de o usuário acessar seu perfil em mobile. Esta é uma regressão de UX crítica: o usuário autenticado no mobile não tem feedback visual de que está logado nem acesso ao próprio perfil.

## Goals / Non-Goals

**Goals:**
- Exibir o nome do usuário e ícone de perfil na `MobileNav` quando autenticado
- Adicionar uma tab "Perfil" na barra inferior mobile que aciona `onProfileClick`
- Relaxar o breakpoint do botão de perfil no `Header` de `lg` para `sm` (visível a partir de 640px)
- Repassar `user`, `profile` e `onProfileClick` ao `MobileNav` via `App.jsx`

**Non-Goals:**
- Redesenho completo da tela de perfil
- Alteração no fluxo de autenticação
- Mudanças na versão desktop do `Header`

## Decisions

### Decisão 1: Adicionar tab "Perfil" no `MobileNav` em vez de exibir o perfil inline no header mobile

**Escolha**: Tab dedicada no `MobileNav` com ícone `User`, exibindo o `email.split('@')[0]` como label truncado.

**Alternativa descartada**: Colocar um avatar/ícone no header mobile comprimido — isso poluiria um header já congestionado com ícones de idioma, tema e status de sync.

**Rationale**: O padrão de barra de navegação inferior já é o ponto de interação principal no mobile. Adicionar "Perfil" como quinta tab é natural e consistente.

### Decisão 2: Relaxar breakpoint do perfil no Header de `lg` para `sm`

**Escolha**: Trocar `hidden lg:flex` para `hidden sm:flex` no botão de perfil do `Header`.

**Rationale**: Em tablets (768px–1023px) já existe o Header com a barra de tabs (nav desktop), então exibir o perfil ali é adequado. Não altera nada no mobile (<768px) pois o `MobileNav` cobre esse caso.

### Decisão 3: Usuário anônimo não vê tab de Perfil no `MobileNav`

**Escolha**: A tab só é renderizada quando `!isAnonymous && user`.

**Rationale**: Consistente com o comportamento atual do Header desktop.

## Risks / Trade-offs

- **[Risco] Overflow de 5 tabs na barra inferior** → Mitigação: a tab "Perfil" só aparece quando o usuário está autenticado (não anônimo), mantendo 3 tabs para usuários não logados e anônimos.
- **[Trade-off] Label truncado no MobileNav** → O email pode ser longo; usar `email.split('@')[0]` e truncar com CSS `max-w` + `truncate` é suficiente para a maioria dos casos.
