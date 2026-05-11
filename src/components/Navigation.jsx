import { motion } from 'framer-motion';
import { Filter, SortAsc, LayoutGrid, SortDesc, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation({ 
  sortBy, 
  onToggleSortBy,
  sortDirection,
  setSortDirection,
  filterMode,
  setFilterMode,
  isManualScrolling 
}) {
  const { t } = useLanguage();

  return (
    <nav className="bg-[var(--bg-color)]/80 backdrop-blur-xl border-b border-[var(--card-border)] sticky top-[64px] z-40 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-5 pb-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Filters Section */}
        <div className="flex items-center gap-3 bg-[var(--card-bg)]/50 p-1.5 rounded-2xl border border-[var(--card-border)]">
          <div className="flex items-center gap-2 px-2 border-r border-[var(--card-border)] mr-1">
            <Filter size={14} className="text-[var(--accent)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hidden xs:block">
              Filtro
            </span>
          </div>
          <div className="flex gap-1 relative">
            {['all', 'missing', 'duplicates'].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`relative px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 z-10 ${
                  filterMode === mode 
                    ? 'text-white' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {filterMode === mode && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-lg shadow-[var(--accent)]/20 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {t(`album.filter_${mode}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Mode Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[var(--card-bg)]/50 p-1.5 rounded-2xl border border-[var(--card-border)]">
            <div className="flex gap-1 relative">
              {['group', 'alpha'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => onToggleSortBy(mode)}
                  className={`relative px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 z-10 ${
                    sortBy === mode 
                      ? 'text-white' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {sortBy === mode && (
                    <motion.div
                      layoutId="activeSort"
                      className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-lg shadow-[var(--accent)]/20 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {mode === 'group' ? <LayoutGrid size={14} className="inline mr-1" /> : <SortAsc size={14} className="inline mr-1" />}
                  {mode === 'group' ? t('album.filter_groups') : t('album.filter_alpha')}
                </button>
              ))}
            </div>

            {sortBy === 'alpha' && (
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--bg-color)] text-[var(--accent)] border border-[var(--card-border)] hover:scale-105 transition-all ml-1"
                title={sortDirection === 'asc' ? t('album.sort_desc') : t('album.sort_asc')}
              >
                {sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
              </button>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
