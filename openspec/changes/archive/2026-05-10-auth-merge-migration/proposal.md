## Why

Atualmente, usuários que iniciam o álbum de forma anônima (Visitantes) e tentam vincular sua conta a um e-mail ou Google que já existe no sistema encontram um erro de "Identidade já existente". Isso cria um beco sem saída onde o usuário não consegue oficializar sua conta sem perder o progresso atual. Uma lógica de migração e fusão de dados é necessária para garantir uma transição suave e segura do estado anônimo para o estado autenticado.

## What Changes

- **Detecção de Conflito**: O `AuthModal` passará a identificar erros de duplicidade de conta e oferecerá uma opção de "Login com Migração".
- **Persistência Temporária**: Implementação de uma "ponte" via `localStorage` para carregar os dados do visitante através do processo de redirecionamento do OAuth.
- **Merge de Dados**: Lógica para fundir as coleções de figurinhas (visitante vs. conta real), priorizando o maior progresso.
- **UX de Migração**: Novo estado no modal de autenticação para guiar o usuário no processo de "Resgate de Progresso".

## Capabilities

### Modified Capabilities
- `anonymous-auth`: Adição de suporte para migração de dados ao converter conta anônima.
- `collection-sync`: Ajuste na lógica de sincronização para suportar fusão (merge) de dados de fontes externas.

## Impact

- **Security**: A migração ocorre apenas após a autenticação bem-sucedida da conta de destino.
- **Data Integrity**: Uso de `localStorage` como backup temporário durante a transição.
- **UI/UX**: Redução da fricção e frustração no processo de upgrade de conta.
