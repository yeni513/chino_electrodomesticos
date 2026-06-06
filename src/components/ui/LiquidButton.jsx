// LiquidButton — adaptación (sin cva/radix) del botón "liquid glass".
// El filtro SVG de distorsión solo se aplica en navegadores que soportan
// backdrop-filter: url() (Firefox); en el resto degrada a un botón glass
// limpio con sombras internas. Pensado para fondos oscuros/imagen.
function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export default function LiquidButton({ children, href, className = '', ...props }) {
  const Comp = href ? 'a' : 'button'
  const compProps = href ? { href } : { type: 'button' }

  return (
    <Comp
      className={[
        'relative inline-flex h-14 items-center justify-center gap-2 rounded-full px-8',
        'text-base font-semibold text-white transition-transform duration-300 hover:scale-105',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink',
        className,
      ].join(' ')}
      {...compProps}
      {...props}
    >
      <span
        className="absolute inset-0 z-0 rounded-full bg-white/10
        shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.6),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.5),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.5),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.5),inset_0_0_6px_6px_rgba(255,255,255,0.08),0_0_12px_rgba(255,255,255,0.12)]"
      />
      <span
        className="absolute inset-0 -z-10 overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <GlassFilter />
    </Comp>
  )
}
