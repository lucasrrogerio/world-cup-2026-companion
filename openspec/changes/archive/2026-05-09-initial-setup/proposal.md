## Why

O objetivo é criar uma plataforma centralizada e de custo zero para colecionadores do álbum da Copa do Mundo 2026 gerenciarem suas coleções, identificarem repetidas e obterem insights inteligentes sobre trocas em suas regiões.

## What Changes

Este é o setup inicial do projeto, estabelecendo a estrutura base da aplicação web, o modelo de dados para 994 figurinhas e a integração com Supabase para autenticação (Google OAuth) e persistência.

## Capabilities

### New Capabilities
- `sticker-inventory`: Gerenciamento completo das 994 figurinhas (incluindo FWC e Coca-Cola) com suporte a contagem de repetidas.
- `user-auth`: Autenticação via Google Login integrada ao Supabase.
- `geographical-insights`: Coleta opcional de localização (Cidade/Estado) para gerar estatísticas regionais.
- `smart-recommendations`: Sistema de dicas baseadas no cruzamento de necessidades do usuário e sobras da cidade.

### Modified Capabilities
- N/A (Projeto novo)

## Impact

Afeta a estrutura inicial do repositório, configuração do banco de dados no Supabase e definição da interface de usuário (React + Vite).
