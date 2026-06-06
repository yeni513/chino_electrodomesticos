import { useEffect, useRef } from 'react'

// ContainerScroll — adaptación a React + Vite (sin framer-motion) del efecto
// de "scroll 3D tilt": la tarjeta entra inclinada (rotateX) y se endereza +
// escala a medida que entra en viewport, mientras el título sube ligeramente.
// El progreso de scroll se aplica directo al DOM vía rAF (sin re-render).
// Respeta prefers-reduced-motion (deja la tarjeta en su estado final).
export default function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    const card = cardRef.current
    if (!container || !card) return

    const mqMobile = window.matchMedia('(max-width: 768px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = (p) => {
      const isMobile = mqMobile.matches
      const rotate = 20 - 20 * p
      const scaleFrom = isMobile ? 0.75 : 1.05
      const scaleTo = isMobile ? 0.95 : 1
      const scale = scaleFrom + (scaleTo - scaleFrom) * p
      card.style.transform = `rotateX(${rotate}deg) scale(${scale})`
      if (title) title.style.transform = `translateY(${-90 * p}px)`
    }

    if (reduce) {
      apply(1)
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
      apply(p)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[46rem] md:h-[62rem] flex items-center justify-center relative p-3 md:p-12"
    >
      <div className="w-full relative" style={{ perspective: '1000px' }}>
        <div ref={titleRef} className="max-w-5xl mx-auto text-center will-change-transform">
          {titleComponent}
        </div>
        <div
          ref={cardRef}
          className="max-w-5xl mt-6 md:mt-10 mx-auto h-[22rem] md:h-[38rem] w-full rounded-[28px] border border-white/10 bg-brand-ink p-2 md:p-3 shadow-lift will-change-transform"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
