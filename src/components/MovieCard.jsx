import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group w-full"
    >
      <Link
        to={`/movies/${movie.id}`}
        className="block w-full"
      >
        {/* CARD WRAPPER */}
        <div className="flex flex-col h-full">
          
          {/* POSTER */}
          <div
            className="relative w-full overflow-hidden rounded-sm bg-[#111] border border-white/6 group-hover:border-white/20 transition-colors duration-300 aspect-[2/3]"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                  {movie.rating}
                </span>
              </div>
            </div>

            {/* Score badge */}
            {/* {movie.score && (
              <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                <span className="text-[10px] font-bold text-white/90">
                  ★ {movie.score}
                </span>
              </div>
            )} */}
          </div>

          {/* INFO */}
          <div className="mt-3 min-h-[52px]">
            <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200 leading-snug line-clamp-2">
              {movie.title}
            </h3>

            {movie.genre && (
              <p className="mt-1 text-[10px] uppercase tracking-wider font-medium text-white/30">
                {movie.genre.slice(0, 2).join(' · ')}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;