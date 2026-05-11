## Context

O app Panini Stickers WC 2026 tem duas telas principais de UI: desktop e mobile. No mobile:
- O Header tem ~6 elementos competindo por ~320-400px de largura
- O MobileScrubber (navegação vertical de grupos/times) está posicionado `right-0` com `width: 24px`, sobrepondo as cartinhas

O código atual usa Tailwind CSS e React com Framer Motion para animações.

## Goals / Non-Goals

**Goals:**
- Criar menu hamburger no header mobile que agrupe idioma, tema e perfil
- Afastar o MobileScrubber da borda direita para não sobrepor o conteúdo
- Manter funcionalidade existente (todas as ações continuam funcionando)
- Animação suave com Framer Motion (já usado no app)

**Non-Goals:**
- Redesign completo da navegação mobile (MobileNav inferior já funciona bem)
- Alterar comportamento do filtro de Stickers (all/missing/duplicates)
- Modificar a experiência desktop (Header desktop continua igual)

## Decisions

### 1. Menu Hamburger vs Slide-over

**Decisão:** Menu dropdown (overlay) ao invés de slide-over lateral

**Alternativas consideradas:**
- Slide-over da esquerda: Ocupa muito espaço, interfere com scroll
- Slide-over da direita: Conflita com gesto de swipe do scrubber
- Modal central: Cria outra camada de interação desnecessária

**Rationale:** Dropdown é padrão reconhecido, não compete com gestos de navegação, fácil de fechar tocando fora.

### 2. Posição do MobileScrubber

**Decisão:** Afastar `right-2` (8px) da borda + background semi-transparente

**Alternativas consideradas:**
- Esconder em certas seções: Complexidade, o usuário pode precisar em qualquer lugar
- Swipe para abrir: Gesto adicional, pode conflitar com scroll
- Posição fixa mas menor: já é fino demais (24px), problema é sobreposição

**Rationale:** Simples, mantém funcionalidade, background ajuda visualmente.

### 3. Icone do Hamburger vs Text

**Decisão:** Usar ícone `Menu` da lucide-react (ou equivalente)

**Rationale:** Reconhecível universalmente, não precisa de label "Menu" em qualquer idioma.

## Risks / Trade-offs

- **[Risco]** Usuário não encontra configurações depois de mover para hamburger
  - → **Mitigação**: Ícone sempre visível, não esconde em nenhuma view
- **[Risco]** Menu dropdown no mobile pode cobrir conteúdo importante
  - → **Mitigação**: Position absolute com z-index alto, background backdrop
- **[Risco]** Scrubber com background pode distrair visualmente
  - → **Mitigação**: Opacidade baixa (50-70%), apenas no mobile onde é necessário

## Migration Plan

1. Adicionar Menu icon no Header (só aparece no mobile)
2. Criar estado `isMenuOpen` no Header
3. Implementar dropdown com as ações
4. Ajustar MobileScrubber CSS (right-0 → right-2, adicionar bg)
5. Testar em múltiplos tamanhos de tela (320px até 428px)
6. Verificar que desktop continua funcionando idêntico