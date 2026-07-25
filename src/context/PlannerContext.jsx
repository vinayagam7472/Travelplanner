import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItinerary, destinationsMap } from '../data';

const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  // Config state
  const [destinationId, setDestinationId] = useState('');
  const [days, setDays] = useState(2);
  const [travelType, setTravelType] = useState('Family');
  const [budget, setBudget] = useState(3000);
  
  // Saved trips list
  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem('saved_trips');
    return saved ? JSON.parse(saved) : [];
  });

  // Save trips to local storage
  useEffect(() => {
    localStorage.setItem('saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  // Calculate budget breakdown based on parameters
  const getBudgetBreakdown = (destId, numDays, type, itinerary) => {
    if (!destId || !itinerary) return { food: 0, transport: 0, tickets: 0, lodging: 0, total: 0 };

    const typeLower = type.toLowerCase();
    
    // 1. Lodging cost (per night, so for N days it's N-1 nights; if 1 day, it's 0)
    let lodgingPerNight = 1200;
    if (typeLower === 'budget') lodgingPerNight = 600;
    else if (typeLower === 'solo') lodgingPerNight = 500;
    else if (typeLower === 'friends') lodgingPerNight = 1200;
    else if (typeLower === 'family') lodgingPerNight = 2500;
    
    const nights = Math.max(0, numDays - 1);
    const lodging = lodgingPerNight * nights;

    // 2. Food cost (per day)
    let foodPerDay = 400;
    if (typeLower === 'budget') foodPerDay = 300;
    else if (typeLower === 'solo') foodPerDay = 350;
    else if (typeLower === 'friends') foodPerDay = 500;
    else if (typeLower === 'family') foodPerDay = 800; // family of 3-4
    
    const food = foodPerDay * numDays;

    // 3. Transport cost (per day)
    let transportPerDay = 400;
    if (typeLower === 'budget') transportPerDay = 200;
    else if (typeLower === 'solo') transportPerDay = 250;
    else if (typeLower === 'friends') transportPerDay = 400;
    else if (typeLower === 'family') transportPerDay = 600;
    
    const transport = transportPerDay * numDays;

    // 4. Ticket costs
    // Collect all activities from the itinerary
    let ticketsSum = 0;
    const dest = destinationsMap[destId.toLowerCase()];
    if (dest && itinerary.days) {
      const multiplier = typeLower === 'family' ? 3 : (typeLower === 'friends' ? 2 : 1);
      
      itinerary.days.forEach(day => {
        day.activities.forEach(actId => {
          const attraction = dest.attractions.find(a => a.id === actId);
          if (attraction && attraction.entryFee) {
            const fee = attraction.entryFee.domestic || 0;
            ticketsSum += fee * multiplier;
          }
        });
      });
    }
    const tickets = ticketsSum;
    const total = lodging + food + transport + tickets;

    return { lodging, food, transport, tickets, total };
  };

  // Helper to get active itinerary and budget
  const activeItinerary = destinationId ? getItinerary(destinationId, days, travelType) : null;
  const activeBudgetBreakdown = getBudgetBreakdown(destinationId, days, travelType, activeItinerary);

  const saveCurrentTrip = () => {
    if (!destinationId) return false;
    
    const dest = destinationsMap[destinationId.toLowerCase()];
    if (!dest) return false;

    const newTrip = {
      id: `${destinationId}-${days}-${travelType}-${Date.now()}`,
      destinationId,
      destinationName: dest.name,
      coverImage: dest.coverImage,
      days,
      travelType,
      budget,
      breakdown: activeBudgetBreakdown,
      itinerary: activeItinerary,
      dateSaved: new Date().toLocaleDateString()
    };

    setSavedTrips(prev => [newTrip, ...prev]);
    return true;
  };

  const deleteSavedTrip = (id) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const loadTrip = (trip) => {
    setDestinationId(trip.destinationId);
    setDays(trip.days);
    setTravelType(trip.travelType);
    setBudget(trip.budget);
  };

  return (
    <PlannerContext.Provider value={{
      destinationId,
      setDestinationId,
      days,
      setDays,
      travelType,
      setTravelType,
      budget,
      setBudget,
      savedTrips,
      activeItinerary,
      activeBudgetBreakdown,
      saveCurrentTrip,
      deleteSavedTrip,
      loadTrip
    }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
