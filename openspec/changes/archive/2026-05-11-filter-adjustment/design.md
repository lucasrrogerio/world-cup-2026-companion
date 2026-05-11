## Context

Hoje a experiencia de alternancia entre ordenacao por grupo e alfabetica mistura dois conceitos em um unico estado (`activeGroup`):
1) o item ativo de navegacao e
2) a ancora de secao visivel no modo atual.

Esse acoplamento provoca inconsistencias ao mudar de modo: o item anteriormente selecionado continua marcado mesmo quando a lista ativa passou para outro contexto (ex.: de `FWC` para lista alfabetica iniciando em `Argelia`). Alem disso, o botao de alternancia de modo aplica destaque visual de forma assimetrica, fazendo o modo de grupo parecer inativo.

## Goals / Non-Goals

**Goals:**
- Definir um modelo de estado que mantenha consistencia entre modo de ordenacao, item ativo e ancora de scroll.
- Tornar o feedback visual do controle de modo simetrico e inequivo para `group` e `alpha`.
- Garantir previsibilidade ao trocar modo em desktop e mobile (scrubber).

**Non-Goals:**
- Alterar os filtros de colecao (`all`, `missing`, `duplicates`).
- Reestruturar o layout do album ou regras de ordenacao de times.
- Introduzir novas dependencias visuais/estado.

## Decisions

### 1) Separar estado de selecao por modo
**Decision:** manter estado de navegacao separado para cada modo (`activeGroupItem` e `activeAlphaItem`) e derivar um `activeNavItem` conforme `sortBy`.

**Rationale:** evita heranca indevida de selecao entre contextos diferentes e preserva continuidade quando o usuario volta para um modo usado anteriormente.

**Alternatives considered:**
- Resetar sempre para primeiro item ao trocar modo: simples, mas perde contexto e causa sensacao de salto.
- Manter estado unico: continua causando incoerencias de destaque e scroll.

### 2) Definir fallback deterministico por modo
**Decision:** quando o item ativo do modo nao existir (mudanca de dados/filtro), usar fallback previsivel:
- `group`: `FWC` (ou primeiro item valido da lista de grupos)
- `alpha`: primeiro item da lista alfabetica segundo `sortDirection`

**Rationale:** reduz estados invalidos e garante item destacado correspondente ao topo logico da lista atual.

**Alternatives considered:**
- Nenhum fallback: gera item sem destaque ou destaque quebrado.

### 3) Uniformizar semantica visual do toggle de modo
**Decision:** aplicar estilo de estado ativo de forma simetrica para os dois modos (`group` e `alpha`) com mesma intensidade visual.

**Rationale:** elimina ambiguidade de que apenas um dos modos seria "ativo" e melhora legibilidade do estado da interface.

**Alternatives considered:**
- Manter destaque apenas para `alpha`: reproduz o problema reportado.

## Risks / Trade-offs

- [Risco] Mais estados locais aumentam complexidade de sincronizacao -> Mitigacao: centralizar derivacao de `activeNavItem` e fallback em um unico ponto no container.
- [Risco] ScrollSpy pode sobrescrever selecao manual durante transicao -> Mitigacao: manter janela de lock de scroll manual ja existente e alinhar update apenas ao modo ativo.
- [Trade-off] Preservar ultimo item por modo adiciona logica extra vs reset simples -> ganho de UX compensa custo pequeno de manutencao.

## Migration Plan

- Mudanca interna de estado em componentes de navegacao e container principal.
- Sem migracao de dados, sem impactar API e sem rollout gradual obrigatorio.
- Rollback: retornar ao estado unico anterior caso ocorram regressoes de navegacao.

## Open Questions

- Ao alternar para alfabetica pela primeira vez na sessao, devemos sempre iniciar no primeiro item ordenado ou tentar mapear grupo atual para primeiro time correspondente?
- No mobile scrubber, o comportamento de auto-scroll deve priorizar item ativo salvo ou posicao atual da viewport?
