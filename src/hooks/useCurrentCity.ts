import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface City {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const useCurrentCity = () => {
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('Clublist_Australia')
        .select('city, latitude, longitude')
        .eq('city', cityName)
        .single();

      if (supabaseError) throw supabaseError;

      if (data) {
        setCurrentCity({
          id: cityName.toLowerCase(),
          name: cityName,
          coordinates: {
            lat: data.latitude,
            lng: data.longitude
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch city');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentCity,
    setCurrentCity,
    isLoading,
    error,
    fetchCity
  };
};