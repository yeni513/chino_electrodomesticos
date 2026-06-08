// Marquee — fila en bucle infinito (adaptación del componente enviado, sin cn).
// Duplica el contenido en dos grupos y anima -50% para un loop perfecto.
// `pauseOnHover`, `direction` ('left' | 'right') y `speed` (segundos).
export default function Marquee({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 30,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full overflow-hidden ${className}`} {...props}>
      <div className="relative flex overflow-hidden">
        <div
          className={[
            'flex w-max animate-marquee',
            pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
            direction === 'right' ? 'animate-marquee-reverse' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ '--duration': `${speed}s` }}
        >
          <div className="flex items-center shrink-0">{children}</div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
