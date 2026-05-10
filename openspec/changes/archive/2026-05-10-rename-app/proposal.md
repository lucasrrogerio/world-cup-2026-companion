## Why

O projeto precisa de uma identidade final e profissional. Atualmente, o nome do app em vários metadados ainda é "temp-app" e existem diversas referências a dados de "Mock" no código e na interface. Remover essas referências e oficializar o nome como "WC Companion 2026" eleva a percepção de qualidade do produto.

## What Changes

- **Branding**: Renomear o app de `temp-app` para `WC Companion 2026` no `index.html` e `package.json`.
- **Limpeza de Mocks**:
  - Remover o sufixo "(Mock)" de todas as strings de tradução nos arquivos de locale.
  - Eliminar o uso do ID estático `mock-user-123` no `ProgressChart.jsx` e `Dashboard.jsx`.
  - Substituir a lógica de detecção de "Visitante" para usar a propriedade nativa do Supabase `is_anonymous`.

## Capabilities

### Modified Capabilities
- `branding`: Atualização da identidade global do app.
- `anonymous-auth`: Refinamento da detecção de estado de visitante, removendo IDs estáticos de teste.

## Impact

- **UI/UX**: Interface mais limpa e profissional, sem termos técnicos de desenvolvimento.
- **Build**: O nome do pacote no `package.json` será atualizado para `wc-companion-2026`.
