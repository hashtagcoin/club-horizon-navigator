import { useState } from 'react';
import { Club, ChatMessage, ChatMessages } from '@/types/club';
import { v4 as uuidv4 } from 'uuid';

export function useChatManager(selectedClub: Club | null) {
  const [chatOpen, setChatOpen] = useState(false);
  const [clubChats, setClubChats] = useState<Record<number, boolean>>({});
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessages>({ general: [] });
  const [newMessageCounts, setNewMessageCounts] = useState<Record<number, number>>({});
  const [isGeneralChat, setIsGeneralChat] = useState(true);
  const [activeClubChat, setActiveClubChat] = useState<Club | null>(null);

  const createMessage = (text: string, chatId: string | number): ChatMessage => ({
    id: uuidv4(),
    sender: "You",
    text,
    timestamp: Date.now(),
    clubId: chatId
  });

  const toggleGeneralChat = () => {
    setChatOpen(prev => !prev);
    setIsGeneralChat(true);
    setActiveClubChat(null);
    if (!chatMessages.general) {
      setChatMessages(prev => ({ ...prev, general: [] }));
    }
  };

  const openChat = (club: Club) => {
    setClubChats(prev => ({ ...prev, [club.id]: true }));
    setActiveClubChat(club);
    if (!chatMessages[club.id]) {
      setChatMessages(prev => ({ ...prev, [club.id]: [] }));
    }
  };

  const closeChat = (club: Club) => {
    setClubChats(prev => ({ ...prev, [club.id]: false }));
    if (activeClubChat?.id === club.id) {
      setActiveClubChat(null);
    }
  };

  const sendMessage = (clubId?: number) => {
    if (chatMessage.trim() !== "") {
      const chatId = clubId || (isGeneralChat ? 'general' : (activeClubChat?.id || 'general'));
      const newMessage = createMessage(chatMessage, chatId);

      setChatMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), newMessage]
      }));

      setChatMessage("");

      // Simulate responses
      setTimeout(() => {
        const users = ["Alice", "Bob", "Charlie"];
        const responses = [
          "Hey there! How's everyone doing tonight?",
          "The vibe is great here!",
          "Anyone heading to the club district later?"
        ];
        
        const responseMessage = createMessage(
          responses[Math.floor(Math.random() * responses.length)],
          chatId
        );
        responseMessage.sender = users[Math.floor(Math.random() * users.length)];

        setChatMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), responseMessage]
        }));
      }, 1000);
    }
  };

  return {
    chatOpen,
    isGeneralChat,
    chatMessage,
    activeClubChat,
    clubChats,
    allMessages: isGeneralChat ? (chatMessages.general || []) : (chatMessages[activeClubChat?.id || ''] || []),
    getClubMessages: (clubId: number) => chatMessages[clubId] || [],
    newMessageCounts,
    toggleGeneralChat,
    setChatMessage,
    sendMessage,
    setChatOpen,
    openChat,
    closeChat
  };
}