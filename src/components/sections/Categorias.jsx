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
import Reveal from '../ui/Reveal.jsx'
import { categorias, categoriasFootnote } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

const ICONS = { Refrigerator, WashingMachine, Shirt, Flame, Snowflake, Layers }

export default function Categorias() {
  return (
    <section id="categorias" className="section-y bg-white">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Catálogo
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Encuentra lo que buscas por categoría
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Si no ves el modelo exacto que necesitas, escríbenos por WhatsApp. Te decimos si lo tenemos o cuándo podemos conseguírtelo.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {categorias.map((cat, i) => {
            const Icon = ICONS[cat.icon]
            const msg = `Hola, quiero información sobre ${cat.label.toLowerCase()} disponibles.`
            const image400 = cat.image?.replace('.webp', '-400.webp')
            return (
              <Reveal
                as="a"
                key={cat.id}
                variant="up"
                delay={(i % 3) * 90}
                href={whatsappUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-card bg-white ring-1 ring-slate-200 hover:ring-brand-ink hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ease-smooth overflow-hidden"
              >
                {/* Imagen de producto */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-50 to-brand-cream">
                  {cat.image && (
                    <img
                      src={cat.image}
                      srcSet={`${image400} 400w, ${cat.image} 800w`}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      alt={`${cat.label} disponibles en Trusted Appliances Cleveland`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                    />
                  )}
                  {/* Icono flotante de categoría */}
                  <span className="absolute top-4 left-4 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm text-brand-ink ring-1 ring-slate-200/70 shadow-soft group-hover:bg-brand-accent group-hover:ring-brand-accent transition-colors">
                    {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />}
                  </span>
                </div>

                {/* Texto */}
                <div className="flex flex-col flex-1 p-7 md:p-8">
                  <h3 className="font-display font-semibold text-2xl md:text-[1.625rem] text-brand-ink leading-tight">
                    {cat.label}
                  </h3>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-brand-ink group-hover:gap-3 group-hover:text-brand-accent-dark transition-all">
                    {cat.cta}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </div>
              </Reveal>
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
