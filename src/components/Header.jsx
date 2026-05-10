import React, { useState } from 'react';
import { LogOut, User, Cloud, CheckCircle2, BarChart2, Sun, Moon, LogIn, Globe, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'ja', label: 'JA', flag: '🇯🇵' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' }
];

export default function Header({ 
  user, 
  onLogout, 
  onLoginClick,
  activeView, 
  setActiveView, 
  isSyncing,
  theme,
  onThemeToggle 
}) {
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="bg-[var(--nav-bg)] text-[var(--text-primary)] p-4 border-b border-[var(--accent)] sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-[var(--gold)] to-[var(--text-secondary)] bg-clip-text text-transparent leading-tight">
            WC 2026 Companion
          </h1>

          {/* Sync/Local Mode Indicator */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)]">
                <AnimatePresence mode="wait">
                  {isSyncing ? (
                    <motion.div
                      key="syncing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Cloud className="text-[var(--accent)]" size={14} />
                      </motion.div>
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest hidden xs:block">{t('common.saving') || 'Salvando'}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="synced"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="text-[var(--gold)]" size={14} />
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest hidden xs:block">{t('common.saved') || 'Salvo'}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--gold)]/10 rounded-full border border-[var(--gold)]/20">
                <Database className="text-[var(--gold)]" size={14} />
                <span className="text-[10px] text-[var(--gold)] font-bold uppercase tracking-widest hidden xs:block">{t('common.local_only') || 'Local'}</span>
              </div>
            )}
          </div>

          {user && (
            <nav className="hidden md:flex items-center gap-1 bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--card-border)]">
              <button
                onClick={() => setActiveView('album')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'album'
                    ? 'bg-[var(--accent)] text-white shadow-lg'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-color)]'
                  }`}
              >
                {t('common.album')}
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'analytics'
                    ? 'bg-[var(--accent)] text-white shadow-lg'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-color)]'
                  }`}
              >
                <BarChart2 size={16} />
                {t('common.progress')}
              </button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-90 flex items-center gap-2"
              aria-label="Selecionar Idioma"
            >
              <Globe size={18} />
              <span className="text-xs font-bold hidden sm:inline">{language.toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden min-w-[120px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        language === lang.code 
                          ? 'bg-[var(--accent)] text-white' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-color)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-90"
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden lg:flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <User size={16} />
                {user.email}
              </span>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-sm hover:text-red-400 transition-colors bg-[var(--card-bg)] px-2 py-2 sm:px-3 rounded-xl border border-[var(--card-border)] shadow-md"
                aria-label={t('common.logout')}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">{t('common.logout')}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all"
            >
              <LogIn size={18} />
              <span>{t('common.login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
