import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f7f3ec',
        ink: '#1f1f1a',
        muted: '#6b6a64',
        accent: '#5a4b3d'
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(29, 22, 16, 0.2)'
      }
    }
  },
  plugins: []
};

export default config;
