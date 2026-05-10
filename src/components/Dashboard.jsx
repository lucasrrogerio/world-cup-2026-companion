import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Users, Info, CloudOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GoalCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--card-border)] hover:border-[var(--accent)] transition-all group"
  >
    <div className="bg-[var(--accent)]/10 p-3 rounded-xl w-fit mb-4 group-hover:bg-[var(--accent)]/20 transition-colors">
      <Icon className="text-[var(--accent)]" size={24} />
    </div>
    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h3>
    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
  </motion.div>
);

export default function Dashboard({ profile, onLoginClick }) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)]">
          {t('dashboard.hero_title')}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 font-medium">
          {t('dashboard.hero_subtitle')}
        </p>
        
        {!profile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoginClick}
            className="bg-[var(--accent)] hover:opacity-90 text-[var(--bg-color)] font-black px-10 py-5 rounded-2xl shadow-xl transition-all uppercase tracking-wider"
          >
            {t('dashboard.cta_start')}
          </motion.button>
        )}
      </motion.div>

      {/* Objetivo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[var(--accent)]/20 to-transparent border border-[var(--accent)]/30 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl"
      >
        <div className="bg-[var(--accent)] p-4 rounded-2xl shadow-lg">
          <Info className="text-[var(--bg-color)]" size={40} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{t('dashboard.mission_title')}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {t('dashboard.mission_desc')}
          </p>
        </div>
      </motion.div>

      {/* Como Funciona Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GoalCard 
          icon={BookOpen}
          title={t('dashboard.feature_manage')}
          description={t('dashboard.feature_manage_desc')}
          delay={0.4}
        />
        <GoalCard 
          icon={TrendingUp}
          title={t('dashboard.feature_track')}
          description={t('dashboard.feature_track_desc')}
          delay={0.5}
        />
        <GoalCard 
          icon={Users}
          title={t('dashboard.feature_connect')}
          description={t('dashboard.feature_connect_desc')}
          delay={0.6}
        />
      </div>

      {profile?.city && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-[var(--text-secondary)] text-sm italic"
        >
          {t('dashboard.status_connected').replace('{{city}}', profile.city)}
        </motion.p>
      )}
    </div>
  );
}
