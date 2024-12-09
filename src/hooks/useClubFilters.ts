import { useState, useEffect } from 'react';
import { Club } from '@/types/club';
import { sortClubs } from '@/utils/sortClubs';

export function useClubFilters() {
  const [sortBy, setSortBy] = useState("usersAtClub");
  const [filterGenre, setFilterGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHighTraffic, setShowHighTraffic] = useState(false);
  const [sortByOpenLate, setSortByOpenLate] = useState(false);
  const [showSpecials, setShowSpecials] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');

  useEffect(() => {
    const today = new Date().toLocaleString('en-us', {weekday: 'long'});
    setSelectedDay(today);
  }, []);

  const filterAndSortClubs = (clubs: Club[]) => {
    let filtered = clubs
      .filter(club => filterGenre === "All" || club.genre === filterGenre)
      .filter(club => club.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(club => !showHighTraffic || club.traffic === "High")
      .filter(club => !showSpecials || club.hasSpecial);

    if (sortByOpenLate) {
      filtered = filtered.filter(club => {
        const hours = club.openingHours[selectedDay];
        if (!hours || hours === "Closed") return false;
        const closingTime = hours.split(" - ")[1];
        if (!closingTime) return false;
        const [hourStr] = closingTime.split(":");
        const hour = parseInt(hourStr);
        return hour < 6 || hour >= 22;
      });
    }

    return sortClubs(filtered, sortBy);
  };

  return {
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
  };
}