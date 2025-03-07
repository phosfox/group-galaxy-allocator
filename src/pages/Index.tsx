
import { useState, useEffect } from 'react';
import { Player } from '@/types';
import PlayerForm from '@/components/PlayerForm';
import PlayerList from '@/components/PlayerList';
import GroupDisplay from '@/components/GroupDisplay';
import { createOptimalGroups } from '@/utils/groupUtils';
import { useToast } from '@/hooks/use-toast';
import { Shield, Heart, Crosshair, Users } from 'lucide-react';

const Index = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { toast } = useToast();
  const { groups, unassigned } = createOptimalGroups(players);
  
  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };
  
  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
    toast({
      title: "Player removed",
      description: "The player has been removed from the list",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Group Galaxy Allocator
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Organize your team into optimal groups
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <PlayerForm onAddPlayer={addPlayer} />
            
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <h3 className="font-medium mb-2">Team Composition</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-tank mr-2" />
                  <span>1 Tank</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-healer mr-2" />
                  <span>1 Healer</span>
                </div>
                <div className="flex items-center">
                  <Crosshair className="h-5 w-5 text-dps mr-2" />
                  <span>3 DPS</span>
                </div>
                <div className="flex items-center mt-1 pt-1 border-t border-border">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>5 Players per group</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <PlayerList players={players} onRemovePlayer={removePlayer} />
            
            <GroupDisplay groups={groups} unassigned={unassigned} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
