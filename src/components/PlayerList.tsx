
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player, Role } from '@/types';
import { Shield, Heart, Crosshair, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { countByRole } from '@/utils/groupUtils';

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
}

const PlayerList = ({ players, onRemovePlayer }: PlayerListProps) => {
  const roleCounts = countByRole(players);
  
  const RoleIcon = ({ role }: { role: Role }) => {
    switch (role) {
      case 'Tank':
        return <Shield className="h-4 w-4 text-tank" />;
      case 'Healer':
        return <Heart className="h-4 w-4 text-healer" />;
      case 'DPS':
        return <Crosshair className="h-4 w-4 text-dps" />;
    }
  };
  
  const playersByRole: Record<Role, Player[]> = {
    'Tank': players.filter(p => p.role === 'Tank'),
    'Healer': players.filter(p => p.role === 'Healer'),
    'DPS': players.filter(p => p.role === 'DPS')
  };

  if (players.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Player List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">No players added yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xl">
          <span>Player List ({players.length})</span>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-tank/10 text-tank-light">
              <Shield className="mr-1 h-3 w-3" /> {roleCounts.Tank}
            </Badge>
            <Badge variant="outline" className="bg-healer/10 text-healer-light">
              <Heart className="mr-1 h-3 w-3" /> {roleCounts.Healer}
            </Badge>
            <Badge variant="outline" className="bg-dps/10 text-dps-light">
              <Crosshair className="mr-1 h-3 w-3" /> {roleCounts.DPS}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(playersByRole).map(([role, rolePlayers]) => (
          rolePlayers.length > 0 && (
            <div key={role} className="space-y-1">
              <h3 className="font-medium flex items-center text-sm mb-1">
                <RoleIcon role={role as Role} />
                <span className="ml-2">{role}s ({rolePlayers.length})</span>
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {rolePlayers.map(player => (
                  <div 
                    key={player.id} 
                    className="flex items-center justify-between py-1 px-2 rounded-md bg-secondary"
                  >
                    <span className="truncate">{player.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemovePlayer(player.id)}
                      className="h-6 w-6 ml-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </CardContent>
    </Card>
  );
};

export default PlayerList;
