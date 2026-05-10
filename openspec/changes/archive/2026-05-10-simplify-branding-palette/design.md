## Context

Simplificação do design system para focar na tríade de cores: Navy (#000B2B), Cyan (#00D7FF) e Lima (#B4FF00).

## Goals / Non-Goals

**Goals:**
- Unificar todos os acentos e interações no tom Cyan.
- Manter o Lima apenas para progresso e figurinhas coladas.
- Remover o Laranja e o Dourado.

## Decisions

### 1. New Token Mapping

| Original Token | New Token / Color |
| :--- | :--- |
| `--gold` | `--accent` (Cyan) |
| `--wc-orange` | `--card-border` (ou Cyan com opacidade) |
| `--text-secondary` | `--accent` (Cyan) |

### 2. UI Consolidation

- **Header Title**: Gradiente de Cyan para Navy (ou apenas Cyan).
- **Progress Bar**: Gradiente de Lima para Cyan.
- **Sticker Card**: Borda Cyan ao passar o mouse em figurinhas faltantes.
