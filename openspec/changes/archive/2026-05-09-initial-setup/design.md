## Context

O projeto visa criar uma aplicação web para rastreamento de figurinhas da Copa 2026. Atualmente, não existe estrutura de código ou banco de dados.

## Goals / Non-Goals

**Goals:**
- Prover uma interface reativa (React + Vite) com design "Premium".
- Garantir persistência multi-usuário com custo zero via Supabase.
- Implementar autenticação via Google OAuth.
- Suportar a estrutura completa de 994 figurinhas.

**Non-Goals:**
- Implementação de variantes raras (Extra Stickers) nesta fase.
- Suporte a múltiplos álbuns.
- Funcionalidades sociais avançadas (chat, feed).

## Decisions

### Decision: React + Vite (Vanilla CSS)
- **Rationale**: Vite oferece a melhor experiência de desenvolvimento. Optamos por Vanilla CSS para controle total sobre a estética "Premium" sem as restrições de frameworks de utilitários, permitindo animações e transições personalizadas.
- **Alternatives**: Next.js (desnecessário para um app focado em cliente no início), Tailwind CSS (rejeitado para manter flexibilidade total de design).

### Decision: Supabase (Auth + PostgreSQL)
- **Rationale**: Melhor custo-benefício (zero cost) para apps pequenos/médios com necessidade de Auth e DB. Facilita a escalabilidade sem gerenciamento de servidor.
- **Alternatives**: Firebase (menos flexível no SQL), LocalStorage (rejeitado por não permitir multi-dispositivo/usuário).

### Decision: Integrated Category Architecture
- **Rationale**: Organizar figurinhas por Grupos (A-L), FWC e Coca-Cola em um único fluxo de navegação para evitar fragmentação da experiência.

## Risks / Trade-offs

- **[Risk] Supabase Free Tier Limits** → **Mitigation**: O volume de dados por usuário é baixo (apenas IDs de figurinhas e contadores), permitindo milhares de usuários antes de atingir limites.
- **[Risk] Google OAuth Setup** → **Mitigation**: Seguir a documentação oficial do Supabase para configuração do Client ID no Google Cloud Console.
