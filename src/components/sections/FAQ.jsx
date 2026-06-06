import { Plus } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { faqs } from '../../data/content.js'

export default function FAQ() {
  return (
    <section id="faq" className="section-y bg-brand-cream">
      <Container maxWidth="4xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Preguntas frecuentes
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Lo que la gente nos pregunta antes de comprar
          </h2>
        </Reveal>

        <Reveal variant="up" className="mt-14 divide-y divide-slate-200 rounded-card bg-white ring-1 ring-slate-200/60 overflow-hidden shadow-soft">
          {faqs.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between gap-6 px-7 md:px-9 py-6 md:py-7 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                <span className="font-display font-semibold text-lg md:text-xl text-brand-ink leading-snug">
                  {item.q}
                </span>
                <span className="shrink-0 inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-brand-cream text-brand-ink transition-transform duration-300 ease-smooth group-open:rotate-45 group-open:bg-brand-accent">
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </summary>
              <div className="px-7 md:px-9 pb-7 -mt-1 text-base md:text-lg text-slate-600 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
