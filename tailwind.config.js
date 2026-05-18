/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cinema: {
          black:   '#08080f',
          dark:    '#0d0d1a',
          card:    '#12121f',
          border:  '#1e1e30',
          purple:  '#8B31E8',
          'purple-light': '#a855f7',
          'purple-dark':  '#6b21c8',
          blue:    '#3D7BFF',
          'blue-light':   '#60a5fa',
          pink:    '#E8317B',
          'pink-light':   '#f472b6',
          red:     '#e53935',
          gold:    '#f5c518',
          muted:   '#6b7280',
          subtle:  '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Outfit', 'Inter', 'ui-sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'cinema-gradient': 'linear-gradient(135deg, #8B31E8 0%, #3D7BFF 50%, #E8317B 100%)',
        'cinema-radial':   'radial-gradient(ellipse at top, #1a0a2e 0%, #08080f 60%)',
        'card-shine':      'linear-gradient(135deg, rgba(139,49,232,0.15) 0%, rgba(61,123,255,0.1) 50%, rgba(232,49,123,0.15) 100%)',
        'hero-overlay':    'linear-gradient(to right, rgba(8,8,15,0.95) 30%, rgba(8,8,15,0.5) 70%, transparent 100%)',
      },
      boxShadow: {
        'purple-glow':  '0 0 30px rgba(139,49,232,0.4)',
        'blue-glow':    '0 0 30px rgba(61,123,255,0.4)',
        'pink-glow':    '0 0 30px rgba(232,49,123,0.4)',
        'card-hover':   '0 20px 60px rgba(139,49,232,0.25)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
