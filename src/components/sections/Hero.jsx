import {
  ArrowRight,
  MessageCircle,
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'
import { hero, business } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

const ICONS = { Refrigerator, WashingMachine, Shirt, Flame }

const TRUST_ITEMS = [
  { icon: MapPin, label: `Entrega en ${business.city}` },
  { icon: ShieldCheck, label: 'Revisado antes de salir' },
  { icon: Truck, label: 'Coordinamos día y hora' },
]

export default function Hero() {
  const secondaryHref =
    hero.secondaryCta.href === 'whatsapp-direct'
      ? whatsappUrl(
          'Hola, mi presupuesto es $___. ¿Qué opciones tienen disponibles?',
        )
      : hero.secondaryCta.href

  return (
    <section id="top" className="relative mesh-bg overflow-hidden">
      <Container className="pt-10 pb-20 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 xl:pt-32 xl:pb-44">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Texto */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Badge tone="accent">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent-dark" />
              {hero.eyebrow}
            </Badge>

            <h1 className="heading-hero mt-6 font-display font-semibold text-brand-ink">
              {hero.headline}
            </h1>

            <p className="mt-6 md:mt-7 text-lg md:text-xl xl:text-[1.375rem] text-slate-600 max-w-xl xl:max-w-2xl leading-relaxed">
              {hero.subhead}
            </p>

            {/* Chips de categorías */}
            <div className="mt-7 md:mt-8 flex flex-wrap gap-2 md:gap-2.5">
              {hero.categoryChips.map((chip) => {
                const Icon = ICONS[chip.icon]
                return (
                  <a
                    key={chip.label}
                    href="#destacados"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white ring-1 ring-slate-200 hover:ring-brand-ink hover:bg-brand-ink hover:text-white text-sm md:text-[0.95rem] font-medium text-brand-ink transition-colors"
                  >
                    {Icon && (
                      <Icon
                        className="w-4 h-4 md:w-[18px] md:h-[18px] text-brand-accent-dark group-hover:text-brand-accent transition-colors"
                        strokeWidth={1.75}
                      />
                    )}
                    {chip.label}
                  </a>
                )
              })}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button as="a" href={hero.primaryCta.href} variant="primary" size="xl">
                {hero.primaryCta.label}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                as="a"
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="xl"
                className="!bg-emerald-600 hover:!bg-emerald-700"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                {hero.secondaryCta.label}
              </Button>
            </div>

            <p className="mt-4 text-sm md:text-[0.95rem] text-slate-500 max-w-md md:max-w-lg leading-relaxed">
              {hero.microcopy}
            </p>

            {/* Trust strip — datos verificables, sin reviews fake */}
            <ul className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {TRUST_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2.5 text-sm md:text-[0.95rem] text-slate-700"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 text-brand-ink shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <span className="font-medium leading-tight">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}

function HeroVisual() {
  return (
    // Wrapper exterior con padding grande arriba/abajo desde sm+ para que
    // las cards flotantes (Equipos / Atención rápida) quepan FUERA del
    // aspect-ratio container sin tapar el grid de productos.
    <div className="relative pt-3 pb-5 pl-2 pr-2 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16 lg:pt-16 lg:pb-16 lg:pl-4 lg:pr-4 w-full max-w-md mx-auto lg:max-w-none">
      {/* Card principal con aspect-ratio fijo */}
      <div className="relative aspect-square sm:aspect-[5/4] lg:aspect-[5/6]">
        {/* Marco / fondo */}
        <div className="absolute inset-0 rounded-card bg-gradient-to-br from-brand-cream via-white to-amber-50/60 ring-1 ring-slate-200/70 shadow-lift" />

        {/* Línea sutil de "estante" entre filas */}
        <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Grid 2x2 SIEMPRE: las 4 categorías visibles desde mobile */}
        <div className="absolute inset-3 md:inset-5 lg:inset-7 grid grid-cols-2 grid-rows-2 gap-2.5 md:gap-3.5 lg:gap-5">
          {hero.applianceCards.slice(0, 4).map((item, i) => {
            const Icon = ICONS[item.icon]
            const msg = `Hola, quiero ver precios y disponibilidad de ${item.label.toLowerCase()}.`
            return (
              <a
                key={item.label}
                href={whatsappUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  'group relative flex flex-col p-3 md:p-4 lg:p-6 rounded-xl bg-white',
                  'shadow-soft ring-1 ring-slate-200/70',
                  'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift hover:ring-slate-300',
                  i === 1 ? 'lg:translate-y-3' : '',
                  i === 2 ? 'lg:-translate-y-2' : '',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="relative inline-flex h-9 w-9 md:h-12 md:w-12 lg:h-16 lg:w-16 items-center justify-center rounded-lg bg-brand-cream text-brand-ink ring-1 ring-slate-200/60 group-hover:bg-brand-accent group-hover:ring-brand-accent transition-colors">
                    {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" strokeWidth={1.5} />}
                  </span>
                  {item.featured && (
                    <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-accent text-brand-ink whitespace-nowrap">
                      Top
                    </span>
                  )}
                </div>

                <div className="mt-2 md:mt-3 lg:mt-4 flex-1 flex flex-col justify-end">
                  <p className="text-[13px] md:text-sm lg:text-lg font-semibold text-brand-ink leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[10px] md:text-[11px] lg:text-sm text-slate-500 mt-0.5 hidden md:block">{item.detail}</p>

                  <div className="mt-1.5 md:mt-2 lg:mt-3 flex items-center gap-1.5">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] md:text-[11px] lg:text-xs font-medium text-emerald-700">Disponible</span>
                  </div>

                  <p className="mt-1 lg:mt-1.5 text-[10px] md:text-[11px] lg:text-sm font-medium text-brand-ink/70 hidden md:block">
                    {item.priceLabel}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Card flotante: WhatsApp / atención rápida
          Pill horizontal compacta posicionada respecto al WRAPPER.
          Single-line para que su altura (~48px) quepa dentro del padding
          inferior del wrapper sin tapar el aspect container. */}
      <a
        href={whatsappUrl('Hola, quiero información sobre electrodomésticos disponibles.')}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex absolute bottom-2 left-1 md:bottom-3 md:left-2 lg:bottom-3 lg:left-3 items-center gap-2.5 bg-brand-ink text-white rounded-full shadow-lift pl-1.5 pr-4 py-1.5 md:pl-2 md:pr-5 md:py-2 ring-1 ring-white/5 hover:ring-emerald-400/40 transition-all duration-300 ease-smooth motion-safe:hover:-translate-y-0.5 group"
      >
        <span className="relative inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0 group-hover:bg-emerald-500 transition-colors">
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          <span aria-hidden className="absolute inset-0 rounded-full ring-2 ring-emerald-400/50 motion-safe:animate-pulse" />
        </span>
        <span className="text-xs md:text-sm font-semibold leading-tight whitespace-nowrap">
          Respondemos por WhatsApp
        </span>
      </a>

      {/* Card flotante: equipos nuevos
          Pill horizontal compacta. Posicionada respecto al WRAPPER,
          solo en sm+. */}
      <div className="hidden sm:inline-flex absolute top-2 right-1 md:top-3 md:right-2 lg:top-3 lg:right-3 items-center gap-2 bg-white rounded-full shadow-lift pl-2 pr-3.5 py-1.5 md:pl-2.5 md:pr-4 md:py-2 ring-1 ring-slate-200/70">
        <span className="inline-flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent-dark shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.25} />
        </span>
        <span className="text-xs md:text-sm font-semibold text-brand-ink leading-tight whitespace-nowrap">
          Garantía de fábrica
        </span>
      </div>
    </div>
  )
}
