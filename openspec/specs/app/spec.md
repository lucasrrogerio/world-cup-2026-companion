# Specification: FIFA 2026 Sticker Tracker

## Purpose
Gerenciar a coleção de figurinhas da Copa do Mundo FIFA 2026, permitindo o rastreio de figurinhas obtidas, repetidas e variantes raras (Extra Stickers) de forma integrada.

## Requirements

### Requirement: Sticker Identification
O sistema deve identificar cada figurinha de forma única seguindo o padrão exibido no álbum, exibindo o nome completo para melhor usabilidade.

- **Team Stickers**: Código da seleção + número (1-20). Ex: `BRA 1` a `BRA 20`.
- **Special Stickers (FWC)**: Prefix `FWC` seguido do número. Ex: `FWC 00` a `FWC 19`.
- **Coca-Cola Stickers**: Prefix `CC` seguido do número. Ex: `CC1` a `CC14`.
- **Total Teams**: 48 seleções divididas em Grupos A até L (Ver Apêndice).

#### Scenario: Full Team Name Display
- **GIVEN** uma figurinha de seleção (ex: BRA) ou categoria especial (ex: FWC)
- **WHEN** visualizada no Álbum ou Analytics
- **THEN** o sistema deve exibir o nome completo (ex: BRASIL ou FIFA World Cup) ao lado da sigla FIFA.

#### Scenario: ID Resolution
- **GIVEN** o ID da figurinha
- **WHEN** o sistema precisa renderizar o nome da seleção
- **THEN** ele deve resolver o código de 3 letras para o nome completo correspondente em português.

### Requirement: Collection Tracking
O usuário deve ser capaz de gerenciar o estado de cada figurinha individualmente, e as mudanças devem persistir de forma determinística. Figurinhas obtidas devem ter um destaque visual mais forte, especialmente em temas escuros.

#### Scenario: Owned Sticker Vibrancy
- **GIVEN** que o usuário possui a figurinha (`count > 0`)
- **WHEN** renderizando o cartão no tema Dark
- **THEN** o fundo do cartão deve ser mais claro que o fundo padrão de figurinhas não obtidas.
- **AND** o brilho (glow) deve ser proeminente para indicar posse.

- **GIVEN** uma figurinha qualquer na interface
- **WHEN** o usuário possui 0 unidades (`count === 0`)
- **THEN** a figurinha deve ser exibida em tons de cinza (grayscale).
- **WHEN** o usuário incrementa para 1 ou mais unidades
- **THEN** a figurinha deve ganhar cor plena.

#### Scenario: Removing a sticker (decrement to 0)
- **GIVEN** que o usuário possui 1 unidade de uma figurinha
- **WHEN** o usuário decrementa a quantidade para 0
- **THEN** o sistema deve persistir o valor 0 (ou remover o registro) na camada de persistência.
- **AND** após um recarregamento da página, a figurinha deve continuar com quantidade 0.

### Requirement: Multi-User Isolation
O sistema deve garantir que os dados da coleção sejam isolados por usuário e resetados corretamente em trocas de sessão.

#### Scenario: User Logout
- **GIVEN** um usuário logado com figurinhas marcadas
- **WHEN** o usuário realiza logout
- **THEN** a interface deve ser resetada imediatamente para o estado inicial (`INITIAL_STICKERS`) ou carregar os dados do `localStorage` (modo visitante).
- **AND** nenhuma figurinha do usuário anterior deve permanecer visível.

### Requirement: Duplicates Management
O sistema deve calcular e exibir figurinhas repetidas.

- **GIVEN** que o usuário possui mais de 1 unidade de uma figurinha (`count > 1`)
- **THEN** o sistema deve exibir um badge de contador sobre a figurinha.
- **AND** o valor do badge deve ser `count - 1` (exibindo apenas o número de repetidas).
- **AND** o total de repetidas global deve ser a soma de `(count - 1)` de todas as figurinhas.

### Requirement: Geographical Insights
O sistema deve agregar dados anonimizados para ajudar colecionadores a encontrar locais de troca.

- **GIVEN** que o usuário informou sua cidade e estado no perfil.
- **THEN** o sistema deve contribuir com os dados de suas repetidas para as estatísticas globais daquela região.
- **AND** o usuário poderá visualizar o "Ranking de Repetidas por Cidade".

### Requirement: Smart Recommendations (Swap Tips)
O sistema deve agir como um assistente inteligente para facilitar as trocas.

- **GIVEN** as figurinhas faltantes do usuário (`count === 0`).
- **AND** os dados agregados de repetidas da cidade do usuário (`count > 1` de outros usuários).
- **WHEN** houver uma alta correlação entre o que o usuário precisa e o que a cidade oferece.
- **THEN** o sistema deve exibir uma "Dica de Troca" personalizada na aba de Progresso.
- **Example**: "Dica: Muitos colecionadores em Recife têm figurinhas da Argentina sobrando hoje!"

### Requirement: Detailed User Statistics
O sistema deve prover um painel analítico para o usuário.

- **Metrics**: 
    - % de Conclusão total e por categoria.
    - Quantidade exata de "Coladas" vs "Faltantes".
    - Quantidade total de "Repetidas".
- **Location**: Estas métricas devem ser exibidas exclusivamente na aba de "Progresso".


## Compliance and Security (LGPD)

