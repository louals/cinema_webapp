import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, ChevronLeft, Ticket } from 'lucide-react';
import { NOW_PLAYING } from '../data/movies';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = NOW_PLAYING.slice(0, 7);
  const currentMovie = featured[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featured.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">

      {/* Background */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={currentMovie.backdrop}
            alt=""
            className="w-full h-full object-cover scale-[1.04] animate-[hero-drift_18s_ease-in-out_infinite]"
          />
          {/* Dark overlays — bottom heavy, left heavy */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-10 md:pb-12">
          <div className="flex flex-col lg:flex-row items-end gap-10 lg:gap-0 justify-between">

            {/* Left: Title + actions */}
            <div className="flex-1 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Status pill */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5383b] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5383b]">À l'affiche</span>
                  </div>

                  {/* Genre tags */}
                  <div className="flex items-center gap-2 mb-4">
                    {currentMovie.genre?.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40"
                      >
                        {g}
                      </span>
                    )).reduce((acc, el, i) => {
                      if (i === 0) return [el];
                      return [...acc, <span key={`dot-${i}`} className="text-white/20">·</span>, el];
                    }, [])}
                  </div>

                  <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-white mb-6">
                    {currentMovie.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-7 text-white/40 text-xs font-medium">
                    <span className="border border-white/20 px-2 py-0.5 text-white/60 font-bold uppercase text-[10px] tracking-wider">{currentMovie.rating}</span>
                    {currentMovie.duration && <span>{currentMovie.duration}</span>}
                    {currentMovie.score && (
                      <>
                        <span>·</span>
                        <span className="text-white/70 font-bold">★ {currentMovie.score}</span>
                      </>
                    )}
                  </div>

                  {/* CTA Row */}
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/book/${currentMovie.id}/seats`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#e5383b] hover:bg-[#c0282b] text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded transition-colors duration-200"
                    >
                      <Ticket size={14} />
                      Réserver des billets
                    </Link>
                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-white/60 hover:text-white font-bold text-[11px] uppercase tracking-[0.15em] rounded transition-all duration-200">
                      <Play size={13} fill="currentColor" />
                      Bande-annonce
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Poster carousel */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-8 h-8 border border-white/15 rounded flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all shrink-0"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-2 md:gap-3">
                {featured.map((movie, idx) => (
                  <button
                    key={movie.id}
                    onClick={() => setCurrentIndex(idx)}
                    className="relative flex flex-col gap-2 transition-all duration-400"
                  >
                    <div
                      className={`w-14 h-20 md:w-16 md:h-24 lg:w-20 lg:h-30 overflow-hidden rounded-sm relative transition-all duration-400 ${
                        idx === currentIndex ? 'ring-1 ring-white/50' : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <img src={movie.poster} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className={`h-0.5 w-full rounded-full transition-all duration-400 ${
                      idx === currentIndex ? 'bg-[#e5383b]' : 'bg-white/10'
                    }`} />
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-8 h-8 border border-white/15 rounded flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all shrink-0"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-drift {
          0%, 100% { transform: scale(1.04) translate(0, 0); }
          50% { transform: scale(1.08) translate(-0.5%, -0.5%); }
        }
      `}} />
    </div>
  );
};

export default HeroSlider;
