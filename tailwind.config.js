/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)',
        },
        border: 'var(--color-border)',
        brand: {
          DEFAULT: 'var(--color-primary)',
          glow: 'var(--color-primary-glow)',
          accent: 'var(--color-accent)',
          pink: 'var(--color-accent-2)',
        },
        ink: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
        danger: 'var(--color-danger)',
      },
      boxShadow: {
        neon: '0 0 20px color-mix(in srgb, var(--color-primary) 45%, transparent)',
        'neon-accent': '0 0 20px color-mix(in srgb, var(--color-accent) 40%, transparent)',
        'neon-pink': '0 0 20px color-mix(in srgb, var(--color-accent-2) 40%, transparent)',
      },
      fontFamily: {
        display: ['Orbitron', 'Segoe UI', 'sans-serif'],
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse at top, color-mix(in srgb, var(--color-primary) 25%, transparent), transparent 60%)',
      },
    },
  },
  plugins: [],
};
