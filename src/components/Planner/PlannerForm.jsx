import React from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { destinationsList } from '../../data';
import { Calendar, Users, IndianRupee, MapPin } from 'lucide-react';

export default function PlannerForm() {
  const {
    destinationId,
    setDestinationId,
    days,
    setDays,
    travelType,
    setTravelType,
    budget,
    setBudget
  } = usePlanner();

  const travelTypes = [
    { name: 'Solo', icon: '🎒', desc: 'Indie exploration' },
    { name: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Paced & comfortable' },
    { name: 'Friends', icon: '🎸', desc: 'Adventure & food streets' },
    { name: 'Budget', icon: '👛', desc: 'Maximize value' }
  ];

  return (
    <div className="bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-6">
      <h2 className="text-xl font-bold text-brand-slate-900 dark:text-white pb-3 border-b border-brand-slate-100 dark:border-brand-slate-800 flex items-center gap-2">
        <span>Customize Your Trip</span>
      </h2>

      {/* Destination Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-slate-700 dark:text-brand-slate-300 flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-brand-teal-600 dark:text-brand-teal-400" />
          Where to?
        </label>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-brand-slate-200 dark:border-brand-slate-700 bg-brand-slate-50 dark:bg-brand-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 font-medium text-brand-slate-800 dark:text-white"
        >
          <option value="" disabled>Select a destination...</option>
          {destinationsList.map(dest => (
            <option key={dest.id} value={dest.id}>{dest.name}</option>
          ))}
        </select>
      </div>

      {/* Days Selection */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-sm font-semibold text-brand-slate-700 dark:text-brand-slate-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand-teal-600 dark:text-brand-teal-400" />
            Duration
          </span>
          <span className="text-brand-teal-600 dark:text-brand-teal-400 font-bold bg-brand-teal-50 dark:bg-brand-slate-800 px-2 py-0.5 rounded-md">
            {days} {days === 1 ? 'Day' : 'Days'}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full h-2 bg-brand-slate-200 dark:bg-brand-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-teal-600 dark:accent-brand-teal-400"
        />
        <div className="flex justify-between text-[10px] text-brand-slate-400 font-bold px-1">
          <span>1 Day</span>
          <span>2 Days</span>
          <span>3 Days</span>
          <span>4 Days</span>
          <span>5+ Days</span>
        </div>
      </div>

      {/* Travel Type Select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-brand-slate-700 dark:text-brand-slate-300 flex items-center gap-1.5">
          <Users className="h-4 w-4 text-brand-teal-600 dark:text-brand-teal-400" />
          Travel Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {travelTypes.map(type => (
            <button
              key={type.name}
              type="button"
              onClick={() => setTravelType(type.name)}
              className={`p-3 rounded-xl border text-left flex flex-col gap-0.5 transition-all duration-200 ${
                travelType === type.name
                  ? 'border-brand-teal-600 dark:border-brand-teal-500 bg-brand-teal-50/50 dark:bg-brand-teal-950/20 ring-2 ring-brand-teal-600/30 dark:ring-brand-teal-500/20'
                  : 'border-brand-slate-200 dark:border-brand-slate-800 bg-brand-slate-50/30 dark:bg-brand-slate-900 hover:border-brand-teal-600/50'
              }`}
            >
              <span className="text-xl mb-1">{type.icon}</span>
              <span className="text-xs font-bold text-brand-slate-900 dark:text-white">{type.name}</span>
              <span className="text-[10px] text-brand-slate-400 leading-tight">{type.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Budget Selection */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-sm font-semibold text-brand-slate-700 dark:text-brand-slate-300">
          <span className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-brand-teal-600 dark:text-brand-teal-400" />
            Target Budget limit
          </span>
          <span className="text-brand-teal-600 dark:text-brand-teal-400 font-bold bg-brand-teal-50 dark:bg-brand-slate-800 px-2.5 py-0.5 rounded-md">
            ₹{budget.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="25000"
          step="500"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-brand-slate-200 dark:bg-brand-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-teal-600 dark:accent-brand-teal-400"
        />
        <div className="flex justify-between text-[10px] text-brand-slate-400 font-bold px-1">
          <span>₹1,000</span>
          <span>₹10,000</span>
          <span>₹18,000</span>
          <span>₹25,000+</span>
        </div>
      </div>
    </div>
  );
}
