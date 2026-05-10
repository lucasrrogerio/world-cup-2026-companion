## Context

Refinamento do Modo Escuro para aumentar a profundidade e o contraste.

## Goals / Non-Goals

**Goals:**
- Escurecer o `--bg-color`.
- Ajustar `--card-bg` para contrastar com o novo fundo.

## Decisions

### 1. Dark Mode Variable Adjustments

- `--bg-color`: `#00051A` (Navy quase preto)
- `--nav-bg`: `rgba(0, 5, 26, 0.9)`
- `--card-bg`: `#01103D` (Navy Profundo mas distinguível)
- `--card-border`: `rgba(0, 215, 255, 0.1)` (Ciano com baixa opacidade)
- `--card-shadow`: `0 10px 40px rgba(0, 0, 0, 0.6)`

### 2. Consistency

Mantemos o Ciano (#00D7FF) como acento, mas agora ele terá um fundo muito mais escuro para se destacar.
