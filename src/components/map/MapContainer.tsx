import { FC } from 'react';
import { Club, MapState } from '@/types/club';
import { ClubMap } from './ClubMap';

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
  const mapStyles: google.maps.MapTypeStyle[] = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }]
    },
    {
      featureType: "labels.text.fill",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
  ];

  return (
    <div className="h-full w-full relative">
      <ClubMap
        clubs={clubs}
        selectedClub={mapState.selectedClub}
        mapCenter={mapState.center}
        mapZoom={mapState.zoom}
        userLocation={userLocation}
        onClubSelect={onClubSelect}
        mapStyles={mapStyles}
        isLoaded={true}
        directions={null}
        calculatedBounds={null}
      />
    </div>
  );
};