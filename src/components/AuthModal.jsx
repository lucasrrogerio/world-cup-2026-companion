import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, AlertTriangle, CheckCircle, LogIn, Link } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInAnonymously, upgradeToEmailAccount } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Turnstile } from '@marsidev/react-turnstile';
import { setPendingMigration } from '../utils/migration';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, onDevGuestBypass, user, stickers }) {
  const { t } = useLanguage();
  const isDevMode = import.meta.env.DEV;
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isGuestCaptchaBypassed, setIsGuestCaptchaBypassed] = useState(false);
  // 'link' = upgrade anonymous → keep data | 'login' = sign in to existing account → lose local data
  const [anonymousMode, setAnonymousMode] = useState('link');
  const isLocalGuest = user?.is_local_guest;
  const isAnonymous = user?.is_anonymous && !user?.is_local_guest;
  const supportsMigrationMode = isAnonymous || isLocalGuest;
  const shouldRequireCaptcha = !isDevMode || !isGuestCaptchaBypassed;

  const handleGuestBypassToggle = () => {
    setIsGuestCaptchaBypassed((current) => !current);
    setShowCaptcha(false);
    setTurnstileToken(null);
    setError(null);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isAnonymous && anonymousMode === 'link') {
        // Upgrade: keep all local data, associate email
        await upgradeToEmailAccount(email, password);
        alert('Sua coleção foi vinculada com sucesso! Seus dados estão seguros na nuvem.');
      } else if (isAnonymous && anonymousMode === 'login') {
        // Login to existing account: local data stays local (not merged)
        await signInWithEmail(email, password);
        if (onAuthSuccess) onAuthSuccess();
      } else if (isLocalGuest && anonymousMode === 'link') {
        setPendingMigration(stickers);
        await signUpWithEmail(email, password);
        alert('Sua coleção local foi preparada para migração. Conclua o cadastro para salvar tudo na nuvem.');
      } else if (isLocalGuest && anonymousMode === 'login') {
        await signInWithEmail(email, password);
        if (onAuthSuccess) onAuthSuccess();
      } else if (isRegistering) {
        await signUpWithEmail(email, password);
        alert(t('auth.alert_register'));
      } else {
        await signInWithEmail(email, password);
        if (onAuthSuccess) onAuthSuccess();
      }
      onClose();
    } catch (err) {
      if (isAnonymous && anonymousMode === 'link' && (err.message?.includes('already registered') || err.message?.includes('already exists'))) {
        setError(t('auth.email_already_exists_error'));
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if ((isAnonymous || isLocalGuest) && anonymousMode === 'link') {
        // Vincular: salva migration para mesclar ao entrar
        setPendingMigration(stickers);
      }
      // No anonymousMode === 'login', não salva migration (usuário ciente que perde os dados)
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };


  const handleGuestLogin = async () => {
    if (shouldRequireCaptcha && !showCaptcha) {
      setShowCaptcha(true);
      return;
    }

    if (shouldRequireCaptcha && !turnstileToken) return;

    if (!shouldRequireCaptcha) {
      onDevGuestBypass?.();
      if (onAuthSuccess) onAuthSuccess();
      onClose();
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await signInAnonymously(shouldRequireCaptcha ? turnstileToken : undefined);
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
      if (shouldRequireCaptcha) {
        setTurnstileToken(null); // Reset token on error to allow retry
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--card-border)] w-full max-w-md shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent)]/20 blur-3xl rounded-full" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-black mb-2 text-center text-[var(--text-primary)]">
              {supportsMigrationMode
                ? (anonymousMode === 'link'
                    ? (isLocalGuest ? 'Salvar Progresso' : 'Vincular Conta')
                    : 'Entrar em Conta Existente')
                : (isRegistering ? t('auth.title_register') : t('auth.title_login'))}
            </h2>

            {/* ── ANONYMOUS MODE TAB SWITCHER ── */}
            {supportsMigrationMode && (
              <div className="mb-5">
                {/* Tab switcher */}
                <div className="flex rounded-2xl p-1 bg-[var(--bg-color)] border border-[var(--card-border)] mb-4">
                  <button
                    type="button"
                    onClick={() => { setAnonymousMode('link'); setError(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                      anonymousMode === 'link'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Link size={14} />
                    {isLocalGuest ? t('auth.save_account') : t('auth.link_account')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAnonymousMode('login'); setError(null); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                      anonymousMode === 'login'
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <LogIn size={14} />
                    Já tenho conta
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {anonymousMode === 'link' ? (
                    <motion.div
                      key="link-banner"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">{t('auth.data_kept')}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {isLocalGuest
                          ? t('auth.save_merge_info')
                          : t('auth.link_merge_info')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="login-banner"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                        <span className="text-amber-400 text-xs font-black uppercase tracking-widest">{t('auth.local_not_migrated')}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {t('auth.existing_account_warning')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4 relative">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('auth.email_label')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-color)] border border-[var(--card-border)] rounded-xl p-3 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all"
                  placeholder={t('auth.email_placeholder')}
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('auth.password_label')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--bg-color)] border border-[var(--card-border)] rounded-xl p-3 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all"
                  placeholder={t('auth.password_placeholder')}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 text-white ${
                  supportsMigrationMode && anonymousMode === 'login'
                    ? 'bg-amber-500 hover:bg-amber-400'
                    : 'bg-[var(--accent)] hover:opacity-90 text-[var(--bg-color)]'
                }`}
              >
                {isLoading
                  ? t('auth.loading')
                  : supportsMigrationMode
                    ? (anonymousMode === 'link'
                        ? (isLocalGuest ? 'Salvar e migrar minha coleção' : 'Vincular e salvar minha coleção')
                        : 'Entrar (sem migrar dados)')
                    : (isRegistering ? t('auth.submit_register') : t('auth.submit_login'))}
              </button>
            </form>

            {!supportsMigrationMode ? (
              <div className="mt-6 text-center text-[var(--text-secondary)] text-sm space-y-4">
              <p>
                {isRegistering ? t('auth.switch_login_prompt') : t('auth.switch_register_prompt')}
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="ml-2 text-[var(--accent)] hover:underline font-bold"
                >
                  {isRegistering ? t('auth.switch_login_action') : t('auth.switch_register_action')}
                </button>
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--card-border)]"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--card-bg)] px-2 text-[var(--text-secondary)]">{t('auth.or')}</span></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-bold py-3 rounded-xl transition-all border border-gray-200 hover:bg-gray-50 shadow-sm disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('auth.google_login')}
              </button>

              <div className="bg-[var(--accent)]/5 rounded-2xl p-4 border border-[var(--accent)]/10 space-y-3">
                <div className="text-left space-y-1">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{t('auth.guest_benefit_title')}</h4>
                  <ul className="text-[10px] space-y-0.5 opacity-80">
                    <li>{t('auth.guest_benefit_sync')}</li>
                    <li>{t('auth.guest_benefit_insights')}</li>
                  </ul>
                </div>

                {isDevMode && (
                  <div className={`rounded-2xl border p-3 text-left ${
                    isGuestCaptchaBypassed
                      ? 'border-amber-500/40 bg-amber-500/10'
                      : 'border-[var(--card-border)] bg-[var(--card-bg)]/60'
                  }`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">
                          Modo dev visitante
                        </p>
                        <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                          {isGuestCaptchaBypassed
                            ? 'Cloudflare desabilitado. O acesso continua em modo visitante local neste ambiente de dev.'
                            : 'Cloudflare ativo. Ative o bypass apenas para depurar localmente.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleGuestBypassToggle}
                        className={`shrink-0 rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                          isGuestCaptchaBypassed
                            ? 'bg-amber-500 text-white hover:bg-amber-400'
                            : 'bg-[var(--bg-color)] text-[var(--text-primary)] border border-[var(--card-border)] hover:border-[var(--accent)]'
                        }`}
                      >
                        {isGuestCaptchaBypassed ? 'Reativar Cloudflare' : 'Desabilitar Cloudflare'}
                      </button>
                    </div>
                  </div>
                )}

                {isGuestCaptchaBypassed && (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-left">
                    <div className="flex items-center gap-2">
                      <Cloud size={14} className="text-amber-300 shrink-0" />
                      <p className="text-[11px] font-semibold text-amber-200">
                        Visitante local ativo neste modo dev, sem sessão Supabase.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGuestLogin}
                  type="button"
                  disabled={isLoading || (shouldRequireCaptcha && showCaptcha && !turnstileToken)}
                  className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] py-2.5 rounded-xl text-sm transition-all font-bold disabled:opacity-50"
                >
                  {isLoading
                    ? t('auth.loading')
                    : shouldRequireCaptcha
                      ? (showCaptcha ? (turnstileToken ? t('auth.continue_guest') : 'Validando...') : t('auth.continue_guest'))
                      : t('auth.continue_guest_local')}
                </button>

                {shouldRequireCaptcha && showCaptcha && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-[10px] text-[var(--text-secondary)]">{t('auth.security_verification')}</p>
                    <div className="flex justify-center scale-90 origin-top">
                      <Turnstile
                        siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => setTurnstileToken(token)}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* Anonymous user — Google button adapts to current mode */
            <div className="mt-5 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--card-border)]"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--card-bg)] px-2 text-[var(--text-secondary)]">{t('auth.or_use_google')}</span></div>
              </div>
              <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-bold py-3 rounded-xl transition-all border border-gray-200 hover:bg-gray-50 shadow-sm disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {anonymousMode === 'link' ? t('auth.link_google') : t('auth.login_google')}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
}
