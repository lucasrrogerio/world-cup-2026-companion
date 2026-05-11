## Context

O app tem dois componentes de navegação:
- **Header.jsx** (linhas 88-117): navbar do desktop combotões Album → Progresso → Sobre
- **MobileNav.jsx** (linhas 10-20): navbar fixo bottom do mobile comAlbum → Analytics → About → Profile

O usuário está no mobilehambúrguer ao invés do navbar.

## Goals / Non-Goals

**Goals:**
- Remover botão de usuário do MobileNav (já disponível no menu hambúrguer)
- Reordenar MobileNav para: Progresso → Meu Album → Sobre

**Non-Goals:**
- Não modificar o Header do desktop
- Não modificar a ordem do menu hambúrguer

## Decisions

1. **Remover `profileTab` do MobileNav.jsx** (linhas 16-18)
   - O usuário já aparece no menu hambúrguer (Header.jsx linhas 287-305)
   - Não precisa duplicar no bottom nav

2. **Reordenar `baseTabs` no MobileNav.jsx** (linhas 10-14)
   - Atual: `[album, analytics, about]`
   - Novo: `[analytics, album, about]`
   - Traduções: `analytics` = "Progresso", `album` = "Meu Album", `about` = "Sobre"

## Risks / Trade-offs

- [Baixo] Apenas impacto visual na navegação mobile
- [Nenhum] Sem mudança funcional ou de dados