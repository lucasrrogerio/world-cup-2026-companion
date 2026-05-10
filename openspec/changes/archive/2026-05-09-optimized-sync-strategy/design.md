## Context

A função `updateStickerCount` no hook `useCollection.js` atualmente faz uma chamada ao Supabase para cada figurinha alterada. Em sessões de marcação intensiva, isso gera dezenas de requisições desnecessárias.

## Goals / Non-Goals

**Goals:**
- Reduzir o número de requisições ao banco de dados.
- Agrupar múltiplas alterações em um único `upsert`.
- Manter a percepção de velocidade para o usuário (Optimistic UI).

**Non-Goals:**
- Implementar sincronização offline complexa (Service Workers/IndexedDB) neste momento.
- Mudar a estrutura da tabela `collections`.

## Decisions

- **Sync Queue (Ref)**: Utilizaremos um `useRef` para manter um mapa de figurinhas que foram alteradas mas ainda não sincronizadas (`stickerId -> count`).
- **Debounced Effect**: Um `useEffect` monitorará as mudanças e, após um atraso de 2000ms de inatividade, disparará o envio do lote.
- **Upsert em Lote**: O Supabase aceita um array de objetos no método `.upsert()`. Enviaremos todos os itens pendentes de uma só vez.
- **Prevenção de Perda de Dados**: Utilizaremos o evento `beforeunload` para tentar disparar uma sincronização final caso o usuário feche a aba durante o período de debounce.

## Risks / Trade-offs

- **Delay na Persistência**: Os dados podem demorar até 2 segundos para estarem "salvos" no servidor após o último clique. O risco de perda é mitigado pela persistência local imediata (localStorage) que já existe.
- **Complexidade de Erro**: Se um lote falhar, precisaremos garantir que o usuário saiba ou que o sistema tente novamente.
