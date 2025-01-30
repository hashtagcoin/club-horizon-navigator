export type TrafficLevel = 'Low' | 'Medium' | 'High';

export interface Position {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  [key: string]: string;
}

export interface Club {
  id: number;
  name: string;
  address: string;
  position: Position;
  traffic: TrafficLevel;
  openingHours: OpeningHours;
  genre: string;
  usersAtClub: number;
  hasSpecial: boolean;
  isUserAdded?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  clubId: number | string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface ChatMessages {
  [key: string | number]: ChatMessage[];
}

export interface MapState {
  center: Position;
  zoom: number;
  selectedClub: Club | null;
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  activeClub: Club | null;
}

export interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
  price: string;
  clubId?: number; // Made optional since existing data doesn't include it
}
