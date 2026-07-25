import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Pages
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import SavedTripsPage from './pages/SavedTripsPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="/place/:id" element={<PlaceDetailPage />} />
            <Route path="/saved" element={<SavedTripsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
