import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Calendar, ArrowRight, Star } from 'lucide-react';
import { destinationsList } from '../../data';
import { usePlanner } from '../../context/PlannerContext';

const categories = ['All', 'Temples', 'Hill Stations', 'Beaches', 'Historical Sites'];

export default function DestinationGrid() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  const { setDestinationId } = usePlanner();

  const filteredDestinations = activeTab === 'All'
    ? destinationsList
    : destinationsList.filter(dest => dest.category === activeTab);

  const handleQuickPlan = (id) => {
    setDestinationId(id);
    navigate(`/planner?dest=${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-slate-900 dark:text-white">
          Explore Popular Destinations
        </h2>
        <p className="text-brand-slate-600 dark:text-brand-slate-400 mt-2">
          Pick a destination, discover its historical and cultural treasures, and build your perfect custom itinerary.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              activeTab === tab
                ? 'bg-brand-teal-600 border-brand-teal-600 text-white shadow-md shadow-brand-teal-600/20'
                : 'bg-white dark:bg-brand-slate-900 border-brand-slate-200 dark:border-brand-slate-800 text-brand-slate-700 dark:text-brand-slate-300 hover:border-brand-teal-600 dark:hover:border-brand-teal-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map(dest => (
          <div
            key={dest.id}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Cover Image */}
            <div className="relative h-52 overflow-hidden bg-brand-slate-800">
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Category Badge */}
              <span className="absolute top-4 left-4 bg-brand-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {dest.category}
              </span>

              {/* Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                  <Star className="h-3 w-3 text-brand-gold fill-current" /> {dest.bestTimeToVisit}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md uppercase tracking-wider">
                  {dest.budgetLevel} Budget
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-brand-slate-900 dark:text-white group-hover:text-brand-teal-600 dark:group-hover:text-brand-teal-400 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs italic text-brand-gold font-medium mt-0.5">
                  {dest.tagline}
                </p>
                <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 mt-2.5 line-clamp-3">
                  {dest.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-slate-100 dark:border-brand-slate-800">
                <Link
                  to={`/destination/${dest.id}`}
                  className="text-sm font-semibold text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-300 dark:hover:text-brand-teal-400 flex items-center gap-1 transition-colors"
                >
                  Explore Sights
                </Link>
                <button
                  onClick={() => handleQuickPlan(dest.id)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-brand-teal-50 dark:bg-brand-slate-800 hover:bg-brand-teal-600 hover:text-white dark:hover:bg-brand-teal-500 text-brand-teal-700 dark:text-brand-teal-400 transition-all flex items-center gap-1.5"
                >
                  Plan Trip <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
