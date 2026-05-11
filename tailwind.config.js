/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          ink: '#0F172A',
          accent: '#F59E0B',
          'accent-dark': '#B45309',
          cream: '#FAF7F2',
        },
      },
      maxWidth: {
        container: '1440px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        lift: '0 4px 8px rgba(15, 23, 42, 0.06), 0 24px 48px rgba(15, 23, 42, 0.10)',
      },
      borderRadius: {
        card: '12px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
