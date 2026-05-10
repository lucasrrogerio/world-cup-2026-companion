import React from 'react';
import { Code, ExternalLink, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer({ onSupportClick }) {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[var(--nav-bg)] border-t border-[var(--card-border)] py-12 px-4 mt-auto mb-16 md:mb-0">
      <div className="container mx-auto flex flex-col items-center gap-6">
        {/* Support Button */}
        <button 
          onClick={onSupportClick}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-color)] rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all group active:scale-95"
        >
          <Coffee size={20} className="group-hover:rotate-12 transition-transform" />
          Apoiar Projeto
        </button>

        {/* Social / Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/lucasrrogerio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Code size={20} />
          </a>
          <a
            href="#"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all hover:scale-110"
            aria-label="Documentation"
          >
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="text-[var(--text-secondary)] text-sm font-medium flex items-center gap-1.5">
            Desenvolvido com ❤️ por 
            <a
              href="https://github.com/lucasrrogerio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors font-bold border-b border-[var(--accent)]/30 hover:border-[var(--text-primary)]"
            >
              Lucas Rogério
            </a>
          </p>
          <p className="text-[10px] text-[var(--text-secondary)]/60 max-w-xs leading-relaxed uppercase tracking-widest font-bold">
            WC 2026 Companion • Feito para colecionadores
          </p>
        </motion.div>

        <div className="text-[9px] text-[var(--text-secondary)]/30 uppercase tracking-[0.3em] font-black">
          &copy; 2026 • Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
