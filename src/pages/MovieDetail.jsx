import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Ticket, ArrowLeft, Heart, X,
  ChevronRight, Star, Clock, Users, Film
} from 'lucide-react';
import { NOW_PLAYING, COMING_SOON } from '../data/movies';

/* ── tiny helpers ── */
const getInitials = (name = '') =>
  name.split(/[\s&]+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─────────────────────────────────────────── */
const MovieDetail = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [movie, setMovie]         = useState(null);
  const [liked, setLiked]         = useState(false);
  const [trailerOpen, setTrailer] = useState(false);

  const allMovies = [...NOW_PLAYING, ...COMING_SOON];

  useEffect(() => {
    const found = allMovies.find(m => m.id === parseInt(id));
    found ? setMovie(found) : navigate('/movies');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!movie) return <div className="min-h-screen bg-[#0a0a0a]" />;

  const isNowPlaying = NOW_PLAYING.some(m => m.id === movie.id);
  const related = allMovies
    .filter(m => m.id !== movie.id && m.genre?.some(g => movie.genre?.includes(g)))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ══════════════════════════════════════
          HERO — full-bleed backdrop
      ══════════════════════════════════════ */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={movie.backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* vignette — only bottom + left, very dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />

        {/* back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-28 left-6 md:left-16 z-20
            w-10 h-10 border border-white/20 rounded-full
            flex items-center justify-center text-white/70
            hover:text-white hover:border-white transition-all duration-200"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Hero text — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10
          max-w-[1400px] mx-auto px-6 md:px-16 pb-14">

          {/* status pill */}
          <motion.div {...fadeUp(0.1)} className="mb-4 flex items-center gap-3">
            {isNowPlaying ? (
              <span className="inline-flex items-center gap-2 text-[11px] font-bold
                uppercase tracking-[0.18em] text-[#e5383b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5383b] animate-pulse" />
                À l'affiche
              </span>
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                Prochainement · {movie.releaseDate}
              </span>
            )}
          </motion.div>

          {/* title */}
          <motion.h1
            {...fadeUp(0.18)}
            className="font-display font-black text-5xl sm:text-7xl md:text-[5.5rem]
              leading-[0.92] text-white mb-6 max-w-4xl"
          >
            {movie.title}
          </motion.h1>

          {/* genre + rating row */}
          <motion.div {...fadeUp(0.26)} className="flex flex-wrap items-center gap-2 mb-8">
            <span className="px-2.5 py-0.5 border border-white/25 rounded text-[11px]
              font-bold text-white/70 uppercase tracking-wider">
              {movie.rating}
            </span>
            <span className="text-white/25 text-sm">·</span>
            {movie.genre?.map((g, i) => (
              <React.Fragment key={g}>
                <span className="text-white/60 text-sm font-medium">{g}</span>
                {i < movie.genre.length - 1 && <span className="text-white/25">·</span>}
              </React.Fragment>
            ))}
            {movie.duration && (
              <>
                <span className="text-white/25">·</span>
                <span className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Clock size={13} />
                  {movie.duration}
                </span>
              </>
            )}
            {movie.score && (
              <>
                <span className="text-white/25">·</span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm font-bold">
                  <Star size={13} fill="white" className="text-white" />
                  {movie.score}
                </span>
              </>
            )}
          </motion.div>

          {/* actions */}
          <motion.div {...fadeUp(0.34)} className="flex flex-wrap items-center gap-3">
            {isNowPlaying && (
              <Link
                to={`/book/${movie.id}/seats`}
                className="inline-flex items-center gap-2.5 bg-[#e5383b] hover:bg-[#c0282b]
                  text-white font-bold text-sm uppercase tracking-[0.1em] px-8 py-3.5
                  rounded transition-colors duration-200"
              >
                <Ticket size={18} />
                Book Tickets
              </Link>
            )}
            <button
              onClick={() => setTrailer(true)}
              className="inline-flex items-center gap-2.5 border border-white/25
                hover:border-white text-white/70 hover:text-white font-bold text-sm
                uppercase tracking-[0.1em] px-8 py-3.5 rounded transition-all duration-200"
            >
              <Play size={16} fill="currentColor" />
              Bande-annonce
            </button>
            <button
              onClick={() => setLiked(p => !p)}
              className={`w-12 h-12 border rounded flex items-center justify-center
                transition-all duration-200
                ${liked
                  ? 'border-[#e5383b] text-[#e5383b]'
                  : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white'
                }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTENT BODY
      ══════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* synopsis */}
            <motion.section
              {...fadeUp(0)} viewport={{ once: true }}
              className="mb-14"
            >
              <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold
                text-white/40 mb-5">Synopsis</h2>
              <p className="text-white/80 text-lg leading-8 max-w-3xl font-light">
                {movie.description}
              </p>
            </motion.section>

            {/* divider */}
            <div className="border-t border-white/8 mb-14" />

            {/* crew + cast grid */}
            <motion.section
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14"
            >
              <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold
                text-white/40 mb-8">Casting & Équipe</h2>

              <div className="space-y-0 divide-y divide-white/[0.06]">
                {/* Director row */}
                <div className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/8 border border-white/10
                      flex items-center justify-center flex-shrink-0">
                      <span className="text-white/60 text-xs font-bold">
                        {getInitials(movie.director)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{movie.director || 'TBA'}</p>
                      <p className="text-white/35 text-xs mt-0.5 uppercase tracking-wider font-medium">Réalisateur</p>
                    </div>
                  </div>
                  <Film size={15} className="text-white/20" />
                </div>

                {/* Cast rows */}
                {movie.cast?.map((actor, i) => (
                  <motion.div
                    key={actor}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center justify-between py-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/8
                        flex items-center justify-center flex-shrink-0 group-hover:border-white/20
                        transition-colors">
                        <span className="text-white/50 text-xs font-bold group-hover:text-white/80
                          transition-colors">
                          {getInitials(actor)}
                        </span>
                      </div>
                      <p className="text-white/75 group-hover:text-white font-medium text-sm
                        transition-colors">
                        {actor}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-white/15 group-hover:text-white/40
                      transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* divider */}
            <div className="border-t border-white/8 mb-14" />

            {/* Formats */}
            <motion.section
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold
                text-white/40 mb-8">Disponible en</h2>

              <div className="flex flex-wrap gap-3">
                {movie.experiences?.map(exp => (
                  <div
                    key={exp}
                    className="px-5 py-3 border border-white/15 rounded
                      text-white/60 text-sm font-bold uppercase tracking-[0.1em]
                      hover:border-white/40 hover:text-white transition-all duration-200
                      cursor-pointer"
                  >
                    {exp}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* ── RIGHT SIDEBAR: Poster + quick facts ── */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 self-start"
          >
            {/* Poster */}
            <div className="aspect-[2/3] w-full overflow-hidden rounded mb-8 border border-white/8">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick facts */}
            <div className="space-y-0 divide-y divide-white/[0.07]">
              {[
                { label: 'Classification', value: movie.rating },
                { label: 'Durée', value: movie.duration || 'À déterminer' },
                { label: 'Note',    value: movie.score ? `${movie.score} / 10` : 'N/A' },
                { label: 'Sortie',  value: movie.releaseDate || 'En salles' },
                { label: 'Langue', value: 'Français (VF)' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3.5">
                  <span className="text-white/35 text-xs uppercase tracking-widest font-bold">
                    {label}
                  </span>
                  <span className="text-white/80 text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            {isNowPlaying && (
              <Link
                to={`/book/${movie.id}/seats`}
                className="mt-8 w-full flex items-center justify-center gap-2.5
                  bg-[#e5383b] hover:bg-[#c0282b] text-white font-bold text-sm
                  uppercase tracking-[0.12em] py-4 rounded transition-colors duration-200"
              >
                <Ticket size={17} />
                Réserver
              </Link>
            )}
          </motion.aside>

        </div>

        {/* ══════════════════════════════════════
            MORE LIKE THIS
        ══════════════════════════════════════ */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-6 pb-24 border-t border-white/8 pt-14"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40">
                Similaires
              </h2>
              <Link to="/movies"
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40
                  hover:text-white transition-colors flex items-center gap-1">
                Voir tout <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <Link to={`/movies/${m.id}`} className="block group">
                    <div className="aspect-[2/3] overflow-hidden rounded mb-4
                      border border-white/6 group-hover:border-white/20
                      transition-colors duration-300">
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="w-full h-full object-cover
                          transition-transform duration-500 group-hover:scale-104"
                      />
                    </div>
                    <p className="text-white/80 group-hover:text-white font-semibold
                      text-sm leading-snug transition-colors mb-1.5 line-clamp-2">
                      {m.title}
                    </p>
                    <p className="text-white/30 text-xs uppercase tracking-wider font-medium">
                      {m.genre?.slice(0, 2).join(' · ')}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* ══════════════════════════════════════
          TRAILER MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            onClick={() => setTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-[#111]
                border border-white/10 rounded flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 border border-white/20 rounded-full
                  flex items-center justify-center mx-auto mb-5">
                  <Play size={28} fill="white" className="text-white ml-1" />
                </div>
                <p className="text-white/50 text-sm uppercase tracking-[0.15em] font-bold">
                  Bande-annonce prochainement
                </p>
              </div>
              <button
                onClick={() => setTrailer(false)}
                className="absolute top-4 right-4 w-9 h-9 border border-white/15
                  flex items-center justify-center text-white/50 hover:text-white
                  hover:border-white/40 rounded transition-all"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDetail;
