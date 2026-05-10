import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Shield, Zap, ExternalLink, Code, Database, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutView({ user }) {
  const { t } = useLanguage();
  const isAnonymous = user?.is_anonymous;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-4 md:p-8 space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <section className="text-center space-y-4 py-8">
        <motion.h1 
          className="text-4xl md:text-6xl font-black text-[var(--text-primary)]"
          variants={itemVariants}
        >
          WC Companion 2026
        </motion.h1>
        <motion.p 
          className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Sua coleção de figurinhas da Copa do Mundo, organizada e protegida na nuvem.
        </motion.p>
      </section>

      {/* Main Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-[var(--card-bg)] p-6 rounded-3xl border border-[var(--card-border)] hover:border-[var(--accent)] transition-all group"
          variants={itemVariants}
        >
          <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Cloud className="text-[var(--accent)]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Tudo na Nuvem</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Suas figurinhas são salvas automaticamente. Você nunca mais vai perder seu progresso se trocar de celular ou limpar o histórico.
          </p>
        </motion.div>

        <motion.div 
          className="bg-[var(--card-bg)] p-6 rounded-3xl border border-[var(--card-border)] hover:border-[var(--accent)] transition-all group"
          variants={itemVariants}
        >
          <div className="w-12 h-12 bg-[var(--brand-blue)]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Shield className="text-[var(--brand-blue)]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Privacidade e Controle</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Você decide como quer usar. Comece agora mesmo como visitante e, se quiser, vincule um e-mail depois para ter um backup extra.
          </p>
        </motion.div>

        <motion.div 
          className="bg-[var(--card-bg)] p-6 rounded-3xl border border-[var(--card-border)] hover:border-[var(--accent)] transition-all group"
          variants={itemVariants}
        >
          <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="text-[var(--accent)]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Simples e Rápido</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            O aplicativo foi feito para ser leve e carregar instantaneamente, para que você foque apenas no que importa: completar seu álbum.
          </p>
        </motion.div>
      </div>

      {/* Usage Tips Section */}
      <section className="space-y-8 py-8">
        <motion.h2 
          className="text-2xl font-black text-center"
          variants={itemVariants}
        >
          Dicas de Uso
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div className="flex gap-4" variants={itemVariants}>
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <Zap className="text-[var(--accent)]" size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold">Marcar Figurinhas</h4>
              <p className="text-sm text-[var(--text-secondary)]">Um toque marca que você já tem a figurinha. Toques extras adicionam figurinhas repetidas para troca.</p>
            </div>
          </motion.div>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue)]/10 flex items-center justify-center shrink-0">
              <Globe size={20} className="text-[var(--brand-blue)]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold">Navegação Rápida</h4>
              <p className="text-sm text-[var(--text-secondary)]">Use a barra lateral (ou o menu inferior no celular) para pular rapidamente entre os grupos de seleções.</p>
            </div>
          </motion.div>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <Database size={20} className="text-[var(--accent)]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold">Acompanhe seu Álbum</h4>
              <p className="text-sm text-[var(--text-secondary)]">Na aba "Progresso", você vê gráficos detalhados e sabe exatamente quantas faltam para completar.</p>
            </div>
          </motion.div>

          <motion.div className="flex gap-4" variants={itemVariants}>
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue)]/10 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-[var(--brand-blue)]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold">Filtros Inteligentes</h4>
              <p className="text-sm text-[var(--text-secondary)]">Você pode filtrar para ver apenas as que faltam ou apenas as suas repetidas para facilitar a troca.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="pb-12" />
    </motion.div>
  );
}
