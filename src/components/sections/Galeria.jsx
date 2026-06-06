import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Grid, ZoomIn, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { useProducts } from '../../supabase/useProducts.js'
import { srcAt } from '../../lib/imgUrl.js'
import { categorias } from '../../data/content.js'

const CAT_LABEL = Object.fromEntries(categorias.map((c) => [c.id, c.label]))

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

const SPEED = 0.5 // tarjetas por segundo

export default function Galeria() {
  const { products } = useProducts()
  const [index, setIndex] = useState(null)
  const [broken, setBroken] = useState(() => new Set())
  const cardRefs = useRef([])
  const pausedRef = useRef(false)

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

  // Motor 3D: cada tarjeta recorre un riel diagonal en perspectiva hacia el frente.
  useEffect(() => {
    const N = images.length
    if (N === 0) return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const C = isMobile
      ? { VIS: 4, EXIT: 1.1, SX: 64, SY: 36, SZ: 170, STEP: 0.86, RY: 26 }
      : { VIS: 6, EXIT: 1.3, SX: 104, SY: 56, SZ: 250, STEP: 0.9, RY: 30 }

    const place = (p) => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const w = (((p - i) % N) + N) % N
        const c = C.VIS - w // 0 = frente; positivo = se aleja al fondo; negativo = sale hacia cámara
        let x, y, z, s, op
        if (c >= 0) {
          x = -C.SX * c
          y = -C.SY * c
          z = -C.SZ * c
          s = Math.pow(C.STEP, c)
          op = c > C.VIS - 1 ? Math.max(0, 1 - (c - (C.VIS - 1))) : 1
        } else if (c > -C.EXIT) {
          const e = -c
          x = C.SX * e * 1.5
          y = C.SY * e * 1.5
          z = C.SZ * 0.7 * e
          s = 1 + 0.22 * e
          op = 1 - e / C.EXIT
        } else {
          op = 0
          x = -C.SX * C.VIS
          y = -C.SY * C.VIS
          z = -C.SZ * C.VIS
          s = 0.4
        }
        el.style.opacity = op
        el.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(0)}px) rotateY(${C.RY}deg) scale(${s.toFixed(3)})`
        el.style.zIndex = String(Math.round(w * 10))
        el.style.pointerEvents = op > 0.55 ? 'auto' : 'none'
      }
    }

    if (reduce) {
      place(2)
      return
    }

    let p = 0
    let last = performance.now()
    let raf = 0
    const loop = (now) => {
      const dt = (now - last) / 1000
      last = now
      if (!pausedRef.current) p += dt * SPEED
      place(p)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
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
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 10%, rgba(201,162,39,0.18), transparent 45%), radial-gradient(circle at 85% 90%, rgba(43,81,132,0.5), transparent 55%)',
        }}
      />

      <Container className="relative z-30">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-brand-accent text-xs font-semibold uppercase tracking-wider">
            <Grid className="w-3.5 h-3.5" />
            Galería
          </span>
          <h2 className="heading-section mt-4 font-display font-semibold text-white">
            Mira los equipos de cerca
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-300 leading-relaxed">
            Pasa el cursor para pausar · toca una para verla en grande.
          </p>
        </Reveal>
      </Container>

      {/* Escenario 3D */}
      <div
        className="relative mt-6 md:mt-10 h-[380px] md:h-[540px]"
        style={{ perspective: '1700px' }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: 'preserve-3d', transform: 'translate(40px, 30px)' }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              ref={(el) => (cardRefs.current[i] = el)}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ampliar ${img.title}`}
              className="group absolute left-1/2 top-1/2 w-[210px] h-[158px] md:w-[330px] md:h-[248px] rounded-2xl overflow-hidden bg-white ring-1 ring-white/10 shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={() => setBroken((prev) => new Set(prev).add(img.src))}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        {/* Degradados de borde para enmarcar */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-brand-ink to-transparent z-20" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-brand-ink to-transparent z-20" />
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
