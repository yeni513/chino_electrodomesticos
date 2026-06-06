import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Grid, ZoomIn, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { useProducts } from '../../supabase/useProducts.js'
import { srcAt } from '../../lib/imgUrl.js'
import { categorias } from '../../data/content.js'

const CAT_LABEL = Object.fromEntries(categorias.map((c) => [c.id, c.label]))

// Fotos curadas de respaldo (siempre válidas). Se combinan con las fotos
// reales del inventario del admin (esas van primero cuando existen).
const CURATED = [
  { src: '/products/refrigerador.webp', title: 'Refrigerador French Door', category: 'Refrigeradores' },
  { src: '/products/refrigerador-sxs.webp', title: 'Refrigerador Side by Side', category: 'Refrigeradores' },
  { src: '/products/refrigerador-angle.webp', title: 'Refrigerador — interior', category: 'Refrigeradores' },
  { src: '/products/lavadora.webp', title: 'Lavadora carga frontal', category: 'Lavadoras' },
  { src: '/products/lavadora-top.webp', title: 'Lavadora carga superior', category: 'Lavadoras' },
  { src: '/products/secadora.webp', title: 'Secadora', category: 'Secadoras' },
  { src: '/products/secadora-angle.webp', title: 'Secadora — detalle', category: 'Secadoras' },
  { src: '/products/estufa.webp', title: 'Estufa a gas', category: 'Estufas' },
  { src: '/products/estufa-electrica.webp', title: 'Estufa eléctrica', category: 'Estufas' },
  { src: '/products/freezer.webp', title: 'Freezer vertical', category: 'Freezers' },
  { src: '/products/combo.webp', title: 'Combo apilable', category: 'Combos' },
  { src: '/products/combo-angle.webp', title: 'Combo — detalle', category: 'Combos' },
]

export default function Galeria() {
  const { products } = useProducts()
  const [filter, setFilter] = useState('Todos')
  const [index, setIndex] = useState(null)
  const [broken, setBroken] = useState(() => new Set())

  // Fotos reales del admin (con imagen) + curadas de respaldo, sin las rotas.
  const images = useMemo(() => {
    const real = (products || []).flatMap((p) => {
      const gallery = p.images?.length ? p.images : p.image ? [p.image] : []
      return gallery.map((src) => ({
        src: srcAt(src, { width: 800 }),
        title: p.name,
        category: CAT_LABEL[p.category] || 'Otros',
      }))
    })
    const seen = new Set()
    return [...real, ...CURATED].filter((img) => {
      if (broken.has(img.src) || seen.has(img.src)) return false
      seen.add(img.src)
      return true
    })
  }, [products, broken])

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(images.map((i) => i.category)))],
    [images],
  )
  const filtered = filter === 'Todos' ? images : images.filter((i) => i.category === filter)

  const open = index !== null && filtered[index]
  const current = open ? filtered[index] : null
  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % filtered.length)
  const prev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, filtered.length])

  return (
    <section id="galeria" className="section-y bg-white">
      <Container>
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent-dark text-xs font-semibold uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5" />
            Galería
          </span>
          <h2 className="heading-section mt-4 font-display font-semibold text-brand-ink">
            Mira los equipos de cerca
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-600 leading-relaxed">
            Fotos reales de los electrodomésticos que manejamos. Toca cualquiera para verla
            en grande — y pídenos la del modelo exacto por WhatsApp.
          </p>
        </Reveal>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setFilter(cat)
                setIndex(null)
              }}
              aria-pressed={filter === cat}
              className={[
                'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
                filter === cat
                  ? 'bg-brand-ink text-white ring-1 ring-brand-ink'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-ink',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((img, i) => (
            <Reveal
              as="button"
              type="button"
              key={img.src}
              variant="scale"
              delay={(i % 4) * 60}
              onClick={() => setIndex(i)}
              aria-label={`Ampliar ${img.title}`}
              className="group relative aspect-square overflow-hidden rounded-card bg-gradient-to-b from-slate-50 to-brand-cream ring-1 ring-slate-200 hover:ring-brand-ink hover:shadow-lift transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                decoding="async"
                onError={() => setBroken((prev) => new Set(prev).add(img.src))}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-ink/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-7 h-7 text-white" />
                <span className="px-3 text-center text-sm font-semibold text-white">{img.title}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 motion-safe:animate-menu-in"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  aria-label="Anterior"
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next() }}
                  aria-label="Siguiente"
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
            <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={current.src}
                alt={current.title}
                className="max-h-[78vh] w-auto mx-auto rounded-xl shadow-lift"
              />
              <figcaption className="mt-4 text-center text-white">
                <p className="text-lg font-semibold">{current.title}</p>
                <a
                  href={whatsappUrl(`Hola, me interesa algo como "${current.title}". ¿Qué tienen disponible?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Preguntar por este tipo
                </a>
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </section>
  )
}
