## Why

Muitos usuários podem ter dúvidas sobre como o aplicativo funciona, especialmente após a introdução da autenticação anônima e do sistema de sincronização. Uma aba "Sobre" (ou "Como Funciona") resolve isso ao:
- Explicar a diferença entre o modo Visitante e a Conta Permanente.
- Dar transparência sobre como os dados são salvos (Supabase + Local Cache).
- Fornecer instruções rápidas sobre como marcar figurinhas e usar as dicas de troca.
- Melhorar o profissionalismo do app.

## What Changes

- Introdução de uma nova view no `App.jsx` chamada `about`.
- Adição de um botão de navegação "Sobre" no `Header.jsx`.
- Criação de um novo componente `AboutView.jsx` com conteúdo explicativo e visual premium.
- Atualização da lógica de navegação para suportar a nova aba.

## Capabilities

### New Capabilities
- `app-info`: Gerenciamento e exibição de informações institucionais e tutoriais do aplicativo.

### Modified Capabilities
- `navigation`: Ajuste no sistema de navegação global para incluir a nova aba.

## Impact

- **Frontend**: Novos componentes de UI e ajustes na navegação do Header.
- **UX**: Melhor entendimento do usuário sobre a persistência de dados.
