import { useMemo } from 'react'
import {
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  Snowflake,
  Package,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  PackageCheck,
  Truck,
  Clock3,
  XCircle,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import { destacados as fallbackDestacados, destacadosIntro } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { useProducts } from '../../supabase/useProducts.js'
import { normalizeFallbackProduct } from '../../supabase/mapProduct.js'

const CHIP_ICONS = { CheckCircle2, PackageCheck, Truck, Clock3, XCircle }

const CHIP_TONES = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200/70',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200/70',
}

const BADGE_TONES = {
  ink: 'bg-brand-ink text-white ring-brand-ink',
  sold: 'bg-rose-600 text-white ring-rose-600',
  soldout: 'bg-amber-500 text-brand-ink ring-amber-500',
}

const ICON_BY_CATEGORY = {
  lavadora: WashingMachine,
  secadora: Shirt,
  estufa: Flame,
  refrigerador: Refrigerator,
  freezer: Snowflake,
  combo: WashingMachine,
  otro: Package,
}

const ICON_BY_INDEX = [Refrigerator, WashingMachine, Shirt, Flame]

export default function Destacados() {
  const { products: cmsProducts, loading } = useProducts()

  const products = useMemo(() => {
    if (cmsProducts && cmsProducts.length > 0) return cmsProducts
    return fallbackDestacados.map(normalizeFallbackProduct)
  }, [cmsProducts])

  const usingFallback = !loading && (!cmsProducts || cmsProducts.length === 0)

  return (
    <section id="destacados" className="section-y bg-brand-cream/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              {destacadosIntro.eyebrow}
            </p>
            <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
              {destacadosIntro.headline}
            </h2>
            <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
              {destacadosIntro.subhead}
            </p>
          </div>
          <Button
            as="a"
            href={whatsappUrl('Hola, busco un modelo que no veo en la web. ¿Pueden ayudarme?')}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="md"
          >
            Preguntar disponibilidad
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
          {products.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} fallbackIcon={ICON_BY_INDEX[i] || Package} />
          ))}
        </div>

        <p className="mt-12 text-xs md:text-sm text-slate-500 text-center md:text-left">
          {usingFallback
            ? 'Muestra orientativa del catálogo. Confirma disponibilidad y precio por WhatsApp.'
            : 'Stock y precios sujetos a disponibilidad. Confirma por WhatsApp antes de venir.'}
        </p>
      </Container>
    </section>
  )
}

function ProductCard({ product: p, fallbackIcon: FallbackIcon }) {
  const Icon = ICON_BY_CATEGORY[p.category] || FallbackIcon || Package
  const productMessage = `Hola, quiero consultar por ${p.name}`
  const badge = p.badge
  const isSold = p.status === 'vendido'
  const isOut = p.status === 'agotado'

  return (
    <article className="group flex flex-col rounded-card bg-white ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ease-smooth overflow-hidden">
      {/* Visual */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-white to-brand-cream overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className={[
              'absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105',
              isSold || isOut ? 'opacity-60 grayscale' : '',
            ].join(' ')}
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.85), transparent 60%)',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-8 bottom-8 h-1.5 rounded-full bg-slate-200/70 blur-md"
            />
            <div
              className={[
                'absolute inset-0 flex items-center justify-center text-brand-ink/75 transition-transform duration-500 ease-smooth',
                isSold || isOut ? 'opacity-60' : 'group-hover:scale-105',
              ].join(' ')}
            >
              <Icon className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40" strokeWidth={1.05} />
            </div>
          </>
        )}

        {badge?.label && (
          <div className="absolute top-4 left-4">
            <span
              className={[
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
                'text-xs font-semibold ring-1 ring-inset',
                BADGE_TONES[badge.tone] || BADGE_TONES.ink,
              ].join(' ')}
            >
              {badge.label}
            </span>
          </div>
        )}
      </div>

      {/* Ficha */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <h3 className="font-display font-semibold text-lg md:text-xl text-brand-ink leading-snug line-clamp-2 min-h-[3rem]">
          {p.name}
        </h3>
        {p.spec && (
          <p className="mt-2.5 text-sm md:text-base text-slate-700 font-medium">{p.spec}</p>
        )}
        {p.detail && (
          <p className="mt-1.5 text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2">
            {p.detail}
          </p>
        )}

        {p.chips && p.chips.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.chips.map((chip) => {
              const ChipIcon = CHIP_ICONS[chip.icon]
              return (
                <span
                  key={chip.label}
                  className={[
                    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full',
                    'text-[11px] md:text-xs font-semibold ring-1 ring-inset',
                    CHIP_TONES[chip.tone] || CHIP_TONES.neutral,
                  ].join(' ')}
                >
                  {ChipIcon && <ChipIcon className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2.5} />}
                  {chip.label}
                </span>
              )
            })}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-[11px] md:text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Precio
          </p>
          <p className="mt-1 text-2xl md:text-[1.625rem] font-display font-semibold text-brand-ink leading-tight tabular-nums">
            {p.price}
          </p>
        </div>

        <a
          href={whatsappUrl(productMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 w-full min-h-[52px] px-5 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm md:text-base font-semibold shadow-soft hover:shadow-lift transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          {isSold || isOut ? 'Preguntar por modelo similar' : 'Preguntar por este equipo'}
        </a>
        <p className="mt-2.5 text-[11px] md:text-xs text-center text-slate-400">
          Te enviamos fotos y precio por WhatsApp
        </p>
      </div>
    </article>
  )
}
