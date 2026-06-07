import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Star, Quote, X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import { testimonios } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

const SPEED = 0.45 // tarjetas por segundo

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Stars({ n = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 md:w-[18px] md:h-[18px] ${i < n ? 'text-brand-accent fill-brand-accent' : 'text-slate-300'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

function CardContent({ t, big = false }) {
  return (
    <div className="flex flex-col h-full p-5 md:p-7 text-left">
      <Quote className="w-7 h-7 md:w-9 md:h-9 text-brand-accent/30 shrink-0" />
      <Stars n={t.rating} className="mt-2" />
      <p
        className={[
          'mt-3 md:mt-4 flex-1 font-medium text-brand-ink leading-snug',
          big ? 'text-lg md:text-2xl' : 'text-[13px] md:text-lg line-clamp-5',
        ].join(' ')}
      >
        {`“${t.quote}”`}
      </p>
      <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100">
        <span className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-ink to-brand-ink-soft text-white font-display font-semibold text-sm shrink-0">
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-brand-ink text-sm md:text-base truncate">{t.name}</p>
          <p className="text-xs md:text-sm text-slate-500 truncate">{t.city}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonios() {
  const items = testimonios || []
  const [index, setIndex] = useState(null)
  const cardRefs = useRef([])
  const pausedRef = useRef(false)

  useEffect(() => {
    const N = items.length
    if (N === 0) return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const base = isMobile
      ? { VIS: 4, EXIT: 1.1, SX: 78, SY: 44, SZ: 190, STEP: 0.87, RY: 26 }
      : { VIS: 5, EXIT: 1.3, SX: 130, SY: 70, SZ: 290, STEP: 0.9, RY: 30 }
    const C = { ...base, VIS: Math.min(base.VIS, Math.max(1, N - 1)) }

    const place = (p) => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const w = (((p - i) % N) + N) % N
        const c = C.VIS - w
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
  }, [items])

  const open = index !== null && items[index]
  const current = open ? items[index] : null
  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

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
  }, [open, items.length])

  if (items.length === 0) return null

  return (
    <section id="testimonios" className="relative bg-brand-ink overflow-hidden py-16 md:py-24">
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
            <Star className="w-3.5 h-3.5 fill-current" />
            Opiniones
          </span>
          <h2 className="heading-section mt-4 font-display font-semibold text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-5 text-lg md:text-xl text-slate-300 leading-relaxed">
            Pasa el cursor para pausar · toca una reseña para leerla completa.
          </p>
        </Reveal>
      </Container>

      {/* Escenario 3D */}
      <div
        className="relative mt-6 md:mt-10 h-[440px] md:h-[660px]"
        style={{ perspective: '1900px' }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: 'preserve-3d', transform: 'translate(40px, 30px)' }}
        >
          {items.map((t, i) => (
            <button
              key={`${t.name}-${i}`}
              ref={(el) => (cardRefs.current[i] = el)}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Leer reseña de ${t.name}`}
              className="absolute left-1/2 top-1/2 w-[280px] h-[210px] md:w-[460px] md:h-[345px] rounded-2xl overflow-hidden bg-white ring-1 ring-white/10 shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <CardContent t={t} />
            </button>
          ))}
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-brand-ink to-transparent z-20" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-brand-ink to-transparent z-20" />
      </div>

      {/* Reseña ampliada */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 motion-safe:animate-menu-in"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Reseña de ${current.name}`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {items.length > 1 && (
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
            <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="rounded-card bg-white shadow-lift overflow-hidden">
                <CardContent t={current} big />
              </div>
              <div className="mt-4 text-center">
                <a
                  href={whatsappUrl('Hola, vi las opiniones en la web y quiero comprar también. ¿Qué tienen disponible?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Quiero comprar también
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
