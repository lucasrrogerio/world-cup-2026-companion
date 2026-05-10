import React, { useMemo, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { aggregateProgress } from '../utils/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const StatCard = memo(({ label, value, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(75,0,130,0.2)" }}
    className="bg-[var(--card-bg)] rounded-2xl p-4 sm:p-6 border border-[var(--card-border)] flex flex-col items-center justify-center text-center transition-colors hover:border-[var(--accent)]"
  >
    <span className="text-[var(--text-secondary)] text-[10px] sm:text-xs uppercase tracking-wider mb-1">{label}</span>
    <span className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</span>
  </motion.div>
));

const ProgressChart = ({ stickers, stats, profile, cityDuplicates }) => {
  const { language, t } = useLanguage();
  const [mode, setMode] = useState('daily');

  const data = useMemo(() => aggregateProgress(stickers, mode), [stickers, mode]);
  const { totalOwned, totalMissing, totalDuplicates, percentage, incompleteTeams } = stats;

  const recommendation = useMemo(() => {
    if (!profile?.city) return null;
    if (percentage === 100) return t('progress.congrats');
    
    const missingTeamNames = new Set(incompleteTeams.map(t => t.name));
    
    const availableMissingTeams = (cityDuplicates || [])
      .filter(dup => {
        let teamCode;
        if (dup.id.startsWith('CC')) teamCode = 'Coca-Cola';
        else if (dup.id.startsWith('FWC')) teamCode = 'FWC';
        else teamCode = dup.id.split(' ')[0];
        return missingTeamNames.has(teamCode);
      })
      .map(dup => {
        if (dup.id.startsWith('CC')) return 'Coca-Cola';
        if (dup.id.startsWith('FWC')) return 'FWC';
        return dup.id.split(' ')[0];
      });

    const uniqueAvailableTeams = [...new Set(availableMissingTeams)];

    if (uniqueAvailableTeams.length > 0) {
      const code = uniqueAvailableTeams[0];
      const teamName = t(`teams.${code}`) || code;
      return t('progress.tip_success')
        .replace('{{city}}', profile.city)
        .replace('{{team}}', teamName);
    }

    return t('progress.tip_none').replace('{{city}}', profile.city);
  }, [profile?.city, percentage, incompleteTeams, cityDuplicates, t]);

  // Hide recommendation for guests (mock-user-123)
  const showRecommendation = recommendation && profile?.id !== 'mock-user-123';

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[var(--text-secondary)] bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6 text-center">
        <p className="text-lg font-medium text-[var(--text-primary)]">{t('progress.no_data')}</p>
        <p className="text-sm mt-2">{t('progress.no_data_desc')}</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-3 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-xs text-[var(--text-secondary)] mb-1">{label}</p>
          <p className="text-lg font-bold text-[var(--gold)]">
            {payload[0].value} <span className="text-xs text-[var(--text-secondary)] font-normal">{t('progress.stat_owned').toLowerCase()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          label={t('progress.stat_progress')} 
          value={`${percentage.toFixed(1)}%`} 
          color="text-[var(--gold)]" 
        />
        <StatCard 
          label={t('progress.stat_owned')} 
          value={totalOwned} 
          color="text-[var(--text-primary)]" 
        />
        <StatCard 
          label={t('progress.stat_missing')} 
          value={totalMissing} 
          color="text-red-400" 
        />
        <StatCard 
          label={t('progress.stat_duplicates')} 
          value={totalDuplicates} 
          color="text-[var(--text-secondary)]" 
        />
      </div>

      {/* Progress Bar */}
      <div className="bg-[var(--card-bg)] rounded-full h-2 sm:h-3 overflow-hidden border border-[var(--card-border)]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[var(--accent)] via-[#8A2BE2] to-[var(--gold)]"
        />
      </div>

      {/* Recommendations */}
      {showRecommendation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[var(--card-bg)] to-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-lg shadow-purple-900/20"
        >
          <div className="bg-[var(--accent)] p-1.5 sm:p-2 rounded-xl shrink-0">
            <Sparkles className="text-[var(--gold)]" size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-tighter flex items-center gap-1">
              <MapPin size={10} /> {t('progress.tip_title').replace('{{city}}', profile.city)}
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium line-clamp-2 sm:line-clamp-none leading-tight">{recommendation}</p>
          </div>
        </motion.div>
      )}

      {/* Chart Section */}
      <div className="w-full bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{t('progress.title')}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{t('progress.subtitle')}</p>
        </div>
        
        <div className="flex bg-[var(--bg-color)] p-1 rounded-xl border border-[var(--card-border)]">
          <button
            onClick={() => setMode('daily')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'daily'
                ? 'bg-[var(--gold)] text-black shadow-lg shadow-yellow-500/20'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('progress.chart_daily')}
          </button>
          <button
            onClick={() => setMode('weekly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'weekly'
                ? 'bg-[var(--gold)] text-black shadow-lg shadow-yellow-500/20'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('progress.chart_weekly')}
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
              minTickGap={30}
              tickFormatter={(str) => {
                const date = new Date(str);
                return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short' });
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--gold)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-[var(--bg-color)] p-4 rounded-xl border border-[var(--card-border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold mb-1">{t('progress.stat_owned')}</p>
          <p className="text-2xl font-black text-[var(--text-primary)]">{data[data.length - 1].total}</p>
        </div>
        <div className="bg-[var(--bg-color)] p-4 rounded-xl border border-[var(--card-border)]">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold mb-1">{t('progress.chart_start_date')}</p>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {new Date(data[0].date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit' })}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProgressChart;
