import React from 'react';
import { Code, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[var(--nav-bg)] border-t border-[var(--card-border)] py-8 px-4 mt-auto mb-16 md:mb-0">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-[var(--text-secondary)] text-sm font-medium flex items-center gap-2">
            {t('common.created_by')}
            <a
              href="https://github.com/lucasrrogerio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:text-[var(--text-primary)] transition-colors font-bold border-b border-[var(--gold)]/30 hover:border-[var(--text-primary)]"
            >
              Lucas Rogério
            </a>
          </p>
        </motion.div>

        <div className="text-[10px] text-[var(--text-secondary)]/50 uppercase tracking-[0.2em] font-bold">
          WC 2026 Companion • 2026
        </div>
      </div>
    </footer>
  );
}
