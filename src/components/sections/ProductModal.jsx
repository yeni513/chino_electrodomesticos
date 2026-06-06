import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, ShieldCheck, Truck, Tag, Package, ZoomIn, X } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { CATEGORY_ICON } from '../../lib/icons.js'
import { srcAt } from '../../lib/imgUrl.js'

const TRUST = [
  { icon: ShieldCheck, label: 'Revisado antes de entregar' },
  { icon: Truck, label: 'Entrega coordinada en Cleveland' },
  { icon: Tag, label: 'Precio final claro' },
]

export default function ProductModal({ product, open, onClose }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    setActive(0)
    setZoom(false)
  }, [product?.id])

  if (!product) return null

  const p = product
  const Icon = CATEGORY_ICON[p.category] || Package
  const isSold = p.status === 'vendido'
  const isOut = p.status === 'agotado'
  const dimmed = isSold || isOut
  const images = (p.images?.length ? p.images : p.image ? [p.image] : []).map((src) =>
    srcAt(src, { width: 800 }),
  )
  const waMsg =
    isSold || isOut
      ? `Hola, vi "${p.name}" en la web (aparece como no disponible). ¿Tienen algo similar?`
      : `Hola, quiero consultar por "${p.name}". ¿Sigue disponible y a qué precio?`

  return (
    <>
      <Modal open={open} onClose={onClose} labelledBy="prodmodal-title" maxWidth="max-w-4xl">
        <div className="grid md:grid-cols-2 overflow-y-auto">
          {/* Galería */}
          <div className="bg-gradient-to-b from-slate-50 to-brand-cream p-5 md:p-7">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white ring-1 ring-slate-200/60 shadow-soft">
              {images.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  aria-label="Ampliar imagen"
                  className="group block w-full h-full"
                >
                  <img
                    src={images[active]}
                    alt={`${p.name} — Trusted Appliances Cleveland`}
                    className={[
                      'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
                      dimmed ? 'opacity-70 grayscale' : '',
                    ].join(' ')}
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-brand-ink/80 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                  </span>
                </button>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon className="w-24 h-24 text-brand-ink/20" strokeWidth={1.25} />
                </div>
              )}
              {p.badge?.label && (
                <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-brand-ink text-white text-xs font-semibold">
                  {p.badge.label}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2.5">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={[
                      'h-16 w-16 rounded-lg overflow-hidden ring-2 transition-all bg-white',
                      i === active ? 'ring-brand-accent' : 'ring-slate-200 opacity-70 hover:opacity-100',
                    ].join(' ')}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <h3
              id="prodmodal-title"
              className="font-display font-semibold text-2xl md:text-3xl text-brand-ink leading-tight pr-10"
            >
              {p.name}
            </h3>
            {p.spec && <p className="mt-2.5 text-base text-slate-700 font-medium">{p.spec}</p>}
            {p.detail && (
              <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">{p.detail}</p>
            )}

            {p.chips?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-cream ring-1 ring-slate-200 text-xs font-medium text-brand-ink"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Precio</p>
              <p className="mt-1 text-3xl font-display font-semibold text-brand-ink tabular-nums">
                {p.price}
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              {TRUST.map((t) => {
                const TIcon = t.icon
                return (
                  <li key={t.label} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <TIcon className="w-4 h-4 text-brand-accent-dark shrink-0" strokeWidth={2} />
                    {t.label}
                  </li>
                )
              })}
            </ul>

            <a
              href={whatsappUrl(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full min-h-[52px] px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm md:text-base shadow-soft hover:shadow-lift transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" />
              {isSold || isOut ? 'Preguntar por modelo similar' : 'Pedir precio por WhatsApp'}
            </a>
          </div>
        </div>
      </Modal>

      {/* Lightbox (zoom a pantalla completa) */}
      {zoom &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 motion-safe:animate-menu-in"
            onClick={() => setZoom(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${p.name} ampliada`}
          >
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[active]}
              alt={p.name}
              className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl shadow-lift"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActive(i)
                    }}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={[
                      'h-2.5 w-2.5 rounded-full transition-all',
                      i === active ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70',
                    ].join(' ')}
                  />
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
