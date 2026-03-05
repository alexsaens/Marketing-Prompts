import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          miraclesuit: '#1a3a5c',
          venus: '#c2185b',
          vitaminA: '#00796b',
          longitude: '#283593',
        },
      },
    },
  },
  plugins: [],
};

export default config;
