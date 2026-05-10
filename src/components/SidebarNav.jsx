import React, { useEffect, useRef } from 'react';
import { TEAMS_DATA } from '../data/stickers';
import { useLanguage } from '../contexts/LanguageContext';
import MobileScrubber from './MobileScrubber';

export default function SidebarNav({ 
  activeGroup, 
  setActiveGroup, 
  sortBy, 
  sortDirection,
  isManualScrolling,
  isMobile 
}) {
  const { t } = useLanguage();
  
  // Base group list
  const groupList = ['FWC', ...TEAMS_DATA.map(g => g.group), 'CC'];
  
  // Base team list
  const teamList = ['FWC', 'Coca-Cola'];
  TEAMS_DATA.forEach(group => {
    teamList.push(...group.teams);
  });
  
  // Compute items based on mode
  let items = [];
  if (sortBy === 'group') {
    items = groupList;
  } else {
    items = [...teamList].sort((a, b) => {
      const cmp = a.localeCompare(b);
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  const activeBtnRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleJump = (item) => {
    let elementId;
    if (sortBy === 'group') {
      elementId = `section-${item === 'FWC' ? 'FWC' : (item === 'CC' ? 'Coca-Cola' : item)}`;
    } else {
      elementId = `team-${item}`;
    }

    const el = document.getElementById(elementId);
    if (el) {
      isManualScrolling.current = true;
      const offset = 132; // Account for new sticky header positions
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Release lock after animation finishes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
    setActiveGroup(item);
  };

  // Auto-scroll the active button into view in the sidebar
  useEffect(() => {
    if (!isMobile && activeBtnRef.current && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const btn = activeBtnRef.current;
      
      const sidebarRect = sidebar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      
      // Calculate scroll position to center the active button
      const scrollY = btn.offsetTop - sidebar.offsetTop - (sidebarRect.height / 2) + (btnRect.height / 2);
      
      sidebar.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    }
  }, [activeGroup, sortBy, sortDirection, isMobile]);

  if (isMobile) {
    return (
      <MobileScrubber 
        items={items} 
        activeItem={activeGroup} 
        onSelect={handleJump} 
      />
    );
  }

  return (
    <aside 
      ref={sidebarRef}
      className="hidden md:block w-48 shrink-0 h-[calc(100vh-132px)] sticky top-[132px] overflow-y-auto scrollbar-hide pt-8 pb-4 border-r border-[var(--card-border)] pr-4"
    >
      <ul className="flex flex-col gap-2">
        {items.map(item => {
          let label;
          let elementId;

          if (sortBy === 'group') {
            label = item === 'FWC' || item === 'CC' ? item : t('album.group_label').replace('{{name}}', item);
            elementId = `section-${item === 'FWC' ? 'FWC' : (item === 'CC' ? 'Coca-Cola' : item)}`;
          } else {
            // Alpha mode
            label = item === 'Coca-Cola' ? 'CC' : item; // Use CC instead of Coca-Cola for acronym if desired, or keep item
            elementId = `team-${item}`;
          }

          const isActive = activeGroup === item;
          
          return (
            <li key={item} className="w-full">
              <button
                ref={isActive ? activeBtnRef : null}
                onClick={() => handleJump(item)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 border ${
                  isActive 
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md' 
                    : 'bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)] hover:border-[var(--card-border)]'
                }`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
