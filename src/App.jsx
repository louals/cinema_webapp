import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Showtimes from './pages/Showtimes';
import Experiences from './pages/Experiences';
import SeatSelection from './pages/SeatSelection';

const NotFound = () => (
  <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-cinema-black">
    <h1 className="text-5xl font-display font-black mb-6 gradient-text">404 - Page Not Found</h1>
    <p className="text-xl text-gray-400 max-w-2xl">The page you are looking for does not exist or has been moved.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cinema-black text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/book/:id/seats" element={<SeatSelection />} />
            <Route path="/experiences" element={<Experiences />} />
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
