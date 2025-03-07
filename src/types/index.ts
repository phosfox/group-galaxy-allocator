
export type Role = 'Tank' | 'Healer' | 'DPS';

export interface Player {
  id: string;
  name: string;
  role: Role;
}

export interface Group {
  id: string;
  tank: Player | null;
  healer: Player | null;
  dps: Player[];
}
