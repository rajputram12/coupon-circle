import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3'
        },
        accent: {
          500: '#16a34a'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(79, 70, 229, 0.08)'
      }
    }
  },
  plugins: [],
};

export default config;
