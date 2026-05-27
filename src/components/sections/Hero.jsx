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
    <div className="relative aspect-[3/2] sm:aspect-[5/4] lg:aspect-[5/6] w-full max-w-md mx-auto lg:max-w-none">
      {/* Marco / fondo */}
      <div className="absolute inset-0 rounded-card bg-gradient-to-br from-brand-cream via-white to-amber-50/60 ring-1 ring-slate-200/70 shadow-lift" />

      {/* Línea sutil de "estante" */}
      <div className="absolute inset-x-10 bottom-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden sm:block" />

      {/* Grid de electrodomésticos: 2 en mobile, 4 en desktop */}
      <div className="absolute inset-4 md:inset-5 lg:inset-7 grid grid-cols-2 grid-rows-1 sm:grid-rows-2 gap-3 md:gap-4 lg:gap-5">
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
                'group relative flex flex-col p-3 md:p-5 lg:p-6 rounded-xl bg-white',
                'shadow-soft ring-1 ring-slate-200/70',
                'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift hover:ring-slate-300',
                // Mobile: solo 2 cards visibles (las primeras del grid)
                i >= 2 ? 'hidden sm:flex' : '',
                i === 1 ? 'lg:translate-y-3' : '',
                i === 2 ? 'lg:-translate-y-2' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="relative inline-flex h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-lg bg-brand-cream text-brand-ink ring-1 ring-slate-200/60 group-hover:bg-brand-accent group-hover:ring-brand-accent transition-colors">
                  {Icon && <Icon className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8" strokeWidth={1.5} />}
                </span>
                {item.featured && (
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-accent text-brand-ink whitespace-nowrap">
                    Top
                  </span>
                )}
              </div>

              <div className="mt-3 md:mt-4 flex-1 flex flex-col justify-end">
                <p className="text-sm md:text-base lg:text-lg font-semibold text-brand-ink leading-tight">
                  {item.label}
                </p>
                <p className="text-[11px] md:text-xs lg:text-sm text-slate-500 mt-0.5 hidden sm:block">{item.detail}</p>

                <div className="mt-2 md:mt-3 flex items-center gap-1.5">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] md:text-xs font-medium text-emerald-700">Disponible</span>
                </div>

                <p className="mt-1 md:mt-1.5 text-[11px] md:text-xs lg:text-sm font-medium text-brand-ink/70 hidden sm:block">
                  {item.priceLabel}
                </p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Card flotante: WhatsApp / atención */}
      <a
        href={whatsappUrl('Hola, quiero información sobre electrodomésticos disponibles.')}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -bottom-4 -left-2 md:-bottom-5 md:-left-6 bg-brand-ink text-white rounded-card shadow-lift p-3 md:p-5 max-w-[200px] md:max-w-[260px] ring-1 ring-white/5 hover:ring-emerald-400/40 transition-all duration-300 ease-smooth hover:-translate-y-1 group"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <span className="relative inline-flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg bg-emerald-500 text-white shrink-0 group-hover:bg-emerald-400 transition-colors">
            <MessageCircle className="w-4 h-4 md:w-6 md:h-6" />
            <span aria-hidden className="absolute inset-0 rounded-lg ring-2 ring-emerald-400/50 motion-safe:animate-pulse" />
          </span>
          <div>
            <p className="text-xs md:text-base font-semibold leading-tight">Atención rápida</p>
            <p className="text-[10px] md:text-sm text-slate-300 mt-0.5">Respondemos por WhatsApp</p>
          </div>
        </div>
      </a>

      {/* Card flotante: equipos */}
      <div className="absolute -top-2 -right-2 md:-top-3 md:-right-5 bg-white rounded-card shadow-lift p-3 md:p-4 ring-1 ring-slate-200/70 max-w-[170px] md:max-w-[210px]">
        <p className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
          Equipos nuevos y revisados
        </p>
        <p className="text-xs md:text-base font-display font-semibold text-brand-ink leading-tight mt-1 hidden sm:block">
          Garantía de fábrica · revisados antes de salir
        </p>
      </div>
    </div>
  )
}
