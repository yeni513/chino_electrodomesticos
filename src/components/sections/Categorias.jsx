import { useState } from 'react'
import {
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  Snowflake,
  Layers,
  Eye,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import CategoryModal from './CategoryModal.jsx'
import { categorias, categoriasFootnote } from '../../data/content.js'

const ICONS = { Refrigerator, WashingMachine, Shirt, Flame, Snowflake, Layers }

export default function Categorias() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="categorias" className="section-y bg-white">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Catálogo
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Explora por categoría
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Toca una categoría para ver opciones, acabados y detalles. Cuando tengas claro lo que buscas, te pasamos fotos y precio por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {categorias.map((cat, i) => {
            const Icon = ICONS[cat.icon]
            const image400 = cat.image?.replace('.webp', '-400.webp')
            return (
              <Reveal
                as="button"
                type="button"
                key={cat.id}
                variant="up"
                delay={(i % 3) * 90}
                onClick={() => setSelected(cat)}
                aria-label={`Ver detalles de ${cat.label}`}
                className="group relative flex flex-col text-left rounded-card bg-white ring-1 ring-slate-200 hover:ring-brand-ink hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ease-smooth overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
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
                  {/* Pista de interacción */}
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-ink/85 backdrop-blur-sm text-white text-xs font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-3.5 h-3.5" />
                    Ver opciones
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
                  {/* Subtipos como preview */}
                  {cat.subtypes?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {cat.subtypes.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-cream ring-1 ring-slate-200/70 text-[11px] md:text-xs font-medium text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                      {cat.subtypes.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] md:text-xs font-semibold text-brand-accent-dark">
                          +{cat.subtypes.length - 3} más
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-12 text-center text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {categoriasFootnote}
        </p>
      </Container>

      <CategoryModal
        category={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
