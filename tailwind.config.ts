import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
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
