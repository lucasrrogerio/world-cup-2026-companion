## Context

O sistema de i18n usa `LanguageContext.jsx` com arquivos JSON em `src/locales/`. A função `t()` busca chaves aninhadas (ex: `common.about`). O fallback automático para PT já existe se a chave não existir no idioma atual.

## Goals / Non-Goals

**Goals:**
- Adicionar todas as chaves de tradução necessárias em todos os arquivos JSON
- Substituir TODAS as strings hardcoded por chamadas `t()`

**Non-Goals:**
- Não modificar a estrutura do sistema de i18n
- Não adicionar novos idiomas (manter os 5 existentes: pt, en, es, ja, fr)

## Approach

1. **Adicionar chaves nos arquivos de tradução**:
   - pt.json: todas as strings em português
   - en.json: traduções em inglês
   - es.json: traduções em espanhol
   - ja.json: traduções em japonês
   - fr.json: traduções em francês

2. **Atualizar componentes**:
   - Substituir strings por `t('chave')`
   - Manter fallback para pt se chave não existir

3. **Ordem de implementação**:
   - Começar por `common` (strings compartilhadas)
   - Depois por cada componente

## Risks / Trade-offs

- [Médio] Mudança em múltiplos arquivos - risco de quebrar algo
- [Baixo] Cada chave nova tem fallback para PT
- [Alto] AboutView tem muitas strings - requer atenção especial