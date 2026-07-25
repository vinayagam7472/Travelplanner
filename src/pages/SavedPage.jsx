import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { Trash2, Calendar, ArrowRight, HeartOff, Compass, IndianRupee } from 'lucide-react';

export default function SavedPage() {
  const { savedTrips, deleteSavedTrip, loadTrip } = usePlanner();
  const navigate = useNavigate();

  const handleLoadTrip = (trip) => {
    loadTrip(trip);
    navigate(`/planner?dest=${trip.destinationId}&days=${trip.days}&type=${trip.travelType}&budget=${trip.budget}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-left min-h-[60vh]">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-brand-slate-900 dark:text-white">
          Saved Itineraries
        </h1>
        <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 mt-1">
          Review, manage, or reload your planned journeys through Tamil Nadu.
        </p>
      </div>

      {savedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative h-44 overflow-hidden bg-brand-slate-850">
                <img
                  src={trip.coverImage}
                  alt={trip.destinationName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                
                {/* Trip Quick Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <h3 className="text-lg font-bold truncate pr-2">
                    {trip.destinationName}
                  </h3>
                  <span className="text-xs bg-brand-teal-600 font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                    {trip.days} Days
                  </span>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-brand-slate-500 dark:text-brand-slate-400">
                    <span>Type: {trip.travelType}</span>
                    <span>Saved: {trip.dateSaved}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-slate-100 dark:border-brand-slate-800 pt-3 mt-1">
                    <span className="text-xs text-brand-slate-500 dark:text-brand-slate-400">Est. Total Cost</span>
                    <span className="text-sm font-bold text-brand-teal-600 dark:text-brand-teal-400 flex items-center">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {trip.breakdown?.total?.toLocaleString('en-IN') || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-brand-slate-100 dark:border-brand-slate-800">
                  <button
                    onClick={() => deleteSavedTrip(trip.id)}
                    className="p-2 text-brand-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>

                  <button
                    onClick={() => handleLoadTrip(trip)}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-brand-teal-600 hover:bg-brand-teal-500 text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-brand-teal-600/10"
                  >
                    <span>Load Itinerary</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-brand-slate-200 dark:border-brand-slate-800 rounded-3xl bg-white dark:bg-brand-slate-900/20">
          <div className="p-4 rounded-full bg-brand-slate-100 dark:bg-brand-slate-800 text-brand-slate-400 dark:text-brand-slate-500 mb-4">
            <HeartOff className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-slate-800 dark:text-white">No Saved Trips</h3>
          <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 max-w-sm mt-1 leading-relaxed">
            Configure destinations and click "Save Trip" inside the Smart Travel Planner to bookmark your itineraries.
          </p>
          <Link
            to="/planner"
            className="mt-6 px-5 py-2.5 bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-brand-teal-600/10"
          >
            Go to Planner
          </Link>
        </div>
      )}
    </div>
  );
}
