import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { NOW_PLAYING, COMING_SOON } from '../data/movies';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [activeTab, setActiveTab] = useState('now-playing');
  const [searchQuery, setSearchQuery] = useState('');

  const currentMovies = activeTab === 'now-playing' ? NOW_PLAYING : COMING_SOON;

  const filteredMovies = currentMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">
            TMV Cinemas
          </p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[0.92] mb-6">
            Films
          </h1>
          <div className="h-px w-full bg-white/6 mt-8" />
        </div>

        {/* Tab bar + search row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-white/8 w-fit">
            {[
              { key: 'now-playing', label: 'À l\'affiche' },
              { key: 'coming-soon', label: 'Prochainement' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 px-1 mr-8 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  activeTab === tab.key ? 'text-white' : 'text-white/35 hover:text-white/70'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="moviesTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#e5383b]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={15} />
            <input
              type="text"
              placeholder="Rechercher par titre ou genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-sm py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all"
            />
          </div>
        </div>

        {/* Count */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-8">
          {filteredMovies.length} {filteredMovies.length === 1 ? 'Film' : 'Films'}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-10">
                {filteredMovies.map((movie, index) => (
                  <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 border border-white/6 rounded-sm">
                <Search size={40} className="mx-auto text-white/10 mb-5" />
                <h3 className="font-display font-black text-2xl text-white mb-3">Aucun résultat</h3>
                <p className="text-white/35 text-sm mb-8 max-w-xs mx-auto">
                  Aucun film ne correspond à &ldquo;{searchQuery}&rdquo;. Essayez un autre titre ou genre.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e5383b] hover:bg-[#c0282b] text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded-sm transition-colors"
                >
                  Effacer la recherche
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Movies;
