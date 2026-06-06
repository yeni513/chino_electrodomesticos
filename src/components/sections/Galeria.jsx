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

// Fotos curadas de respaldo (siempre válidas). Se combinan con las fotos reales
// del inventario del admin (esas van primero cuando existen).
const CURATED = [
  { src: '/products/refrigerador.webp', title: 'Refrigerador French Door', category: 'Refrigeradores' },
  { src: '/products/refrigerador-sxs.webp', title: 'Refrigerador Side by Side', category: 'Refrigeradores' },
  { src: '/products/refrigerador-angle.webp', title: 'Refrigerador — interior', category: 'Refrigeradores' },
  { src: '/products/lavadora.webp', title: 'Lavadora carga frontal', category: 'Lavadoras' },
  { src: '/products/lavadora-top.webp', title: 'Lavadora carga superior', category: 'Lavadoras' },
  { src: '/products/lavadora-angle.webp', title: 'Lavadora — detalle', category: 'Lavadoras' },
  { src: '/products/secadora.webp', title: 'Secadora', category: 'Secadoras' },
  { src: '/products/secadora-angle.webp', title: 'Secadora — detalle', category: 'Secadoras' },
  { src: '/products/estufa.webp', title: 'Estufa a gas', category: 'Estufas' },
  { src: '/products/estufa-electrica.webp', title: 'Estufa eléctrica', category: 'Estufas' },
  { src: '/products/estufa-angle.webp', title: 'Estufa — detalle', category: 'Estufas' },
  { src: '/products/freezer.webp', title: 'Freezer vertical', category: 'Freezers' },
  { src: '/products/freezer-angle.webp', title: 'Freezer — interior', category: 'Freezers' },
  { src: '/products/combo.webp', title: 'Combo apilable', category: 'Combos' },
  { src: '/products/combo-angle.webp', title: 'Combo — detalle', category: 'Combos' },
]

const ROW_COUNT = 3
const DURATIONS = ['62s', '48s', '70s'] // velocidades distintas por fila

export default function Galeria() {
  const { products } = useProducts()
  const [index, setIndex] = useState(null)
  const [broken, setBroken] = useState(() => new Set())

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

  // Reparte las imágenes en filas (round-robin) para el muro diagonal.
  const rows = useMemo(() => {
    const r = Array.from({ length: ROW_COUNT }, () => [])
    images.forEach((img, i) => r[i % ROW_COUNT].push(img))
    // Si alguna fila quedó muy corta, la rellena repitiendo para que el loop luzca lleno.
    return r.map((row) => (row.length >= 4 ? row : [...row, ...row, ...row].slice(0, Math.max(4, row.length))))
  }, [images])

  const open = index !== null && images[index]
  const current = open ? images[index] : null
  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)

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
  }, [open, images.length])

  if (images.length === 0) return null

  return (
    <section id="galeria" className="relative bg-brand-ink overflow-hidden py-16 md:py-24">
      {/* Glow de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(201,162,39,0.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(43,81,132,0.5), transparent 55%)',
        }}
      />

      <Container className="relative z-20">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-brand-accent text-xs font-semibold uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5" />
            Galería
          </span>
          <h2 className="heading-section mt-4 font-display font-semibold text-white">
            Mira los equipos de cerca
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-300 leading-relaxed">
            Fotos reales de lo que manejamos. Pasa el cursor para pausar, toca una para
            verla en grande — y pídenos el modelo exacto por WhatsApp.
          </p>
        </Reveal>
      </Container>

      {/* Muro diagonal en movimiento */}
      <div className="relative mt-12 md:mt-16 h-[440px] md:h-[600px]">
        <div className="marquee-track absolute left-1/2 top-1/2 w-[180%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] flex flex-col gap-4 md:gap-6">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className={`marquee-row ${ri % 2 === 1 ? 'reverse' : ''}`}
              style={{ '--dur': DURATIONS[ri % DURATIONS.length] }}
            >
              {[...row, ...row].map((img, i) => (
                <button
                  key={`${ri}-${i}-${img.src}`}
                  type="button"
                  onClick={() => setIndex(images.indexOf(img))}
                  aria-label={`Ampliar ${img.title}`}
                  className="group relative shrink-0 mx-2 md:mx-3 w-[200px] h-[150px] md:w-[300px] md:h-[220px] rounded-2xl overflow-hidden bg-white ring-1 ring-white/10 shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={() => setBroken((prev) => new Set(prev).add(img.src))}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-brand-ink/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-7 h-7 text-white" />
                    <span className="px-3 text-center text-xs font-semibold text-white leading-tight">
                      {img.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Degradados en los bordes para enmarcar el muro */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-brand-ink to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-brand-ink to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand-ink to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-ink to-transparent z-10" />
      </div>

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
            {images.length > 1 && (
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
