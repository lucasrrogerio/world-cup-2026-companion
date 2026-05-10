/**
 * Utility to merge two sticker collections.
 * Prioritizes the maximum count for each sticker.
 * 
 * @param {Array} currentStickers - The stickers currently in the UI/Store.
 * @param {Object} migrationData - The stickers from the guest session (migration source).
 * @returns {Array} - The merged stickers array.
 */
export const mergeStickers = (currentStickers, migrationData) => {
  if (!migrationData || Object.keys(migrationData).length === 0) {
    return currentStickers;
  }

  return currentStickers.map(s => {
    const guestData = migrationData[s.id];
    if (!guestData) return s;

    const guestCount = guestData.count || 0;
    const currentCount = s.count || 0;

    // Merge strategy: take the maximum count
    if (guestCount > currentCount) {
      return {
        ...s,
        count: guestCount,
        pastedAt: guestData.pastedAt || s.pastedAt
      };
    }

    return s;
  });
};

/**
 * Saves current stickers to LocalStorage for pending migration.
 */
export const setPendingMigration = (stickers) => {
  const migrationData = stickers.reduce((acc, s) => {
    if (s.count > 0) {
      acc[s.id] = { count: s.count, pastedAt: s.pastedAt };
    }
    return acc;
  }, {});

  if (Object.keys(migrationData).length > 0) {
    localStorage.setItem('wc_migration_pending', JSON.stringify(migrationData));
  }
};

/**
 * Retrieves and clears pending migration data.
 */
export const getAndClearPendingMigration = () => {
  const data = localStorage.getItem('wc_migration_pending');
  if (data) {
    localStorage.removeItem('wc_migration_pending');
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing migration data:', e);
      return null;
    }
  }
  return null;
};
