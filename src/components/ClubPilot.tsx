import { useState } from 'react';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import { UserProfile } from './user-profile';
import { useLocationManagement } from '@/hooks/useLocationManagement';
import { useClubData } from '@/hooks/useClubData';
import { useChatManager } from './chat/ChatManager';
import { useMapControls } from '@/hooks/useMapControls';
import { useClubFilters } from '@/hooks/useClubFilters';
import { MainLayout } from './layout/MainLayout';
import { MapSection } from './map/MapSection';
import { ChatWindow } from './chat/ChatWindow';
import { useToast } from "@/hooks/use-toast";
import { ClubList } from './club/ClubList';

const libraries: Libraries = ['places', 'geometry'];

export default function ClubPilot() {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: -33.8688, lng: 151.2093 });
  const { toast } = useToast();

  const locationManagement = useLocationManagement();
  const { data: clubs = [], isLoading: isLoadingClubs, refetch } = useClubData();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC6Z3hNhhdT0Fqy_AXYl07JBRczMiTg8_0",
    libraries
  });

  const mapControls = useMapControls(isLoaded, userLocation);

  const {
    sortBy,
    setSortBy,
    filterGenre,
    setFilterGenre,
    searchQuery,
    setSearchQuery,
    showHighTraffic,
    setShowHighTraffic,
    sortByOpenLate,
    setSortByOpenLate,
    showSpecials,
    setShowSpecials,
    selectedDay,
    setSelectedDay,
    filterAndSortClubs
  } = useClubFilters();

  const chatManager = useChatManager(mapControls.selectedClub);

  const handleVenueAdded = async (venue: any) => {
    await refetch();
    
    const newClub = {
      id: venue.id,
      name: venue.name,
      address: venue.address,
      position: {
        lat: venue.latitude,
        lng: venue.longitude
      },
      traffic: "Low" as const,
      openingHours: {
        Monday: `${venue.monday_hours_open || 'Closed'} - ${venue.monday_hours_close || 'Closed'}`,
        Tuesday: `${venue.tuesday_hours_open || 'Closed'} - ${venue.tuesday_hours_close || 'Closed'}`,
        Wednesday: `${venue.wednesday_hours_open || 'Closed'} - ${venue.wednesday_hours_close || 'Closed'}`,
        Thursday: `${venue.thursday_hours_open || 'Closed'} - ${venue.thursday_hours_close || 'Closed'}`,
        Friday: `${venue.friday_hours_open || 'Closed'} - ${venue.friday_hours_close || 'Closed'}`,
        Saturday: `${venue.saturday_hours_open || 'Closed'} - ${venue.saturday_hours_close || 'Closed'}`,
        Sunday: `${venue.sunday_hours_open || 'Closed'} - ${venue.sunday_hours_close || 'Closed'}`
      },
      genre: venue[`${selectedDay.toLowerCase()}_genre`] || 'Various',
      usersAtClub: 0,
      hasSpecial: false,
      isUserAdded: true
    };

    mapControls.handleClubSelect(newClub);
    locationManagement.setMapCenter(newClub.position);
    locationManagement.setMapZoom(16);

    toast({
      title: "New Venue Added",
      description: `${venue.name} has been added to the map`
    });
  };

  if (showUserProfile) {
    return <UserProfile onClose={() => setShowUserProfile(false)} />;
  }

  const filteredClubs = filterAndSortClubs(clubs, userLocation);

  return (
    <MainLayout
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      showHighTraffic={showHighTraffic}
      setShowHighTraffic={setShowHighTraffic}
      sortByOpenLate={sortByOpenLate}
      setSortByOpenLate={setSortByOpenLate}
      showSpecials={showSpecials}
      setShowSpecials={setShowSpecials}
      chatOpen={chatManager.chatOpen}
      isGeneralChat={chatManager.isGeneralChat}
      toggleGeneralChat={chatManager.toggleGeneralChat}
      onVenueAdded={handleVenueAdded}
    >
      <div className="w-1/2 h-full bg-white shadow-xl">
        <ClubList
          clubs={filteredClubs}
          selectedClub={mapControls.selectedClub}
          selectedDay={selectedDay}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectClub={(club) => {
            mapControls.handleClubSelect(club);
            locationManagement.setMapCenter(club.position);
            locationManagement.setMapZoom(16);
          }}
          onOpenChat={chatManager.openChat}
          newMessageCounts={chatManager.newMessageCounts}
          isLoading={isLoadingClubs}
        />
      </div>

      <MapSection
        isListCollapsed={false}
        isLoaded={isLoaded}
        filteredClubs={filteredClubs}
        selectedClub={mapControls.selectedClub}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        mapCenter={locationManagement.mapCenter}
        mapZoom={locationManagement.mapZoom}
        userLocation={userLocation}
        directions={mapControls.directions}
        onClubSelect={(club) => {
          mapControls.handleClubSelect(club);
          locationManagement.setMapCenter(club.position);
          locationManagement.setMapZoom(16);
        }}
        locationManagement={locationManagement}
      />

      {chatManager.chatOpen && (
        <ChatWindow
          isGeneralChat={chatManager.isGeneralChat}
          chatClub={chatManager.activeClubChat}
          chatMessage={chatManager.chatMessage}
          setChatMessage={chatManager.setChatMessage}
          allMessages={chatManager.allMessages}
          onClose={() => chatManager.setChatOpen(false)}
          onSend={chatManager.sendMessage}
          clubs={clubs}
          messageOpacities={{}}
          chatScrollRef={null}
        />
      )}

      {clubs.map((club) => 
        chatManager.clubChats[club.id] && (
          <ChatWindow
            key={club.id}
            isGeneralChat={false}
            chatClub={club}
            chatMessage={chatManager.chatMessage}
            setChatMessage={chatManager.setChatMessage}
            allMessages={chatManager.getClubMessages(club.id)}
            onClose={() => chatManager.closeChat(club)}
            onSend={() => chatManager.sendMessage(club.id)}
            clubs={clubs}
            messageOpacities={{}}
            chatScrollRef={null}
          />
        )
      )}
    </MainLayout>
  );
}