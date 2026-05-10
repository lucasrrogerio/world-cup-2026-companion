## Why

O perfil do usuário autenticado está completamente invisível em dispositivos mobile e tablet. O botão de perfil no `Header.jsx` usa `hidden lg:flex`, o que significa que ele só aparece em telas ≥1024px — em qualquer viewport menor, o usuário não tem como ver seu nome, cidade/estado, nem acessar configurações de perfil diretamente.

## What Changes

- Tornar o perfil do usuário visível no `MobileNav` (barra inferior) com ícone e nome
- Adicionar tab "Perfil" ao `MobileNav` que abre o modal/painel de perfil
- Exibir estado de sincronização no header mobile de forma compacta (sem perder o ícone de usuário)
- Ajustar o botão de perfil no `Header` para aparecer também em `sm` e `md` (não apenas `lg`)

## Capabilities

### New Capabilities
- Nenhuma nova capability — esta mudança é puramente de apresentação/layout

### Modified Capabilities
- `mobile-navigation`: Adicionar entrada de "Perfil" à barra de navegação inferior mobile, exibindo o nome/email do usuário e permitindo acesso ao modal de perfil

## Impact

- `src/components/MobileNav.jsx`: adicionar tab de perfil com nome do usuário
- `src/components/Header.jsx`: relaxar breakpoint do botão de perfil de `lg` para `sm`/`md`
- Props `user`, `profile` e `onProfileClick` precisam ser repassadas ao `MobileNav`
- `src/App.jsx`: repassar as props necessárias para `MobileNav`
