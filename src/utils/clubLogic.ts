import { Club } from '@/types/club';

export const formatType = (type: string) => {
  return type
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getClosingHour = (club: Club, day: string) => {
  const hours = club.openingHours[day];
  if (!hours || hours === "Closed") return -1;
  const closingTime = hours.split(" - ")[1];
  if (!closingTime) return -1;
  const [hourStr] = closingTime.split(":");
  const hour = parseInt(hourStr);
  return hour < 6 ? hour + 24 : hour;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export const filterClubs = (
  clubs: Club[],
  searchQuery: string,
  filterGenre: string[],
  showHighTraffic: boolean,
  showSpecials: boolean
): Club[] => {
  return clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre.length === 0 || filterGenre.includes(club.genre);
    const matchesTraffic = !showHighTraffic || club.traffic === 'High';
    const matchesSpecials = !showSpecials || club.hasSpecial;
    return matchesSearch && matchesGenre && matchesTraffic && matchesSpecials;
  });
};

export const sortClubsByClosingTime = (clubs: Club[], selectedDay: string): Club[] => {
  return [...clubs].sort((a, b) => {
    const aClosingHour = getClosingHour(a, selectedDay);
    const bClosingHour = getClosingHour(b, selectedDay);
    return bClosingHour - aClosingHour;
  });
};

export const getTrafficColor = (traffic: string): string => {
  switch (traffic) {
    case 'High':
      return 'text-green-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Low':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};