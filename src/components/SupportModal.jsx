import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SupportModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const supportUrl = "https://pixgg.com/lucasrogerio";
  const displayUrl = "pixgg.com/lucasrogerio";

  const handleOpenLink = () => {
    window.open(supportUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--card-border)] w-full max-w-sm shadow-2xl overflow-hidden text-center"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent)]/20 blur-3xl rounded-full" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Coffee className="text-[var(--accent)]" size={32} />
            </div>

            <h2 className="text-2xl font-black mb-2 text-[var(--text-primary)]">
              Apoie o Projeto
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
              Contribua para manter o servidor online e o álbum atualizado para 2026!
            </p>

            {/* QR Code Section */}
            <div className="bg-white p-3 rounded-2xl mb-8 inline-block shadow-inner">
              <div className="w-44 h-44 flex items-center justify-center rounded-xl overflow-hidden">
                <img 
                  src="/pix-qr.png" 
                  alt={t('support.pix_qr_code')}
                  className="w-full h-full object-contain scale-110"
                />
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleOpenLink}
                className="w-full bg-[var(--accent)] text-[var(--bg-color)] font-black py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 text-base"
              >
                <ExternalLink size={20} />
                {t('support.access_via_link')}
              </button>

              <button 
                onClick={handleOpenLink}
                className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--accent)]/30 underline-offset-4"
              >
                {displayUrl}
              </button>
            </div>

            <p className="text-[9px] text-[var(--text-secondary)]/60 mt-10 uppercase tracking-widest font-black">
              Suporte Seguro via PixGG ❤️
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
