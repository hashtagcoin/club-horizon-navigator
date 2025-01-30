import { FC } from 'react';
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
      />
    </div>
  );
};