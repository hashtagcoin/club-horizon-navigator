import { Club } from '@/types/club';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Clock, MessageCircle, User, Smile, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ClubCardProps {
  club: Club;
  selectedDay: string;
  isSelected: boolean;
  onSelect: (club: Club) => void;
  onOpenChat: (club: Club) => void;
  newMessageCount: number;
}

export const ClubCard = ({
  club,
  selectedDay,
  isSelected,
  onSelect,
  onOpenChat,
  newMessageCount
}: ClubCardProps) => {
  // Function to format type string
  const formatType = (type: string) => {
    return type
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card
      className={`cursor-pointer relative bg-white ${isSelected ? 'selected-club-card' : ''}`}
      onClick={() => onSelect(club)}
    >
      <CardHeader className="flex justify-between items-start p-2">
        <CardTitle className="text-left text-base text-black">{club.name}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-0.5" aria-label={`${club.traffic} Traffic`}>
            <User className={`h-4 w-4 ${club.traffic === 'High' || club.traffic === 'Medium' || club.traffic === 'Low' ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            <User className={`h-4 w-4 ${club.traffic === 'High' || club.traffic === 'Medium' ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
            <User className={`h-4 w-4 ${club.traffic === 'High' ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </div>
          {club.hasSpecial && (
            <Smile className="h-4 w-4 text-yellow-500" />
          )}
          {club.isUserAdded && (
            <Plus className="h-4 w-4 text-blue-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Music className="h-3 w-3 text-black" />
            <span className="text-xs text-black">{formatType(club.genre)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <Clock className="h-3 w-3 text-black" />
          <span className="text-xs text-black">{club.openingHours[selectedDay]}</span>
        </div>
        <div className="absolute bottom-1 right-2 flex flex-col items-end space-y-1">
          <span className="text-xs font-medium text-black">{club.usersAtClub}</span>
          <Button
            size="sm"
            variant="outline"
            className="relative h-6 w-6 p-0"
            onClick={(e) => { e.stopPropagation(); onOpenChat(club); }}
          >
            <MessageCircle className="h-3 w-3" />
            {newMessageCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.6rem] rounded-full w-3 h-3 flex items-center justify-center">
                {newMessageCount}
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};