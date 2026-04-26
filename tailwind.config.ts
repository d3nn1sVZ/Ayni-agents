import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          void:    '#05040A',
          violet:  '#7C3AED',
          vsoft:   '#8B5CF6',
          gold:    '#E8B547',
          emerald: '#10B981',
          sky:     '#38BDF8',
          cream:   '#EDE9E1',
          rose:    '#F472B6',
        },
      },
      keyframes: {
        'slide-in':    { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':     { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up':     { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'twinkle':     { '0%, 100%': { opacity: '0.15' }, '50%': { opacity: '0.9' } },
        'float':       { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        'glow-pulse':  { '0%, 100%': { opacity: '0.5', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.05)' } },
        'chest-glow':  { '0%, 100%': { opacity: '0.7', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.35)' } },
        'orbit':       { from: { transform: 'rotate(0deg) translateX(28px) rotate(0deg)' }, to: { transform: 'rotate(360deg) translateX(28px) rotate(-360deg)' } },
        'particle':    { '0%': { opacity: '1', transform: 'translateY(0) scale(1)' }, '100%': { opacity: '0', transform: 'translateY(-30px) scale(0.3)' } },
        'number-in':   { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'slide-in':   'slide-in 0.28s ease-out both',
        'fade-in':    'fade-in 0.5s ease-out both',
        'fade-up':    'fade-up 0.6s ease-out both',
        'twinkle':    'twinkle var(--tw-duration, 4s) ease-in-out infinite',
        'float':      'float 5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'chest-glow': 'chest-glow 1.4s ease-in-out infinite',
        'orbit':      'orbit 8s linear infinite',
        'particle':   'particle 1.5s ease-out forwards',
        'number-in':  'number-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
