/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          default: 'rgb(var(--surface-default) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border-default) / <alpha-value>)',
        },
        text: {
          default: 'rgb(var(--text-default) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          onColor: 'rgb(var(--text-on-color) / <alpha-value>)',
        },
        component: {
          primary: 'rgb(var(--component-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--component-primary-hover) / <alpha-value>)',
        },
        accent: {
          violet: 'rgb(var(--accent-violet) / <alpha-value>)',
          amber: 'rgb(var(--accent-amber) / <alpha-value>)',
          rose: 'rgb(var(--accent-rose) / <alpha-value>)',
        },
        semantic: {
          error: 'rgb(var(--semantic-error) / <alpha-value>)',
          'error-muted': 'rgb(var(--semantic-error-muted) / <alpha-value>)',
          success: 'rgb(var(--semantic-success) / <alpha-value>)',
          'success-muted': 'rgb(var(--semantic-success-muted) / <alpha-value>)',
          focus: 'rgb(var(--semantic-focus) / <alpha-value>)',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow-color) / 0.06), 0 8px 24px rgb(var(--shadow-color) / 0.08)',
        elevated:
          '0 4px 6px rgb(var(--shadow-color) / 0.05), 0 20px 48px rgb(var(--shadow-color) / 0.12)',
        glow: '0 0 40px rgb(var(--component-primary) / 0.15)',
        selected: '0 0 0 2px rgb(var(--semantic-focus) / 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgb(var(--gradient-start)), rgb(var(--gradient-end)))',
        'title-gradient':
          'linear-gradient(135deg, rgb(var(--component-primary)), rgb(var(--accent-violet)))',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.45s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
