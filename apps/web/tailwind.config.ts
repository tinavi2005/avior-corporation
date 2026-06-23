import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px', sm: '640px', md: '768px',
      lg: '1024px', xl: '1280px', '2xl': '1536px',
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card:        { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary:     { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        wine: {
          DEFAULT: '#6b0f1a',
          dark:    '#4a0a12',
          light:   '#8b1a28',
          pale:    '#fdf2f4',
        },
        avior: {
          black: '#0d0d0d',
          dark:  '#111111',
          mid:   '#1a1a1a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in-up':    { from: { opacity:'0', transform:'translateY(28px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        'fade-in':       { from: { opacity:'0' }, to: { opacity:'1' } },
        'slide-left':    { from: { opacity:'0', transform:'translateX(-36px)' }, to: { opacity:'1', transform:'translateX(0)' } },
        'slide-right':   { from: { opacity:'0', transform:'translateX(36px)'  }, to: { opacity:'1', transform:'translateX(0)' } },
        'scale-in':      { from: { opacity:'0', transform:'scale(0.88)' }, to: { opacity:'1', transform:'scale(1)' } },
        float:           { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-12px)' } },
        shimmer:         { from: { backgroundPosition:'-200% 0' }, to: { backgroundPosition:'200% 0' } },
        'pulse-glow':    { '0%,100%': { boxShadow:'0 0 0 0 rgba(107,15,26,0.5)' }, '50%': { boxShadow:'0 0 0 14px rgba(107,15,26,0)' } },
        'spin-slow':     { from: { transform:'rotate(0deg)' }, to: { transform:'rotate(360deg)' } },
      },
      animation: {
        'fade-in-up':  'fade-in-up 0.6s ease-out both',
        'fade-in':     'fade-in 0.45s ease-out both',
        'slide-left':  'slide-left 0.6s ease-out both',
        'slide-right': 'slide-right 0.6s ease-out both',
        'scale-in':    'scale-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        float:         'float 3.5s ease-in-out infinite',
        shimmer:       'shimmer 2.5s linear infinite',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
        'spin-slow':   'spin-slow 12s linear infinite',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}

export default config
