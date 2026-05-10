## 1. Atualizar Props do MobileNav

- [x] 1.1 Adicionar props `user`, `profile` e `onProfileClick` na assinatura do `MobileNav.jsx`
- [x] 1.2 Em `App.jsx`, localizar onde `<MobileNav>` é renderizado e repassar `user`, `profile` e `onProfileClick`

## 2. Adicionar Tab de Perfil no MobileNav

- [x] 2.1 No array `tabs` do `MobileNav`, adicionar condicionalmente a tab `{ id: 'profile', label: username, icon: User }` quando `user && !user.is_anonymous`
- [x] 2.2 Importar o ícone `User` de `lucide-react` no `MobileNav.jsx`
- [x] 2.3 Exibir o nome do usuário (email prefix: `user.email?.split('@')[0]`) como label da tab, com `truncate` e `max-w-[60px]` para evitar overflow
- [x] 2.4 Ao clicar na tab de perfil, chamar `onProfileClick()` em vez de `setActiveView`

## 3. Corrigir Breakpoint do Botão de Perfil no Header

- [x] 3.1 No `Header.jsx`, linha 173, trocar `hidden lg:flex` por `hidden sm:flex` no botão de perfil do usuário autenticado não-anônimo

## 4. Validação

- [x] 4.1 Verificar no browser em viewport 375px (mobile) que a tab Perfil aparece na barra inferior com nome do usuário
- [x] 4.2 Verificar que clicar na tab Perfil abre o modal/painel de perfil
- [x] 4.3 Verificar que usuários anônimos e não logados NÃO veem a tab Perfil
- [x] 4.4 Verificar em viewport 768px (tablet) que o botão de perfil aparece no Header
