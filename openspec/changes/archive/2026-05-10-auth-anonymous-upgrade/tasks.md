## 1. Preparação e Dependências

- [x] 1.1 Instalar a biblioteca `@marsidev/react-turnstile`.
- [x] 1.2 Adicionar `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` ao arquivo `.env`.

## 2. Serviço de Autenticação

- [x] 2.1 Implementar `signInAnonymously` em `src/services/supabase.js`.
- [x] 2.2 Exportar a nova função.
- [x] 2.3 Implementar funções de upgrade (linkIdentity para Google e updateUser para Email).

## 3. Interface de Usuário (AuthModal)

- [x] 3.1 Importar o componente `Turnstile` no `AuthModal.jsx`.
- [x] 3.2 Integrar o widget de captcha no modal (renderização e captura de token).
- [x] 3.3 Substituir a lógica de `handleGuestMock` pela chamada real ao `signInAnonymously`.
- [x] 3.4 Adaptar o `AuthModal` para o modo "Upgrade" (vincular conta em vez de novo login).

## 4. Refatoração de Persistência (useCollection)

- [x] 4.1 Modificar o hook `useCollection.js` para não ignorar o salvamento no banco quando o usuário for anônimo.
- [x] 4.2 Simplificar a lógica de LocalStorage (mantê-la apenas como fallback absoluto ou remover se preferível).

## 5. Ajustes no App Principal

- [x] 5.1 Ajustar o handler de `onAuthSuccess` no `App.jsx` para lidar com usuários anônimos (remoção de mocks de perfil).
- [x] 5.2 Validar se o `onAuthStateChange` captura corretamente a sessão anônima no refresh.
- [x] 5.3 Atualizar o `Header.jsx` para diferenciar usuários anônimos e adicionar botão de "Salvar Progresso".
