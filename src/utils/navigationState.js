export function buildGroupItems(teamsData) {
  return ['FWC', ...teamsData.map(g => g.group), 'CC'];
}

export function buildAlphaItems(teamsData, sortDirection = 'asc') {
  return ['FWC', 'Coca-Cola', ...teamsData.flatMap(group => group.teams)].sort((a, b) => {
    const cmp = a.localeCompare(b);
    return sortDirection === 'asc' ? cmp : -cmp;
  });
}

export function getValidItemForMode(mode, candidate, groupItems, alphaItems) {
  const items = mode === 'group' ? groupItems : alphaItems;
  if (items.length === 0) return null;
  if (candidate && items.includes(candidate)) return candidate;
  if (mode === 'group') return items.includes('FWC') ? 'FWC' : items[0];
  return items[0];
}
