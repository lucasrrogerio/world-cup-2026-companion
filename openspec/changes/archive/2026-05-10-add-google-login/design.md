## Context

O sistema já utiliza Supabase para autenticação via email/senha. O Supabase suporta nativamente provedores OAuth, facilitando a adição do Google sem mudanças estruturais profundas no banco de dados.

## Goals / Non-Goals

**Goals:**
- Implementar `signInWithGoogle` no serviço Supabase.
- Adicionar um botão visualmente atraente para login com Google.
- Garantir que o fluxo de redirecionamento funcione corretamente.

**Non-Goals:**
- Implementar outros provedores OAuth (Apple, Facebook, etc) neste momento.
- Mudar a estrutura da tabela `profiles`.

## Decisions

- **Supabase Auth API**: Usaremos `supabase.auth.signInWithOAuth` com o provider `google`.
- **UI Position**: O botão do Google será colocado abaixo (ou acima) do botão de login tradicional, com estilo distinto (logo do Google, fundo branco/claro) para destaque.
- **Offline Access**: Solicitaremos `access_type: 'offline'` para permitir refresh tokens se necessário no futuro, embora para o básico não seja estritamente necessário agora.

## Risks / Trade-offs

- **Dependência Externa**: O login depende da disponibilidade da API do Google e da configuração correta das credenciais no dashboard do Supabase.
- **UX de Redirecionamento**: O fluxo OAuth redireciona o usuário para fora do app e de volta, o que pode ser uma quebra de contexto se não for suave.
