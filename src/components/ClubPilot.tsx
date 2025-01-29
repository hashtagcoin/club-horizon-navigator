import { useState } from 'react';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import { UserProfile } from './user-profile';
import { useLocationManagement } from '@/hooks/useLocationManagement';
import { useClubData } from '@/hooks/useClubData';
import { useMapControls } from '@/hooks/useMapControls';
import { useClubFilters } from '@/hooks/useClubFilters';
import { useListState } from '@/hooks/useListState';
import { useClubChat } from '@/hooks/useClubChat';
import { useVenueManagement } from '@/hooks/useVenueManagement';
import { ClubList } from './club/ClubList';
import { MainLayout } from './layout/MainLayout';
import { MapSection } from './map/MapSection';
import { ChatWindow } from './chat/ChatWindow';

const libraries: Libraries = ['places', 'geometry'];

export default function ClubPilot() {
  const [userLocation] = useState({ lat: -33.8688, lng: 151.2093 });

  const locationManagement = useLocationManagement();
  const { data: clubs = [], isLoading: isLoadingClubs, refetch } = useClubData();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC6Z3hNhhdT0Fqy_AXYl07JBRczMiTg8_0",
    libraries
  });

  const mapControls = useMapControls(isLoaded, userLocation);
  const listState = useListState();
  const { chatManager, showUserProfile, setShowUserProfile } = useClubChat(mapControls.selectedClub);
  
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

  const { handleVenueAdded: baseHandleVenueAdded } = useVenueManagement(refetch, selectedDay);

  const handleVenueAdded = async (venue: any) => {
    const newClub = await baseHandleVenueAdded(venue);
    mapControls.handleClubSelect(newClub);
    locationManagement.setMapCenter(newClub.position);
    locationManagement.setMapZoom(16);
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
      <ClubList
        x={listState.x}
        bind={listState.bind}
        isCollapsed={listState.isListCollapsed}
        onToggle={listState.toggleList}
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

      <MapSection
        isListCollapsed={listState.isListCollapsed}
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