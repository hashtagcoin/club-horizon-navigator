import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Globe, Loader2 } from 'lucide-react'
import { locations } from '@/data/locations'
import { useState } from 'react'
import { useLocationSelection } from '@/hooks/useLocationSelection'

interface LocationControlsProps {
  currentCountry: string
  currentState: string
  currentSuburb: string
  onCountryChange: (value: string) => void
  onStateChange: (value: string) => void
  onSuburbChange: (value: string) => void
}

export function LocationControls({
  currentCountry,
  currentState,
  currentSuburb,
  onCountryChange,
  onStateChange,
  onSuburbChange
}: LocationControlsProps) {
  const [showGlobalLocationModal, setShowGlobalLocationModal] = useState(false);
  
  const {
    isLoadingLocation,
    suburbs,
    showLocationModal,
    setShowLocationModal,
    getCurrentLocation,
  } = useLocationSelection(
    currentCountry,
    currentState,
    currentSuburb,
    onCountryChange,
    onStateChange,
    onSuburbChange
  );

  const LocationSelector = () => (
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
      <Select value={currentSuburb} onValueChange={onSuburbChange}>
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
  );

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
              ) : (
                currentSuburb
              )}
            </h2>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {showGlobalLocationModal ? "Change Location" : "Select Suburb"}
            </DialogTitle>
          </DialogHeader>
          {showGlobalLocationModal ? (
            <LocationSelector />
          ) : (
            <Select value={currentSuburb} onValueChange={onSuburbChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select suburb" />
              </SelectTrigger>
              <SelectContent>
                {suburbs.map((suburb) => (
                  <SelectItem key={suburb} value={suburb}>{suburb}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex justify-between items-center">
            <Button onClick={() => {
              if (showGlobalLocationModal) {
                setShowGlobalLocationModal(false);
              } else {
                setShowLocationModal(false);
              }
            }}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button 
                onClick={getCurrentLocation} 
                variant="outline"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Update Location
              </Button>
              <Button 
                onClick={() => setShowGlobalLocationModal(!showGlobalLocationModal)} 
                variant="outline"
              >
                <Globe className="h-4 w-4 mr-2" />
                {showGlobalLocationModal ? "Back" : "Change Location"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}