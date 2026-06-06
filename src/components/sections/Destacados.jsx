import { useEffect, useMemo, useState } from 'react'
import {
  Package,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  PackageCheck,
  Truck,
  Clock3,
  XCircle,
  Eye,
} from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import ProductModal from './ProductModal.jsx'
import { destacadosIntro, demoProducts, categorias } from '../../data/content.js'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { useProducts } from '../../supabase/useProducts.js'
import { CATEGORY_ICON } from '../../lib/icons.js'
import { srcAt, srcSetFor } from '../../lib/imgUrl.js'

const CATEGORY_LABEL = Object.fromEntries(categorias.map((c) => [c.id, c.label]))

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

export default function Destacados() {
  const { products: cmsProducts, loading } = useProducts()
  const realProducts = cmsProducts || []

  // Mientras haya poco inventario real cargado, completamos con el catálogo de
  // ejemplo para que la tienda se vea llena (los reales van primero). En cuanto
  // el admin tenga 6+ productos reales, el demo desaparece automáticamente.
  const fillWithDemo = realProducts.length < 6
  const usingDemo = fillWithDemo
  const products = fillWithDemo ? [...realProducts, ...demoProducts] : realProducts

  const [filter, setFilter] = useState('all')
  const [quickView, setQuickView] = useState(null)

  // Las fichas de categoría pueden pedir filtrar el catálogo por categoría.
  useEffect(() => {
    const onFilter = (e) => setFilter(e.detail || 'all')
    window.addEventListener('catalog:filter', onFilter)
    return () => window.removeEventListener('catalog:filter', onFilter)
  }, [])

  // Categorías presentes en el catálogo (para mostrar solo filtros útiles).
  const presentCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean))
    return categorias.map((c) => c.id).filter((id) => set.has(id))
  }, [products])

  const filtered = useMemo(() => {
    if (filter === 'all') return products
    return products.filter((p) => p.category === filter)
  }, [products, filter])

  const showFilters = presentCategories.length > 1

  return (
    <section id="destacados" className="section-y bg-brand-cream/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent-dark">
              {destacadosIntro.eyebrow}
            </p>
            <h2 className="heading-section mt-3 font-display font-semibold text-brand-ink">
              {destacadosIntro.headline}
            </h2>
            <p className="mt-5 md:mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
              {destacadosIntro.subhead}
            </p>
          </Reveal>
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

        {/* Filtros por categoría */}
        {showFilters && (
          <div className="mt-10 flex flex-wrap gap-2">
            <FilterChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              label={`Todos (${products.length})`}
            />
            {presentCategories.map((id) => (
              <FilterChip
                key={id}
                active={filter === id}
                onClick={() => setFilter(id)}
                label={CATEGORY_LABEL[id] || id}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-card bg-white ring-1 ring-slate-200/70 p-8 text-center">
            <p className="text-slate-600">No hay equipos en esta categoría ahora mismo.</p>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="mt-3 text-sm font-semibold text-brand-accent-dark hover:underline"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
            {filtered.slice(0, 12).map((p, i) => (
              <Reveal key={p.id} variant="up" delay={(i % 4) * 80}>
                <ProductCard product={p} onQuickView={() => setQuickView(p)} />
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-12 text-xs md:text-sm text-slate-500 text-center md:text-left">
          {usingDemo
            ? 'Catálogo de muestra — el inventario real se actualiza según disponibilidad. Escríbenos por WhatsApp para confirmar.'
            : 'Stock y precios sujetos a disponibilidad. Confirma por WhatsApp antes de venir.'}
        </p>
      </Container>

      <ProductModal
        product={quickView}
        open={quickView !== null}
        onClose={() => setQuickView(null)}
      />
    </section>
  )
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
        active
          ? 'bg-brand-ink text-white ring-1 ring-brand-ink'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-ink',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function EmptyState() {
  return (
    <Reveal variant="up" className="mt-12 md:mt-14 rounded-card bg-white ring-1 ring-slate-200/70 shadow-soft p-8 md:p-12 lg:p-14">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-dark">
            <Package className="w-6 h-6" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 font-display font-semibold text-2xl md:text-3xl text-brand-ink leading-tight">
            {destacadosEmptyState.title}
          </h3>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            {destacadosEmptyState.body}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl(destacadosEmptyState.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-soft hover:shadow-lift transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4" />
              {destacadosEmptyState.ctaLabel}
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {EMPTY_STATE_PRODUCTS.map((item) => (
              <div
                key={item.src}
                className="aspect-square rounded-xl bg-gradient-to-b from-slate-50 to-brand-cream ring-1 ring-slate-200/60 overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ProductCard({ product: p, onQuickView }) {
  const Icon = CATEGORY_ICON[p.category] || Package
  const productMessage = `Hola, quiero consultar por ${p.name}`
  const badge = p.badge
  const isSold = p.status === 'vendido'
  const isOut = p.status === 'agotado'
  const [imgError, setImgError] = useState(false)
  const showImg = p.image && !imgError

  return (
    <article className="group flex flex-col rounded-card bg-white ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-lift hover:-translate-y-1 transition-all duration-300 ease-smooth overflow-hidden">
      {/* Visual — abre la vista rápida del producto */}
      <button
        type="button"
        onClick={onQuickView}
        aria-label={`Ver detalles de ${p.name}`}
        className="relative aspect-[4/3] w-full bg-gradient-to-br from-slate-100 via-white to-brand-cream overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      >
        {showImg ? (
          <img
            src={srcAt(p.image, { width: 640 })}
            srcSet={srcSetFor(p.image)}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            alt={`${p.name} disponible en Trusted Appliances Cleveland`}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className={[
              'absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105',
              isSold || isOut ? 'opacity-60 grayscale' : '',
            ].join(' ')}
          />
        ) : (
          <PlaceholderVisual Icon={Icon} name={p.name} dimmed={isSold || isOut} />
        )}

        {badge?.label && (
          <span
            className={[
              'absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
              'text-xs font-semibold ring-1 ring-inset',
              BADGE_TONES[badge.tone] || BADGE_TONES.ink,
            ].join(' ')}
          >
            {badge.label}
          </span>
        )}

        {/* Pista de interacción */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-ink/85 backdrop-blur-sm text-white text-xs font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Eye className="w-3.5 h-3.5" />
          Ver detalles
        </span>
      </button>

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
          <p className="text-[11px] md:text-xs uppercase tracking-wider text-slate-500 font-semibold">
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
          className="mt-5 inline-flex items-center justify-center gap-2 w-full min-h-[52px] px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm md:text-base font-semibold shadow-soft hover:shadow-lift transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          {isSold || isOut ? 'Preguntar por modelo similar' : 'Pedir precio por WhatsApp'}
        </a>
        <p className="mt-2.5 text-[11px] md:text-xs text-center text-slate-500">
          Te enviamos fotos y precio por WhatsApp
        </p>
      </div>
    </article>
  )
}

function PlaceholderVisual({ Icon, name, dimmed }) {
  return (
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
        className={[
          'absolute inset-0 flex flex-col items-end justify-end p-5 md:p-6 transition-transform duration-500 ease-smooth',
          dimmed ? 'opacity-60' : 'group-hover:scale-105',
        ].join(' ')}
      >
        <Icon
          className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 text-brand-ink/15"
          strokeWidth={1.25}
          aria-hidden
        />
        <p className="relative z-10 text-right text-xs md:text-sm font-semibold text-brand-ink/70 leading-tight max-w-[80%]">
          {name}
        </p>
        <p className="relative z-10 text-right text-[10px] md:text-xs text-brand-accent-dark mt-1 font-medium">
          Pídenos la foto por WhatsApp
        </p>
      </div>
    </>
  )
}
