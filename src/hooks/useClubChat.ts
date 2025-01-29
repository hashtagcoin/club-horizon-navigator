import { useState } from 'react';
import { Club } from '@/types/club';
import { useChatManager } from '@/components/chat/ChatManager';

export const useClubChat = (selectedClub: Club | null) => {
  const chatManager = useChatManager(selectedClub);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return {
    chatManager,
    showUserProfile,
    setShowUserProfile
  };
};