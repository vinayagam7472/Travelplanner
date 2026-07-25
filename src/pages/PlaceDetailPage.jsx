import React from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { destinationsMap } from '../data';
import { usePlanner } from '../context/PlannerContext';
import { ArrowLeft, Clock, Info, MapPin, Navigation, ExternalLink, Calendar, Compass, ShieldAlert } from 'lucide-react';

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setDestinationId } = usePlanner();

  const destId = searchParams.get('dest');
  const dest = destinationsMap[destId?.toLowerCase()];
  
  if (!dest) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Destination not specified</h2>
        <Link to="/" className="text-brand-teal-600 hover:underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  const place = dest.attractions.find(attr => attr.id === id);

  if (!place) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Attraction not found</h2>
        <Link to={`/destination/${dest.id}`} className="text-brand-teal-600 hover:underline mt-4 inline-block">
          Return to {dest.name}
        </Link>
      </div>
    );
  }

  // Filter out the current attraction for "Nearby Attractions"
  const nearbySights = dest.attractions.filter(attr => attr.id !== place.id).slice(0, 3);

  const handleStartPlanning = () => {
    setDestinationId(dest.id);
    navigate(`/planner?dest=${dest.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 text-left">
      {/* Back Button */}
      <Link 
        to={`/destination/${dest.id}`} 
        className="flex items-center gap-1.5 text-sm font-semibold text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-400 dark:hover:text-brand-teal-400 self-start transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {dest.name} Sights
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Cover Photo & Description (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg bg-brand-slate-800">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-xs uppercase tracking-wider font-extrabold text-brand-gold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg w-fit">
                {place.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1.5">{place.name}</h1>
              <p className="text-sm text-brand-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4 text-brand-teal-400" /> {dest.name}, Tamil Nadu
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-brand-slate-900 dark:text-white">Overview</h2>
            <p className="text-base text-brand-slate-600 dark:text-brand-slate-400 leading-relaxed">
              {place.description}
            </p>
          </div>
        </div>

        {/* Right Col: Details Metadata Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 flex flex-col gap-5 shadow-sm">
            <h3 className="font-bold text-brand-slate-900 dark:text-white uppercase tracking-wider text-xs border-b border-brand-slate-100 dark:border-brand-slate-800 pb-3 flex items-center gap-1.5">
              <Info className="h-4.5 w-4.5 text-brand-teal-600 dark:text-brand-teal-400" />
              <span>Attraction Details</span>
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              <div>
                <span className="text-brand-slate-400 block text-xs font-semibold">Opening Hours</span>
                <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200">{place.openingHours}</span>
              </div>
              <div>
                <span className="text-brand-slate-400 block text-xs font-semibold">Best Time to Visit</span>
                <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200">{place.bestTimeToVisit}</span>
              </div>
              <div>
                <span className="text-brand-slate-400 block text-xs font-semibold">Estimated Visit Duration</span>
                <span className="font-bold text-brand-slate-800 dark:text-brand-slate-200 flex items-center gap-1 mt-0.5">
                  <Clock className="h-4 w-4 text-brand-slate-500" /> {place.estimatedTimeSpent}
                </span>
              </div>
              <div>
                <span className="text-brand-slate-400 block text-xs font-semibold mb-1">Entry Ticket Rates</span>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between font-semibold border-b border-brand-slate-50 dark:border-brand-slate-800 pb-1">
                    <span>Indian Citizen</span>
                    <span className="text-brand-teal-600 dark:text-brand-teal-400">
                      {place.entryFee.domestic === 0 ? 'Free' : `₹${place.entryFee.domestic}`}
                    </span>
                  </div>
                  {place.entryFee.foreign !== undefined && (
                    <div className="flex justify-between font-semibold border-b border-brand-slate-50 dark:border-brand-slate-800 pb-1">
                      <span>Foreign National</span>
                      <span className="text-brand-teal-600 dark:text-brand-teal-400">
                        {place.entryFee.foreign === 0 ? 'Free' : `₹${place.entryFee.foreign}`}
                      </span>
                    </div>
                  )}
                  {place.entryFee.camera !== undefined && (
                    <div className="flex justify-between font-semibold">
                      <span>Camera Fee</span>
                      <span className="text-brand-teal-600 dark:text-brand-teal-400">₹{place.entryFee.camera}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-brand-slate-100 dark:border-brand-slate-800">
              <a
                href={place.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-800 dark:hover:bg-brand-slate-700 text-brand-slate-800 dark:text-brand-slate-200 font-bold text-sm rounded-xl transition-colors"
              >
                <Navigation className="h-4 w-4 text-brand-teal-600 dark:text-brand-teal-400" />
                <span>Navigate on Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              <button
                onClick={handleStartPlanning}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-teal-600 hover:bg-brand-teal-500 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-brand-teal-600/10"
              >
                <Calendar className="h-4 w-4" />
                <span>Add to Trip Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Attractions Row */}
      {nearbySights.length > 0 && (
        <div className="flex flex-col gap-6 pt-8 border-t border-brand-slate-200 dark:border-brand-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-brand-slate-900 dark:text-white">Other Places in {dest.name}</h2>
            <p className="text-sm text-brand-slate-500">Add these locations to your itinerary plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbySights.map(sight => (
              <Link
                key={sight.id}
                to={`/place/${sight.id}?dest=${dest.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-40 overflow-hidden bg-brand-slate-800">
                  <img
                    src={sight.image}
                    alt={sight.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-teal-600 bg-brand-teal-50 dark:bg-brand-teal-950/20 px-2 py-0.5 rounded">
                      {sight.category}
                    </span>
                    <h3 className="text-base font-bold text-brand-slate-900 dark:text-white mt-1 group-hover:text-brand-teal-600 transition-colors line-clamp-1">
                      {sight.name}
                    </h3>
                  </div>
                  <span className="text-xs text-brand-slate-500 mt-2 block font-medium">
                    Time: {sight.estimatedTimeSpent}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
