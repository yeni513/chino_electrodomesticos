import { MapPin, Clock, Phone, Navigation, MessageCircle, Eye, Car, ShieldCheck } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import MetalButton from '../ui/MetalButton.jsx'
import { business } from '../../data/content.js'
import { whatsappUrl, telUrl, hasPhone } from '../../lib/whatsapp.js'

const PERKS = [
  { icon: Eye, label: 'Ves y pruebas el equipo antes de comprar' },
  { icon: ShieldCheck, label: 'Todo revisado antes de salir de la tienda' },
  { icon: Car, label: 'Fácil acceso y estacionamiento en Lorain Ave' },
]

export default function Location() {
  return (
    <section id="visitanos" className="section-y bg-brand-cream">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Info */}
          <Reveal variant="right">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              Visítanos
            </p>
            <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
              Pasa por nuestra tienda en Cleveland
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl">
              Tenemos tienda física: ven, mira los equipos en persona y llévatelos el mismo
              día. Si prefieres, te coordinamos la entrega a tu casa.
            </p>

            {/* Dirección + horario + teléfono */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 text-brand-accent-dark shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-base md:text-lg font-semibold text-brand-ink leading-snug">
                    {business.street}
                  </p>
                  <p className="text-sm text-slate-600">
                    Cleveland, {business.region} {business.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 text-brand-accent-dark shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-base font-semibold text-brand-ink leading-snug">Horario</p>
                  <p className="text-sm text-slate-600">{business.hours}</p>
                </div>
              </div>
              {hasPhone() && (
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 text-brand-accent-dark shrink-0">
                    <Phone className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-brand-ink leading-snug">Teléfono</p>
                    <a href={telUrl()} className="text-sm text-slate-600 hover:text-brand-ink">
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Perks */}
            <ul className="mt-7 space-y-2.5">
              {PERKS.map((perk) => {
                const Icon = perk.icon
                return (
                  <li key={perk.label} className="flex items-center gap-2.5 text-sm md:text-base text-slate-700">
                    <Icon className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.25} />
                    {perk.label}
                  </li>
                )
              })}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MetalButton variant="gold" href={business.mapsDirUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="w-4 h-4" />
                Cómo llegar
              </MetalButton>
              <a
                href={whatsappUrl('Hola, ¿están abiertos hoy? Quiero pasar por la tienda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-soft hover:shadow-lift transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4" />
                Confirmar horario
              </a>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal variant="left" delay={120}>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir ubicación en Google Maps"
              className="block relative rounded-card overflow-hidden ring-1 ring-slate-200 shadow-lift group"
            >
              <div className="aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
                <iframe
                  title="Ubicación de Trusted Appliances en Cleveland"
                  src={business.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 pointer-events-none"
                />
              </div>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-ink text-white text-sm font-semibold shadow-lift">
                <MapPin className="w-4 h-4 text-brand-accent" />
                {business.street}, Cleveland
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
