/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ogg: {
          50: '#FFF7F0',
          100: '#FFEAD5',
          200: '#FFD2AA',
          300: '#FFB77A',
          400: '#FF9A4A',
          500: '#FF7A00',
          600: '#FF6A00',
          700: '#CC5400',
        },
        navy: {
          DEFAULT: '#04102B',
          50: '#E9F0F8',
          100: '#C9D9EF',
        },
        neutral: {
          100: '#F5F6F8',
          200: '#E9ECEF',
          300: '#CBD2DA'
        }
      },
      boxShadow: {
        'soft-md': '0 10px 30px rgba(17,24,39,0.08)'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}

