import { useState } from 'react';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import { UserProfile } from './user-profile';
import { useLocationManagement } from '@/hooks/useLocationManagement';
import { useClubData } from '@/hooks/useClubData';
import { useClubFilters } from '@/hooks/useClubFilters';
import { useListState } from '@/hooks/useListState';
import { useClubChat } from '@/hooks/useClubChat';
import { useVenueManagement } from '@/hooks/useVenueManagement';
import { ClubList } from './club/ClubList';
import { MainLayout } from './layout/MainLayout';
import { MapContainer } from './map/MapContainer';
import { ChatInterface } from './chat/ChatInterface';
import { MapState, Club } from '@/types/club';

const libraries: Libraries = ['places', 'geometry'];

export default function ClubPilot() {
  const [userLocation] = useState({ lat: -33.8688, lng: 151.2093 });
  const [mapState, setMapState] = useState<MapState>({
    center: userLocation,
    zoom: 14,
    selectedClub: null
  });

  const locationManagement = useLocationManagement();
  const { data: clubs = [], isLoading: isLoadingClubs, refetch } = useClubData();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC6Z3hNhhdT0Fqy_AXYl07JBRczMiTg8_0",
    libraries
  });

  const listState = useListState();
  const { chatManager, showUserProfile, setShowUserProfile } = useClubChat(mapState.selectedClub);
  
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

  const { handleVenueAdded } = useVenueManagement(refetch, selectedDay);

  const handleClubSelect = (club: Club) => {
    setMapState(prev => ({
      ...prev,
      selectedClub: club,
      center: club.position,
      zoom: 16
    }));
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
        selectedClub={mapState.selectedClub}
        selectedDay={selectedDay}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterGenre={filterGenre}
        setFilterGenre={setFilterGenre}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectClub={handleClubSelect}
        onOpenChat={chatManager.openChat}
        newMessageCounts={chatManager.newMessageCounts}
        isLoading={isLoadingClubs}
      />

      <div className={`transition-all duration-300 ease-in-out h-[75vh] ${
        listState.isListCollapsed ? 'w-full ml-0' : 'w-1/2 ml-[50%]'
      }`}>
        <MapContainer
          clubs={filteredClubs}
          mapState={mapState}
          userLocation={userLocation}
          onClubSelect={handleClubSelect}
          onMapStateChange={(changes) => setMapState(prev => ({ ...prev, ...changes }))}
          isLoaded={isLoaded}
        />
      </div>

      {chatManager.chatOpen && (
        <ChatInterface
          club={chatManager.activeClubChat}
          messages={chatManager.allMessages}
          inputMessage={chatManager.chatMessage}
          onMessageChange={chatManager.setChatMessage}
          onSendMessage={() => chatManager.sendMessage(chatManager.activeClubChat?.id)}
          onClose={() => chatManager.setChatOpen(false)}
        />
      )}
    </MainLayout>
  );
}