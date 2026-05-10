## Why

Atualmente, a localização do usuário (cidade/estado) é solicitada apenas uma vez durante o onboarding e não pode ser alterada posteriormente. Permitir que o usuário edite sua localização é essencial para manter a precisão das dicas de troca locais e melhorar a experiência do usuário.

## What Changes

- **Exibição da Localização**: O cabeçalho passará a exibir a cidade do usuário se o perfil estiver disponível.
- **Edição de Perfil**: Adição de um gatilho no perfil do usuário no cabeçalho para reabrir o modal de localização.
- **Melhoria do Onboarding**: O componente `Onboarding` será atualizado para suportar preenchimento prévio de dados, permitindo seu uso como um formulário de edição.

## Capabilities

### Modified Capabilities
- `profile-management`: Adição de funcionalidade de edição de localização.
- `onboarding`: Refatoração para suportar modo de edição.

## Impact

- **User Experience**: O usuário terá controle total sobre seus dados de localização.
- **Data Accuracy**: Melhora a relevância das recomendações de trocas locais.
- **Consistency**: Mantém a interface intuitiva ao associar a localização ao perfil no cabeçalho.
