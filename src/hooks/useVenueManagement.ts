import { useToast } from "@/hooks/use-toast";
import { Club } from '@/types/club';

export const useVenueManagement = (refetch: () => Promise<any>, selectedDay: string) => {
  const { toast } = useToast();

  const handleVenueAdded = async (venue: any) => {
    await refetch();
    
    const newClub = {
      id: venue.id,
      name: venue.name,
      address: venue.address,
      position: {
        lat: venue.latitude,
        lng: venue.longitude
      },
      traffic: "Low" as const,
      openingHours: {
        Monday: `${venue.monday_hours_open || 'Closed'} - ${venue.monday_hours_close || 'Closed'}`,
        Tuesday: `${venue.tuesday_hours_open || 'Closed'} - ${venue.tuesday_hours_close || 'Closed'}`,
        Wednesday: `${venue.wednesday_hours_open || 'Closed'} - ${venue.wednesday_hours_close || 'Closed'}`,
        Thursday: `${venue.thursday_hours_open || 'Closed'} - ${venue.thursday_hours_close || 'Closed'}`,
        Friday: `${venue.friday_hours_open || 'Closed'} - ${venue.friday_hours_close || 'Closed'}`,
        Saturday: `${venue.saturday_hours_open || 'Closed'} - ${venue.saturday_hours_close || 'Closed'}`,
        Sunday: `${venue.sunday_hours_open || 'Closed'} - ${venue.sunday_hours_close || 'Closed'}`
      },
      genre: venue[`${selectedDay.toLowerCase()}_genre`] || 'Various',
      usersAtClub: 0,
      hasSpecial: false,
      isUserAdded: true
    };

    toast({
      title: "New Venue Added",
      description: `${venue.name} has been added to the map`
    });

    return newClub;
  };

  return { handleVenueAdded };
};