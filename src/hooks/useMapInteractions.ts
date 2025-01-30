import { useState, useEffect } from 'react';
import { Club } from '@/types/club';

export const useMapInteractions = (
  isLoaded: boolean,
  clubs: Club[],
  userLocation: google.maps.LatLngLiteral | null
) => {
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded && (clubs.length > 0 || userLocation)) {
      const newBounds = new google.maps.LatLngBounds();
      
      clubs.forEach(club => {
        newBounds.extend(club.position);
      });
      
      if (userLocation) {
        newBounds.extend(userLocation);
      }
      
      const ne = newBounds.getNorthEast();
      const sw = newBounds.getSouthWest();
      
      const latPadding = (ne.lat() - sw.lat()) * 0.1;
      const lngPadding = (ne.lng() - sw.lng()) * 0.1;
      
      newBounds.extend(new google.maps.LatLng(
        ne.lat() + latPadding,
        ne.lng() + lngPadding
      ));
      
      setBounds(newBounds);
    }
  }, [isLoaded, clubs, userLocation]);

  return {
    bounds,
    directionsResult,
    setDirectionsResult
  };
};