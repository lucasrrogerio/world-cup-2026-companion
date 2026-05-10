import { motion } from 'framer-motion';
import { Minus } from 'lucide-react';

export default function StickerCard({ sticker, onUpdate }) {
  const isMissing = sticker.count === 0;
  const isDuplicate = sticker.count > 1;
  const duplicateCount = sticker.count - 1;

  const handleIncrement = (e) => {
    e.preventDefault();
    onUpdate(sticker.id, sticker.count + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onUpdate(sticker.id, Math.max(0, sticker.count - 1));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onUpdate(sticker.id, Math.max(0, sticker.count - 1));
  };

  return (
    <div className="relative group select-none">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleIncrement}
        onContextMenu={handleContextMenu}
        className={`w-full aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden
          ${isMissing 
            ? 'border-[var(--card-border)] bg-[var(--card-bg)] grayscale opacity-60 hover:opacity-100 hover:border-[var(--text-secondary)]' 
            : 'border-[var(--accent)] bg-gradient-to-b from-[var(--accent)]/30 to-[var(--card-owned-bg)] shadow-[0_0_15px_rgba(75,0,130,0.3)]'
          }
        `}
      >
        <span className="text-[var(--text-secondary)] text-[10px] font-bold absolute top-1.5 left-1.5">
          {sticker.category === 'Team' ? sticker.team.substring(0,3).toUpperCase() : 
           sticker.category === 'Coca-Cola' ? 'CC' : sticker.category}
        </span>
        <span className={`text-xl sm:text-2xl font-black ${isMissing ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
          {sticker.number}
        </span>
        
        {/* Visual feedback for interaction */}
        <div className="absolute inset-0 bg-white opacity-0 active:opacity-10 transition-opacity duration-200" />
      </motion.button>

      {/* Decrease Button (Mobile Friendly) */}
      {!isMissing && (
        <button
          onClick={handleDecrement}
          className="absolute -bottom-1 -right-1 bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--accent)]/50 w-7 h-7 rounded-full flex items-center justify-center z-20 shadow-lg active:scale-90 transition-transform md:opacity-0 md:group-hover:opacity-100"
          aria-label="Remover"
        >
          <Minus size={14} strokeWidth={3} />
        </button>
      )}

      {/* Duplicate Badge */}
      {isDuplicate && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--bg-color)] shadow-lg z-10"
        >
          {duplicateCount}
        </motion.div>
      )}
    </div>
  );
}
