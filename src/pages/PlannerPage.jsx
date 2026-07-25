import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { destinationsMap } from '../data';
import PlannerForm from '../components/Planner/PlannerForm';
import ItineraryView from '../components/Planner/ItineraryView';
import BudgetEstimator from '../components/Planner/BudgetEstimator';
import ShareButton from '../components/Common/ShareButton';
import { Heart, HeartOff, Check, Calendar, Users, ShieldAlert } from 'lucide-react';

export default function PlannerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    destinationId,
    setDestinationId,
    days,
    setDays,
    travelType,
    setTravelType,
    budget,
    setBudget,
    activeItinerary,
    activeBudgetBreakdown,
    saveCurrentTrip,
    savedTrips
  } = usePlanner();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync URL query params with state on load
  useEffect(() => {
    const dest = searchParams.get('dest');
    const d = searchParams.get('days');
    const t = searchParams.get('type');
    const b = searchParams.get('budget');

    if (dest) setDestinationId(dest);
    if (d) setDays(Number(d));
    if (t) setTravelType(t);
    if (b) setBudget(Number(b));
  }, [searchParams]);

  // Sync state back to URL query parameters when it changes
  useEffect(() => {
    if (destinationId) {
      setSearchParams({
        dest: destinationId,
        days: days.toString(),
        type: travelType,
        budget: budget.toString()
      }, { replace: true });
    }
  }, [destinationId, days, travelType, budget]);

  const destData = destinationId ? destinationsMap[destinationId.toLowerCase()] : null;

  const handleSave = () => {
    const success = saveCurrentTrip();
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  // Check if current configuration is already saved
  const isAlreadySaved = savedTrips.some(
    trip => 
      trip.destinationId === destinationId && 
      trip.days === days && 
      trip.travelType === travelType && 
      trip.budget === budget
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-brand-slate-900 dark:text-white">
          Smart Travel Planner
        </h1>
        <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 mt-1">
          Customize your parameters on the left and see your day-wise itinerary and route plan load instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form & Budget Estimator */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PlannerForm />
          {destinationId && (
            <BudgetEstimator 
              targetBudget={budget} 
              breakdown={activeBudgetBreakdown} 
            />
          )}
        </div>

        {/* Right Side: Destination & Itinerary View */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {destData ? (
            <div className="flex flex-col gap-6">
              {/* Destination Cover Banner */}
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg bg-brand-slate-800">
                <img
                  src={destData.coverImage}
                  alt={destData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                {/* Details Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white text-left flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-brand-gold bg-brand-slate-900/60 w-fit px-2 py-0.5 rounded-md">
                    {destData.category}
                  </span>
                  <h2 className="text-3xl font-extrabold">{destData.name}</h2>
                  <p className="text-sm text-brand-slate-200 line-clamp-2 max-w-xl">
                    {destData.description}
                  </p>
                </div>
              </div>

              {/* Save & Share Panel */}
              <div className="p-4 rounded-xl border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Save Trip Button */}
                  <button
                    onClick={handleSave}
                    disabled={isAlreadySaved}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 ${
                      isAlreadySaved
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/30 cursor-not-allowed'
                        : 'bg-brand-teal-600 hover:bg-brand-teal-500 text-white shadow-brand-teal-600/10'
                    }`}
                  >
                    {isAlreadySaved ? (
                      <>
                        <Check className="h-4.5 w-4.5" />
                        <span>Saved Trip</span>
                      </>
                    ) : savedSuccess ? (
                      <>
                        <Check className="h-4.5 w-4.5 animate-bounce" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-4.5 w-4.5" />
                        <span>Save Trip</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Share Action Buttons */}
                <ShareButton
                  destinationName={destData.name}
                  days={days}
                  travelType={travelType}
                  budget={budget}
                  totalCost={activeBudgetBreakdown.total}
                  itinerary={activeItinerary}
                />
              </div>

              {/* Itinerary Timeline */}
              <ItineraryView 
                destinationId={destinationId} 
                itinerary={activeItinerary} 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-brand-slate-250 dark:border-brand-slate-800 rounded-3xl h-full bg-white dark:bg-brand-slate-900/25">
              <div className="p-4 rounded-full bg-brand-teal-50 dark:bg-brand-slate-800/60 text-brand-teal-600 dark:text-brand-teal-400 animate-float mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-slate-800 dark:text-white">Start Planning Your Journey</h3>
              <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 max-w-sm mt-1 leading-relaxed">
                Select a destination from the list on the left and set your days to generate a custom itinerary.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
