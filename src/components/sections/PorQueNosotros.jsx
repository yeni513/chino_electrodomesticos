import { Handshake, CheckCircle2, Truck, BadgeDollarSign } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { porQue } from '../../data/content.js'

const ICONS = { Handshake, CheckCircle2, Truck, BadgeDollarSign }

export default function PorQueNosotros() {
  return (
    <section
      id="por-que"
      className="section-y bg-brand-ink text-white relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(201,162,39,0.28), transparent 45%), radial-gradient(circle at 10% 90%, rgba(201,162,39,0.14), transparent 45%)',
        }}
      />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Por qué comprar aquí
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-white">
            Lo que una tienda grande no te va a dar
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-300 leading-relaxed">
            En una cadena hablas con un call center, te entrega un transportista que no conoce el producto y, si algo falla, abres un ticket. Aquí hacemos exactamente lo contrario.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {porQue.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} variant="up" delay={(i % 4) * 90} className="glow-card h-full">
                <div className="glow-card-inner p-7 md:p-8 lg:p-9">
                  <span className="absolute top-7 md:top-8 right-7 md:right-8 text-xs font-display font-semibold text-slate-500">
                    0{i + 1}
                  </span>
                  <span className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-lg bg-brand-accent text-brand-ink">
                    {Icon && <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />}
                  </span>
                  <h3 className="mt-6 font-display font-semibold text-xl md:text-2xl text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-slate-300 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
