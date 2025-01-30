import { Club } from '@/types/club';
import { MapContainer } from './MapContainer';

interface MapSectionProps {
  isListCollapsed: boolean;
  isLoaded: boolean;
  filteredClubs: Club[];
  selectedClub: Club | null;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number;
  userLocation: google.maps.LatLngLiteral;
  directions: google.maps.DirectionsResult | null;
  onClubSelect: (club: Club) => void;
  locationManagement: any;
}

export const MapSection = ({
  isListCollapsed,
  isLoaded,
  filteredClubs,
  selectedClub,
  mapCenter,
  mapZoom,
  userLocation,
  onClubSelect,
}: MapSectionProps) => {
  return (
    <div 
      className={`transition-all duration-300 ease-in-out h-[75vh] ${
        isListCollapsed ? 'w-full ml-0' : 'w-1/2 ml-[50%]'
      }`}
    >
      <MapContainer
        isLoaded={isLoaded}
        clubs={filteredClubs}
        selectedClub={selectedClub}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        userLocation={userLocation}
        onClubSelect={onClubSelect}
      />
    </div>
  );
};