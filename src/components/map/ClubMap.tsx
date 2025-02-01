import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Club } from '@/types/club';
import { useState, useEffect } from 'react';

export interface ClubMapProps {
  isLoaded: boolean;
  clubs: Club[];
  selectedClub: Club | null;
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number;
  userLocation: google.maps.LatLngLiteral | null;
  directions: google.maps.DirectionsResult | null;
  onClubSelect: (club: Club) => void;
  calculatedBounds: google.maps.LatLngBounds | null;
  mapStyles: google.maps.MapTypeStyle[];
}

export const ClubMap = ({
  isLoaded,
  clubs = [],
  selectedClub,
  mapCenter,
  mapZoom,
  userLocation,
  directions,
  onClubSelect,
  calculatedBounds,
  mapStyles
}: ClubMapProps) => {
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (clubs.length > 0 || userLocation) {
      const newBounds = new google.maps.LatLngBounds();
      
      clubs.forEach(club => {
        newBounds.extend(club.position);
      });
      
      if (userLocation) {
        newBounds.extend(userLocation);
      }
      
      const latPadding = (newBounds.getNorthEast().lat() - newBounds.getSouthWest().lat()) * 0.1;
      const lngPadding = (newBounds.getNorthEast().lng() - newBounds.getSouthWest().lng()) * 0.1;
      
      newBounds.extend({
        lat: newBounds.getNorthEast().lat() + latPadding,
        lng: newBounds.getNorthEast().lng() + lngPadding
      });
      newBounds.extend({
        lat: newBounds.getSouthWest().lat() - latPadding,
        lng: newBounds.getSouthWest().lng() - lngPadding
      });
      
      setBounds(newBounds);
    }
  }, [isLoaded, clubs, userLocation]);

  useEffect(() => {
    if (!isLoaded || !userLocation || !selectedClub) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userLocation,
        destination: selectedClub.position,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResult(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [isLoaded, userLocation, selectedClub]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading map...</div>;
  }

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'greedy',
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles,
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%', touchAction: 'none' }}
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
          icon={club.position.lat === mapCenter.lat && club.position.lng === mapCenter.lng ? {
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
  );
};