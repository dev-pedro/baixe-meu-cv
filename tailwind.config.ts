import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  safelist: [
    // Garante as classes dinâmicas para os toggles
    'data-[state=on]:bg-pick-1',
    'data-[state=on]:bg-pick-2',
    'data-[state=on]:bg-pick-3',
    'data-[state=on]:bg-pick-4',
    'data-[state=on]:bg-pick-5',
    'data-[state=on]:bg-pick-6',
    'data-[state=on]:bg-pick-7',
    'data-[state=on]:bg-pick-1/30',
    'data-[state=on]:bg-pick-2/30',
    'data-[state=on]:bg-pick-3/30',
    'data-[state=on]:bg-pick-4/30',
    'data-[state=on]:bg-pick-5/30',
    'data-[state=on]:bg-pick-6/30',
    'data-[state=on]:bg-pick-7/30',
    'pick-1',
    'pick-2',
    'pick-3',
    'pick-4',
    'pick-5',
    'pick-6',
    'pick-7',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // usa a variável do Next Font
        leckerli: ['var(--font-leckerli)', 'cursive'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        '1': '#ff8ac4',
        '2': '#ffa32d',
        '3': '#fede1c',
        '4': '#58cf4e',
        '5': '#45a3fb',
        '6': '#955be3',
        '7': '#fc425a',
      },
    },
  },

  plugins: [],
};

export default config;
