import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { INITIAL_STICKERS } from '../data/stickers';
import { supabase } from '../services/supabase';

export function useCollection(user) {
  const [stickers, setStickers] = useState(INITIAL_STICKERS);
  const [cityDuplicates, setCityDuplicates] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const syncQueue = useRef({}); // { sticker_id: { count, pastedAt } }
  const syncTimeout = useRef(null);
  
  // Sync Batch function
  const syncBatch = useCallback(async () => {
    const pending = syncQueue.current;
    if (Object.keys(pending).length === 0 || !user) return;

    setIsSyncing(true);
    const batchData = Object.entries(pending).map(([id, data]) => ({
      user_id: user.id,
      sticker_id: id,
      count: data.count,
      updated_at: data.pastedAt
    }));

    try {
      const { error } = await supabase
        .from('collections')
        .upsert(batchData, { onConflict: 'user_id, sticker_id' });
        
      if (error) {
        console.error('Sync Error:', error);
        throw error;
      }
      
      console.log('Sync Success:', batchData.length, 'stickers updated');
      syncQueue.current = {};
    } catch (err) {
      console.error('Error syncing batch to Supabase:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [user]);

  // Debounced Sync Effect
  useEffect(() => {
    if (!user) return;

    const handleBeforeUnload = (e) => {
      if (Object.keys(syncQueue.current).length > 0) {
        // We can't await here, but we can try to fire and forget
        syncBatch();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user, syncBatch]);

  useEffect(() => {
    // Reset to initial state whenever user changes (login/logout)
    setStickers(INITIAL_STICKERS);
    setCityDuplicates([]);
    syncQueue.current = {};
    if (syncTimeout.current) clearTimeout(syncTimeout.current);

    if (!user) {
      // Fallback to localStorage logic... (preserved)
      const saved = localStorage.getItem('panini_collection');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setStickers(INITIAL_STICKERS.map(s => {
            const savedData = parsed[s.id];
            // Support both old format (number) and new format (object)
            const count = typeof savedData === 'object' ? savedData.count : (savedData || 0);
            const pastedAt = typeof savedData === 'object' ? savedData.pastedAt : (count > 0 ? new Date().toISOString() : null);
            
            return {
              ...s,
              count,
              pastedAt
            };
          }));
        } catch (e) {}
      }
      return;
    }

    const fetchData = async () => {
      // 1. Fetch current user's collection
      const { data: userData } = await supabase
        .from('collections')
        .select('sticker_id, count, updated_at')
        .eq('user_id', user.id);
        
      const parsed = (userData || []).reduce((acc, row) => {
        acc[row.sticker_id] = { count: row.count, pastedAt: row.updated_at };
        return acc;
      }, {});
      
      setStickers(INITIAL_STICKERS.map(s => {
        const data = parsed[s.id] || { count: 0, pastedAt: null };
        const count = data.count;
        const pastedAt = data.pastedAt || (count > 0 ? new Date().toISOString() : null);
        return {
          ...s,
          count,
          pastedAt
        };
      }));

      // 2. Fetch user's city
      const { data: profile } = await supabase
        .from('profiles')
        .select('city')
        .eq('id', user.id)
        .single();

      if (profile?.city) {
        // 3. Fetch IDs of OTHER users in the same city
        const { data: cityUsers } = await supabase
          .from('profiles')
          .select('id')
          .eq('city', profile.city)
          .neq('id', user.id);

        if (cityUsers && cityUsers.length > 0) {
          const userIds = cityUsers.map(u => u.id);
          
          // 4. Fetch duplicates from those users
          const { data: cityData } = await supabase
            .from('collections')
            .select('sticker_id, count')
            .in('user_id', userIds)
            .gt('count', 1);

          // Aggregate by sticker_id
          const aggregated = (cityData || []).reduce((acc, row) => {
            acc[row.sticker_id] = (acc[row.sticker_id] || 0) + (row.count - 1);
            return acc;
          }, {});

          setCityDuplicates(Object.entries(aggregated).map(([id, count]) => ({ id, count })));
        }
      }
    };

    fetchData();
  }, [user]);

  const updateStickerCount = useCallback((id, newCount) => {
    // 1. Update UI state instantly (Optimistic)
    let updatedPastedAt = null;
    
    setStickers(prev => {
      const currentSticker = prev.find(s => s.id === id);
      const wasOwned = currentSticker && currentSticker.count > 0;
      const isOwned = newCount > 0;
      
      if (!wasOwned && isOwned) {
        updatedPastedAt = new Date().toISOString();
      } else if (wasOwned && !isOwned) {
        updatedPastedAt = null;
      } else {
        updatedPastedAt = currentSticker ? currentSticker.pastedAt : null;
      }

      const updated = prev.map(s => s.id === id ? { ...s, count: newCount, pastedAt: updatedPastedAt } : s);
      
      // Always save to localStorage if not logged in (truly local mode)
      if (!user) {
        const saveState = updated.reduce((acc, s) => {
          if (s.count > 0) acc[s.id] = { count: s.count, pastedAt: s.pastedAt };
          return acc;
        }, {});
        localStorage.setItem('panini_collection', JSON.stringify(saveState));
      }
      
      return updated;
    });

    // 2. Queue for server sync (works for both real and anonymous users)
    if (user) {
      syncQueue.current[id] = { count: newCount, pastedAt: updatedPastedAt };
      
      if (syncTimeout.current) clearTimeout(syncTimeout.current);
      syncTimeout.current = setTimeout(() => {
        syncBatch();
      }, 2000); // 2 seconds debounce
    }
  }, [user, syncBatch]);

  const stats = useMemo(() => {
    let totalOwned = 0;
    let totalMissing = 0;
    let totalDuplicates = 0;

    stickers.forEach(s => {
      if (s.count > 0) {
        totalOwned++;
        if (s.count > 1) {
          totalDuplicates += (s.count - 1);
        }
      } else {
        totalMissing++;
      }
    });

    const totalStickers = stickers.length;
    const percentage = (totalOwned / totalStickers) * 100;

    // Calculate incomplete teams/categories
    const incompleteMap = new Map();
    stickers.forEach(s => {
      const category = s.team || s.category;
      if (s.count === 0) {
        incompleteMap.set(category, (incompleteMap.get(category) || 0) + 1);
      }
    });

    const incompleteTeams = Array.from(incompleteMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalStickers,
      totalOwned,
      totalMissing,
      totalDuplicates,
      percentage,
      incompleteTeams
    };
  }, [stickers]);

  return {
    stickers,
    stats,
    cityDuplicates,
    isSyncing,
    isLocalOnly: !user,
    updateStickerCount
  };
}
