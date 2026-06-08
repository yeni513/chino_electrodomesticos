import Container from '../layout/Container.jsx'
import Marquee from '../ui/Marquee.jsx'

// Wordmarks tipográficos con el color real (aprox.) de cada marca. Sin descargar
// logos externos: Inter con tracking/weight propios + color de marca.
const MARCAS = [
  { name: 'Whirlpool', color: '#E5791F', className: 'tracking-tighter font-bold' },
  { name: 'Samsung', color: '#1428A0', className: 'tracking-wide font-semibold uppercase' },
  { name: 'LG', color: '#A50034', className: 'tracking-widest font-black' },
  { name: 'GE', color: '#0072CE', className: 'tracking-tight font-black italic' },
  { name: 'Frigidaire', color: '#C8102E', className: 'tracking-tight font-semibold' },
  { name: 'Maytag', color: '#0C2340', className: 'tracking-tight font-bold uppercase' },
  { name: 'Bosch', color: '#ED0007', className: 'tracking-widest font-extrabold uppercase' },
  { name: 'KitchenAid', color: '#A6192E', className: 'tracking-tight font-bold' },
]

export default function Marcas() {
  return (
    <section className="py-12 md:py-16 bg-brand-cream border-y border-slate-200/60 overflow-hidden">
      <Container>
        <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-500">
          Trabajamos con las marcas en las que ya confías
        </p>
      </Container>

      <div className="relative mt-8 md:mt-10">
        <Marquee pauseOnHover speed={34} aria-label="Marcas que trabajamos">
          {MARCAS.map((m) => (
            <span
              key={m.name}
              style={{ color: m.color }}
              className={`mx-7 md:mx-11 text-2xl md:text-[1.9rem] leading-none select-none opacity-85 hover:opacity-100 transition-opacity ${m.className}`}
            >
              {m.name}
            </span>
          ))}
        </Marquee>

        {/* Degradados en los bordes para que entren/salgan suave */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-cream to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-cream to-transparent"
        />
      </div>
    </section>
  )
}
