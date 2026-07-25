import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Compass, Menu, X, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePlanner } from '../../context/PlannerContext';

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { savedTrips } = usePlanner();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-brand-slate-200 dark:border-brand-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Compass className="h-8 w-8 text-brand-teal-600 dark:text-brand-teal-400 group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-brand-teal-600 to-brand-gold dark:from-brand-teal-400 dark:to-brand-gold-light">
              Explore Tamil Nadu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-brand-teal-600 dark:text-brand-teal-400' 
                  : 'text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-300 dark:hover:text-brand-teal-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/planner"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/planner') 
                  ? 'text-brand-teal-600 dark:text-brand-teal-400' 
                  : 'text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-300 dark:hover:text-brand-teal-400'
              }`}
            >
              Trip Planner
            </Link>
            <Link
              to="/saved"
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/saved') 
                  ? 'text-brand-teal-600 dark:text-brand-teal-400' 
                  : 'text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-300 dark:hover:text-brand-teal-400'
              }`}
            >
              <Heart className="h-4 w-4" />
              Saved Trips
              {savedTrips.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-slate-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                  {savedTrips.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-brand-slate-100 dark:hover:bg-brand-slate-800 text-brand-slate-500 dark:text-brand-slate-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-5 w-5 text-brand-gold" /> : <Moon className="h-5 w-5 text-brand-slate-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-brand-slate-100 dark:hover:bg-brand-slate-800 text-brand-slate-500 dark:text-brand-slate-400 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5 text-brand-gold" /> : <Moon className="h-5 w-5 text-brand-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brand-slate-600 hover:text-brand-teal-600 dark:text-brand-slate-300 dark:hover:text-brand-teal-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-brand-slate-200 dark:border-brand-slate-800 py-3 px-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'bg-brand-teal-50 text-brand-teal-600 dark:bg-brand-slate-800 dark:text-brand-teal-400' 
                : 'text-brand-slate-600 hover:bg-brand-slate-50 dark:text-brand-slate-300 dark:hover:bg-brand-slate-800'
            }`}
          >
            Home
          </Link>
          <Link
            to="/planner"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-md text-base font-medium ${
              isActive('/planner') 
                ? 'bg-brand-teal-50 text-brand-teal-600 dark:bg-brand-slate-800 dark:text-brand-teal-400' 
                : 'text-brand-slate-600 hover:bg-brand-slate-50 dark:text-brand-slate-300 dark:hover:bg-brand-slate-800'
            }`}
          >
            Trip Planner
          </Link>
          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${
              isActive('/saved') 
                ? 'bg-brand-teal-50 text-brand-teal-600 dark:bg-brand-slate-800 dark:text-brand-teal-400' 
                : 'text-brand-slate-600 hover:bg-brand-slate-50 dark:text-brand-slate-300 dark:hover:bg-brand-slate-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Saved Trips
            </span>
            {savedTrips.length > 0 && (
              <span className="bg-brand-gold text-brand-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {savedTrips.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
