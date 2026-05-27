import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react'
import Container from './Container.jsx'
import { brand, business, nav } from '../../data/content.js'
import { whatsappUrl, telUrl, hasPhone, hasEmail } from '../../lib/whatsapp.js'

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-slate-300">
      <Container className="py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-flex items-center bg-white rounded-lg px-5 py-4 ring-1 ring-white/10 shadow-soft">
            <img
              src={brand.assets.logo}
              alt={business.name}
              className="h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            {business.tagline}. Entrega coordinada, equipos revisados antes de salir y asesoría directa por WhatsApp.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Tienda</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Escríbenos por WhatsApp
              </a>
            </li>
            {hasPhone() && (
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" />
                <a href={telUrl()} className="hover:text-white">
                  {business.phone}
                </a>
              </li>
            )}
            {hasEmail() && (
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-white">
                  {business.email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" />
              <span>{business.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" />
              <span>{business.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
          </p>
          <p>
            Website by{' '}
            <a
              href="https://leyvawebstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink rounded-sm"
            >
              Leyva Web Studio
            </a>
          </p>
        </Container>
      </div>
    </footer>
  )
}
