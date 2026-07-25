import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Eye, ExternalLink, Navigation } from 'lucide-react';
import { destinationsMap } from '../../data';

export default function ItineraryView({ destinationId, itinerary }) {
  const [activeDay, setActiveDay] = useState(1);
  const dest = destinationsMap[destinationId.toLowerCase()];

  if (!dest || !itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 rounded-2xl">
        <MapPin className="h-12 w-12 text-brand-slate-300 dark:text-brand-slate-700 animate-bounce mb-3" />
        <h3 className="text-lg font-bold text-brand-slate-800 dark:text-white">No Itinerary Generated</h3>
        <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 max-w-xs mt-1">
          Please select a destination from the options list to build a route map.
        </p>
      </div>
    );
  }

  // Helper to resolve attraction details
  const getAttraction = (id) => {
    return dest.attractions.find(attr => attr.id === id);
  };

  const currentDayData = itinerary.days.find(d => d.day === activeDay) || itinerary.days[0];

  return (
    <div className="bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-6">
      {/* Day Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-slate-100 dark:border-brand-slate-800 pb-4 overflow-x-auto">
        {itinerary.days.map(d => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all duration-200 ${
              activeDay === d.day
                ? 'bg-brand-teal-600 text-white shadow-md shadow-brand-teal-600/20'
                : 'bg-brand-slate-50 dark:bg-brand-slate-800 text-brand-slate-700 dark:text-brand-slate-300 hover:bg-brand-slate-100 dark:hover:bg-brand-slate-700'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Day Title */}
      <div>
        <h3 className="text-lg font-extrabold text-brand-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-brand-gold">Day {currentDayData.day}:</span>
          <span>{currentDayData.title}</span>
        </h3>
        <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 mt-0.5">
          Curated sequence of {currentDayData.activities.length} attractions
        </p>
      </div>

      {/* Vertical Timeline Sequence */}
      <div className="relative pl-6 border-l-2 border-brand-slate-100 dark:border-brand-slate-800 ml-4 flex flex-col gap-6 my-2">
        {currentDayData.activities.map((actId, index) => {
          const item = getAttraction(actId);
          if (!item) return null;

          const route = currentDayData.routes ? currentDayData.routes[index] : null;

          return (
            <React.Fragment key={item.id}>
              {/* Activity Card Row */}
              <div className="relative group">
                {/* Timeline Dot Marker */}
                <div className="absolute -left-[35px] top-6 w-4 h-4 rounded-full border-[3px] border-brand-teal-600 dark:border-brand-teal-400 bg-white dark:bg-brand-slate-900 group-hover:scale-125 transition-transform duration-200"></div>

                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-brand-slate-150 dark:border-brand-slate-800 bg-brand-slate-50/50 dark:bg-brand-slate-900/50 hover:bg-white dark:hover:bg-brand-slate-800/50 hover:shadow-md transition-all duration-300">
                  {/* Attraction Thumbnail */}
                  <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden bg-brand-slate-200 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Attraction Details */}
                  <div className="flex-1 flex flex-col justify-between gap-1.5 text-left">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-brand-slate-900 dark:text-white">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-teal-50 dark:bg-brand-teal-950/30 text-brand-teal-700 dark:text-brand-teal-400 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-brand-slate-600 dark:text-brand-slate-400 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-brand-slate-100 dark:border-brand-slate-800/80 text-xs">
                      <div className="flex items-center gap-3 text-brand-slate-500 dark:text-brand-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {item.estimatedTimeSpent}
                        </span>
                        <span className="font-semibold text-brand-slate-700 dark:text-brand-slate-300">
                          Fee: {item.entryFee.domestic === 0 ? 'Free' : `₹${item.entryFee.domestic}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/place/${item.id}?dest=${dest.id}`}
                          className="text-brand-slate-600 dark:text-brand-slate-300 hover:text-brand-teal-600 dark:hover:text-brand-teal-400 flex items-center gap-1 font-bold"
                        >
                          <Eye className="h-3.5 w-3.5" /> Details
                        </Link>
                        <a
                          href={item.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-teal-600 dark:text-brand-teal-400 hover:text-brand-teal-500 flex items-center gap-1 font-bold"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Map <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Sequence Route Connector (Rendered between cards) */}
              {route && (
                <div className="relative group pl-2 py-1 my-1">
                  {/* Visual Line Accent */}
                  <div className="flex items-center gap-3 text-xs text-brand-teal-700 dark:text-brand-teal-400 bg-brand-teal-50/50 dark:bg-brand-teal-950/20 px-3 py-1.5 rounded-lg border border-brand-teal-100/40 dark:border-brand-teal-900/30 w-fit">
                    <span className="font-bold flex items-center gap-1">
                      ↓ {route.distance}
                    </span>
                    <span className="text-brand-slate-400">|</span>
                    <span className="flex items-center gap-1">
                      🚗 {route.time} travel
                    </span>
                    <span className="text-brand-slate-400">|</span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(getAttraction(route.from).name + ' ' + dest.name)}&destination=${encodeURIComponent(getAttraction(route.to).name + ' ' + dest.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-bold flex items-center gap-0.5 text-brand-gold hover:text-brand-gold-dark"
                    >
                      Directions <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
