## 1. Captura de Erros e UI

- [x] 1.1 Atualizar `AuthModal.jsx` para detectar erros de duplicidade.
- [x] 1.2 Implementar tela de "Confirmação de Migração" no modal.
- [x] 1.3 Adicionar lógica para salvar progresso atual no `localStorage` antes do login de migração.

## 2. Motor de Migração

- [x] 2.1 Criar utilitário `src/utils/migration.js` para gerenciar o merge de dados.
- [x] 2.2 Integrar verificação de migração pendente no `App.jsx` após autenticação.

## 3. Sincronização e Feedback

- [x] 3.1 Garantir que o `useCollection` processe os dados migrados e sincronize com o Supabase.
- [x] 3.2 Adicionar mensagem de sucesso após migração concluída.

## 4. Testes

- [x] 4.1 Validar migração de Visitante -> Conta Google Existente.
- [x] 4.2 Validar migração de Visitante -> Conta E-mail Existente.
