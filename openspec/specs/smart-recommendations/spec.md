# Smart Recommendations

Purpose: Cruzar dados de figurinhas faltantes do usuário com o excedente local para fornecer dicas de troca inteligentes.

## Requirements

### Requirement: Swap Tips
Dicas automáticas baseadas em dados reais de outros colecionadores na mesma cidade.

#### Scenario: Real City-wide Cross-referencing
- **GIVEN** que o usuário informou sua cidade no perfil
- **WHEN** o dashboard é carregado
- **THEN** o sistema deve buscar repetidas (count > 1) de outros usuários na mesma cidade no banco de dados.
- **AND** cruzar esses dados com as figurinhas faltantes do usuário atual.
- **AND** se houver match, exibir: "Boa notícia! Há colecionadores em [Cidade] com figurinhas de [Seleção] que você ainda não tem!"
- **AND** se não houver match, exibir uma mensagem incentivando o convite de amigos ou informando a ausência de trocas compatíveis.
