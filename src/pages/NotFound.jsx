import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'
import { brand, business } from '../data/content.js'
import { whatsappUrl } from '../lib/whatsapp.js'

export default function NotFound() {
  useEffect(() => {
    // Hint a crawlers: esta URL no existe.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, follow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-cream px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <img
          src={brand.assets.logo}
          alt={business.name}
          width="220"
          height="60"
          className="mx-auto h-[60px] w-auto object-contain"
        />
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-dark">
          Error 404
        </p>
        <h1 className="mt-4 font-display font-semibold text-3xl md:text-4xl text-brand-ink leading-tight">
          Esta página no existe
        </h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          El enlace que abriste no está disponible. Vuelve al inicio o escríbenos por WhatsApp si necesitas algo en concreto.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-brand-ink text-white font-semibold text-sm hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
          <a
            href={whatsappUrl('Hola, llegué a un enlace que no funciona en la web.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
