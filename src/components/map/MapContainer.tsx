import { FC, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Club, Position, MapState } from '@/types/club';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import { mapStyles } from '@/styles/theme';

interface MapContainerProps {
  clubs: Club[];
  mapState: MapState;
  userLocation: Position | null;
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
  const { bounds } = useMapInteractions(clubs, userLocation);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds]);

  return (
    <div className="h-full w-full relative">
      <GoogleMap
        mapContainerClassName="h-full w-full"
        center={mapState.center}
        zoom={mapState.zoom}
        onLoad={handleMapLoad}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {clubs.map((club) => (
          <Marker
            key={club.id}
            position={club.position}
            onClick={() => onClubSelect(club)}
            icon={mapState.selectedClub?.id === club.id ? {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#FFD700',
              fillOpacity: 1,
              strokeColor: '#000000',
              strokeWeight: 2,
            } : undefined}
          />
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};