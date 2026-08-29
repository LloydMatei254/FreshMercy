/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fresh Mercy Brand Palette
        cream: {
          DEFAULT: '#FAF6EF',
          50:  '#FDFAF5',
          100: '#FAF6EF',
          200: '#F5EDD9',
          300: '#EFE3C4',
        },
        parchment: {
          DEFAULT: '#F0E8D5',
          50:  '#F7F2E6',
          100: '#F0E8D5',
          200: '#E4D5B4',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FBF5E4',
          100: '#F4E5B4',
          200: '#E8CC77',
          300: '#D9B55A',
          400: '#C9A84C',
          500: '#B8922E',
          600: '#9A7A26',
          700: '#7C621E',
          800: '#5E4A16',
          900: '#3F320E',
        },
        olive: {
          DEFAULT: '#4A6741',
          50:  '#EEF3EC',
          100: '#D5E3D1',
          200: '#AAC8A2',
          300: '#7FAD73',
          400: '#5A8751',
          500: '#4A6741',
          600: '#3D5636',
          700: '#30452B',
          800: '#233420',
          900: '#162315',
        },
        forest: {
          DEFAULT: '#2D4A2D',
          50:  '#EBF0EB',
          100: '#C9D8C9',
          200: '#93B193',
          300: '#5D8A5D',
          400: '#3D6B3D',
          500: '#2D4A2D',
          600: '#253E25',
          700: '#1C321C',
          800: '#142514',
          900: '#0B180B',
        },
        // Semantic aliases used in components
        brand: {
          primary:   '#2D4A2D',  // forest
          secondary: '#C9A84C',  // gold
          accent:    '#4A6741',  // olive
          bg:        '#FAF6EF',  // cream
          surface:   '#F0E8D5',  // parchment
        },
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:   ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)',   { lineHeight: '1.05', fontWeight: '900' }],
        'display-lg': ['clamp(2.2rem, 5vw, 4rem)', { lineHeight: '1.1',  fontWeight: '700' }],
        'display-md': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['clamp(1.2rem, 2.5vw, 1.8rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft':   '0 2px 12px rgba(45,74,45,0.08)',
        'card':   '0 4px 24px rgba(45,74,45,0.10)',
        'lifted': '0 12px 48px rgba(45,74,45,0.16)',
        'gold':   '0 6px 20px rgba(201,168,76,0.35)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'fade-down': 'fadeDown 0.6s ease forwards',
        'shimmer':   'shimmer 2s ease-in-out infinite',
        'pulse-soft':'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.03)' },
        },
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(160deg, #1A3020 0%, #2D4A2D 45%, #3A5C3A 70%, #1E2D1E 100%)',
        'gold-gradient':    'linear-gradient(135deg, #C9A84C 0%, #E2C97E 50%, #C9A84C 100%)',
        'section-gradient': 'linear-gradient(180deg, #FAF6EF 0%, #F0E8D5 100%)',
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
