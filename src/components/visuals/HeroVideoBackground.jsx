import { useEffect, useRef, useState } from 'react'

// Fondo de video para el hero. Muestra primero el poster (sin layout shift)
// y hace fade-in del video cuando puede reproducir. Respeta
// prefers-reduced-motion y Save-Data (en esos casos se queda el poster).
export default function HeroVideoBackground({ mp4, webm, poster, className = '' }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const conn = navigator.connection
    if (conn && conn.saveData) return

    const play = () => v.play().catch(() => {})
    if (v.readyState >= 2) play()
    else v.addEventListener('canplay', play, { once: true })
  }, [])

  return (
    <div className={className} aria-hidden="true">
      <img
        src={poster}
        alt=""
        fetchPriority="high"
        className={[
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-smooth',
          ready ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
        className={[
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-smooth',
          ready ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  )
}
