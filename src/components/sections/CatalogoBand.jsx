import { MessageCircle } from 'lucide-react'
import Container from '../layout/Container.jsx'
import ImageTrail from '../ui/ImageTrail.jsx'
import LiquidButton from '../ui/LiquidButton.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'

const TRAIL = [
  '/products/refrigerador.webp',
  '/products/lavadora.webp',
  '/products/estufa.webp',
  '/products/secadora.webp',
  '/products/freezer.webp',
  '/products/combo.webp',
  '/products/refrigerador-sxs.webp',
  '/products/lavadora-top.webp',
]

export default function CatalogoBand() {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      {/* Glow de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(201,162,39,0.22), transparent 45%), radial-gradient(circle at 85% 80%, rgba(43,81,132,0.35), transparent 50%)',
        }}
      />
      {/* Capa de rastro de imágenes (desktop) */}
      <ImageTrail images={TRAIL} className="absolute inset-0 z-0" />

      <Container className="relative z-10 py-24 md:py-32 text-center pointer-events-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
          Catálogo en crecimiento
        </p>
        <h2 className="heading-cta mt-3 font-display font-semibold text-white">
          Más de lo que buscas,
          <br className="hidden sm:block" /> en un solo lugar
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
          Refrigeradores, lavadoras, secadoras, estufas, freezers y combos — revisados y
          listos. ¿No ves el tuyo? Te lo conseguimos.
        </p>
        <div className="mt-9 flex justify-center pointer-events-auto">
          <LiquidButton
            href={whatsappUrl('Hola, quiero ver todo el catálogo disponible esta semana.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5" />
            Ver todo por WhatsApp
          </LiquidButton>
        </div>
        <p className="mt-4 text-xs text-slate-400">Mueve el cursor por aquí 👆</p>
      </Container>
    </section>
  )
}
