## Why

Múltiplas strings em português estão hardcoded no código e não são traduzidas quando o usuário muda o idioma. O app tem um sistema de i18n funcionando mas diversas telas não o utilizam corretamente.

## What Changes

### MobileNav.jsx
- Substituir "Sobre" por `t('common.about')`

### Onboarding.jsx
- "Cidade" → `t('onboarding.city')`
- "Estado (UF)" → `t('onboarding.state')`
- Placeholder "Ex: Recife" → `t('onboarding.city_placeholder')`
- Placeholder "Ex: PE" → `t('onboarding.state_placeholder')`

### Header.jsx
- "Vincular E-mail" → `t('common.link_email')`
- "Salvar progresso" → `t('common.save_progress')`
- "Idioma" → `t('common.language')`
- "Tema" → `t('common.theme')`
- "Sobre" → `t('common.about')`
- "Claro" / "Escuro" (tema) → `t('common.theme_light')` / `t('common.theme_dark')`

### AuthModal.jsx
- "Seus dados são mantidos" → `t('auth.data_kept')`
- "Ao salvar, sua coleção local fica..." → `t('auth.save_merge_info')`
- "Ao vincular, sua coleção atual é..." → `t('auth.link_merge_info')`
- "Atenção: progresso local não será migrado" → `t('auth.local_not_migrated')`
- "Ao entrar em uma conta existente, o progresso feito como visitante..." → `t('auth.existing_account_warning')`
- "Verificação de segurança:" → `t('auth.security_verification')`

### AboutView.jsx
- Todas as seções hardcoded em português:
  - "Tudo na Nuvem", "Privacidade e Controle", "Simples e Rápido"
  - "Marcar Figurinhas", "Navegação Rápida", "Acompanhe seu Álbum", "Filtros Inteligentes"
  - Textos descritivos de cada feature

### Footer.jsx
- Verificar botão de suporte

## Capabilities

### New Capabilities
- `i18n-full-coverage`: Internacionalização completa de todas as strings do app

### Modified Capabilities
- (nenhum)

## Impact

- Arquivos `src/locales/*.json` - adicionar ~30+ novas chaves de tradução
- Arquivos `src/components/*.jsx` - substituir strings por chamadas `t()`
- Seções afetadas: Onboarding, Header, AuthModal, AboutView, Footer, MobileNav