## Context

O app passou por uma fase de desenvolvimento onde a autenticação anônima foi testada com rótulos de "Mock" e IDs estáticos. Agora que a infraestrutura do Supabase está sólida, precisamos remover esses "andaimes" e oficializar o nome do app.

## Goals / Non-Goals

**Goals:**
- Renomear o app para "WC Companion 2026".
- Remover todas as referências visuais e lógicas a "Mock".
- Implementar detecção robusta de usuários anônimos via Supabase API.

**Non-Goals:**
- Alterar as tabelas do banco de dados.
- Mudar a lógica de sincronização (apenas os gatilhos de UI).

## Decisions

- **index.html & package.json**: Renomear para "WC Companion 2026" e "wc-companion-2026" respectivamente.
- **Locales (pt, en, es, ja, fr)**: Remover o termo `(Mock)` das chaves de tradução.
- **ProgressChart.jsx**:
  - Remover a comparação com `mock-user-123`.
  - Passar o objeto `user` (ou a flag `isAnonymous`) para o componente para decidir a exibição de recomendações.
- **Dashboard.jsx**:
  - Remover a comparação com `mock-user-123`.
  - Usar `user?.is_anonymous` para exibir o aviso de "Apenas Local".

## Risks / Trade-offs

- **Compatibilidade de Locale**: Se alguma chave de tradução for removida acidentalmente, o app exibirá a chave bruta. (Risco: Baixo, usaremos busca global).
