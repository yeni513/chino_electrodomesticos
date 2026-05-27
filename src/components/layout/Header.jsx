import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, ChevronRight, MapPin, Phone } from 'lucide-react'
import Container from './Container.jsx'
import Button from '../ui/Button.jsx'
import { brand, business, nav } from '../../data/content.js'
import { whatsappUrl, telUrl, hasPhone } from '../../lib/whatsapp.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el menú con Escape
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 transition-all duration-300 ease-smooth',
          // Cuando el menú está abierto, fondo sólido (sin backdrop-filter)
          // para evitar que cree un containing block que rompa `position: fixed`
          // de los modales/cards flotantes del Hero.
          open
            ? 'bg-white border-b border-slate-200/70'
            : scrolled
              ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-soft'
              : 'bg-white/40 backdrop-blur-sm border-b border-transparent',
        ].join(' ')}
      >
        <Container className="flex items-center justify-between h-16 md:h-24">
          <a href="#top" className="flex items-center group" aria-label={business.name}>
            <img
              src={brand.assets.logo}
              alt={business.name}
              width="260"
              height="78"
              fetchPriority="high"
              decoding="async"
              className="h-[44px] lg:h-[78px] w-auto max-w-[160px] lg:max-w-[260px] object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-brand-ink transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              as="a"
              href={whatsappUrl('Hola, tengo una consulta sobre electrodomésticos.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              className="!min-h-0 !bg-emerald-600 hover:!bg-emerald-700 !text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-ink hover:bg-slate-100 transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </header>

      {/*
        Menú mobile renderizado FUERA del <header>.
        Si vive dentro, el `backdrop-filter` del header crea un containing
        block y `position: fixed` se posiciona relativo al header (no al
        viewport), por lo que el menú no cubre la pantalla y deja ver
        elementos del Hero por debajo.
      */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }) {
  if (!open) return null
  const phoneActive = hasPhone()

  return (
    <div
      id="mobile-menu"
      className="lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-brand-cream flex flex-col motion-safe:animate-menu-in"
      style={{ top: '4rem' /* coincide con h-16 del header en mobile */ }}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
    >
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent-dark">
          Navegación
        </p>
        <ul className="mt-3 divide-y divide-slate-200/80 bg-white rounded-card ring-1 ring-slate-200/60 shadow-soft overflow-hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between gap-3 px-5 py-4 text-base font-medium text-brand-ink hover:bg-slate-50 transition-colors"
              >
                {item.label}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </li>
          ))}
        </ul>

        {/* Contacto rápido */}
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent-dark">
          Contacto
        </p>
        <ul className="mt-3 space-y-2">
          {phoneActive && (
            <li>
              <a
                href={telUrl()}
                onClick={onClose}
                className="flex items-center gap-3 px-5 py-3.5 rounded-lg bg-white ring-1 ring-slate-200/60 text-sm text-brand-ink hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-accent-dark" />
                <span className="font-medium">{business.phone}</span>
              </a>
            </li>
          )}
          <li>
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-lg bg-white ring-1 ring-slate-200/60 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-brand-accent-dark shrink-0" />
              <span>{business.serviceArea || `${business.city}, ${business.region}`}</span>
            </div>
          </li>
        </ul>
      </div>

      {/* CTA WhatsApp pegado abajo con safe-area */}
      <div
        className="border-t border-slate-200/70 bg-white px-6 pt-4"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <a
          href={whatsappUrl('Hola, tengo una consulta sobre electrodomésticos.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full min-h-[52px] px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-5 h-5" />
          Escríbenos por WhatsApp
        </a>
        <p className="mt-2 text-center text-xs text-slate-500">
          Respuesta en horario de tienda
        </p>
      </div>
    </div>
  )
}
