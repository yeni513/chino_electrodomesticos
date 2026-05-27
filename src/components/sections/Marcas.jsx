import Container from '../layout/Container.jsx'

// Wordmarks tipográficos limpios — replican el estilo de la marca usando
// font-family específica de cada brand sin descargar logos externos.
// Cada marca usa Inter (ya cargada) con tracking/weight propios.
const MARCAS = [
  { name: 'Whirlpool', className: 'tracking-tighter font-bold' },
  { name: 'Samsung', className: 'tracking-wide font-semibold uppercase' },
  { name: 'LG', className: 'tracking-widest font-black text-[1.5rem]' },
  { name: 'GE', className: 'tracking-tight font-black text-[1.5rem] italic' },
  { name: 'Frigidaire', className: 'tracking-tight font-semibold' },
  { name: 'Maytag', className: 'tracking-tight font-bold uppercase' },
  { name: 'Bosch', className: 'tracking-widest font-extrabold uppercase' },
  { name: 'KitchenAid', className: 'tracking-tight font-bold' },
]

export default function Marcas() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-brand-cream border-y border-slate-200/60">
      <Container>
        <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-500">
          Trabajamos con las marcas en las que ya confías
        </p>
        <ul
          aria-label="Marcas que trabajamos"
          className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-6 md:gap-y-8 items-center"
        >
          {MARCAS.map((m) => (
            <li
              key={m.name}
              className="group relative flex items-center justify-center h-10 md:h-12"
            >
              <span
                className={`text-base md:text-lg text-slate-400 group-hover:text-brand-ink transition-colors select-none ${m.className}`}
              >
                {m.name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
