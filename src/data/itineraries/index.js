import { maduraiItinerary } from './madurai-itinerary';
import { destinationsMap } from '../destinations';

const curatedItineraries = {
  madurai: maduraiItinerary
};

// Generates a mock route distance and time that is consistent (deterministic)
const getMockRoute = (fromId, toId) => {
  const charSum = fromId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 
                  toId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Distance between 1.2 km and 5.8 km
  const distanceVal = ((charSum % 47) / 10 + 1.2).toFixed(1);
  const distance = `${distanceVal} km`;
  
  // Time estimated at ~4 mins per km (traffic, city auto travel)
  const timeVal = Math.round(parseFloat(distanceVal) * 4.5);
  const time = `${timeVal} mins`;
  
  return { from: fromId, to: toId, distance, time };
};

/**
 * Resolves or dynamically generates a day-wise itinerary
 * @param {string} destinationId 
 * @param {number} days 
 * @param {string} travelType - solo, family, friends, budget
 * @returns {object} The itinerary object
 */
export const getItinerary = (destinationId, days, travelType) => {
  const destId = destinationId.toLowerCase();
  const type = travelType.toLowerCase();
  
  // 1. Check if we have a hardcoded curated itinerary
  if (curatedItineraries[destId]) {
    const key = `${days}_days_${type}`;
    if (curatedItineraries[destId][key]) {
      return curatedItineraries[destId][key];
    }
    // Fallback to family if specific type is missing in curated list
    const fallbackKey = `${days}_days_family`;
    if (curatedItineraries[destId][fallbackKey]) {
      return curatedItineraries[destId][fallbackKey];
    }
  }

  // 2. Generate itinerary dynamically if not curated
  const destination = destinationsMap[destId];
  if (!destination) return null;

  const attractions = [...destination.attractions];
  
  // Sort and filter attractions based on travelType
  let sortedAttractions = [];
  if (type === 'budget') {
    // Sort by cheapest entry fee (domestic)
    sortedAttractions = attractions.sort((a, b) => {
      const feeA = a.entryFee?.domestic || 0;
      const feeB = b.entryFee?.domestic || 0;
      return feeA - feeB;
    });
  } else if (type === 'family') {
    // Prioritize family friendly
    sortedAttractions = attractions.sort((a, b) => {
      if (a.familyFriendly && !b.familyFriendly) return -1;
      if (!a.familyFriendly && b.familyFriendly) return 1;
      return 0;
    });
  } else if (type === 'friends') {
    // Prioritize high adventure / active spots
    const advWeight = { High: 3, Medium: 2, Low: 1 };
    sortedAttractions = attractions.sort((a, b) => {
      const weightA = advWeight[a.adventureLevel] || 1;
      const weightB = advWeight[b.adventureLevel] || 1;
      return weightB - weightA;
    });
  } else {
    // Solo / Standard - keep default ordering or moderate mix
    sortedAttractions = attractions;
  }

  // Distribute attractions over the days
  // Let's cap at max available attractions
  const totalDays = Math.min(days, 5); // display up to 5 days
  const itineraryDays = [];
  
  // Decide how many activities to show per day
  let activitiesPerDay = 2;
  if (sortedAttractions.length <= totalDays) {
    activitiesPerDay = 1;
  } else {
    activitiesPerDay = Math.ceil(sortedAttractions.length / totalDays);
  }
  // Cap activities per day between 1 and 3 for a realistic itinerary
  activitiesPerDay = Math.max(1, Math.min(activitiesPerDay, 3));

  for (let i = 0; i < totalDays; i++) {
    const dayActivities = [];
    const startIndex = i * activitiesPerDay;
    
    // Fill activities for this day
    for (let j = 0; j < activitiesPerDay; j++) {
      const index = (startIndex + j) % sortedAttractions.length;
      // Avoid adding duplicates on the same day if possible
      if (!dayActivities.includes(sortedAttractions[index].id)) {
        dayActivities.push(sortedAttractions[index].id);
      }
    }

    // Set day title based on activities categories
    let dayTitle = "Sightseeing & Exploration";
    if (i === 0) dayTitle = "Major Highlights & Heritage";
    else if (i === 1) dayTitle = "Nature & Scenic Sights";
    else if (i === 2) dayTitle = "Local Culture & Cuisine";
    
    // Generate route connections between consecutive activities
    const routes = [];
    for (let j = 0; j < dayActivities.length - 1; j++) {
      routes.push(getMockRoute(dayActivities[j], dayActivities[j+1]));
    }

    itineraryDays.push({
      day: i + 1,
      title: dayTitle,
      activities: dayActivities,
      routes
    });
  }

  return {
    days: itineraryDays
  };
};
