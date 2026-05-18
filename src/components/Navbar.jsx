import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Ticket, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NOW_PLAYING, COMING_SOON } from '../data/movies';

// Merge all movies for search
const ALL_MOVIES = [...NOW_PLAYING, ...COMING_SOON];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isBookHovered, setIsBookHovered] = useState(false);

  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setFilteredMovies([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Default suggestions = top 3 NOW_PLAYING; filter on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Show featured picks by default when search is open
      setFilteredMovies(NOW_PLAYING.slice(0, 3));
    } else {
      const filtered = ALL_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3);
      setFilteredMovies(filtered);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: 'Films', path: '/movies' },
    { name: 'Séances', path: '/showtimes' },
    { name: 'Expériences', path: '/experiences' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between relative">

        {/* Logo — hover: square rotates 45° into a lozenge/diamond */}
        <Link to="/" className="flex items-center gap-2.5 group z-10">
          <motion.div
            className="w-7 h-7 bg-[#e5383b] flex items-center justify-center rounded-sm"
            whileHover={{ rotate: 45 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <motion.span
              className="text-white font-black text-[11px] tracking-tight block"
              whileHover={{ rotate: -45 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              TMV
            </motion.span>
          </motion.div>
          <span className="text-white font-black text-base uppercase tracking-[0.15em] group-hover:text-white/80 transition-colors duration-200">
            Cinémas
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200 relative py-1 ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-white/45 hover:text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#e5383b]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 z-10">

          {/* Animated Inline Search with IMDb-style suggestions */}
          <div ref={searchRef} className="relative hidden sm:flex items-center justify-end">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden mr-2 relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher des films..."
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-[11px] font-medium tracking-wider text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery('');
                  setFilteredMovies([]);
                }
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* IMDb-style Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchOpen && filteredMovies.length > 0 && filteredMovies[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full right-0 mt-3 w-[340px] bg-[#111] border border-white/10 rounded-md shadow-2xl overflow-hidden"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' }}
                >
                  {/* Header */}
                  <div className="px-4 py-2.5 border-b border-white/6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {searchQuery.trim() === '' ? 'À l\'affiche' : 'Meilleurs résultats'}
                    </span>
                  </div>

                  {filteredMovies.map((movie, idx) => (
                    <Link
                      key={movie.id}
                      to={`/movies/${movie.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        setFilteredMovies([]);
                      }}
                      className={`flex items-center gap-3.5 px-4 py-3 hover:bg-white/[0.04] transition-colors duration-150 group/item ${
                        idx < filteredMovies.length - 1 ? 'border-b border-white/5' : ''
                      }`}
                    >
                      {/* Poster thumbnail */}
                      <div className="relative flex-shrink-0 w-10 h-[60px] rounded-sm overflow-hidden bg-[#1a1a1a]">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-white/85 group-hover/item:text-white transition-colors truncate leading-tight">
                          {movie.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {movie.genre && (
                            <span className="text-[10px] text-white/35 font-medium tracking-wide truncate">
                              {movie.genre.slice(0, 2).join(' · ')}
                            </span>
                          )}
                          <span className="text-white/15">·</span>
                          <span className="text-[10px] text-white/35 font-medium shrink-0">
                            {movie.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          {movie.score && (
                            <div className="flex items-center gap-1">
                              <Star size={9} className="text-[#f5c518] fill-[#f5c518]" />
                              <span className="text-[10px] font-bold text-[#f5c518]">{movie.score}</span>
                            </div>
                          )}
                          {movie.duration && movie.duration !== 'TBD' && (
                            <div className="flex items-center gap-1">
                              <Clock size={9} className="text-white/25" />
                              <span className="text-[10px] text-white/30 font-medium">{movie.duration}</span>
                            </div>
                          )}
                          {/* NOW SHOWING / COMING SOON badge */}
                          <span className={`text-[8px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[2px] ${
                            movie.badge === 'COMING SOON' || movie.releaseDate
                              ? 'bg-white/8 text-white/40'
                              : 'bg-[#e5383b]/15 text-[#e5383b]'
                          }`}>
                            {movie.releaseDate ? `${movie.releaseDate}` : 'À l\'affiche'}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-3.5 h-3.5 text-white/15 group-hover/item:text-white/40 transition-colors shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  ))}

                  {/* Footer */}
                  <div className="px-4 py-2.5 border-t border-white/6 bg-white/[0.02]">
                    <Link
                      to="/movies"
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); setFilteredMovies([]); }}
                      className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e5383b] hover:text-[#ff6b6e] transition-colors"
                    >
                      Voir tous les films →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book Now Button — top-to-bottom fill wipe on hover */}
          <Link
            to="/showtimes"
            id="book-now-btn"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded relative overflow-hidden shadow-lg shadow-[#e5383b]/10"
            onMouseEnter={() => setIsBookHovered(true)}
            onMouseLeave={() => setIsBookHovered(false)}
          >
            {/* Base background */}
            <span className="absolute inset-0 bg-[#e5383b]" />

            {/* Top-to-bottom wipe overlay */}
            <motion.span
              className="absolute inset-0 bg-[#000000]"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: isBookHovered ? 1 : 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top' }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <Ticket size={14} />
              Réserver
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[60] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/8">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#e5383b] flex items-center justify-center rounded-sm">
                  <span className="text-white font-black text-[11px] tracking-tight">TMV</span>
                </div>
                <span className="text-white font-black text-base uppercase tracking-[0.15em]">Cinémas</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-8 pb-10 gap-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-2xl font-black uppercase tracking-tighter border-b border-white/6 text-white/40 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-8"
              >
                <Link
                  to="/showtimes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#e5383b] hover:bg-[#c0282b] text-white font-bold uppercase tracking-[0.15em] rounded transition-colors text-sm"
                >
                  <Ticket size={16} />
                  Réserver des billets
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;