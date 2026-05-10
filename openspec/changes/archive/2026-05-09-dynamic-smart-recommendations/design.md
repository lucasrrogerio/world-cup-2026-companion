## Context

A implementação atual utiliza uma lógica de mock para sugerir trocas. O objetivo agora é realizar uma consulta real ao Supabase para identificar se outros usuários na mesma cidade possuem figurinhas repetidas que o usuário atual não possui.

## Goals / Non-Goals

**Goals:**
- Realizar consulta "cross-user" no Supabase para buscar repetidas por cidade.
- Cruzar esses dados com as faltantes do usuário logado.
- Mostrar dicas baseadas em dados reais de outros colecionadores.

**Non-Goals:**
- Implementar chat ou sistema de mensagens entre usuários (apenas a dica visual).
- Expor IDs ou e-mails de outros usuários (manter a dica anônima/agregada).

## Decisions

- **Join no Client-side**: Como estamos usando Supabase Client, faremos uma consulta que filtra perfis pela mesma cidade e busca suas coleções.
- **Lógica de Agregação**: Agrupar as repetidas encontradas por Seleção/Time para gerar a dica.
- **Estado de "Cidade Vazia"**: Se não houver dados reais na cidade, exibir uma mensagem incentivando o usuário a convidar amigos ou informando que ainda não há trocas disponíveis ali.

## Risks / Trade-offs

- **Privacidade**: A consulta retornará apenas a contagem de figurinhas por seleção na cidade, sem identificar quem as possui.
- **Performance**: Consultas em tabelas de coleção podem crescer. Usaremos filtros de cidade (`eq('city', userCity)`) para limitar o dataset.
