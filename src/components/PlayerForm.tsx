
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Player, Role } from '@/types';
import { Shield, Heart, Crosshair } from 'lucide-react';

interface PlayerFormProps {
  onAddPlayer: (player: Player) => void;
  players: Player[]; // Added players prop to check for duplicates
}

const PlayerForm = ({ onAddPlayer, players }: PlayerFormProps) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a player name",
        variant: "destructive"
      });
      return;
    }
    
    // Check for duplicate name
    const normalizedName = name.trim().toLowerCase();
    const isDuplicate = players.some(player => player.name.toLowerCase() === normalizedName);
    
    if (isDuplicate) {
      toast({
        title: "Duplicate name",
        description: "A player with this name already exists",
        variant: "destructive"
      });
      return;
    }
    
    if (!role) {
      toast({
        title: "Role required",
        description: "Please select a role",
        variant: "destructive"
      });
      return;
    }
    
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: name.trim(),
      role: role as Role
    };
    
    onAddPlayer(newPlayer);
    
    // Reset form
    setName('');
    setRole('');
    
    toast({
      title: "Player added",
      description: `${name} has been added as ${role}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Add New Player</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Player Name</Label>
            <Input
              id="name"
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as Role)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tank" className="flex items-center">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-tank" />
                    <span>Tank</span>
                  </div>
                </SelectItem>
                <SelectItem value="Healer">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-4 w-4 text-healer" />
                    <span>Healer</span>
                  </div>
                </SelectItem>
                <SelectItem value="DPS">
                  <div className="flex items-center">
                    <Crosshair className="mr-2 h-4 w-4 text-dps" />
                    <span>DPS</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">Add Player</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;
