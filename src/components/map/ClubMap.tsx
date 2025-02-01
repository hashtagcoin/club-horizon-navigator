import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Club } from '@/types/club';
import { darkMapStyles } from '@/utils/mapStyles';

interface ClubMapProps {
  clubs: Club[];
  selectedClub: Club | null;
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number;
  userLocation: google.maps.LatLngLiteral | null;
  directions: google.maps.DirectionsResult | null;
  onClubSelect: (club: Club) => void;
  calculatedBounds: google.maps.LatLngBounds | null;
  mapStyles?: google.maps.MapTypeStyle[];
  isLoaded: boolean;
}

export const ClubMap = ({
  clubs,
  selectedClub,
  mapCenter,
  mapZoom,
  userLocation,
  directions,
  onClubSelect,
  calculatedBounds,
  mapStyles = darkMapStyles,
  isLoaded
}: ClubMapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && calculatedBounds) {
      map.fitBounds(calculatedBounds);
    }
  }, [calculatedBounds, map]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-600">Loading map...</p>
    </div>;
  }

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  };

  const onUnmount = () => {
    mapRef.current = null;
    setMap(null);
  };

  return (
    <div className="w-full h-full touch-none">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {clubs.map((club) => (
          <Marker
            key={club.id}
            position={club.position}
            onClick={() => onClubSelect(club)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: selectedClub?.id === club.id ? '#000000' : '#FFFFFF',
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#000000',
            }}
          />
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4CAF50',
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#000000',
            }}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};