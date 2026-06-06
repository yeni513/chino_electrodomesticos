import { useEffect, useState } from 'react'
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Check,
} from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import { whatsappUrl } from '../../lib/whatsapp.js'

const TRUST = [
  { icon: ShieldCheck, label: 'Revisado antes de entregar' },
  { icon: Truck, label: 'Entrega coordinada en Cleveland' },
  { icon: Tag, label: 'Precio final claro, sin sorpresas' },
]

export default function CategoryModal({ category, open, onClose }) {
  const [active, setActive] = useState(0)

  // Reinicia la imagen activa cada vez que cambia de categoría.
  useEffect(() => {
    setActive(0)
  }, [category?.id])

  if (!category) return null

  const images = [category.image, category.imageAngle].filter(Boolean)
  const waMsg = `Hola, me interesan las ${category.label.toLowerCase()}. ¿Qué opciones tienen disponibles y a qué precio?`

  const goToCatalog = () => {
    onClose()
    // Comunica el filtro al catálogo y hace scroll hacia él.
    window.dispatchEvent(
      new CustomEvent('catalog:filter', { detail: category.id }),
    )
    requestAnimationFrame(() => {
      document.getElementById('destacados')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="catmodal-title" maxWidth="max-w-4xl">
      <div className="grid md:grid-cols-2 overflow-y-auto">
        {/* Galería */}
        <div className="bg-gradient-to-b from-slate-50 to-brand-cream p-5 md:p-7">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white ring-1 ring-slate-200/60 shadow-soft">
            <img
              src={images[active]}
              alt={`${category.label} — Trusted Appliances Cleveland`}
              className="w-full h-full object-cover"
            />
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
                    i === active
                      ? 'ring-brand-accent'
                      : 'ring-slate-200 opacity-70 hover:opacity-100',
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
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent-dark">
            Catálogo
          </p>
          <h3
            id="catmodal-title"
            className="mt-1.5 font-display font-semibold text-2xl md:text-3xl text-brand-ink leading-tight"
          >
            {category.label}
          </h3>
          <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
            {category.long || category.description}
          </p>

          {/* Opciones / subtipos */}
          {category.subtypes?.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Opciones que solemos tener
              </p>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {category.subtypes.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-1.5 text-sm text-slate-700"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" strokeWidth={2.5} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Acabados */}
          {category.finishes?.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Acabados
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {category.finishes.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-cream ring-1 ring-slate-200 text-xs font-medium text-brand-ink"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trust */}
          <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
            {TRUST.map((t) => {
              const Icon = t.icon
              return (
                <li key={t.label} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Icon className="w-4 h-4 text-brand-accent-dark shrink-0" strokeWidth={2} />
                  {t.label}
                </li>
              )
            })}
          </ul>

          {/* Acciones — WhatsApp como decisión deliberada, no atajo de toda la página */}
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={whatsappUrl(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full min-h-[52px] px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm md:text-base shadow-soft hover:shadow-lift transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" />
              Preguntar precio y disponibilidad
            </a>
            <button
              type="button"
              onClick={goToCatalog}
              className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-5 py-3 rounded-lg bg-white ring-1 ring-slate-200 hover:ring-brand-ink text-brand-ink font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Ver modelos en el catálogo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
