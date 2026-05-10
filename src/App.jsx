import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useCollection } from './hooks/useCollection';
import { supabase, signOut, getProfile, updateProfile } from './services/supabase';

function App() {
  const [user, setUser] = useState(null);
  const [activeGroup, setActiveGroup] = useState('A');
  const [activeView, setActiveView] = useState('album');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState(null);
  const [sortBy, setSortBy] = useState('group'); // 'group' or 'alpha'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const isManualScrolling = useRef(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'missing', 'duplicates'

  const { stickers, stats, cityDuplicates, isSyncing, updateStickerCount, mergeCollection } = useCollection(user);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // ScrollSpy: Update activeGroup as user scrolls
  useEffect(() => {
    if (sortBy !== 'group' || activeView !== 'album' || !user) return;

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
          setActiveGroup(group);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [sortBy, activeView, user]);

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
        checkProfile(currentUser.id, currentUser);
        if (activeView === 'dashboard') setActiveView('album');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        checkProfile(currentUser.id, currentUser);
        setActiveView('album');
      } else {
        setProfile(null);
        setShowOnboarding(false);
      }
    });

    const handleMigrationComplete = () => {
      setMigrationMessage("Seu progresso de visitante foi migrado com sucesso!");
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      <Header 
        user={user} 
        onLogout={signOut} 
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
        user={user}
        stickers={stickers}
        onAuthSuccess={() => {
          setActiveView('album');
        }}
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
      
      <main className={`flex-1 ${isMobile ? 'pb-20' : ''}`}>
        <div className="container mx-auto px-4 pt-8">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dashboard onLoginClick={() => setIsAuthModalOpen(true)} />
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
                      activeGroup={activeGroup} 
                      setActiveGroup={setActiveGroup} 
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      sortDirection={sortDirection}
                      setSortDirection={setSortDirection}
                      filterMode={filterMode}
                      setFilterMode={setFilterMode}
                      isManualScrolling={isManualScrolling}
                    />
                    <div className="flex relative gap-6 md:gap-10">
                      <SidebarNav 
                        activeGroup={activeGroup} 
                        setActiveGroup={setActiveGroup} 
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        isManualScrolling={isManualScrolling}
                        isMobile={isMobile}
                      />
                      <div className="flex-1 min-w-0 pb-10 pt-6">
                        <StickerGrid 
                          stickers={stickers} 
                          activeGroup={activeGroup} 
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
                      user={user}
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
                    <AboutView user={user} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {user && isMobile && (
            <MobileNav activeView={activeView} setActiveView={setActiveView} />
          )}
        </div>
      </main>

      {activeView !== 'album' && <Footer />}
    </div>
  );
}

export default App;
