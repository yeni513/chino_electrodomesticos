import {
  ArrowRight,
  MessageCircle,
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  MapPin,
  ShieldCheck,
  Truck,
  ChevronDown,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import HeroVideoBackground from '../visuals/HeroVideoBackground.jsx'
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
    // -mt para que el video quede DETRÁS del header sticky (header transparente).
    <section
      id="top"
      className="relative overflow-hidden bg-brand-ink text-white -mt-16 md:-mt-24"
    >
      {/* Video de fondo (showroom de electrodomésticos) + poster fallback */}
      <HeroVideoBackground
        mp4="/heroes/showroom/hero.mp4"
        webm="/heroes/showroom/hero.webm"
        poster="/heroes/showroom/poster.jpg"
        className="absolute inset-0 z-0"
      />

      {/* Scrims para legibilidad del texto (más oscuro a la izquierda) */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30 md:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-brand-ink via-brand-ink/30 to-transparent"
      />
      {/* Scrim superior para que el logo y el menú del header se lean sobre el video */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-28 md:h-36 bg-gradient-to-b from-brand-ink/80 to-transparent"
      />

      <Container className="relative z-20 pt-28 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 xl:pt-52 xl:pb-44">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm text-xs md:text-[0.8rem] font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>
            {hero.eyebrow}
          </span>

          <h1 className="heading-hero mt-6 font-display font-semibold text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]">
            {hero.headline}
          </h1>

          <p className="mt-6 md:mt-7 text-lg md:text-xl xl:text-[1.375rem] text-slate-200 max-w-xl leading-relaxed">
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
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white hover:text-brand-ink text-sm md:text-[0.95rem] font-medium text-white transition-colors"
                >
                  {Icon && (
                    <Icon
                      className="w-4 h-4 md:w-[18px] md:h-[18px] text-brand-accent group-hover:text-brand-accent-dark transition-colors"
                      strokeWidth={1.75}
                    />
                  )}
                  {chip.label}
                </a>
              )
            })}
          </div>

          {/* CTAs */}
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

          <p className="mt-4 text-sm md:text-[0.95rem] text-slate-300 max-w-md md:max-w-lg leading-relaxed">
            {hero.microcopy}
          </p>

          {/* Trust strip — datos verificables, sin reviews fake */}
          <ul className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-sm md:text-[0.95rem] text-slate-100"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20 backdrop-blur-sm text-brand-accent shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <span className="font-medium leading-tight">{item.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>

      {/* Indicador de scroll */}
      <a
        href="#destacados"
        aria-label="Ver catálogo"
        className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
          Ver catálogo
        </span>
        <ChevronDown className="w-5 h-5 motion-safe:animate-hero-bob" />
      </a>
    </section>
  )
}
