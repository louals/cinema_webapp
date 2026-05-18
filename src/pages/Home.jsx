import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Ticket, Film, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import MovieCard from '../components/MovieCard';
import { NOW_PLAYING, COMING_SOON } from '../data/movies';
import imax from '../../public/imax.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  const [activeTab, setActiveTab] = useState('now');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Hero */}
      <HeroSlider />

      {/* ── MOVIES SECTION ─────────────────────────── */}
      <section className="relative z-30 pt-16 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              {/* Tabs */}
              <div className="flex items-center gap-0 mb-5 border-b border-white/8 w-fit">
                {[
                  { key: 'now', label: 'À l\'affiche' },
                  { key: 'soon', label: 'Prochainement' },
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
                        layoutId="homeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#e5383b]"
                      />
                    )}
                  </button>
                ))}
              </div>

              <h2 className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
                {activeTab === 'now' ? 'Actuellement en salles' : 'Prochainement en salles'}
              </h2>
            </div>

            <Link
              to="/movies"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 hover:text-white transition-colors group"
            >
              Voir tout
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scrollable feed */}
        <div className="relative group/feed">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-2 top-[40%] -translate-y-1/2 z-20 w-10 h-10 border border-white/15 rounded bg-[#0a0a0a]/80 backdrop-blur-sm items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="px-6 md:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                ref={scrollRef}
                className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-10"
              >
                {(activeTab === 'now' ? NOW_PLAYING : COMING_SOON).map((movie, index) => (
                  <div key={movie.id} className="min-w-[150px] md:min-w-[190px] lg:min-w-[210px]">
                    <MovieCard movie={movie} index={index} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-2 top-[40%] -translate-y-1/2 z-20 w-10 h-10 border border-white/15 rounded bg-[#0a0a0a]/80 backdrop-blur-sm items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* ── EXPERIENCE BANNER ─────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-sm border border-white/8 h-[420px] md:h-[500px] group"
        >
          <img
            src={imax}
            className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
            alt="IMAX Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Format Premium</span>
            </div>
            <h3 className="font-display font-black text-4xl md:text-6xl text-white leading-[0.95] mb-5 max-w-lg">
              L'expérience<br />IMAX
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8 font-light">
              Des visuels nets au laser. Un son immersif 12 canaux. Le plus grand écran de la ville.
            </p>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-[11px] uppercase tracking-[0.15em] rounded-sm w-fit hover:bg-white/90 transition-colors"
            >
              Explorer les formats
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1 */}
          <motion.div {...fadeUp(0)} className="bg-[#0f0f0f] border border-white/6 rounded-sm p-8 hover:border-white/14 transition-colors">
            <Star className="text-white/20 mb-8" size={32} />
            <h4 className="font-display font-black text-xl text-white mb-3">Gagnez des récompenses</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Cumulez des points à chaque achat. Échangez-les contre des billets gratuits, du pop-corn et bien plus.
            </p>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
              Rejoindre le Club
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div {...fadeUp(0.07)} className="bg-[#0f0f0f] border border-white/6 rounded-sm p-8 hover:border-white/14 transition-colors">
            <Film className="text-white/20 mb-8" size={32} />
            <h4 className="font-display font-black text-xl text-white mb-3">Séances privées</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Louez la salle entière pour votre groupe. Parfait pour les événements, anniversaires et soirées d'entreprise.
            </p>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
              Réserver en privé
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Card 3 — highlighted */}
          <motion.div {...fadeUp(0.14)} className="bg-[#e5383b] rounded-sm p-8 relative overflow-hidden">
            <Calendar className="text-white/30 mb-8" size={32} />
            <h4 className="font-display font-black text-xl text-white mb-3">Pass Illimité</h4>
            <p className="text-white/75 text-sm leading-relaxed mb-8">
              Regardez autant de films que vous le souhaitez pour un tarif mensuel fixe. Sans limites.
            </p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold text-[11px] uppercase tracking-[0.12em] rounded-sm hover:bg-white/90 transition-colors">
              Obtenir le Pass
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
