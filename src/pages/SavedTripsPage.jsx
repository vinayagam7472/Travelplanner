import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { Trash2, Calendar, Users, IndianRupee, Play, Heart, Compass } from 'lucide-react';

export default function SavedTripsPage() {
  const { savedTrips, deleteSavedTrip, loadTrip } = usePlanner();
  const navigate = useNavigate();

  const handleLoadTrip = (trip) => {
    loadTrip(trip);
    navigate(`/planner?dest=${trip.destinationId}&days=${trip.days}&type=${trip.travelType}&budget=${trip.budget}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="h-7 w-7 text-brand-gold fill-current" />
          <span>My Saved Trips</span>
        </h1>
        <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 mt-1">
          Review and manage your generated itineraries. Click "Load Plan" to resume editing.
        </p>
      </div>

      {savedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map(trip => {
            const isOverBudget = trip.breakdown.total > trip.budget;
            return (
              <div 
                key={trip.id}
                className="flex flex-col rounded-2xl overflow-hidden border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 shadow-sm hover:shadow-md transition-shadow group text-left"
              >
                {/* Cover Image Header */}
                <div className="h-40 bg-brand-slate-800 relative">
                  <img
                    src={trip.coverImage}
                    alt={trip.destinationName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{trip.destinationName}</h3>
                    <span className="text-[10px] text-brand-slate-300 font-semibold block">
                      Saved on {trip.dateSaved}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-2 text-sm text-brand-slate-600 dark:text-brand-slate-400">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-4 w-4 text-brand-slate-400" /> Duration
                      </span>
                      <span className="font-bold text-brand-slate-900 dark:text-white">
                        {trip.days} {trip.days === 1 ? 'Day' : 'Days'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="h-4 w-4 text-brand-slate-400" /> Style
                      </span>
                      <span className="font-bold text-brand-slate-900 dark:text-white">{trip.travelType}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <IndianRupee className="h-4 w-4 text-brand-slate-400" /> Limit Target
                      </span>
                      <span className="font-bold text-brand-slate-900 dark:text-white">₹{trip.budget.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-brand-slate-100 dark:border-brand-slate-800/80">
                      <span className="font-bold text-brand-slate-800 dark:text-brand-slate-300">Total Cost</span>
                      <span className={`font-extrabold ${isOverBudget ? 'text-red-500' : 'text-brand-teal-600 dark:text-brand-teal-400'}`}>
                        ₹{trip.breakdown.total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleLoadTrip(trip)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Load Plan</span>
                    </button>
                    
                    <button
                      onClick={() => deleteSavedTrip(trip.id)}
                      className="p-2.5 text-brand-slate-500 hover:text-red-500 bg-brand-slate-50 dark:bg-brand-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                      aria-label="Delete saved plan"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center border-2 border-dashed border-brand-slate-200 dark:border-brand-slate-800 rounded-3xl bg-white dark:bg-brand-slate-900/20">
          <div className="p-4 rounded-full bg-brand-teal-50 dark:bg-brand-slate-800/50 text-brand-teal-600 dark:text-brand-teal-400 animate-float mb-4 w-fit mx-auto">
            <Compass className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-slate-800 dark:text-white">No Saved Trips Yet</h3>
          <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 max-w-sm mt-1 mx-auto leading-relaxed">
            Configure your journey details in the Smart Planner and click "Save Trip" to keep it here for easy access.
          </p>
          <Link
            to="/planner"
            className="mt-6 inline-block px-6 py-2.5 bg-brand-teal-600 hover:bg-brand-teal-500 text-white text-sm font-bold rounded-xl shadow-md transition-colors"
          >
            Go to Planner
          </Link>
        </div>
      )}
    </div>
  );
}
