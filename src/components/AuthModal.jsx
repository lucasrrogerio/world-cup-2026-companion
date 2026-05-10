import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { signInWithEmail, signUpWithEmail } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { t } = useLanguage();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (isRegistering) {
        await signUpWithEmail(email, password);
        alert(t('auth.alert_register'));
      } else {
        await signInWithEmail(email, password);
        if (onAuthSuccess) onAuthSuccess();
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestMock = () => {
    const mockUser = { id: 'mock-user-123', email: 'mock@test.com' };
    if (onAuthSuccess) onAuthSuccess(mockUser);
    onClose();
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

            <h2 className="text-3xl font-black mb-6 text-center bg-gradient-to-r from-[var(--gold)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              {isRegistering ? t('auth.title_register') : t('auth.title_login')}
            </h2>
            
            <form onSubmit={handleAuth} className="space-y-4 relative">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">{t('auth.email_label')}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-color)] border border-[var(--card-border)] rounded-xl p-3 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all"
                  placeholder={t('auth.email_placeholder')}
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
                  required
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--accent)] hover:bg-purple-800 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(75,0,130,0.4)] disabled:opacity-50"
              >
                {isLoading ? t('auth.loading') : (isRegistering ? t('auth.submit_register') : t('auth.submit_login'))}
              </button>
            </form>
            
            <div className="mt-6 text-center text-[var(--text-secondary)] text-sm space-y-4">
              <p>
                {isRegistering ? t('auth.switch_login_prompt') : t('auth.switch_register_prompt')} 
                <button 
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="ml-2 text-[var(--gold)] hover:underline font-bold"
                >
                  {isRegistering ? t('auth.switch_login_action') : t('auth.switch_register_action')}
                </button>
              </p>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--card-border)]"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[var(--card-bg)] px-2 text-[var(--text-secondary)]">{t('auth.or')}</span></div>
              </div>

              <div className="bg-[var(--accent)]/5 rounded-2xl p-4 border border-[var(--accent)]/10 space-y-3">
                <div className="text-left space-y-1">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{t('auth.guest_benefit_title')}</h4>
                  <ul className="text-[10px] space-y-0.5 opacity-80">
                    <li>{t('auth.guest_benefit_sync')}</li>
                    <li>{t('auth.guest_benefit_insights')}</li>
                  </ul>
                </div>
                
                <button 
                  onClick={handleGuestMock}
                  type="button"
                  className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] py-2.5 rounded-xl text-sm transition-all font-bold"
                >
                  {t('auth.continue_guest')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
