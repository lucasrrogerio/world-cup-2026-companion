import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileScrubber({ items, activeItem, onSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragItem, setDragItem] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const y = touch.clientY - rect.top;
      
      const index = Math.floor((y / rect.height) * items.length);
      const validIndex = Math.max(0, Math.min(items.length - 1, index));
      const targetItem = items[validIndex];
      
      if (targetItem !== dragItem) {
        setDragItem(targetItem);
        onSelect(targetItem);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setDragItem(null);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('mouseup', handleTouchEnd);
      document.addEventListener('mousemove', handleTouchMove, { passive: false });
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseup', handleTouchEnd);
      document.removeEventListener('mousemove', handleTouchMove);
    };
  }, [isDragging, items, dragItem, onSelect]);

  const handleStart = (clientY) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const index = Math.floor((y / rect.height) * items.length);
    const validIndex = Math.max(0, Math.min(items.length - 1, index));
    
    const targetItem = items[validIndex];
    setDragItem(targetItem);
    onSelect(targetItem);
  };

  const isDense = items.length > 20;

  return (
    <>
      <div 
        className="fixed right-0 top-[120px] bottom-[80px] w-8 z-45 touch-none select-none"
        onMouseDown={(e) => handleStart(e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      >
        <div 
          ref={containerRef}
          className="h-full w-full flex flex-col justify-between items-center py-2"
        >
          {items.map((item) => {
            if (isDense) {
              return (
                <div 
                  key={item} 
                  className={`w-1 h-1 rounded-full ${activeItem === item ? 'bg-[var(--accent)] scale-150' : 'bg-[var(--text-secondary)]/30'}`}
                />
              );
            }
            return (
              <div 
                key={item} 
                className={`text-[8px] font-bold leading-none ${activeItem === item ? 'text-[var(--accent)] scale-125' : 'text-[var(--text-secondary)]/30'}`}
              >
                {item === 'Coca-Cola' ? 'CC' : item}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isDragging && dragItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed right-12 top-1/2 -translate-y-1/2 z-[70] pointer-events-none"
          >
            <div className="bg-[var(--accent)] text-white font-black text-3xl w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(75,0,130,0.4)] border-4 border-[var(--bg-color)]">
              {dragItem === 'Coca-Cola' ? 'CC' : dragItem}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}