import { FC } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Club } from '@/types/club';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import { mapComponentStyles } from '@/styles/theme';

interface MapContainerProps {
  isLoaded: boolean;
  clubs: Club[];
  selectedClub: Club | null;
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number;
  userLocation: google.maps.LatLngLiteral | null;
  onClubSelect: (club: Club) => void;
}

export const MapContainer: FC<MapContainerProps> = ({
  isLoaded,
  clubs,
  selectedClub,
  mapCenter,
  mapZoom,
  userLocation,
  onClubSelect,
}) => {
  const { bounds, directionsResult } = useMapInteractions(isLoaded, clubs, userLocation);

  if (!isLoaded) return <div>Loading map...</div>;

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'greedy',
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "administrative.neighborhood",
        elementType: "labels.text",
        stylers: [{ color: "#ffffff", weight: 0.5 }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
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
    ],
  };

  return (
    <div className={mapComponentStyles.container}>
      <GoogleMap
        mapContainerClassName={mapComponentStyles.mapWrapper}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
        onLoad={map => {
          if (bounds) {
            map.fitBounds(bounds);
          }
        }}
      >
        {clubs?.map((club) => (
          <Marker
            key={club.id}
            position={club.position}
            onClick={() => onClubSelect(club)}
            icon={selectedClub?.id === club.id ? {
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

        {directionsResult && (
          <DirectionsRenderer
            directions={directionsResult}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#4285F4",
                strokeOpacity: 0.8,
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};