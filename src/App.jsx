import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StickerGrid from './components/StickerGrid';
import ProgressChart from './components/ProgressChart';
import AboutView from './components/AboutView';
import Onboarding from './components/Onboarding';
import MobileNav from './components/MobileNav';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import SidebarNav from './components/SidebarNav';
import SupportModal from './components/SupportModal';
import { useCollection } from './hooks/useCollection';
import { supabase, signOut, getProfile, updateProfile } from './services/supabase';
import { TEAMS_DATA } from './data/stickers';
import { buildGroupItems, buildAlphaItems, getValidItemForMode } from './utils/navigationState';

function App() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [isLocalGuestMode, setIsLocalGuestMode] = useState(false);
  const [activeGroupItem, setActiveGroupItem] = useState('FWC');
  const [activeAlphaItem, setActiveAlphaItem] = useState('FWC');
  const [activeView, setActiveView] = useState('album');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState(null);
  const [sortBy, setSortBy] = useState('group'); // 'group' or 'alpha'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const isManualScrolling = useRef(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'missing', 'duplicates'

  const groupItems = useMemo(() => buildGroupItems(TEAMS_DATA), []);
  const alphaItems = useMemo(() => buildAlphaItems(TEAMS_DATA, sortDirection), [sortDirection]);

  const activeNavItem = sortBy === 'group' ? activeGroupItem : activeAlphaItem;

  const setActiveNavItem = (item) => {
    if (sortBy === 'group') {
      setActiveGroupItem(item);
    } else {
      setActiveAlphaItem(item);
    }
  };

  const handleSortModeToggle = (mode) => {
    setSortBy(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mode === 'group') {
      setActiveGroupItem(prev => getValidItemForMode('group', prev, groupItems, alphaItems));
      return;
    }

    setActiveAlphaItem(prev => getValidItemForMode('alpha', prev, groupItems, alphaItems));
  };

  useEffect(() => {
    setActiveGroupItem(prev => getValidItemForMode('group', prev, groupItems, alphaItems));
    setActiveAlphaItem(prev => getValidItemForMode('alpha', prev, groupItems, alphaItems));
  }, [groupItems, alphaItems]);

  const appUser = user ?? (isLocalGuestMode ? { id: 'local-dev-guest', is_anonymous: true, is_local_guest: true } : null);
  const canAccessApp = Boolean(appUser);
  const { stickers, stats, cityDuplicates, isSyncing, updateStickerCount } = useCollection(user);

  // Theme effect - apply immediately
  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }, [theme]);

  // ScrollSpy: Update activeGroup as user scrolls
  useEffect(() => {
    if (sortBy !== 'group' || activeView !== 'album' || !canAccessApp) return;

    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      if (isManualScrolling.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('section-', '');
          let group = sectionId;
          if (sectionId === 'Coca-Cola') group = 'CC';
          setActiveGroupItem(group);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [sortBy, activeView, canAccessApp]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setIsLocalGuestMode(false);
        checkProfile(currentUser.id, currentUser);
        if (activeView === 'dashboard') setActiveView('album');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setIsLocalGuestMode(false);
        checkProfile(currentUser.id, currentUser);
        setActiveView('album');
      } else {
        setProfile(null);
        setShowOnboarding(false);
      }
    });

    const handleMigrationComplete = () => {
      setMigrationMessage(t('auth.guest_migration_success'));
      setTimeout(() => setMigrationMessage(null), 5000);
    };

    window.addEventListener('wc_migration_complete', handleMigrationComplete);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('wc_migration_complete', handleMigrationComplete);
    };
  }, []);

  const checkProfile = async (userId, currentUser) => {
    try {
      const data = await getProfile(userId);
      setProfile(data);
      
      // Se o usuário tem e-mail (fez upgrade) mas o perfil não tem, sincroniza
      if (data && !data.email && currentUser?.email) {
        const updatedProfile = { ...data, email: currentUser.email };
        await updateProfile(updatedProfile);
        setProfile(updatedProfile);
      }

      if (!data || !data.city) {
        setShowOnboarding(true);
      }
    } catch (err) {
      console.error('Erro ao buscar perfil:', err);
    }
  };

  const handleOnboardingComplete = async (location) => {
    try {
      const newProfile = { 
        id: user.id, 
        email: user.email,
        ...location 
      };
      await updateProfile(newProfile);
      setProfile(newProfile);
      setShowOnboarding(false);
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
    }
  };

  const handleLogout = async () => {
    if (!user && isLocalGuestMode) {
      setIsLocalGuestMode(false);
      setActiveView('album');
      setIsAuthModalOpen(false);
      return;
    }

    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      <Header 
        user={appUser} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        isSyncing={isSyncing}
        theme={theme}
        onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        profile={profile}
        onProfileClick={() => setShowOnboarding(true)}
      />
      
      {showOnboarding && (
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          onSkip={() => setShowOnboarding(false)} 
          initialData={profile}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        user={appUser}
        stickers={stickers}
        onDevGuestBypass={() => {
          setIsLocalGuestMode(true);
          setProfile(null);
        }}
        onAuthSuccess={() => {
          setActiveView('album');
        }}
      />

      <SupportModal 
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
      
      {migrationMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-[var(--gold)] text-black px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
        >
          <div className="bg-black/10 p-1 rounded-full">✨</div>
          {migrationMessage}
        </motion.div>
      )}
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 pt-8">
          <AnimatePresence mode="wait">
            {!canAccessApp ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dashboard 
                  onLoginClick={() => setIsAuthModalOpen(true)} 
                  onSupportClick={() => setIsSupportModalOpen(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="app-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeView === 'album' ? (
                  <motion.div
                    key="album"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Navigation 
                      onToggleSortBy={handleSortModeToggle}
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      setSortDirection={setSortDirection}
                      filterMode={filterMode}
                      setFilterMode={setFilterMode}
                      isManualScrolling={isManualScrolling}
                    />
                    <div className="flex relative gap-6 md:gap-10">
                      <SidebarNav 
                        activeGroup={activeNavItem} 
                        setActiveGroup={setActiveNavItem} 
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        isManualScrolling={isManualScrolling}
                        isMobile={isMobile}
                        onSupportClick={() => setIsSupportModalOpen(true)}
                      />
                      <div className="flex-1 min-w-0 pb-10 pt-6">
                        <StickerGrid 
                          stickers={stickers} 
                          onUpdateSticker={updateStickerCount} 
                          sortBy={sortBy}
                          sortDirection={sortDirection}
                          filterMode={filterMode}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : activeView === 'analytics' ? (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-4xl mx-auto"
                  >
                    <ProgressChart 
                      stickers={stickers} 
                      stats={stats} 
                       user={appUser}
                      profile={profile} 
                      cityDuplicates={cityDuplicates} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AboutView user={appUser} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </main>

      {canAccessApp && (
        <MobileNav
          activeView={activeView}
          setActiveView={setActiveView}
        />
      )}

      {activeView !== 'album' && (
        <Footer onSupportClick={() => setIsSupportModalOpen(true)} />
      )}
    </div>
  );
}

export default App;
