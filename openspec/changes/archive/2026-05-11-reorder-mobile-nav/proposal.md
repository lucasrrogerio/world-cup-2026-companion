## Why

A navegação mobile atualmente exibe itens em ordem incorreta e o usuário aparece tanto no navbar quanto no menu hambúrguer, causando redundância e confusão visual.

## What Changes

- Remover botão de usuário do navbar em dispositivos mobile (já disponível no menu hambúrguer)
- Reordenar itens do navbar mobile para: Progresso → Meu Album → Sobre

## Capabilities

### New Capabilities
- `mobile-nav-reorder`: Reordenação e limpeza dos itens de navegação mobile

### Modified Capabilities
- (nenhum)

## Impact

- Arquivo `src/components/Navbar.jsx` - adjustments na lógica de renderização do navbar mobile