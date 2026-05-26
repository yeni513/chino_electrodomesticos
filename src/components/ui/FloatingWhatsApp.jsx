import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../../lib/whatsapp.js'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl('Hola, tengo una consulta sobre electrodomésticos.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed right-5 md:right-6 z-40"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
      }}
    >
      {/* Pulse halo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping"
      />
      {/* Botón */}
      <span className="relative inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lift ring-4 ring-white hover:bg-emerald-600 hover:scale-105 transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-emerald-300">
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
      </span>
      {/* Tooltip desktop */}
      <span className="hidden md:inline-block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-brand-ink text-white text-xs font-medium whitespace-nowrap shadow-soft opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-smooth pointer-events-none">
        Escríbenos por WhatsApp
      </span>
    </a>
  )
}
