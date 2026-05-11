import { Quote, User } from 'lucide-react'
import Container from '../layout/Container.jsx'
import { testimonios } from '../../data/content.js'

export default function Testimonios() {
  return (
    <section className="section-y bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Lo que dicen nuestros clientes
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            No es marketing. Es lo que cuentan después de comprar.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {testimonios.map((t, i) => {
            const initial = (t.name || t.role || '').trim().charAt(0).toUpperCase() || '·'
            return (
              <figure
                key={i}
                className="flex flex-col p-8 md:p-9 lg:p-10 rounded-card bg-brand-cream ring-1 ring-slate-200/60 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ease-smooth"
              >
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-brand-accent" strokeWidth={1.5} />
                <blockquote className="mt-5 md:mt-6 text-base md:text-lg leading-relaxed text-brand-ink flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 pt-6 border-t border-slate-200/70">
                  <span className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-brand-ink text-brand-accent font-display font-semibold text-lg">
                    {t.name ? initial : <User className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />}
                  </span>
                  <div>
                    {t.name && (
                      <p className="text-sm md:text-base font-semibold text-brand-ink">{t.name}</p>
                    )}
                    <p className="text-xs md:text-sm text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
