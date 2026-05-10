/**
 * Aggregates sticker pasting progress by date.
 * @param {Array} stickers - Array of sticker objects with pastedAt field.
 * @param {string} mode - 'daily' or 'weekly'
 * @returns {Array} - Array of data points for Recharts: [{ date: string, total: number }]
 */
export const aggregateProgress = (stickers, mode = 'daily') => {
  const pastedStickers = stickers
    .filter(s => s.count > 0 && s.pastedAt)
    .sort((a, b) => new Date(a.pastedAt) - new Date(b.pastedAt));

  if (pastedStickers.length === 0) return [];

  const countsByDate = {};

  pastedStickers.forEach(s => {
    const date = new Date(s.pastedAt);
    let key;

    if (mode === 'weekly') {
      // Get the Monday of the week
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      key = monday.toISOString().split('T')[0];
    } else {
      key = date.toISOString().split('T')[0];
    }

    countsByDate[key] = (countsByDate[key] || 0) + 1;
  });

  const sortedKeys = Object.keys(countsByDate).sort();
  let cumulativeTotal = 0;
  
  return sortedKeys.map(date => {
    cumulativeTotal += countsByDate[date];
    return {
      date,
      total: cumulativeTotal
    };
  });
};
