import { MessageCircle, Camera, Truck, ClipboardCheck } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Nos escribes por WhatsApp',
    body: 'Dinos qué buscas: lavadora, secadora, refrigerador… y tu presupuesto si tienes uno. Sin formularios.',
  },
  {
    icon: Camera,
    title: 'Te enviamos opciones con foto y precio',
    body: 'En minutos te pasamos lo disponible: fotos reales del equipo, precio final y condición.',
  },
  {
    icon: Truck,
    title: 'Coordinamos la entrega',
    body: 'Acordamos zona, día y franja horaria. Te confirmamos por WhatsApp antes de salir.',
  },
  {
    icon: ClipboardCheck,
    title: 'Lo revisamos juntos al entregar',
    body: 'Probamos el equipo contigo en tu casa. Si algo no encaja, no lo dejamos.',
  },
]

export default function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="section-y bg-white">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Cómo trabajamos
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Cuatro pasos. Sin formularios, sin esperas.
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Comprar electrodomésticos no tiene por qué ser un papeleo. Esto es lo que pasa cuando nos escribes:
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal
                as="li"
                variant="up"
                delay={(i % 4) * 90}
                key={step.title}
                className="relative p-7 md:p-8 rounded-card bg-brand-cream ring-1 ring-slate-200/60 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 ease-smooth"
              >
                <span className="absolute top-6 right-6 font-display font-semibold text-3xl md:text-4xl text-brand-accent/30 tabular-nums leading-none">
                  0{i + 1}
                </span>
                <span className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-brand-ink text-brand-accent">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display font-semibold text-lg md:text-xl text-brand-ink leading-snug pr-10">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm md:text-base text-slate-600 leading-relaxed">
                  {step.body}
                </p>
              </Reveal>
            )
          })}
        </ol>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 text-center">
          <a
            href={whatsappUrl('Hola, quiero ver opciones disponibles.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-soft hover:shadow-lift transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4" />
            Empezar por WhatsApp
          </a>
          <p className="text-sm text-slate-500">
            Respuesta en horario de tienda · sin compromiso
          </p>
        </div>
      </Container>
    </section>
  )
}
