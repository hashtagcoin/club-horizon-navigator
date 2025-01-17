import { Club } from '@/types/club';
import { MapView } from './MapView';

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
  selectedDay,
  setSelectedDay,
  mapCenter,
  mapZoom,
  userLocation,
  directions,
  onClubSelect,
  locationManagement,
}: MapSectionProps) => {
  return (
    <div 
      className={`fixed-viewport transition-all duration-300 ease-in-out h-[75vh] overflow-hidden ${
        isListCollapsed ? 'w-full ml-0' : 'w-1/2 ml-[50%]'
      }`}
      style={{ 
        position: 'relative',
        touchAction: 'none' // Prevents touch events from causing viewport zoom
      }}
    >
      <MapView
        isLoaded={isLoaded}
        clubs={filteredClubs}
        selectedClub={selectedClub}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        userLocation={userLocation}
        directions={directions}
        onClubSelect={onClubSelect}
        locationManagement={locationManagement}
      />
    </div>
  );
};