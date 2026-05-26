import {
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  Snowflake,
  Layers,
  ArrowRight,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import { categorias, categoriasFootnote } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

const ICONS = { Refrigerator, WashingMachine, Shirt, Flame, Snowflake, Layers }

export default function Categorias() {
  return (
    <section id="categorias" className="section-y bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Catálogo
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Encuentra lo que buscas por categoría
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Si no ves el modelo exacto que necesitas, escríbenos por WhatsApp. Te decimos si lo tenemos o cuándo podemos conseguírtelo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {categorias.map((cat) => {
            const Icon = ICONS[cat.icon]
            const msg = `Hola, quiero información sobre ${cat.label.toLowerCase()} disponibles.`
            return (
              <a
                key={cat.id}
                href={whatsappUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-8 md:p-9 lg:p-10 rounded-card bg-white ring-1 ring-slate-200 hover:ring-brand-ink hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ease-smooth overflow-hidden"
              >
                {/* Acento sutil de fondo en hover */}
                <span
                  aria-hidden
                  className="absolute -top-14 -right-14 w-44 h-44 rounded-full bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <span className="relative inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl bg-brand-cream text-brand-ink ring-1 ring-slate-200/60 group-hover:bg-brand-accent group-hover:ring-brand-accent transition-colors">
                  {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
                </span>

                <h3 className="relative mt-7 font-display font-semibold text-2xl md:text-[1.625rem] text-brand-ink leading-tight">
                  {cat.label}
                </h3>
                <p className="relative mt-3 text-base text-slate-600 leading-relaxed flex-1">
                  {cat.description}
                </p>

                <span className="relative mt-8 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-brand-ink group-hover:gap-3 group-hover:text-brand-accent-dark transition-all">
                  {cat.cta}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </a>
            )
          })}
        </div>

        <p className="mt-12 text-center text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {categoriasFootnote}
        </p>
      </Container>
    </section>
  )
}
