import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f0eee9',
        ink: '#1A1714',
        'ink-2': 'rgba(60,50,40,0.7)',
        'ink-3': 'rgba(60,50,40,0.45)',
        ai: '#3F7FE0',
        'ai-light': '#8AB8FF',
        'ai-dark': '#1A4FA8',
        chat: '#A381DC',
        'chat-light': '#D4B8FF',
        'chat-dark': '#6B4FB8',
        help: '#F18A6E',
        'help-light': '#FFC4A8',
        'help-dark': '#C85A38',
        emer: '#F0973A',
        'emer-light': '#FFD88A',
        'emer-dark': '#C86A18',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
