import { Loader2, Archive, RotateCcw, Trash } from 'lucide-react'
import { srcAt } from '../../lib/imgUrl.js'

export default function TrashView({ loading, rows, onRestore, onPurge }) {
  if (loading) {
    return (
      <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 flex items-center justify-center gap-2 text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        Cargando papelera…
      </div>
    )
  }
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 text-center">
        <Archive className="w-8 h-8 mx-auto text-slate-300" />
        <h3 className="mt-4 font-display font-semibold text-lg text-brand-ink">Papelera vacía</h3>
        <p className="mt-2 text-sm text-slate-500">
          Los productos que borres aparecen aquí. Puedes restaurarlos o eliminarlos para siempre.
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-card bg-white ring-1 ring-slate-200 overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-col md:flex-row md:items-center gap-4 px-4 md:px-5 py-4">
            <div className="w-16 h-16 rounded-lg bg-slate-100 ring-1 ring-slate-200 overflow-hidden shrink-0">
              {row.image_url ? (
                <img
                  src={srcAt(row.image_url, { width: 128 })}
                  alt={row.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-base text-brand-ink leading-tight">{row.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                Borrado el {new Date(row.deleted_at).toLocaleString('es-419')}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onRestore(row)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-lg ring-1 ring-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar
              </button>
              <button
                type="button"
                onClick={() => onPurge(row)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100"
              >
                <Trash className="w-3.5 h-3.5" />
                Eliminar para siempre
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
