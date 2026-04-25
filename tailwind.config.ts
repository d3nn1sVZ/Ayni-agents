import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ayni: {
          earth: '#8B5A3C',
          sky: '#5B8FB9',
          maize: '#E8B547',
          stone: '#3A3A3A',
          cloud: '#F5F1EB',
          night: '#1A1614',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
