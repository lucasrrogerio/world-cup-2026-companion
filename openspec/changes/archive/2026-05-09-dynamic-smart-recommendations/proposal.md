## Why

A lógica atual de recomendações é um mock estático que menciona Brasil e Argentina independente da coleção do usuário. Para que a funcionalidade tenha valor real, ela precisa ser dinâmica e baseada nas necessidades reais do colecionador.

## What Changes

- Implementar lógica dinâmica para identificar seleções onde o usuário possui figurinhas faltantes.
- Gerar mensagens de recomendação que mencionem seleções específicas baseadas no inventário do usuário.
- Priorizar seleções com maior número de faltantes para incentivar a completude.
- Manter a dependência da localização (cidade) para o contexto da dica.

## Capabilities

### Modified Capabilities
- `smart-recommendations`: Aumentar a inteligência da lógica de geração de dicas, tornando-as dinâmicas em vez de estáticas.

## Impact

- `Dashboard.jsx`: Refatoração da função `getRecommendation` para processar dados reais do inventário.
- `App.jsx`: Garantir que os dados necessários (faltantes por seleção) cheguem ao Dashboard de forma eficiente.
