import { useState } from 'react';
import { LogOut, User, Cloud, CheckCircle2, BarChart2, Sun, Moon, LogIn, Globe, Database, MapPin, Menu, X } from 'lucide-react';
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
  onThemeToggle,
  profile,
  onProfileClick
}) {
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLocalGuest = user?.is_local_guest;
  const isAnonymous = user?.is_anonymous && !isLocalGuest;
  const isCloudUser = user && !isLocalGuest;

  return (
    <header className="bg-[var(--nav-bg)] text-[var(--text-primary)] p-4 border-b border-[var(--card-border)] sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-8">
          <h1 className="text-lg md:text-xl font-black text-[var(--text-primary)] leading-tight uppercase tracking-tighter">
            WC 2026 Companion
          </h1>

          {/* Sync/Local Mode Indicator - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {isCloudUser ? (
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
                      <CheckCircle2 className="text-[var(--wc-lime)]" size={14} />
                      <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest hidden xs:block">{t('common.saved') || 'Salvo'}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
            
            {!isCloudUser && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20">
                <Database className="text-[var(--accent)]" size={14} />
                <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest hidden xs:block">{isLocalGuest ? t('common.local_guest') : (t('common.local_only') || 'Offline')}</span>
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
              <button
                onClick={() => setActiveView('about')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'about'
                    ? 'bg-[var(--accent)] text-white shadow-lg'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-color)]'
                  }`}
              >
                {t('common.about')}
              </button>
            </nav>
          )}
        </div>

<div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all active:scale-90"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Actions - visible on md+ */}
          <div className="hidden md:flex items-center gap-2 md:gap-4">
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
                {!isAnonymous && !isLocalGuest && (
                  <button
                    onClick={onProfileClick}
                    className="hidden sm:flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all text-right group"
                  >
                    <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-bold group-hover:text-[var(--accent)] transition-colors">
                      <User size={14} />
                      {user.email?.split('@')[0]}
                    </div>
                    {profile?.city && (
                      <div className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">
                        <MapPin size={10} className="text-[var(--accent)]" />
                        {profile.city}, {profile.state}
                      </div>
                    )}
                  </button>
                )}
                
                 {isAnonymous ? (
<button
                      onClick={onLoginClick}
                      className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-3 py-2 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95"
                    >
                       <Cloud size={16} />
                       <span className="hidden sm:inline">{t('common.link_email')}</span>
                    </button>
                  ) : isLocalGuest ? (
                    <button
                      onClick={onLoginClick}
                      className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-3 py-2 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95"
                    >
                      <Cloud size={16} />
                      <span className="hidden sm:inline">{t('common.save_progress')}</span>
                    </button>
                 ) : (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-sm hover:text-red-400 transition-colors bg-[var(--card-bg)] px-2 py-2 sm:px-3 rounded-xl border border-[var(--card-border)] shadow-md"
                    aria-label={t('common.logout')}
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">{t('common.logout')}</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-4 py-2 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
              >
                <LogIn size={18} />
                <span>{t('common.login')}</span>
              </button>
            )}
          </div>
          </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--card-border)] p-4 md:hidden z-50"
              >
                <div className="flex flex-col gap-4">
                  {/* Language in mobile menu */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">{t('common.language')}</span>
                    <div className="flex gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                            language === lang.code 
                              ? 'bg-[var(--accent)] text-white' 
                              : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--card-border)]'
                          }`}
                        >
                          {lang.flag} {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme toggle in mobile menu */}
                  <button
                    onClick={() => {
                      onThemeToggle();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]"
                  >
                    <span className="text-sm text-[var(--text-secondary)]">{t('common.theme')}</span>
                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                      <span className="text-sm font-medium">{theme === 'dark' ? t('common.theme_light') : t('common.theme_dark')}</span>
                    </div>
                  </button>

                  {/* User actions in mobile menu */}
                  {user ? (
                    <>
                      {!isAnonymous && !isLocalGuest && (
                        <button
                          onClick={() => {
                            onProfileClick();
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]"
                        >
                          <User size={18} className="text-[var(--accent)]" />
                          <div className="text-left">
                            <div className="text-sm font-bold text-[var(--text-primary)]">{user.email?.split('@')[0]}</div>
                            {profile?.city && (
                              <div className="text-xs text-[var(--text-secondary)]">{profile.city}, {profile.state}</div>
                            )}
                          </div>
                        </button>
                      )}

                      {isAnonymous ? (
                        <button
                          onClick={() => {
                            onLoginClick();
                          }}
                          className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-4 py-3 rounded-xl font-bold"
                        >
                          <Cloud size={18} />
                          Vincular E-mail
                        </button>
                      ) : isLocalGuest ? (
                        <button
                          onClick={() => {
                            onLoginClick();
                          }}
                          className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-4 py-3 rounded-xl font-bold"
                        >
                          <Cloud size={18} />
                          {t('common.save_progress')}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onLogout();
                          }}
                          className="flex items-center justify-center gap-2 text-red-400 px-4 py-3 rounded-xl font-bold"
                        >
                          <LogOut size={18} />
                          {t('common.logout')}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onLoginClick();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-color)] px-4 py-3 rounded-xl font-bold"
                    >
                      <LogIn size={18} />
                      {t('common.login')}
                    </button>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
