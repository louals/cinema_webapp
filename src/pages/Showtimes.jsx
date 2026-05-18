import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Ticket } from 'lucide-react';
import { NOW_PLAYING, LOCATIONS } from '../data/movies';

const Showtimes = () => {
  const [searchParams] = useSearchParams();
  const initialMovieId = searchParams.get('movie') ? parseInt(searchParams.get('movie')) : NOW_PLAYING[0].id;

  const [selectedMovie, setSelectedMovie] = useState(initialMovieId);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].id);

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      index: i,
      dayName: i === 0 ? 'Aujourd\'hui' : i === 1 ? 'Demain' : d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', ''),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
    };
  });

  const generateTimes = (exp) => {
    if (exp === 'IMAX') return ['13:00', '16:30', '20:00', '23:15'];
    if (exp === '4DX') return ['14:15', '18:00', '21:30'];
    if (exp === 'VIP Lounge') return ['19:00', '22:00'];
    return ['10:30', '11:45', '13:15', '14:30', '16:00', '17:15', '18:45', '20:00', '21:30', '22:45'];
  };

  const movie = NOW_PLAYING.find(m => m.id === selectedMovie) || NOW_PLAYING[0];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Page Header */}
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">TMV Cinemas</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[0.92] mb-6">
            Séances
          </h1>
          <div className="h-px w-full bg-white/6 mt-8" />
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Movie select */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
              Sélectionner un film
            </label>
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(parseInt(e.target.value))}
              className="w-full bg-[#111] border border-white/8 rounded-sm py-3 px-4 text-white text-sm appearance-none focus:outline-none focus:border-white/20 transition-all cursor-pointer"
            >
              {NOW_PLAYING.map(m => (
                <option key={m.id} value={m.id} className="bg-[#111]">{m.title}</option>
              ))}
            </select>
          </div>

          {/* Location select */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
              Sélectionner un cinéma
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={15} />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(parseInt(e.target.value))}
                className="w-full bg-[#111] border border-white/8 rounded-sm py-3 pl-10 pr-4 text-white text-sm appearance-none focus:outline-none focus:border-white/20 transition-all cursor-pointer"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id} className="bg-[#111]">{loc.name} ({loc.distance})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {dates.map(date => (
            <button
              key={date.index}
              onClick={() => setSelectedDate(date.index)}
              className={`flex-shrink-0 w-20 h-20 rounded-sm flex flex-col items-center justify-center transition-all border ${
                selectedDate === date.index
                  ? 'bg-[#e5383b] border-[#e5383b] text-white'
                  : 'bg-[#0f0f0f] border-white/8 text-white/40 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-[9px] uppercase font-bold tracking-[0.15em] mb-0.5">{date.dayName}</span>
              <span className="text-2xl font-display font-black leading-none">{date.dateNum}</span>
              <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">{date.month}</span>
            </button>
          ))}
        </div>

        {/* Movie info + Showtimes */}
        <div className="border border-white/8 rounded-sm overflow-hidden">

          {/* Movie header */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 border-b border-white/8 bg-[#0d0d0d]">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 md:w-32 aspect-[2/3] object-cover rounded-sm border border-white/8 flex-shrink-0 mx-auto md:mx-0"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5383b] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5383b]">À l'affiche</span>
              </div>
              <h2 className="font-display font-black text-2xl md:text-4xl text-white mb-3 leading-tight">{movie.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-white/35 text-xs mb-4">
                <span className="border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold text-white/50">{movie.rating}</span>
                {movie.duration && <span>{movie.duration}</span>}
                {movie.genre && <>
                  <span>·</span>
                  <span>{movie.genre.slice(0, 3).join(', ')}</span>
                </>}
              </div>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2 max-w-xl">{movie.description}</p>
            </div>
          </div>

          {/* Showtimes by experience */}
          <div className="p-6 md:p-8 space-y-8">
            {movie.experiences?.map((exp, i) => (
              <AnimatePresence key={exp}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`pb-8 ${i < movie.experiences.length - 1 ? 'border-b border-white/6' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em]">{exp}</h3>
                    {exp !== 'Standard' && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] border border-white/20 text-white/50 px-1.5 py-0.5">
                        Premium
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {generateTimes(exp).map(time => (
                      <Link
                        key={time}
                        to={`/book/${movie.id}/seats?time=${time}&exp=${exp}`}
                        className="px-5 py-2.5 border border-white/10 rounded-sm text-sm font-bold text-white/55 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 group flex items-center gap-2"
                      >
                        {time}
                        <ChevronRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          {/* Book CTA bar */}
          <div className="px-6 md:px-8 py-5 border-t border-white/8 bg-[#0d0d0d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs font-medium">
              Sélectionnez une séance ci-dessus pour choisir vos places
            </p>
            <Link
              to={`/book/${movie.id}/seats`}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e5383b] hover:bg-[#c0282b] text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded-sm transition-colors"
            >
              <Ticket size={14} />
              Réservation rapide
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Showtimes;
