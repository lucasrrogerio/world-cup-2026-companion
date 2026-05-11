## Why

O header no mobile está com problemas de espaçamento: muitos ícones competem por espaço limitado (idioma, tema, usuário, login, sync indicator), resultando em UI poluída e difícil de usar. Além disso, o MobileScrubber (navegação lateral de times) fica posicionado flush na borda direita, sobrepondo as cartinhas do álbum e dificultando a leitura.

## What Changes

- Substituir os ícones de ação do header (idioma, tema, perfil) por um menu hamburger no mobile
- Criar menu dropdown acessível via hamburger com: Idioma, Tema, Perfil (se logado), Sair
- Reposicionar o MobileScrubber para não sobrepor o conteúdo (afastar da borda ou adicionar overlay)
- Ocultar o sync indicator no mobile para reduzir clutter

## Capabilities

### New Capabilities

- `mobile-header-menu`: Menu hamburger no header mobile com ações de idioma, tema e perfil
- `mobile-scrubber-positioning`: Ajuste de posição e comportamento visual do scrubber no mobile

### Modified Capabilities

- (nenhum - são melhorias de UI/UX, não muda requisitos de funcionalidades)

## Impact

- `src/components/Header.jsx` - adicionar estado e menu hamburger
- `src/components/MobileScrubber.jsx` - ajustar posicionamento
- `src/index.css` - possíveis novos estilos utilitários