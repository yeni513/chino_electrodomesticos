import { useEffect, useRef } from 'react'

// ImageTrail — adaptación sin dependencias (sin framer-motion/uuid) del rastro
// de imágenes que sigue el cursor. Solo en dispositivos con puntero fino
// (desktop) y si no se pidió movimiento reducido. Manipula el DOM directo para
// no re-renderizar React en cada movimiento.
export default function ImageTrail({ images = [], interval = 90, className = '' }) {
  const ref = useRef(null)
  const idx = useRef(0)
  const last = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el || images.length === 0) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      const now = performance.now()
      if (now - last.current < interval) return
      last.current = now
      const rect = el.getBoundingClientRect()
      const img = document.createElement('img')
      img.src = images[idx.current % images.length]
      idx.current += 1
      img.alt = ''
      img.className = 'trail-img'
      img.style.left = `${e.clientX - rect.left}px`
      img.style.top = `${e.clientY - rect.top}px`
      img.style.setProperty('--trail-r', `${(Math.random() - 0.5) * 26}deg`)
      el.appendChild(img)
      window.setTimeout(() => img.remove(), 900)
    }

    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [images, interval])

  return <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden="true" />
}
