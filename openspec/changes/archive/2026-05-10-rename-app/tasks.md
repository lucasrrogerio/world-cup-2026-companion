## 1. Renomear o App (Branding)

- [x] 1.1 Atualizar `<title>` em `index.html`.
- [x] 1.2 Atualizar `"name"` em `package.json`.

## 2. Limpeza de Mocks (Locales)

- [x] 2.1 Remover "(Mock)" de `src/locales/pt.json`.
- [x] 2.2 Remover "(Mock)" de `src/locales/en.json`.
- [x] 2.3 Remover "(Mock)" de `src/locales/es.json`.
- [x] 2.4 Remover "(Mock)" de `src/locales/fr.json`.
- [x] 2.5 Remover "(Mock)" de `src/locales/ja.json`.

## 3. Refatoração de Lógica (Mocks -> Real)

- [x] 3.1 Atualizar `ProgressChart.jsx` para usar `isAnonymous` em vez de `mock-user-123`.
- [x] 3.2 Atualizar `Dashboard.jsx` para usar `user?.is_anonymous` em vez de `mock-user-123`.
- [x] 3.3 Garantir que o objeto `user` correto esteja sendo passado para os componentes no `App.jsx`.

## 4. Verificação Final

- [x] 4.1 Testar login anônimo e verificar se os textos estão corretos.
- [x] 4.2 Verificar se as recomendações aparecem corretamente para usuários reais e somem para anônimos (se for o comportamento desejado).
