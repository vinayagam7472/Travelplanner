import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Calendar, Users, Search } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import { destinationsList } from '../../data';

export default function HeroSection() {
  const navigate = useNavigate();
  const { setDestinationId, setDays, setTravelType } = usePlanner();
  
  const [localDest, setLocalDest] = useState('');
  const [localDays, setLocalDays] = useState(2);
  const [localType, setLocalType] = useState('Family');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localDest) return;
    
    setDestinationId(localDest);
    setDays(localDays);
    setTravelType(localType);
    
    navigate(`/planner?dest=${localDest}&days=${localDays}&type=${localType}`);
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-brand-slate-900 via-brand-slate-800 to-brand-slate-950 text-white rounded-3xl mt-6 max-w-7xl mx-auto shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-teal-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate-800/80 text-brand-gold border border-brand-slate-700/80 text-sm font-semibold tracking-wide animate-float">
          <Compass className="h-4 w-4 text-brand-gold animate-spin-slow" />
          <span>Smart Travel Planner for Tamil Nadu</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-sans leading-tight tracking-tight">
          Plan Your Perfect Trip Across <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal-400 via-brand-teal-300 to-brand-gold">Tamil Nadu</span>
        </h1>

        <p className="text-lg text-brand-slate-300 font-light max-w-xl">
          Get custom, practical day-wise itineraries, route directions, distances, and real-time budget estimates instantly.
        </p>

        {/* Search & Planner Widget */}
        <form 
          onSubmit={handleSubmit}
          className="w-full mt-8 p-4 rounded-2xl glass-panel text-brand-slate-900 dark:text-white flex flex-col lg:flex-row gap-4 border border-white/10 shadow-xl"
        >
          {/* Destination */}
          <div className="flex-1 flex flex-col text-left gap-1">
            <label className="text-xs font-bold text-brand-slate-500 dark:text-brand-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" /> Destination
            </label>
            <select
              required
              value={localDest}
              onChange={(e) => setLocalDest(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-brand-slate-200 dark:border-brand-slate-700 bg-white dark:bg-brand-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-500 text-brand-slate-800 dark:text-white"
            >
              <option value="" disabled>Select destination...</option>
              {destinationsList.map(dest => (
                <option key={dest.id} value={dest.id}>{dest.name}</option>
              ))}
            </select>
          </div>

          {/* Days */}
          <div className="w-full lg:w-44 flex flex-col text-left gap-1">
            <label className="text-xs font-bold text-brand-slate-500 dark:text-brand-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Duration
            </label>
            <select
              value={localDays}
              onChange={(e) => setLocalDays(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-brand-slate-200 dark:border-brand-slate-700 bg-white dark:bg-brand-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-500 text-brand-slate-800 dark:text-white"
            >
              <option value={1}>1 Day</option>
              <option value={2}>2 Days</option>
              <option value={3}>3 Days</option>
              <option value={4}>4 Days</option>
              <option value={5}>5+ Days</option>
            </select>
          </div>

          {/* Travel Type */}
          <div className="w-full lg:w-44 flex flex-col text-left gap-1">
            <label className="text-xs font-bold text-brand-slate-500 dark:text-brand-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Travel Type
            </label>
            <select
              value={localType}
              onChange={(e) => setLocalType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-brand-slate-200 dark:border-brand-slate-700 bg-white dark:bg-brand-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-500 text-brand-slate-800 dark:text-white"
            >
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Budget">Budget</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full lg:w-auto px-8 py-3 rounded-xl bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-sm shadow-lg shadow-brand-teal-600/30 transition-all duration-200 self-end lg:h-[46px] flex items-center justify-center gap-2"
          >
            <span>Generate Itinerary</span>
          </button>
        </form>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-6 text-sm text-brand-slate-400">
          <span>Popular:</span>
          {['Madurai', 'Ooty', 'Kanyakumari', 'Mahabalipuram'].map(name => (
            <button
              key={name}
              type="button"
              onClick={() => {
                const id = name.toLowerCase();
                setLocalDest(id);
                setLocalDays(2);
                setLocalType('Family');
                setDestinationId(id);
                setDays(2);
                setTravelType('Family');
                navigate(`/planner?dest=${id}&days=2&type=Family`);
              }}
              className="px-3 py-1 rounded-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 hover:text-brand-gold transition-colors font-medium border border-brand-slate-700/50"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
