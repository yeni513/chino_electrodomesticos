import { Trash } from 'lucide-react'

export default function BulkActionsBar({ count, onMark, onDelete }) {
  if (count === 0) return null
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 p-3 rounded-lg bg-amber-50 ring-1 ring-amber-200">
      <span className="text-sm font-semibold text-amber-900">
        {count} seleccionado{count === 1 ? '' : 's'}
      </span>
      <div className="flex flex-wrap gap-1.5 ml-auto">
        <button
          type="button"
          onClick={() => onMark('disponible')}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-50"
        >
          Marcar disponibles
        </button>
        <button
          type="button"
          onClick={() => onMark('vendido')}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50"
        >
          Marcar vendidos
        </button>
        <button
          type="button"
          onClick={() => onMark('agotado')}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-50"
        >
          Marcar agotados
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-rose-300 text-rose-700 text-xs font-semibold hover:bg-rose-50"
        >
          <Trash className="w-3.5 h-3.5" />
          Borrar seleccionados
        </button>
      </div>
    </div>
  )
}
