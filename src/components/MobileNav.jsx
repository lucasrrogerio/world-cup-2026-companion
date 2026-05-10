import { BookOpen, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function MobileNav({ activeView, setActiveView }) {
  const { t } = useLanguage();
  const tabs = [
    { id: 'album', label: t('common.album'), icon: BookOpen },
    { id: 'analytics', label: t('common.progress'), icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--nav-bg)] border-t border-[var(--card-border)] z-50 md:hidden pb-safe backdrop-blur-md">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <div
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                <Icon size={24} />
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors duration-200 ${
                  isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 w-8 h-1 bg-[var(--accent)] rounded-b-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
