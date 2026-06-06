import { useEffect, useRef, useState } from 'react'

// Reveal — anima la entrada de un elemento cuando aparece en viewport.
// Sin dependencias externas (IntersectionObserver nativo). Respeta
// prefers-reduced-motion y degrada visible si no hay IO/JS.
//
// Props:
//   as       → tag o componente a renderizar (default 'div')
//   variant  → 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
//   delay    → retardo en ms (para stagger en grids: i * 70)
//   once     → si true (default) se revela una vez y deja de observar
//
// El estilado vive en index.css bajo [data-reveal] / .is-visible.
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  once = true,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin soporte de IO → mostrar directamente.
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    // Movimiento reducido → mostrar sin animar.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={[visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
