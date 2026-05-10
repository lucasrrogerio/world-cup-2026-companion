## Why

A implementação atual realiza uma chamada de rede (upsert) para cada clique do usuário. Isso é ineficiente em termos de performance e uso de recursos, especialmente quando o usuário marca múltiplas figurinhas em sequência. Precisamos de uma estratégia que acumule as mudanças localmente e as envie em lotes (batches) após um curto período de inatividade.

## What Changes

- Implementar uma fila de sincronização local (sync queue) para rastrear figurinhas alteradas.
- Adicionar um mecanismo de **debounce** (ex: 2 segundos) para disparar a sincronização apenas quando o usuário terminar de interagir.
- Realizar a persistência em lote no Supabase usando um único comando `upsert`.
- Garantir que a interface continue respondendo instantaneamente (Optimistic UI).

## Capabilities

### Modified Capabilities
- `sticker-inventory`: Otimizar a persistência de dados para suportar sincronização em lote e debounced.

## Impact

- `useCollection.js`: Mudança na lógica da função `updateStickerCount` para usar a fila de sincronização.
- `App.jsx`: Possível feedback visual de "salvando..." durante a sincronização em lote.
