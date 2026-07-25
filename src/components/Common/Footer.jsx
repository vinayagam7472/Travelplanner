import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-slate-900 text-brand-slate-300 border-t border-brand-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-brand-teal-400 animate-spin-slow" />
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal-400 to-brand-gold">
                Explore Tamil Nadu
              </span>
            </Link>
            <p className="text-sm text-brand-slate-400">
              Discover temple architectures, pristine beaches, misty hill stations, and rich historic sites across Tamil Nadu. Create personalized itineraries in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm text-brand-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-brand-teal-400 transition-colors">Smart Planner</Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-brand-teal-400 transition-colors">Saved Itineraries</Link>
              </li>
            </ul>
          </div>

          {/* Popular Places */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Cities</h3>
            <ul className="space-y-2 text-sm text-brand-slate-400">
              <li>
                <Link to="/destination/madurai" className="hover:text-brand-teal-400 transition-colors">Madurai</Link>
              </li>
              <li>
                <Link to="/destination/ooty" className="hover:text-brand-teal-400 transition-colors">Ooty</Link>
              </li>
              <li>
                <Link to="/destination/kanyakumari" className="hover:text-brand-teal-400 transition-colors">Kanyakumari</Link>
              </li>
              <li>
                <Link to="/destination/mahabalipuram" className="hover:text-brand-teal-400 transition-colors">Mahabalipuram</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-brand-slate-800 rounded-full hover:bg-brand-teal-600 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-brand-slate-800 rounded-full hover:bg-brand-teal-600 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-brand-slate-800 rounded-full hover:bg-brand-teal-600 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-brand-slate-500">
              Official Tourism Information of Tamil Nadu. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-brand-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-slate-500">
          <p>© {new Date().getFullYear()} Explore Tamil Nadu. Designed for modern explorers.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
