import {
  ArrowRight,
  MessageCircle,
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'
import { hero } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'

const ICONS = { Refrigerator, WashingMachine, Shirt, Flame }

export default function Hero() {
  const secondaryHref =
    hero.secondaryCta.href === 'whatsapp-direct'
      ? whatsappUrl('Hola, quiero información sobre electrodomésticos disponibles.')
      : hero.secondaryCta.href

  return (
    <section id="top" className="relative mesh-bg overflow-hidden">
      <Container className="pt-14 pb-28 md:pt-24 md:pb-32 lg:pt-28 lg:pb-36 xl:pt-32 xl:pb-44">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Texto */}
          <div className="lg:col-span-7">
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

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm md:text-[0.95rem] text-slate-600">
              {hero.trustBullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-brand-accent" strokeWidth={2.25} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[5/6] w-full max-w-md mx-auto lg:max-w-none">
      {/* Marco / fondo */}
      <div className="absolute inset-0 rounded-card bg-gradient-to-br from-brand-cream via-white to-amber-50/60 ring-1 ring-slate-200/70 shadow-lift" />

      {/* Línea sutil de "estante" */}
      <div className="absolute inset-x-10 bottom-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Grid de 4 electrodomésticos */}
      <div className="absolute inset-5 md:inset-6 lg:inset-7 grid grid-cols-2 grid-rows-2 gap-3.5 md:gap-4 lg:gap-5">
        {hero.applianceCards.map((item, i) => {
          const Icon = ICONS[item.icon]
          return (
            <a
              key={item.label}
              href="#destacados"
              className={[
                'group relative flex flex-col p-4 md:p-5 lg:p-6 rounded-xl bg-white',
                'shadow-soft ring-1 ring-slate-200/70',
                'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift hover:ring-slate-300',
                i === 1 ? 'lg:translate-y-3' : '',
                i === 2 ? 'lg:-translate-y-2' : '',
              ].join(' ')}
            >
              {/* Top: icono + badge */}
              <div className="flex items-start justify-between gap-2">
                <span className="relative inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-lg bg-brand-cream text-brand-ink ring-1 ring-slate-200/60 group-hover:bg-brand-accent group-hover:ring-brand-accent transition-colors">
                  {Icon && <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" strokeWidth={1.5} />}
                </span>
                {item.featured && (
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-accent text-brand-ink whitespace-nowrap">
                    Top
                  </span>
                )}
              </div>

              {/* Bottom: nombre + estado + precio */}
              <div className="mt-4 flex-1 flex flex-col justify-end">
                <p className="text-sm md:text-base lg:text-lg font-semibold text-brand-ink leading-tight">
                  {item.label}
                </p>
                <p className="text-[11px] md:text-xs lg:text-sm text-slate-500 mt-0.5">{item.detail}</p>

                <div className="mt-3 flex items-center gap-1.5">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] md:text-xs font-medium text-emerald-700">Disponible</span>
                </div>

                <p className="mt-1.5 text-[11px] md:text-xs lg:text-sm font-medium text-brand-ink/70">
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
        className="absolute -bottom-5 -left-3 md:-left-6 bg-brand-ink text-white rounded-card shadow-lift p-4 md:p-5 max-w-[240px] md:max-w-[260px] ring-1 ring-white/5 hover:ring-emerald-400/40 transition-all duration-300 ease-smooth hover:-translate-y-1 group"
      >
        <div className="flex items-center gap-2.5 md:gap-3">
          <span className="relative inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-lg bg-emerald-500 text-white shrink-0 group-hover:bg-emerald-400 transition-colors">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span aria-hidden className="absolute inset-0 rounded-lg ring-2 ring-emerald-400/50 animate-pulse" />
          </span>
          <div>
            <p className="text-sm md:text-base font-semibold leading-tight">Atención rápida</p>
            <p className="text-xs md:text-sm text-slate-300 mt-0.5">Respondemos por WhatsApp</p>
          </div>
        </div>
      </a>

      {/* Card flotante: equipos */}
      <div className="absolute -top-3 -right-3 md:-right-5 bg-white rounded-card shadow-lift p-3.5 md:p-4 ring-1 ring-slate-200/70 max-w-[190px] md:max-w-[210px]">
        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
          Equipos nuevos
        </p>
        <p className="text-sm md:text-base font-display font-semibold text-brand-ink leading-tight mt-1">
          Revisados antes de salir
        </p>
      </div>
    </div>
  )
}
