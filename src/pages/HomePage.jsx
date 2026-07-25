import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import DestinationGrid from '../components/Home/DestinationGrid';
import { Compass, Calendar, ShieldCheck, Heart } from 'lucide-react';

export default function HomePage() {
  const highlights = [
    {
      title: 'Dynamic Route Sequence',
      desc: 'Visualize attraction links and distance routes automatically based on your time constraints.',
      icon: Compass
    },
    {
      title: 'Smart Pacing',
      desc: 'Optimized travel plans tailored to solo, family, friends, or budget preferences.',
      icon: Calendar
    },
    {
      title: 'Reliable Budgets',
      desc: 'Accurate estimates of lodging, food, local transport, and actual site entry tickets.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Header */}
      <HeroSection />

      {/* Grid of Destinations */}
      <DestinationGrid />

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-center">
        <h2 className="text-3xl font-extrabold text-brand-slate-900 dark:text-white mb-3">
          Why Plan with Us?
        </h2>
        <p className="text-brand-slate-600 dark:text-brand-slate-400 max-w-xl mx-auto mb-10">
          Skip manual hours searching forum listings and blogs. Our planner coordinates distance maps and travel times instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border border-brand-slate-200 dark:border-brand-slate-800 bg-white dark:bg-brand-slate-900/50 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-brand-teal-50 dark:bg-brand-slate-800 text-brand-teal-600 dark:text-brand-teal-400 rounded-xl w-fit">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
