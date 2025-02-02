import { FC, useEffect, useRef } from 'react';
import { animated, SpringValue } from '@react-spring/web';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClubCard } from '@/components/ClubCard';
import { ClubFilters } from '@/components/ClubFilters';
import { Club } from '@/types/club';

interface ClubListProps {
  x: SpringValue<number>;
  bind: (...args: any[]) => any;
  isCollapsed: boolean;
  onToggle: () => void;
  clubs: Club[];
  selectedClub: Club | null;
  selectedDay: string;
  sortBy: string;
  setSortBy: (value: string) => void;
  filterGenre: string[];
  setFilterGenre: (value: string[]) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSelectClub: (club: Club) => void;
  onOpenChat: (club: Club) => void;
  newMessageCounts: Record<number, number>;
  isLoading: boolean;
}

export const ClubList: FC<ClubListProps> = ({
  x,
  bind,
  isCollapsed,
  onToggle,
  clubs,
  selectedClub,
  selectedDay,
  sortBy,
  setSortBy,
  filterGenre,
  setFilterGenre,
  searchQuery,
  setSearchQuery,
  onSelectClub,
  onOpenChat,
  newMessageCounts,
  isLoading
}) => {
  const genres = Array.from(new Set(clubs.map(club => club.genre))).sort();
  const selectedClubRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedClub && selectedClubRef.current && scrollAreaRef.current) {
      setTimeout(() => {
        const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (!scrollContainer) return;

        const clubElement = selectedClubRef.current;
        if (!clubElement) return;

        const cardHeight = clubElement.offsetHeight;
        const scrollTop = Math.max(0, clubElement.offsetTop - cardHeight);
        
        scrollContainer.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedClub]);

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [clubs]);

  return (
    <>
      <animated.div 
        {...bind()}
        style={{ 
          x,
          width: '50%',
          position: 'absolute',
          height: '100%',
          touchAction: 'none',
          zIndex: 20,
          transform: x.to(x => `translateX(${x}px)`)
        }}
        className="bg-white shadow-xl"
      >
        <div className="w-full h-full flex flex-col p-1 overflow-hidden bg-white shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white px-4 py-1.5 rounded-lg text-xl font-bold">
                {clubs.length}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {clubs.length === 1 ? 'Venue' : 'Venues'}
              </span>
            </div>
          </div>
          <ClubFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            genres={genres}
          />
          <ScrollArea 
            className="flex-grow" 
            ref={scrollAreaRef}
          >
            <div className="space-y-2 pr-2">
              {isLoading ? (
                <div>Loading venues...</div>
              ) : (
                clubs.map(club => (
                  <div 
                    key={club.id} 
                    ref={selectedClub?.id === club.id ? selectedClubRef : null}
                  >
                    <ClubCard
                      club={club}
                      selectedDay={selectedDay}
                      isSelected={selectedClub?.id === club.id}
                      onSelect={onSelectClub}
                      onOpenChat={onOpenChat}
                      newMessageCount={newMessageCounts[club.id] || 0}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </animated.div>

      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: isCollapsed ? 0 : '50%',
          transform: 'translateY(-50%)',
          zIndex: 25,
          transition: 'left 0.3s ease-in-out',
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="bg-white shadow-lg h-10 w-5 rounded-r-xl border-r border-t border-b border-gray-200 hover:bg-gray-50 transition-all duration-300"
          onClick={onToggle}
        >
          <ChevronLeft 
            className={`h-3 w-3 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </Button>
      </div>
    </>
  );
};