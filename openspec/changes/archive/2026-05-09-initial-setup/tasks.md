## 1. Project Setup

- [x] 1.1 Inicializar projeto Vite + React em `./`.
- [x] 1.2 Instalar dependências: `@supabase/supabase-js`, `lucide-react`, `framer-motion`.
- [x] 1.3 Configurar arquivo `.env` com chaves do Supabase.

## 2. Data & Layout Foundation

- [x] 2.1 Criar `src/data/stickers.js` com a definição das 994 figurinhas e grupos.
- [x] 2.2 Criar componentes de Layout: `Header`, `Navigation`, `Dashboard`.
- [x] 2.3 Implementar o `StickerGrid` para exibição dinâmica por categoria.

## 3. Core Features Implementation

- [x] 3.1 Desenvolver o `StickerCard` com filtro grayscale e badge `+X`.
- [x] 3.2 Implementar hook `useCollection` para gerenciar estado global e persistência.
- [x] 3.3 Adicionar lógica de cálculo de estatísticas (Owned, Missing, Duplicates).

## 4. Supabase Integration

- [x] 4.1 Implementar `src/services/supabase.js` para conexão e Auth.
- [x] 4.2 Criar tela de Login com botão "Google OAuth".
- [x] 4.3 Implementar sincronização bidirecional do estado com a tabela `collections`.

## 5. Smart Insights & Polish

- [x] 5.1 Implementar motor de cruzamento de dados para `Smart Recommendations`.
- [x] 5.2 Adicionar animações de transição e feedback visual "Premium".
- [x] 5.3 Implementar fluxo de Onboarding para captura opcional de Cidade/Estado.
