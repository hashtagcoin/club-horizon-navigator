import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Globe, Loader2 } from 'lucide-react'
import { locations } from '@/data/locations'
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useCurrentCity } from '@/hooks/useCurrentCity'

interface LocationControlsProps {
  currentCountry: string
  currentState: string
  currentSuburb: string
  onCountryChange: (value: string) => void
  onStateChange: (value: string) => void
  onSuburbChange: (value: string) => void
}

const DEFAULT_LOCATION = {
  country: "Australia",
  state: "New South Wales",
  suburb: "Sydney"
};

export function LocationControls({
  currentCountry,
  currentState,
  currentSuburb,
  onCountryChange,
  onStateChange,
  onSuburbChange
}: LocationControlsProps) {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showGlobalLocationModal, setShowGlobalLocationModal] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [suburbs, setSuburbs] = useState<string[]>([])
  const [locationError, setLocationError] = useState<string | null>(null)
  const { fetchCity, isLoading: isFetchingCity } = useCurrentCity()

  useEffect(() => {
    fetchSuburbs()
  }, [])

  const setDefaultLocation = async () => {
    onCountryChange(DEFAULT_LOCATION.country)
    onStateChange(DEFAULT_LOCATION.state)
    onSuburbChange(DEFAULT_LOCATION.suburb)
    await fetchCity(DEFAULT_LOCATION.suburb)
    toast.success(`Location set to ${DEFAULT_LOCATION.suburb}`)
  }

  const fetchSuburbs = async () => {
    try {
      const { data, error } = await supabase
        .from('Clublist_Australia')
        .select('city')
        .not('city', 'is', null)
      
      if (error) {
        console.error('Error fetching suburbs:', error)
        toast.error("Failed to load suburbs")
        return
      }

      const uniqueSuburbs = Array.from(new Set(data.map(item => item.city).filter(Boolean)))
      setSuburbs(uniqueSuburbs)
      
      if (!currentSuburb && uniqueSuburbs.length > 0) {
        onSuburbChange(uniqueSuburbs[0])
      }
    } catch (error) {
      console.error('Error fetching suburbs:', error)
      toast.error("Failed to load suburbs")
      await setDefaultLocation()
    }
  }

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser")
      setIsLoadingLocation(false)
      await setDefaultLocation()
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true
        })
      })

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyC6Z3hNhhdT0Fqy_AXYl07JBRczMiTg8_0`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch location details')
      }
      
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components
        let suburb = '', state = '', country = ''
        
        for (const component of addressComponents) {
          if (component.types.includes('locality') || component.types.includes('sublocality')) {
            suburb = component.long_name
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name
          } else if (component.types.includes('country')) {
            country = component.long_name
          }
        }

        if (suburb && state && country) {
          onCountryChange(country)
          onStateChange(state)
          onSuburbChange(suburb)
          await fetchCity(suburb)
          toast.success(`Location updated to ${suburb}`)
          setShowLocationModal(false)
        } else {
          throw new Error("Couldn't determine your exact location")
        }
      } else {
        throw new Error("No location data found")
      }
    } catch (error) {
      console.error('Error getting location:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error accessing your location'
      setLocationError(errorMessage)
      toast.error(errorMessage)
      await setDefaultLocation()
    } finally {
      setIsLoadingLocation(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="space-y-2">
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white bg-black cursor-pointer rounded-lg px-3 py-1 shadow-sm inline-block hover:bg-black/90 transition-colors border-4 border-white">
              {isLoadingLocation ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Locating...
                </div>
              ) : locationError ? (
                <div className="flex items-center gap-2 text-red-500">
                  Error loading location
                </div>
              ) : (
                currentSuburb
              )}
            </h2>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Suburb</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select 
              value={currentSuburb} 
              onValueChange={(value) => {
                onSuburbChange(value)
                fetchCity(value)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select suburb" />
              </SelectTrigger>
              <SelectContent>
                {suburbs.map((suburb) => (
                  <SelectItem key={suburb} value={suburb}>{suburb}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={() => setShowLocationModal(false)}>Close</Button>
            <div className="flex gap-2">
              <Button 
                onClick={getCurrentLocation} 
                variant="outline"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update Location
              </Button>
              <Button onClick={() => setShowGlobalLocationModal(true)} variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Change Location
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showGlobalLocationModal} onOpenChange={setShowGlobalLocationModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={currentCountry} onValueChange={onCountryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(locations).map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={currentState} onValueChange={onStateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {locations[currentCountry] && Object.keys(locations[currentCountry]).map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={currentSuburb} 
              onValueChange={(value) => {
                onSuburbChange(value)
                fetchCity(value)
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select suburb" />
              </SelectTrigger>
              <SelectContent>
                {suburbs.map((suburb) => (
                  <SelectItem key={suburb} value={suburb}>{suburb}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowGlobalLocationModal(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}