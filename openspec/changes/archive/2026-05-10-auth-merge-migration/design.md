## Context

A transição de anônimo para autenticado via OAuth (Google) causa um recarregamento de página, limpando o estado do React. Precisamos de um armazenamento persistente (LocalStorage) para manter o progresso do visitante até que o novo usuário seja autenticado.

## Goals / Non-Goals

**Goals:**
- Detectar erros de conflito no `linkIdentity` e `updateUser`.
- Permitir que o usuário faça login na conta existente mantendo o progresso atual.
- Fundir os dados usando a regra de "maior valor" para contagem de figurinhas.

**Non-Goals:**
- Suportar migração entre duas contas já autenticadas (apenas de anônimo para autenticado).
- Implementar migração automática sem consentimento do usuário.

## Decisions

- **Storage Key**: Usar `wc_migration_pending` no `localStorage`.
- **Merge Strategy**: `Math.max(guest_count, existing_count)`.
- **AuthModal Flow**:
  1. Capturar erro `identity_already_exists`.
  2. Mudar estado para `migration_prompt`.
  3. Ao confirmar, salvar estado atual e disparar `signInWithGoogle` ou mudar modal para `login` (email).
- **App.jsx Logic**:
  - No `onAuthStateChange`, se houver um novo usuário e `wc_migration_pending` existir:
    - Mesclar dados.
    - Chamar `syncBatch` para salvar na nova conta.
    - Limpar `wc_migration_pending`.

## Risks / Trade-offs

- **Storage Limits**: A coleção de figurinhas é pequena (~1KB), então não há risco de estourar o limite de 5MB do LocalStorage.
- **Race Conditions**: Precisamos garantir que a migração ocorra após o fetch inicial da conta real para não sobrescrever dados existentes com zeros.
