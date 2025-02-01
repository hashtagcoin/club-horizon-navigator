import { FC } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Club, MapState } from '@/types/club';
import { MapContainer } from './MapContainer';

interface MapSectionProps {
  isListCollapsed: boolean;
  clubs: Club[];
  mapState: MapState;
  userLocation: google.maps.LatLngLiteral;
  onClubSelect: (club: Club) => void;
  onMapStateChange: (state: Partial<MapState>) => void;
}

export const MapSection: FC<MapSectionProps> = ({
  isListCollapsed,
  clubs,
  mapState,
  userLocation,
  onClubSelect,
  onMapStateChange,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // This should be in your env variables
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-[75vh]">Loading maps...</div>;
  }

  return (
    <div className={`transition-all duration-300 ease-in-out h-[75vh] ${
      isListCollapsed ? 'w-full ml-0' : 'w-1/2 ml-[50%]'
    }`}>
      <MapContainer
        clubs={clubs}
        mapState={mapState}
        userLocation={userLocation}
        onClubSelect={onClubSelect}
        onMapStateChange={onMapStateChange}
        isLoaded={isLoaded}
      />
    </div>
  );
};