import { Phone, MessageCircle, MapPin, Clock, Mail, Sparkles, ArrowUpRight } from 'lucide-react'
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
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
          </p>

          <a
            href="https://leyvawebstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website by Leyva Web Studio — abrir en nueva pestaña"
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-brand-accent ring-1 ring-white/15 hover:ring-brand-accent text-[0.8rem] font-medium text-slate-200 hover:text-brand-ink shadow-soft hover:shadow-lift transition-all duration-300 ease-smooth motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
          >
            {/* Halo dorado sutil siempre visible */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-brand-accent/15 opacity-100 group-hover:opacity-0 transition-opacity duration-300 -z-10 blur-sm"
            />
            <Sparkles
              className="w-3.5 h-3.5 text-brand-accent group-hover:text-brand-ink transition-colors"
              strokeWidth={2.25}
              aria-hidden
            />
            <span>
              Website by{' '}
              <span className="font-display font-semibold tracking-tight">Leyva Web Studio</span>
            </span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-300 ease-smooth motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              strokeWidth={2.25}
              aria-hidden
            />
          </a>
        </Container>
      </div>
    </footer>
  )
}
