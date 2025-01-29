import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { locations } from '@/data/locations';

export const useLocationSelection = (
  initialCountry: string,
  initialState: string,
  initialSuburb: string,
  onCountryChange: (value: string) => void,
  onStateChange: (value: string) => void,
  onSuburbChange: (value: string) => void,
) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const setDefaultLocation = () => {
    onCountryChange('Australia');
    onStateChange('New South Wales');
    onSuburbChange('Sydney');
    toast.info("Using Sydney as default location");
  };

  const fetchSuburbs = async () => {
    try {
      const { data, error } = await supabase
        .from('Clublist_Australia')
        .select('city')
        .not('city', 'is', null);
      
      if (error) {
        console.error('Error fetching suburbs:', error);
        return;
      }

      const uniqueSuburbs = Array.from(new Set(data.map(item => item.city).filter(Boolean)));
      setSuburbs(uniqueSuburbs);
      
      if (!initialSuburb) {
        const defaultSuburb = uniqueSuburbs.includes('Sydney') ? 'Sydney' : uniqueSuburbs[0];
        onSuburbChange(defaultSuburb);
      }
    } catch (error) {
      console.error('Error processing suburbs:', error);
      onSuburbChange('Sydney');
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      setDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC6Z3hNhhdT0Fqy_AXYl07JBRczMiTg8_0`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            let suburb = '', state = '', country = '';
            
            for (const component of addressComponents) {
              if (component.types.includes('locality') || component.types.includes('sublocality')) {
                suburb = component.long_name;
              } else if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              } else if (component.types.includes('country')) {
                country = component.long_name;
              }
            }

            if (suburb && state && country) {
              onCountryChange(country);
              onStateChange(state);
              onSuburbChange(suburb);
              toast.success(`Location updated to ${suburb}`);
            } else {
              setDefaultLocation();
            }
          } else {
            setDefaultLocation();
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
          setDefaultLocation();
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setDefaultLocation();
        setIsLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchSuburbs();
  }, []);

  return {
    isLoadingLocation,
    suburbs,
    showLocationModal,
    setShowLocationModal,
    getCurrentLocation,
    setDefaultLocation
  };
};