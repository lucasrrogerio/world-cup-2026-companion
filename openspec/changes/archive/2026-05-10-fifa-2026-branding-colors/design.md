## Context

O branding da Copa 2026 utiliza uma paleta de cores primárias e secundárias que devem ser harmonizadas para garantir legibilidade e acessibilidade, tanto no modo claro quanto no escuro.

## Goals / Non-Goals

**Goals:**
- Implementar as cores oficiais como variáveis CSS.
- Garantir que o modo escuro utilize o Azul Marinho (`#000B2B`) como base.
- Usar Verde Lima e Laranja para representar estados da coleção.

**Non-Goals:**
- Alterar a estrutura de layout ou componentes existentes.
- Adicionar imagens oficiais protegidas por copyright (focar apenas na paleta).

## Decisions

### 1. Color Palette Definitions

| Color Name | HEX Code | Usage |
| :--- | :--- | :--- |
| **FIFA Navy** | `#000B2B` | Dark Background / Light Text |
| **FIFA Cyan** | `#00D7FF` | Primary Accents / Buttons |
| **FIFA Lima** | `#B4FF00` | Success / Owned Stickers |
| **FIFA Orange**| `#FF5000` | Warning / Missing Stickers |
| **FIFA Purple**| `#7030A0` | Secondary Accents |

### 2. Theme Mapping

**Dark Mode:**
- `--bg-color`: `#000B2B`
- `--card-bg`: `#001440`
- `--accent`: `#00D7FF` (Ciano)
- `--gold`: `#FFD700`

**Light Mode:**
- `--bg-color`: `#F0F9FF` (Azul Céu Claro)
- `--card-bg`: `#FFFFFF`
- `--accent`: `#001C71` (Navy)
- `--gold`: `#FF5000` (Laranja)

## Architecture

As mudanças serão concentradas no `index.css`, mas componentes específicos (como `StickerCard` e `ProgressChart`) podem precisar ser atualizados para utilizar os novos tokens semânticos (ex: `var(--wc-lime)`).

### 3. Favicon
Será gerada uma versão minimalista e estilizada da taça da Copa do Mundo 2026 para ser usada como ícone do site, garantindo boa visibilidade em escalas reduzidas.
