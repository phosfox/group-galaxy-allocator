import { Player, Group, Role } from '@/types';

export const createOptimalGroups = (players: Player[]): { groups: Group[], unassigned: Player[] } => {
  // Create a copy of players array to avoid modifying the original
  const playersCopy = [...players];
  
  // Sort players by role for easier access
  const tanks = playersCopy.filter(player => player.role === 'Tank');
  const healers = playersCopy.filter(player => player.role === 'Healer');
  const dpsPlayers = playersCopy.filter(player => player.role === 'DPS');
  
  const groups: Group[] = [];
  
  // Create as many full groups as possible
  while (tanks.length > 0 && healers.length > 0 && dpsPlayers.length >= 3) {
    const tank = tanks.shift()!;
    const healer = healers.shift()!;
    const groupDps = dpsPlayers.splice(0, 3);
    
    groups.push({
      id: `group-${groups.length + 1}`,
      tank,
      healer,
      dps: groupDps
    });
  }
  
  // Remaining unassigned players
  const unassigned: Player[] = [
    ...tanks,
    ...healers,
    ...dpsPlayers
  ];
  
  return { groups, unassigned };
};

export const getRoleColor = (role: Role): string => {
  switch (role) {
    case 'Tank':
      return 'tank';
    case 'Healer':
      return 'healer';
    case 'DPS':
      return 'dps';
    default:
      return 'primary';
  }
};

export const countByRole = (players: Player[]): Record<Role, number> => {
  return {
    'Tank': players.filter(p => p.role === 'Tank').length,
    'Healer': players.filter(p => p.role === 'Healer').length,
    'DPS': players.filter(p => p.role === 'DPS').length
  };
};

// Shuffle groups by randomly redistributing players while maintaining role requirements
export const shuffleGroups = (groups: Group[]): Group[] => {
  if (groups.length <= 1) {
    return [...groups]; // No need to shuffle with 0 or 1 group
  }
  
  // Extract all players from groups
  const tanks: Player[] = groups.map(g => g.tank!).filter(Boolean);
  const healers: Player[] = groups.map(g => g.healer!).filter(Boolean);
  const allDps: Player[] = groups.flatMap(g => g.dps);
  
  // Shuffle players of each role independently
  const shuffledTanks = [...tanks].sort(() => Math.random() - 0.5);
  const shuffledHealers = [...healers].sort(() => Math.random() - 0.5);
  const shuffledDps = [...allDps].sort(() => Math.random() - 0.5);
  
  // Create new groups with shuffled players
  const shuffledGroups = groups.map((group, index) => {
    const dpsForGroup = shuffledDps.slice(index * 3, (index + 1) * 3);
    
    return {
      ...group,
      tank: shuffledTanks[index] || null,
      healer: shuffledHealers[index] || null,
      dps: dpsForGroup
    };
  });
  
  return shuffledGroups;
};
