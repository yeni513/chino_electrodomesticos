import { useMemo, useState } from 'react'
import { Plus, Loader2, Search } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import ProductList from '../components/ProductList.jsx'
import ProductForm from '../components/ProductForm.jsx'
import { useAdminProducts } from '../../supabase/useProducts.js'
import { supabase, PRODUCTS_TABLE } from '../../supabase/client.js'

export default function Dashboard() {
  const [reloadKey, setReloadKey] = useState(0)
  const { rows, loading } = useAdminProducts(reloadKey)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    if (!rows) return []
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (!q) return true
      return (
        (r.title || '').toLowerCase().includes(q) ||
        (r.brand || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q)
      )
    })
  }, [rows, search, statusFilter])

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }
  function openEdit(row) {
    setEditing(row)
    setFormOpen(true)
  }
  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }
  function handleSaved() {
    closeForm()
    setReloadKey((k) => k + 1)
  }
  async function handleDelete(row) {
    if (!row) return
    const ok = window.confirm(`¿Eliminar "${row.title}"? Esta acción no se puede deshacer.`)
    if (!ok) return
    setDeleting(row.id)
    const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq('id', row.id)
    setDeleting(null)
    if (error) {
      window.alert(`No se pudo eliminar: ${error.message}`)
      return
    }
    setReloadKey((k) => k + 1)
  }

  const counters = useMemo(() => {
    const c = { all: rows?.length || 0, disponible: 0, vendido: 0, agotado: 0 }
    rows?.forEach((r) => {
      if (c[r.status] != null) c[r.status]++
    })
    return c
  }, [rows])

  return (
    <AdminLayout title="Inventario">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-brand-ink">
            Productos
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {loading ? 'Cargando…' : `${counters.all} producto${counters.all === 1 ? '' : 's'} en total`}
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-brand-accent text-brand-ink font-semibold text-sm shadow-soft hover:bg-brand-accent-dark hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Añadir producto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Buscar por nombre, marca o categoría…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto -mx-1 px-1">
          {[
            { value: 'all', label: 'Todos', count: counters.all },
            { value: 'disponible', label: 'Disponibles', count: counters.disponible },
            { value: 'vendido', label: 'Vendidos', count: counters.vendido },
            { value: 'agotado', label: 'Agotados', count: counters.agotado },
          ].map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={[
                'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                statusFilter === f.value
                  ? 'bg-brand-ink text-white'
                  : 'bg-white ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {f.label}
              <span className={statusFilter === f.value ? 'text-brand-accent' : 'text-slate-400'}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 flex items-center justify-center gap-2 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Cargando productos…
        </div>
      ) : (
        <ProductList
          rows={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {deleting && (
        <div className="fixed inset-x-0 bottom-4 mx-auto w-fit px-4 py-2 rounded-full bg-brand-ink text-white text-xs font-medium shadow-lift">
          Eliminando…
        </div>
      )}

      {formOpen && (
        <ProductForm
          product={editing}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </AdminLayout>
  )
}
