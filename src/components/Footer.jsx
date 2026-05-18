import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#080808] border-t border-white/6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/6">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 bg-[#e5383b] flex items-center justify-center rounded-sm">
                <span className="text-white font-black text-[11px] tracking-tight">TMV</span>
              </div>
              <span className="text-white font-black text-base uppercase tracking-[0.15em]">Cinémas</span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-[220px]">
              Expériences cinéma premium. Chaque siège, chaque écran, chaque histoire.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Explorer</h4>
            <ul className="space-y-3">
              {[
                { label: 'À l\'affiche', to: '/movies' },
                { label: 'Prochainement', to: '/movies' },
                { label: 'Séances', to: '/showtimes' },
                { label: 'Expériences', to: '/experiences' },
                { label: 'Cartes Cadeaux', to: '#' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Légal</h4>
            <ul className="space-y-3">
              {[
                'Conditions d\'utilisation',
                'Politique de confidentialité',
                'Politique de billetterie',
                'Accessibilité',
                'Préférences des cookies',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-white/25" />
                <span>3eme étage, Garden City Mall, 2 Rte de Ouled Fayet, Dély Ibrahim 16302</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone size={14} className="shrink-0 text-white/25" />
                <span>023 07 66 73</span>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} TMV Cinémas. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            {/* Payment method placeholders */}
            {['VISA', 'MC', 'AMEX'].map((card) => (
              <div key={card} className="h-5 px-2 border border-white/10 rounded-sm flex items-center justify-center">
                <span className="text-[9px] font-bold text-white/20 tracking-wider">{card}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
