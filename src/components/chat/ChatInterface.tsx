import { FC } from 'react';
import { Club, ChatMessage } from '@/types/club';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Send, X } from 'lucide-react';

interface ChatInterfaceProps {
  club: Club | null;
  messages: ChatMessage[];
  inputMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onClose: () => void;
}

export const ChatInterface: FC<ChatInterfaceProps> = ({
  club,
  messages,
  inputMessage,
  onMessageChange,
  onSendMessage,
  onClose,
}) => {
  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="p-2 border-b border-white/10 flex justify-between items-center">
        <span className="text-sm font-medium">{club?.name || 'General Chat'}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 text-white hover:text-white/80"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`flex flex-col ${
                message.sender === 'You' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[10px] text-white/70">
                {message.sender}
              </span>
              <div
                className={`rounded-lg px-2 py-1 text-xs max-w-[80%] ${
                  message.sender === 'You'
                    ? 'bg-white/20'
                    : 'bg-white/10'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 text-xs bg-white/5 rounded px-2 py-1 text-white placeholder:text-white/50 border-none focus:outline-none"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white hover:text-white/80"
          onClick={onSendMessage}
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};