### Requirement: Data Privacy
O sistema deve seguir as diretrizes da LGPD (Lei Geral de Proteção de Dados).

- **Data Minimization**: Coletar apenas e-mail e nome (via OAuth), estado da coleção e localização opcional (Cidade/Estado).
- **Anonymization**: Estatísticas geográficas públicas nunca devem exibir o e-mail ou nome do usuário.
- **Row Level Security (RLS)**: Garantir que um usuário autenticado possa acessar apenas seus próprios registros de coleção.
- **Data Deletion**: Oferecer funcionalidade para o usuário excluir sua conta e todos os dados associados.

### Requirement: Data Integrity
- **Encryption**: Utilizar HTTPS para trânsito e criptografia em repouso (provido pelo Supabase).
- **Authentication**: Acesso protegido por tokens JWT gerenciados pelo Supabase Auth.

## Data Model

### Sticker Schema
```typescript
interface Sticker {
  id: string;          // Ex: "BRA 10", "FWC 00", "CC1"
  category: string;    // Ex: "Team", "FWC", "Coca-Cola"
  team?: string;       // Nome da seleção (opcional para FWC/CC)
  number: string;      // Ex: "1", "00", "CC1"
  count: number;       // Quantidade (0 = não possui)
}
```

### User Profile Schema
```typescript
interface UserProfile {
  id: string;          // UUID do Supabase Auth
  email: string;
  name: string;
  city?: string;
  state?: string;      // Ex: "SP", "RJ", "PE"
  lastSeen: string;
}
```

## UI/UX Standards

### Aesthetic
- **Theme**: Suporte a Dark Mode Premium (Fundo: `#0F0F0F`) e Light Mode Refinado.
- **Brand Colors**: 
    - Primary (Accent): Indigo/Purple (`#4B0082` em dark / `#4338CA` em light).
    - Gold: `#D4AF37` em dark / `#B45309` em light.
- **Variables**: O sistema deve utilizar variáveis CSS para garantir consistência entre os temas.

### Dashboard
O dashboard (aba Início) deve atuar como uma visão introdutória e informativa:
- **Boas-vindas**: Mensagem de saudação personalizada.
- **Objetivo**: Descrição do propósito do aplicativo (gerenciar coleção, acompanhar progresso, conectar colecionadores).
- **Como Funciona**: Guia visual sobre as funcionalidades principais (Gerencie, Acompanhe, Conecte).
- **Restrição**: Não deve exibir métricas de progresso ou dicas de troca diretamente (estas residem na aba de Progresso).

### Requirement: Navigation Bar
O menu de navegação deve ser simplificado para usuários logados.

#### Scenario: Removing Home Tab
- **GIVEN** que o usuário está logado
- **WHEN** ele visualiza o menu de navegação (Header ou MobileNav)
- **THEN** a aba de "Início" (Home) NÃO deve estar visível.
- **AND** o aplicativo deve abrir por padrão na aba "Meu Álbum" se nenhuma outra visualização estiver ativa.

### Requirement: Theme Toggle (Dark/Light Mode)
O sistema deve permitir que os usuários alternem entre os temas visual escuro e claro.

#### Scenario: Switching Theme
- **WHEN** o usuário clica no botão de alternância de tema
- **THEN** as cores da interface devem mudar para a paleta correspondente (Dark ou Light) mantendo a estética premium.
- **AND** a preferência deve ser persistida no `localStorage`.

#### Scenario: High Contrast Light Mode
- **GIVEN** que o sistema está em modo claro
- **WHEN** renderizando textos e bordas
- **THEN** o sistema deve utilizar cores com contraste suficiente (mínimo ratio 4.5:1 para texto normal) para garantir acessibilidade.
- **AND** a separação entre cartões e fundo deve ser nítida.

### Requirement: Stacked Stat Cards
Dashboard statistic cards should be organized to avoid horizontal overflow on narrow screens.

#### Scenario: Mobile dashboard layout
- **WHEN** the viewport width is less than 640px
- **THEN** statistic cards are displayed in a 2x2 grid.
- **AND** font sizes are reduced (e.g., text-lg for values) to ensure labels and values don't overlap.

### Requirement: Performance and Stability
O dashboard deve ser estável e não apresentar loops de renderização ou flickering visual excessivo.

#### Scenario: Dashboard Stability
- **GIVEN** que o usuário está visualizando o Dashboard
- **WHEN** os dados de estatísticas (`stats`) não mudam
- **THEN** os componentes de estatística (`StatCard`) não devem ser remontados.
- **AND** nenhuma animação de entrada deve ser disparada repetidamente.

## Appendix: Teams and Groups

| Grupo | Seleções (ID) |
| :--- | :--- |
| **A** | MEX, RSA, KOR, CZE |
| **B** | CAN, BIH, QAT, SUI |
| **C** | BRA, MAR, HAI, SCO |
| **D** | USA, PAR, AUS, TUR |
| **E** | GER, CUW, CIV, ECU |
| **F** | NED, JPN, SWE, TUN |
| **G** | BEL, EGY, IRN, NZL |
| **H** | ESP, CPV, KSA, URU |
| **I** | FRA, SEN, IRQ, NOR |
| **J** | ARG, ALG, AUT, JOR |
| **K** | POR, COD, UZB, COL |
| **L** | ENG, CRO, GHA, PAN |
