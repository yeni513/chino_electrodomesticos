import Container from '../layout/Container.jsx'
import { marcas } from '../../data/content.js'

export default function Marcas() {
  return (
    <section className="py-14 md:py-16 lg:py-20 bg-brand-cream border-y border-slate-200/60">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          Trabajamos con las marcas en las que ya confías
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-6 md:gap-y-8 items-center">
          {marcas.map((marca) => (
            <div
              key={marca}
              className="flex items-center justify-center h-12 md:h-14 font-display font-semibold text-lg md:text-xl text-slate-400 hover:text-brand-ink transition-colors"
            >
              {marca}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
