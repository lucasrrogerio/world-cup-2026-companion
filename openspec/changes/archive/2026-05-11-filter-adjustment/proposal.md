## Why

O comportamento atual de alternancia entre "Grupos" e "Alfabetica" gera inconsistencias visuais e de contexto: o destaque do botao de ordenacao parece invertido e o item ativo na navegacao lateral pode permanecer preso ao modo anterior. Isso causa confusao de orientacao na troca de modo e reduz a previsibilidade da experiencia.

## What Changes

- Ajustar os estados visuais do seletor de ordenacao para que o modo ativo seja representado de forma consistente em ambos os modos (grupo e alfabetica).
- Definir regras de sincronizacao do item ativo ao alternar o modo de ordenacao, evitando manter selecao invalida/inesperada do modo anterior.
- Garantir que a navegacao lateral (desktop e mobile scrubber) reflita o contexto correto apos cada troca de modo.
- Estabelecer comportamento esperado para preservacao ou reset de selecao ao alternar entre modos, com foco em orientacao do usuario.

## Capabilities

### New Capabilities
- `album-sorting-navigation-state`: Regras de estado e experiencia de navegacao para alternancia entre ordenacao por grupos e alfabetica.

### Modified Capabilities
- `navigation`: Ajustar requisitos para refletir o estado ativo correto dos controles e itens de navegacao quando o usuario muda o modo de ordenacao.

## Impact

- Affected code: `src/components/Navigation.jsx`, `src/components/SidebarNav.jsx`, `src/App.jsx`, possivelmente `src/components/MobileScrubber.jsx`.
- APIs/dependencies: sem mudancas de API externa e sem novas dependencias.
- UX: melhora de consistencia visual e de previsibilidade na navegacao do album.
