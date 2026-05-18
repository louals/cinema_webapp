import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Info } from 'lucide-react';
import { NOW_PLAYING } from '../data/movies';

// A premium seat SVG component
const SeatIcon = ({ status, isSelected }) => {
  let fillColor = '#1a1a1a'; // available
  let strokeColor = '#333';
  
  if (status === 'occupied') {
    fillColor = '#0a0a0a';
    strokeColor = '#1a1a1a';
  } else if (isSelected) {
    fillColor = '#e5383b';
    strokeColor = '#ff4d4f';
  }

  return (
    <svg 
      viewBox="0 0 40 40" 
      className="w-full h-full transition-colors duration-300"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base/Floor shadow */}
      <rect x="6" y="32" width="28" height="4" rx="2" fill="#000" fillOpacity={status === 'occupied' ? "0.2" : "0.4"} />
      
      {/* Backrest */}
      <path 
        d="M8 8C8 5.79086 9.79086 4 12 4H28C30.2091 4 32 5.79086 32 8V28H8V8Z" 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2"
      />
      
      {/* Seat cushion */}
      <path 
        d="M6 24C6 22.8954 6.89543 22 8 22H32C33.1046 22 34 22.8954 34 24V28C34 30.2091 32.2091 32 30 32H10C7.79086 32 6 30.2091 6 28V24Z" 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="2"
      />
      
      {/* Left armrest */}
      <rect x="4" y="14" width="6" height="16" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
      
      {/* Right armrest */}
      <rect x="30" y="14" width="6" height="16" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
      
      {/* Inner cushion detail lines */}
      {!status === 'occupied' && !isSelected && (
        <>
          <line x1="14" y1="10" x2="14" y2="20" stroke="#222" strokeWidth="1" strokeLinecap="round" />
          <line x1="20" y1="10" x2="20" y2="20" stroke="#222" strokeWidth="1" strokeLinecap="round" />
          <line x1="26" y1="10" x2="26" y2="20" stroke="#222" strokeWidth="1" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};

const SeatSelection = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const movie = NOW_PLAYING.find(m => m.id === parseInt(id)) || NOW_PLAYING[0];
  const time = searchParams.get('time') || '20:00';
  const experience = searchParams.get('exp') || 'Standard';

  // State
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);

  // Setup grid: 8 rows, 14 columns (with aisle gaps)
  const ROWS = 8;
  const COLS = 14; 
  const SEAT_PRICE = experience === 'VIP Lounge' ? 2500 : experience === 'IMAX' ? 600 : 300;

  useEffect(() => {
    window.scrollTo(0, 0);
    // Generate mock seat data
    const newSeats = [];
    for (let r = 0; r < ROWS; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      for (let c = 1; c <= COLS; c++) {
        // Create an aisle by skipping columns 4 and 11
        if (c === 4 || c === 11) continue;

        // Randomly make some seats occupied
        // Higher chance of being occupied in the center
        const isCenter = c > 4 && c < 11 && r > 2 && r < 6;
        const occupiedChance = isCenter ? 0.6 : 0.2;
        const isOccupied = Math.random() < occupiedChance;

        newSeats.push({
          id: `${rowLabel}${c}`,
          row: rowLabel,
          col: c,
          status: isOccupied ? 'occupied' : 'available'
        });
      }
    }
    setSeatData(newSeats);
  }, []);

  const toggleSeat = (seatId) => {
    const seat = seatData.find(s => s.id === seatId);
    if (seat.status === 'occupied') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 8) return; // Limit to 8 seats
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const totalPrice = (selectedSeats.length * SEAT_PRICE);

  // Group seats by row for easier rendering
  const seatsByRow = seatData.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0a0a0a] font-sans selection:bg-[#e5383b] selection:text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Changer de séance
            </button>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              {movie.title}
            </h1>
          </div>
          
          <div className="text-left md:text-right">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1">
              Aujourd'hui • {time}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#e5383b]">
                {experience}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          
          {/* Seat Map Area */}
          <div className="flex flex-col">
            
            {/* Curved Screen Element */}
            <div className="relative w-full max-w-3xl mx-auto mb-20 perspective-[800px]">
              <div className="absolute inset-0 bg-[#e5383b]/20 blur-[60px] transform-gpu translate-y-8" />
              <div 
                className="w-full h-12 border-t-[4px] border-[#e5383b] shadow-[0_-10px_30px_rgba(229,56,59,0.3)]"
                style={{
                  borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                }}
              />
              <p className="text-center mt-6 text-[9px] font-bold tracking-[0.4em] uppercase text-white/30">
                Écran
              </p>
            </div>

            {/* Seat Grid */}
            <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
              <div className="min-w-[700px] flex flex-col gap-3 md:gap-4 items-center">
                {Object.entries(seatsByRow).map(([rowLabel, rowSeats]) => (
                  <div key={rowLabel} className="flex items-center gap-4 md:gap-6 w-full max-w-3xl justify-between">
                    <span className="w-6 text-[10px] font-bold text-white/30 text-right">{rowLabel}</span>
                    
                    <div className="flex-1 flex justify-between gap-1">
                      {/* Left Block (Cols 1-3) */}
                      <div className="flex gap-1 md:gap-2">
                        {rowSeats.filter(s => s.col <= 3).map(seat => (
                          <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} toggleSeat={toggleSeat} />
                        ))}
                      </div>

                      {/* Center Block (Cols 5-10) */}
                      <div className="flex gap-1 md:gap-2 mx-4 md:mx-8">
                        {rowSeats.filter(s => s.col >= 5 && s.col <= 10).map(seat => (
                          <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} toggleSeat={toggleSeat} />
                        ))}
                      </div>

                      {/* Right Block (Cols 12-14) */}
                      <div className="flex gap-1 md:gap-2">
                        {rowSeats.filter(s => s.col >= 12).map(seat => (
                          <SeatButton key={seat.id} seat={seat} isSelected={selectedSeats.includes(seat.id)} toggleSeat={toggleSeat} />
                        ))}
                      </div>
                    </div>

                    <span className="w-6 text-[10px] font-bold text-white/30 text-left">{rowLabel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-12 flex justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 border-t border-white/5 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5"><SeatIcon status="available" isSelected={false} /></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5"><SeatIcon status="available" isSelected={true} /></div>
                <span className="text-white">Sélectionné</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 opacity-40"><SeatIcon status="occupied" isSelected={false} /></div>
                <span>Occupé</span>
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:border-l lg:border-white/10 lg:pl-12">
            <div className="sticky top-28 space-y-8">
              
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Résumé de la commande</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                    <span className="text-xs text-white/50">Prix du billet</span>
                    <span className="text-sm font-bold text-white">{SEAT_PRICE} DA</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                    <span className="text-xs text-white/50">Places</span>
                    <span className="text-sm font-bold text-white">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '—'}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                    <span className="text-xs text-white/50">Taxes & Frais</span>
                    <span className="text-sm font-bold text-white">{selectedSeats.length * 200} DA</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Total</span>
                  <span className="text-4xl font-black tracking-tighter text-white">
                    {totalPrice + (selectedSeats.length * 200)} <span className="text-2xl">DA</span>
                  </span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: selectedSeats.length > 0 ? 1.02 : 1 }}
                whileTap={{ scale: selectedSeats.length > 0 ? 0.98 : 1 }}
                disabled={selectedSeats.length === 0}
                className={`w-full py-4 px-6 rounded-sm flex items-center justify-center gap-3 font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedSeats.length > 0 
                    ? 'bg-[#e5383b] hover:bg-[#ff4d4f] text-white shadow-[0_0_30px_rgba(229,56,59,0.3)]' 
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                <CreditCard size={16} />
                Continuer vers le paiement
              </motion.button>

              <div className="flex items-start gap-3 text-[10px] leading-relaxed text-white/30 bg-white/[0.02] border border-white/5 p-4 rounded-sm">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>En continuant, vous acceptez nos conditions d'utilisation. Les billets sont non remboursables dans les 2 heures précédant la séance sélectionnée.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper component for individual seats
const SeatButton = ({ seat, isSelected, toggleSeat }) => {
  const isOccupied = seat.status === 'occupied';
  
  return (
    <button
      onClick={() => toggleSeat(seat.id)}
      disabled={isOccupied}
      className={`relative w-7 h-7 md:w-9 md:h-9 transition-transform duration-300 focus:outline-none group ${
        isOccupied ? 'cursor-not-allowed' : 'hover:scale-110'
      }`}
      aria-label={`Seat ${seat.id} ${isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}`}
    >
      <SeatIcon status={seat.status} isSelected={isSelected} />
      
      {/* Tooltip on hover */}
      {!isOccupied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#222] text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10">
          {seat.id}
        </span>
      )}
    </button>
  );
};

export default SeatSelection;
