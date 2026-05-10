import { motion, AnimatePresence } from 'framer-motion';
import StickerCard from './StickerCard';
import { useLanguage } from '../contexts/LanguageContext';

export default function StickerGrid({ stickers, activeGroup, onUpdateSticker, sortBy, sortDirection, filterMode = 'all' }) {
  const { t } = useLanguage();
  
  const filteredStickers = stickers.filter(s => {
    if (filterMode === 'missing') return s.count === 0;
    if (filterMode === 'duplicates') return s.count > 1;
    return true;
  });

  if (filteredStickers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-12 shadow-2xl max-w-md mx-auto"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-black mb-2 text-[var(--text-primary)] uppercase tracking-tighter">
            {t('album.empty_state')}
          </h3>
          <p className="text-[var(--text-secondary)]">
            {filterMode === 'missing' 
              ? "Parabéns! Parece que você completou essa parte do álbum!"
              : "Nenhuma figurinha repetida por enquanto."}
          </p>
        </motion.div>
      </div>
    );
  }

  // Primary grouping
  const sections = filteredStickers.reduce((acc, sticker) => {
    let sectionKey;
    if (sortBy === 'alpha') {
      sectionKey = 'alphabetical';
    } else {
      sectionKey = sticker.group || sticker.category;
    }
    
    if (!acc[sectionKey]) acc[sectionKey] = {};
    
    const teamKey = sticker.team || sticker.category;
    if (!acc[sectionKey][teamKey]) acc[sectionKey][teamKey] = [];
    acc[sectionKey][teamKey].push(sticker);
    
    return acc;
  }, {});

  // Sort sections
  const sectionKeys = Object.keys(sections).sort((a, b) => {
    if (sortBy === 'alpha') return 0;
    // FWC first, then Groups A-L, then CC
    if (a === 'FWC') return -1;
    if (b === 'FWC') return 1;
    if (a === 'Coca-Cola') return 1;
    if (b === 'Coca-Cola') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="py-4">
      {sectionKeys.map((sectionKey) => {
        const teams = sections[sectionKey];
        const teamKeys = Object.keys(teams).sort((a, b) => {
          if (sortBy === 'alpha') {
            const cmp = a.localeCompare(b);
            return sortDirection === 'asc' ? cmp : -cmp;
          }
          return 0; // Keep natural team order within group
        });

        return (
          <div key={sectionKey} id={`section-${sectionKey}`} className="mb-12">
            {sortBy === 'group' && (
              <div className="sticky top-[132px] z-30 bg-[var(--bg-color)]/80 backdrop-blur-md pt-6 pb-3 mb-6 border-b border-[var(--card-border)]/50">
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--accent)] tracking-tighter uppercase">
                  {t(`teams.${sectionKey}`) || (sectionKey === 'FWC' || sectionKey === 'Coca-Cola' ? sectionKey : t('album.group_label').replace('{{name}}', sectionKey))}
                </h2>
              </div>
            )}

            {teamKeys.map((teamName) => {
              const teamStickers = teams[teamName];
              return (
                <div key={teamName} id={`team-${teamName}`} className="mb-10 pl-2 sm:pl-4 border-l-2 border-[var(--card-border)]">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 sm:gap-3 text-[var(--text-primary)]">
                    <span className="w-7 h-5 sm:w-8 sm:h-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded flex items-center justify-center text-[10px] sm:text-xs text-[var(--text-secondary)] font-medium">
                      {teamStickers[0].category === 'Team' ? teamName.substring(0, 3).toUpperCase() : 
                       teamStickers[0].category === 'FWC' ? 'FWC' :
                       teamStickers[0].category === 'Coca-Cola' ? 'CC' : ''}
                    </span>
                    {t(`teams.${teamName}`) || teamName}
                  </h3>
                  
                  <div className="grid grid-cols-3 min-[400px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
                    <AnimatePresence mode="popLayout">
                      {teamStickers.map((sticker, idx) => (
                        <motion.div
                          key={sticker.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ 
                            duration: 0.2,
                            delay: Math.min(idx * 0.01, 0.5) // Limit stagger delay
                          }}
                        >
                          <StickerCard 
                            sticker={sticker} 
                            onUpdate={onUpdateSticker} 
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
