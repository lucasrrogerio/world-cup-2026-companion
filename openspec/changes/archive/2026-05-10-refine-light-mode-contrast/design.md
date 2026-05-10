## Context

Refinamento do Modo Claro para evitar o problema de baixo contraste "azul sobre azul".

## Goals / Non-Goals

**Goals:**
- Mudar `--bg-color` para branco.
- Inverter o uso de Navy e Cyan no modo claro para priorizar legibilidade.

## Decisions

### 1. Light Mode Variable Adjustments

- `--bg-color`: `#FFFFFF`
- `--nav-bg`: `rgba(255, 255, 255, 0.95)`
- `--accent`: `#000B2B` (Navy) - No modo claro, o Navy é mais legível que o Ciano.
- `--text-secondary`: `#001C71` (Azul Marinho Médio)
- `--card-border`: `#F1F5F9` (Cinza muito claro)

### 2. Consistency

O modo escuro permanece inalterado, pois o contraste entre Navy profundo e Ciano neon está excelente.
