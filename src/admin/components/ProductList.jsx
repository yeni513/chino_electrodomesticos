import { useEffect, useRef, useState } from 'react'
import {
  Package,
  Pencil,
  Trash2,
  Star,
  CircleDollarSign,
  Copy,
  ChevronDown,
  Check,
} from 'lucide-react'
import { srcAt } from '../../lib/imgUrl.js'

const CATEGORY_LABEL = {
  lavadora: 'Lavadora',
  secadora: 'Secadora',
  estufa: 'Estufa',
  refrigerador: 'Refrigerador',
  freezer: 'Freezer',
  combo: 'Combo lavadora/secadora',
  otro: 'Otro',
}

const STATUS_STYLES = {
  disponible: 'bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100',
  vendido: 'bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100',
  agotado: 'bg-amber-50 text-amber-800 ring-amber-200 hover:bg-amber-100',
}

const STATUS_OPTIONS = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'vendido', label: 'Vendido' },
  { value: 'agotado', label: 'Agotado' },
]

function formatPrice(price) {
  if (price == null) return 'Consultar precio'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(price))
}

function relativeTime(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 1) return 'recién'
  if (m < 60) return `hace ${m} min`
  const h = Math.round(m / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.round(h / 24)
  if (d < 30) return `hace ${d} d`
  return new Date(iso).toLocaleDateString('es-419')
}

export default function ProductList({
  rows,
  onEdit,
  onDelete,
  onDuplicate,
  onStatusChange,
  selected,
  onToggleSelect,
  onToggleSelectAll,
  emptyMessage,
}) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="font-display font-semibold text-lg text-brand-ink">
          {emptyMessage?.title || 'Aún no hay productos'}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {emptyMessage?.body || 'Haz clic en "Añadir producto" para crear el primero.'}
        </p>
      </div>
    )
  }

  const allSelected = selected && selected.size > 0 && selected.size === rows.length
  const someSelected = selected && selected.size > 0 && !allSelected

  return (
    <div className="rounded-card bg-white ring-1 ring-slate-200 overflow-hidden">
      {onToggleSelectAll && (
        <div className="px-4 md:px-5 py-2.5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/60">
          <SelectCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={() => onToggleSelectAll(!allSelected)}
            label="Seleccionar todos"
          />
          <span className="text-xs text-slate-500">
            {selected && selected.size > 0
              ? `${selected.size} seleccionado${selected.size === 1 ? '' : 's'}`
              : `${rows.length} producto${rows.length === 1 ? '' : 's'}`}
          </span>
        </div>
      )}
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => {
          const isSelected = selected?.has(row.id)
          return (
            <li
              key={row.id}
              className={[
                'flex flex-col md:flex-row md:items-center gap-4 px-4 md:px-5 py-4 transition-colors',
                isSelected ? 'bg-amber-50/60' : 'hover:bg-slate-50',
              ].join(' ')}
            >
              {onToggleSelect && (
                <SelectCheckbox
                  checked={!!isSelected}
                  onChange={() => onToggleSelect(row.id)}
                  label={`Seleccionar ${row.title}`}
                />
              )}

              {/* Imagen */}
              <div className="w-20 h-20 md:w-16 md:h-16 rounded-lg bg-slate-100 ring-1 ring-slate-200 overflow-hidden shrink-0">
                {row.image_url ? (
                  <img
                    src={srcAt(row.image_url, { width: 160 })}
                    alt={row.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Package className="w-7 h-7" strokeWidth={1.25} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="font-display font-semibold text-base text-brand-ink leading-tight">
                    {row.title || <span className="text-slate-400">Sin nombre</span>}
                  </h3>
                  {row.featured && (
                    <span title="Destacado · Aparece primero en la web" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent-dark text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      Destacado
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {CATEGORY_LABEL[row.category] || 'Sin categoría'}
                  {row.brand ? ` · ${row.brand}` : ''}
                  {row.color ? ` · ${row.color}` : ''}
                  {row.updated_at && ` · editado ${relativeTime(row.updated_at)}`}
                </p>
              </div>

              {/* Precio */}
              <div className="md:w-32 md:text-right">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Precio</p>
                <p className="font-display font-semibold text-brand-ink tabular-nums inline-flex items-center gap-1">
                  {row.price == null && <CircleDollarSign className="w-3.5 h-3.5 text-slate-400" />}
                  {formatPrice(row.price)}
                </p>
              </div>

              {/* Estado clickeable */}
              <div className="md:w-32">
                <StatusPill
                  value={row.status}
                  onChange={(next) => onStatusChange?.(row, next)}
                />
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-1 md:ml-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => onEdit?.(row)}
                  className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg ring-1 ring-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDuplicate?.(row)}
                  title="Duplicar producto"
                  className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg ring-1 ring-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                  aria-label={`Duplicar ${row.title}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Duplicar</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(row)}
                  className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Borrar
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SelectCheckbox({ checked, indeterminate, onChange, label }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-brand-ink focus:ring-brand-accent"
        aria-label={label}
      />
    </label>
  )
}

function StatusPill({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onClick(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0]
  const stylesClass = STATUS_STYLES[value] || STATUS_STYLES.disponible

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          'inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ring-1 ring-inset min-h-[32px] transition-colors',
          stylesClass,
        ].join(' ')}
      >
        {current.label}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-1 left-0 min-w-[160px] bg-white rounded-lg shadow-lift ring-1 ring-slate-200 py-1"
        >
          {STATUS_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  setOpen(false)
                  if (opt.value !== value) onChange?.(opt.value)
                }}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {opt.label}
                {value === opt.value && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
