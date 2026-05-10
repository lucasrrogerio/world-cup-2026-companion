import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signInAnonymously, linkGoogleIdentity, upgradeToEmailAccount } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Turnstile } from '@marsidev/react-turnstile';
import { setPendingMigration } from '../utils/migration';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, user, stickers }) {
  const { t } = useLanguage();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const isAnonymous = user?.is_anonymous;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isAnonymous) {
        await upgradeToEmailAccount(email, password);
        alert("Sua conta foi atualizada com sucesso!");
      } else if (isRegistering) {
        await signUpWithEmail(email, password);
        alert(t('auth.alert_register'));
      } else {
        await signInWithEmail(email, password);
        if (onAuthSuccess) onAuthSuccess();
      }
      onClose();
    } catch (err) {
      if (isAnonymous && (err.message?.includes('already registered') || err.message?.includes('already exists'))) {
        setPendingMigration(stickers);
        setIsRegistering(false);
        setError("Este e-mail já está em uso. Faça login para resgatar seu progresso nesta conta.");
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
      // Always save migration data before Google Login if anonymous
      if (isAnonymous) {
        setPendingMigration(stickers);
      }
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    if (!showCaptcha) {
      setShowCaptcha(true);
      return;
    }
    
    if (!turnstileToken) return;

    setError(null);
    setIsLoading(true);
    try {
      await signInAnonymously(turnstileToken);
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
      setTurnstileToken(null); // Reset token on error to allow retry
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
              {isAnonymous ? "Vincular Conta" : (isRegistering ? t('auth.title_register') : t('auth.title_login'))}
            </h2>
            
            {isAnonymous && (
              <>
                <p className="text-[11px] text-[var(--text-secondary)] mb-6 text-center leading-relaxed">
                  Sua coleção já está sendo salva! Vincule um e-mail para ter backup em nuvem e acessar de outros aparelhos.
                </p>
                <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-2xl p-4 mb-6">
                  <h3 className="text-[var(--accent)] text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Cloud size={14} /> Por que vincular?
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)]">
                      <div className="mt-1 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      <span><b>Segurança:</b> Não perca seus dados se limpar o histórico do navegador.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)]">
                      <div className="mt-1 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      <span><b>Multi-dispositivo:</b> Acesse sua coleção de qualquer celular ou PC.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)]">
                      <div className="mt-1 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      <span><b>Trocas:</b> Participe da comunidade de trocas da sua região.</span>
                    </li>
                  </ul>
                </div>
              </>
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
                className="w-full bg-[var(--accent)] hover:opacity-90 text-[var(--bg-color)] font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50"
              >
                {isLoading ? t('auth.loading') : (isAnonymous ? "Confirmar E-mail" : (isRegistering ? t('auth.submit_register') : t('auth.submit_login')))}
              </button>
            </form>
            
            {!isAnonymous ? (
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
                
                <button 
                  onClick={handleGuestLogin}
                  type="button"
                  disabled={isLoading || (showCaptcha && !turnstileToken)}
                  className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] py-2.5 rounded-xl text-sm transition-all font-bold disabled:opacity-50"
                >
                  {isLoading ? t('auth.loading') : (showCaptcha ? (turnstileToken ? t('auth.continue_guest') : "Validando...") : t('auth.continue_guest'))}
                </button>

                {showCaptcha && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-[10px] text-[var(--text-secondary)]">Verificação de segurança:</p>
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
              <div className="mt-6 space-y-4">
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
                  Salvar com Google
                </button>
                <p className="text-center text-xs text-[var(--text-secondary)]">
                  Ao vincular sua conta, seu progresso será salvo permanentemente na nuvem.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
