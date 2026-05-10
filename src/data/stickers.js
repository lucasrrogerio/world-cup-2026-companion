export const TEAMS_DATA = [
  { group: 'A', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  { group: 'B', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  { group: 'C', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  { group: 'D', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  { group: 'E', teams: ['GER', 'CUW', 'CIV', 'ECU'] },
  { group: 'F', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  { group: 'G', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  { group: 'H', teams: ['ESP', 'CPV', 'KSA', 'URU'] },
  { group: 'I', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  { group: 'J', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { group: 'K', teams: ['POR', 'COD', 'UZB', 'COL'] },
  { group: 'L', teams: ['ENG', 'CRO', 'GHA', 'PAN'] }
];

export const generateStickers = () => {
  const stickers = [];

  // FWC (00 to 19)
  for (let i = 0; i <= 19; i++) {
    const num = i === 0 ? '00' : i.toString();
    stickers.push({
      id: `FWC ${num}`,
      category: 'FWC',
      number: num,
      count: 0
    });
  }

  // Teams (1 to 20 per team)
  TEAMS_DATA.forEach(group => {
    group.teams.forEach(team => {
      for (let i = 1; i <= 20; i++) {
        stickers.push({
          id: `${team} ${i}`,
          category: 'Team',
          team: team,
          group: group.group,
          number: i.toString(),
          count: 0
        });
      }
    });
  });

  // Coca-Cola (CC1 to CC14)
  for (let i = 1; i <= 14; i++) {
    stickers.push({
      id: `CC${i}`,
      category: 'Coca-Cola',
      number: `CC${i}`,
      count: 0
    });
  }

  return stickers;
};

export const INITIAL_STICKERS = generateStickers();
