import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EXPERIENCES } from '../data/movies';
import { ArrowRight, Ticket } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// Map experience IDs to premium Unsplash/Stock URLs
const EXPERIENCE_IMAGES = {
  imax: "https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/24822959/oppenheimer_imax.jpg?w=1200&h=628&fit=crop",
  '4dx': "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80",
  vip: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1600&q=80",
};

const Experiences = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#0a0a0a] selection:bg-[#e5383b] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-display font-black mb-6 text-white uppercase tracking-tighter"
          >
            Formats Premium
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Découvrez une nouvelle dimension de divertissement. Nous avons équipé nos salles des dernières technologies et d'un confort absolu pour garantir que votre soirée cinéma soit inoubliable.
          </motion.p>
        </div>

        <div className="space-y-32">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
              
              {/* Image Container */}
              <motion.div 
                {...fadeUp(0)}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="aspect-[4/3] rounded-sm overflow-hidden relative border border-white/10 group-hover:border-white/20 transition-colors duration-500">
                  <img 
                    src={EXPERIENCE_IMAGES[exp.id] || EXPERIENCE_IMAGES['imax']} 
                    alt={exp.name}
                    className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                  />
                  {/* Gradients to blend with dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* Decorative Accent */}
                <div className={`absolute -bottom-4 ${index % 2 === 1 ? '-left-4' : '-right-4'} w-24 h-24 bg-[#e5383b]/10 blur-2xl rounded-full pointer-events-none`} />
              </motion.div>

              {/* Content */}
              <motion.div 
                {...fadeUp(0.2)}
                className="w-full lg:w-1/2"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[2px] bg-[#e5383b]" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#e5383b]">
                    {exp.tagline}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
                  {exp.name}
                </h2>
                
                <p className="text-sm md:text-base text-white/50 mb-10 leading-relaxed max-w-lg">
                  {exp.description}
                  {exp.id === 'imax' && " With crystal-clear laser projection and next-generation precision sound, you don't just watch an IMAX movie—you become part of it."}
                  {exp.id === '4dx' && " Synchronized to the film's action, our specialized motion seats and environmental effects turn movie-watching into an exhilarating ride."}
                  {exp.id === 'vip' && " Arrive early to enjoy hand-crafted cocktails in our private lounge, then settle into ultra-plush seating where our staff brings gourmet meals directly to your seat."}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {exp.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e5383b]/50" />
                      <span className="text-xs font-bold text-white/70 uppercase tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Animated Button */}
                <AnimatedBookButton name={exp.name} />
                
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// Extracted Animated Button to manage hover state cleanly
const AnimatedBookButton = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/showtimes"
      className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm relative overflow-hidden bg-white/5 border border-white/10 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top-to-bottom red wipe overlay */}
      <motion.span
        className="absolute inset-0 bg-[#e5383b]"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'top' }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        <Ticket size={16} className={isHovered ? 'text-white' : 'text-white/50'} />
        Trouver des séances {name}
        <ArrowRight 
          size={14} 
          className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 text-white' : 'text-white/50'}`} 
        />
      </span>
    </Link>
  );
};

export default Experiences;
