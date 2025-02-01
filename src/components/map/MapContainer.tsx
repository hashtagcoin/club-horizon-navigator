import { FC } from 'react';
import { Club, MapState } from '@/types/club';
import { ClubMap } from './ClubMap';
import { darkMapStyles } from '@/utils/mapStyles';

interface MapContainerProps {
  clubs: Club[];
  mapState: MapState;
  userLocation: google.maps.LatLngLiteral;
  onClubSelect: (club: Club) => void;
  onMapStateChange: (state: Partial<MapState>) => void;
}

export const MapContainer: FC<MapContainerProps> = ({
  clubs,
  mapState,
  userLocation,
  onClubSelect,
  onMapStateChange,
}) => {
  return (
    <div className="h-full w-full relative">
      <ClubMap
        clubs={clubs}
        selectedClub={mapState.selectedClub}
        mapCenter={mapState.center}
        mapZoom={mapState.zoom}
        userLocation={userLocation}
        onClubSelect={onClubSelect}
        mapStyles={darkMapStyles}
        isLoaded={true}
        directions={null}
        calculatedBounds={null}
      />
    </div>
  );
};