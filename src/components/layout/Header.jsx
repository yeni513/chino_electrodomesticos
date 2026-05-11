import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import Container from './Container.jsx'
import Button from '../ui/Button.jsx'
import { business, nav } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

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

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300 ease-smooth',
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/70 shadow-soft'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <Container className="flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-ink text-brand-accent font-display font-bold">
            C
          </span>
          <span className="font-display font-semibold text-lg tracking-tight">
            {business.name}
          </span>
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
            className="!min-h-0 !bg-emerald-500 hover:!bg-emerald-600 !text-white"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 animate-in fade-in">
          <Container className="py-8 flex flex-col gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-lg font-medium text-brand-ink border-b border-slate-100"
              >
                {item.label}
              </a>
            ))}
            <Button
              as="a"
              href={whatsappUrl('Hola, tengo una consulta sobre electrodomésticos.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-6 !bg-emerald-500 hover:!bg-emerald-600 !text-white"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
