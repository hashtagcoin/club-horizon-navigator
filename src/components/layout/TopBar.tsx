import { FC, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { UserProfile } from '../user-profile';

interface TopBarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const TopBar: FC<TopBarProps> = ({ searchQuery = "", setSearchQuery }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="bg-primary text-primary-foreground p-2 flex justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-foreground"
          >
            <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M6 14H26" stroke="currentColor" strokeWidth="2" />
            <circle cx="11" cy="19" r="2" fill="currentColor" />
            <circle cx="21" cy="19" r="2" fill="currentColor" />
          </svg>
          <span className="text-base font-bold">CLUB PILOT</span>
        </div>

        <div className="flex-1 max-w-md relative">
          <Input
            type="text"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="pl-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowProfile(true)}
          className="text-primary-foreground"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
};