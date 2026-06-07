import { useEffect, useRef } from 'react'
import Reveal from '../ui/Reveal.jsx'

// Showcase con scroll-scrub: el avance del scroll por la sección controla el
// currentTime del video (armado ↔ desarmado), estilo Apple. Sin librerías.
// El video va sobre fondo blanco, sin marco. Respeta prefers-reduced-motion.
export default function Showcase() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const v = videoRef.current
    if (!section || !v) return

    let duration = 0
    const onMeta = () => {
      duration = v.duration || 0
    }
    v.addEventListener('loadedmetadata', onMeta)
    if (v.readyState >= 1) onMeta()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      // Estático: deja el primer frame (equipo armado).
      return () => v.removeEventListener('loadedmetadata', onMeta)
    }

    let target = 0
    let cur = 0
    let raf = 0

    const computeTarget = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? -rect.top / scrollable : 0
      target = Math.min(1, Math.max(0, p))
    }

    const tick = () => {
      cur += (target - cur) * 0.12 // easing suave
      if (duration) {
        const t = Math.min(duration - 0.05, Math.max(0, cur * duration))
        if (Math.abs(v.currentTime - t) > 0.012) {
          try {
            v.currentTime = t
          } catch {
            /* noop */
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => computeTarget()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    computeTarget()
    raf = requestAnimationFrame(tick)

    return () => {
      v.removeEventListener('loadedmetadata', onMeta)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white h-[200vh] md:h-[240vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
            Calidad que puedes ver
          </p>
          <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
            Por dentro y por fuera
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base md:text-lg text-slate-600 leading-relaxed">
            Cada equipo lo revisamos pieza por pieza antes de entregártelo.
            <span className="hidden md:inline"> Desplázate para verlo.</span>
          </p>
        </Reveal>

        <video
          ref={videoRef}
          className="mt-2 md:mt-4 w-full max-w-5xl aspect-video object-contain"
          muted
          playsInline
          preload="auto"
          poster="/showcase/exploded-poster.jpg"
          aria-label="Electrodoméstico que se arma y desarma al hacer scroll"
        >
          <source src="/showcase/exploded.webm" type="video/webm" />
          <source src="/showcase/exploded.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
