
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group, Player } from '@/types';
import { Shield, Heart, Crosshair, Users } from 'lucide-react';

interface GroupDisplayProps {
  groups: Group[];
  unassigned: Player[];
}

const GroupDisplay = ({ groups, unassigned }: GroupDisplayProps) => {
  if (groups.length === 0 && unassigned.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Group Allocations</h2>
      
      {/* Formed groups */}
      {groups.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="mr-2 h-5 w-5" />
            <span>Formed Groups ({groups.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map(group => (
              <Card key={group.id} className="bg-secondary/50 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Group {group.id.split('-')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Tank */}
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-tank mr-2" />
                      <span className="bg-tank/20 px-3 py-1 rounded-md w-full text-tank-light">
                        {group.tank?.name}
                      </span>
                    </div>
                    
                    {/* Healer */}
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-healer mr-2" />
                      <span className="bg-healer/20 px-3 py-1 rounded-md w-full text-healer-light">
                        {group.healer?.name}
                      </span>
                    </div>
                    
                    {/* DPS */}
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Crosshair className="h-5 w-5 text-dps mr-2" />
                        <span className="text-dps-light">DPS</span>
                      </div>
                      {group.dps.map(dps => (
                        <div key={dps.id} className="ml-7 bg-dps/20 px-3 py-1 rounded-md text-dps-light">
                          {dps.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Unassigned players */}
      {unassigned.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Remaining Players ({unassigned.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unassigned.map(player => (
                <div 
                  key={player.id} 
                  className="flex items-center p-2 rounded-md bg-secondary"
                >
                  {player.role === 'Tank' && <Shield className="h-4 w-4 text-tank mr-2" />}
                  {player.role === 'Healer' && <Heart className="h-4 w-4 text-healer mr-2" />}
                  {player.role === 'DPS' && <Crosshair className="h-4 w-4 text-dps mr-2" />}
                  <span>{player.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({player.role})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupDisplay;
