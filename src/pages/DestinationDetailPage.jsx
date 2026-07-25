import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinationsMap } from '../data';
import { usePlanner } from '../context/PlannerContext';
import { ArrowLeft, Clock, Ticket, Calendar, Play } from 'lucide-react';

const attractionFilters = ['All', 'Temples', 'Historical Sites', 'Nature', 'Beaches', 'Adventure', 'Family Friendly'];

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setDestinationId } = usePlanner();
  const [activeFilter, setActiveFilter] = useState('All');

  const dest = destinationsMap[id?.toLowerCase()];

  if (!dest) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Destination not found</h2>
        <Link to="/" className="text-brand-teal-600 hover:underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  // Filter attractions based on selected filter tab
  const filteredAttractions = activeFilter === 'All'
    ? dest.attractions
    : dest.attractions.filter(attr => {
        if (activeFilter === 'Family Friendly') return attr.familyFriendly;
        return attr.category === activeFilter;
      });

  const handleStartPlanning = () => {
    setDestinationId(dest.id);
    navigate(`/planner?dest=${dest.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
      {/* Back Button */}
      <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-400 dark:hover:text-brand-teal-400 self-start transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Destinations
      </Link>

      {/* Hero Banner Section */}
      <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl bg-brand-slate-800">
        <img
          src={dest.coverImage}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col sm:flex-row items-end justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <span className="text-xs uppercase tracking-wider font-extrabold text-brand-gold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg w-fit">
              {dest.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{dest.name}</h1>
            <p className="text-sm text-brand-slate-200 italic font-medium">
              "{dest.tagline}"
            </p>
          </div>

          <button
            onClick={handleStartPlanning}
            className="flex items-center gap-2 px-6 py-3 bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-teal-600/20 transition-all transform hover:scale-105"
          >
            <Calendar className="h-4.5 w-4.5" />
            <span>Create Travel Plan</span>
          </button>
        </div>
      </div>

      {/* Description & Metadata Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-brand-slate-900 dark:text-white">About the Destination</h2>
          <p className="text-base text-brand-slate-600 dark:text-brand-slate-400 leading-relaxed">
            {dest.description}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 flex flex-col gap-4 shadow-sm self-start">
          <h3 className="font-bold text-brand-slate-900 dark:text-white uppercase tracking-wider text-xs text-brand-slate-400">Travel Quick Info</h3>
          
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <span className="text-brand-slate-400 block text-xs">Best Time to Visit</span>
              <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200">{dest.bestTimeToVisit}</span>
            </div>
            <div>
              <span className="text-brand-slate-400 block text-xs">Averages Budget</span>
              <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200">{dest.budgetLevel} Level</span>
            </div>
            <div>
              <span className="text-brand-slate-400 block text-xs">Total Sights Available</span>
              <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200">{dest.attractions.length} Attractions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attractions Section */}
      <div className="flex flex-col gap-6 pt-6 border-t border-brand-slate-200 dark:border-brand-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-slate-900 dark:text-white">Top Attractions in {dest.name}</h2>
            <p className="text-sm text-brand-slate-500">Filter sights by style and select one to see opening times, fees, and location.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {attractionFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex-shrink-0 ${
                activeFilter === filter
                  ? 'bg-brand-teal-600 border-brand-teal-600 text-white shadow-md'
                  : 'bg-white dark:bg-brand-slate-900 border-brand-slate-200 dark:border-brand-slate-800 text-brand-slate-700 dark:text-brand-slate-300 hover:border-brand-teal-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        {filteredAttractions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAttractions.map(attr => (
              <div 
                key={attr.id}
                className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-44 h-40 bg-brand-slate-800 flex-shrink-0 overflow-hidden">
                  <img
                    src={attr.image}
                    alt={attr.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal-600 dark:text-brand-teal-400 bg-brand-teal-50 dark:bg-brand-teal-950/20 px-2 py-0.5 rounded">
                        {attr.category}
                      </span>
                      {attr.familyFriendly && (
                        <span className="text-[10px] font-semibold text-brand-gold bg-brand-slate-100 dark:bg-brand-slate-800 px-2 py-0.5 rounded">
                          Family Friendly
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-brand-slate-900 dark:text-white mt-1.5 line-clamp-1 group-hover:text-brand-teal-600 dark:group-hover:text-brand-teal-400 transition-colors">
                      {attr.name}
                    </h3>
                    
                    <p className="text-xs text-brand-slate-600 dark:text-brand-slate-400 line-clamp-2 mt-1">
                      {attr.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-brand-slate-100 dark:border-brand-slate-800 text-xs">
                    <span className="text-brand-slate-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {attr.estimatedTimeSpent}
                    </span>
                    
                    <Link
                      to={`/place/${attr.id}?dest=${dest.id}`}
                      className="font-bold text-brand-teal-600 dark:text-brand-teal-400 hover:text-brand-teal-500 flex items-center gap-0.5"
                    >
                      <span>Explore details</span>
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed border-brand-slate-200 dark:border-brand-slate-850 rounded-2xl">
            <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400">
              No attractions match the selected filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
