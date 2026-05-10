# Delta: FIFA 2026 Sticker Tracker

## MODIFIED Requirements

### Requirement: Collection Tracking
Figurinhas obtidas devem ter um destaque visual mais forte em temas escuros.

#### Scenario: Owned Sticker Vibrancy
- **GIVEN** que o usuário possui a figurinha (`count > 0`)
- **WHEN** renderizando o cartão no tema Dark
- **THEN** o fundo do cartão deve ser mais claro que o fundo padrão de figurinhas não obtidas.
- **AND** o brilho (glow) deve ser proeminente para indicar posse.
