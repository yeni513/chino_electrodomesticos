/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['"Concert One"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          // Trusted Appliances — paleta oficial
          ink: '#1F3D63',          // navy principal (extraído del logo)
          'ink-soft': '#2B5184',   // navy más claro para variaciones
          accent: '#C9A227',       // dorado discreto (CTAs, detalles)
          'accent-dark': '#8E7320',// dorado oscuro (hover)
          cream: '#F8FAFC',        // off-white para fondos de sección
          line: '#E2E8F0',         // gris suave para bordes
        },
      },
      maxWidth: {
        container: '1440px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(31, 61, 99, 0.04), 0 8px 24px rgba(31, 61, 99, 0.06)',
        lift: '0 4px 8px rgba(31, 61, 99, 0.06), 0 24px 48px rgba(31, 61, 99, 0.10)',
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
