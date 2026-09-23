/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './*.js',
    './services/**/*.html',
    './services/**/*.js',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          olive: '#70805D',
          forest: '#2A3B27',
          slate: '#55738D',
          mist: '#96A7B6',
          stone: '#CBC8C4',
        },
        canvas: '#F8F9F6',
        void: '#F1F3ED',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'monospace'],
      },
      boxShadow: {
        'glow-olive': '0 0 35px -5px rgba(112, 128, 93, 0.25)',
        'glow-sm': '0 0 15px -3px rgba(112, 128, 93, 0.18)',
        'elevated': '0 20px 40px -15px rgba(42, 59, 39, 0.08)',
      }
    },
  },
  plugins: [],
};
