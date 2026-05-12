import { Package, Pencil, Trash2, Star, CircleDollarSign } from 'lucide-react'

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
  disponible: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  vendido: 'bg-rose-50 text-rose-700 ring-rose-200',
  agotado: 'bg-amber-50 text-amber-800 ring-amber-200',
}

const STATUS_LABEL = {
  disponible: 'Disponible',
  vendido: 'Vendido',
  agotado: 'Agotado',
}

function formatPrice(price) {
  if (price == null) return 'Consultar precio'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(price))
}

export default function ProductList({ rows, onEdit, onDelete }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="font-display font-semibold text-lg text-brand-ink">
          Aún no hay productos
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Haz clic en "Añadir producto" para crear el primero.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-card bg-white ring-1 ring-slate-200 overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-col md:flex-row md:items-center gap-4 px-4 md:px-5 py-4 hover:bg-slate-50 transition-colors">
            {/* Imagen */}
            <div className="w-20 h-20 md:w-16 md:h-16 rounded-lg bg-slate-100 ring-1 ring-slate-200 overflow-hidden shrink-0">
              {row.image_url ? (
                <img src={row.image_url} alt={row.title} className="w-full h-full object-cover" />
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
                  <span title="Destacado" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent-dark text-[11px] font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    Destacado
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {CATEGORY_LABEL[row.category] || 'Sin categoría'}
                {row.brand ? ` · ${row.brand}` : ''}
                {row.color ? ` · ${row.color}` : ''}
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

            {/* Estado */}
            <div className="md:w-28">
              <span className={[
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset',
                STATUS_STYLES[row.status] || STATUS_STYLES.disponible,
              ].join(' ')}>
                {STATUS_LABEL[row.status] || row.status}
              </span>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 md:ml-2">
              <button
                type="button"
                onClick={() => onEdit?.(row)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg ring-1 ring-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(row)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
