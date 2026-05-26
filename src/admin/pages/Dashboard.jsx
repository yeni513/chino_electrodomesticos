import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Plus,
  Loader2,
  Search,
  Trash,
  RotateCcw,
  Download,
  Filter,
  X,
  Archive,
  Boxes,
  CheckCircle2,
  Clock3,
  XCircle,
  Activity,
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import ProductList from '../components/ProductList.jsx'
import ProductForm from '../components/ProductForm.jsx'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'
import { useAdminProducts, useTrashProducts } from '../../supabase/useProducts.js'
import { supabase, PRODUCTS_TABLE } from '../../supabase/client.js'
import { useToast } from '../lib/toast.jsx'
import { deleteStorageObjectByPublicUrl } from '../lib/imageUtils.js'
import { downloadCsv } from '../lib/csv.js'

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'lavadora', label: 'Lavadoras' },
  { value: 'secadora', label: 'Secadoras' },
  { value: 'estufa', label: 'Estufas' },
  { value: 'refrigerador', label: 'Refrigeradores' },
  { value: 'freezer', label: 'Freezers' },
  { value: 'combo', label: 'Combos' },
  { value: 'otro', label: 'Otros' },
]

function isToday(iso) {
  if (!iso) return false
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export default function Dashboard() {
  const [reloadKey, setReloadKey] = useState(0)
  const [view, setView] = useState('inventory') // 'inventory' | 'trash'
  const { rows, setRows, loading } = useAdminProducts(reloadKey)
  const trash = useTrashProducts(view === 'trash' ? reloadKey : -1)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selected, setSelected] = useState(new Set())
  const [confirmDelete, setConfirmDelete] = useState(null) // { row } | { bulk: true }
  const [confirmPurge, setConfirmPurge] = useState(null) // { row }
  const [busy, setBusy] = useState(false)

  const searchRef = useRef(null)
  const toast = useToast()

  // Atajos: "/" enfoca buscador, Cmd/Ctrl+N abre nuevo producto.
  useEffect(() => {
    function onKey(e) {
      const target = e.target
      const inField =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)

      if (!inField && e.key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault()
        openNew()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    if (!rows) return []
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false
      if (!q) return true
      return (
        (r.title || '').toLowerCase().includes(q) ||
        (r.brand || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q)
      )
    })
  }, [rows, search, statusFilter, categoryFilter])

  const counters = useMemo(() => {
    const c = { all: rows?.length || 0, disponible: 0, vendido: 0, agotado: 0 }
    rows?.forEach((r) => {
      if (c[r.status] != null) c[r.status]++
    })
    return c
  }, [rows])

  const todayStats = useMemo(() => {
    if (!rows) return { added: 0, edited: 0, sold: 0 }
    let added = 0
    let edited = 0
    let sold = 0
    rows.forEach((r) => {
      if (isToday(r.created_at)) added++
      if (isToday(r.updated_at) && r.updated_at !== r.created_at) edited++
      if (r.status === 'vendido' && isToday(r.updated_at)) sold++
    })
    return { added, edited, sold }
  }, [rows])

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }
  function openEdit(row) {
    setEditing(row)
    setFormOpen(true)
  }
  function openDuplicate(row) {
    const { id, created_at, updated_at, ...rest } = row
    setEditing({ ...rest, title: `${row.title} (copia)`, status: 'disponible' })
    setFormOpen(true)
  }
  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  // Reload + reset selección
  const reload = useCallback(() => {
    setReloadKey((k) => k + 1)
    setSelected(new Set())
  }, [])

  function handleSaved(savedRow) {
    closeForm()
    if (!savedRow) {
      reload()
      return
    }
    setRows((prev) => {
      if (!prev) return prev
      const exists = prev.some((r) => r.id === savedRow.id)
      if (exists) return prev.map((r) => (r.id === savedRow.id ? savedRow : r))
      return [savedRow, ...prev]
    })
  }

  // Soft delete (single)
  async function performSoftDelete(row) {
    setBusy(true)
    const previous = rows
    setRows((prev) => prev?.filter((r) => r.id !== row.id))
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', row.id)
    setBusy(false)
    if (error) {
      setRows(previous)
      toast.error('No se pudo borrar el producto', { description: 'Inténtalo de nuevo.' })
      return
    }
    toast.success(`"${row.title}" movido a la papelera`, {
      duration: 6000,
      action: {
        label: 'Deshacer',
        onClick: async () => {
          const { error: restoreError } = await supabase
            .from(PRODUCTS_TABLE)
            .update({ deleted_at: null })
            .eq('id', row.id)
          if (restoreError) {
            toast.error('No se pudo restaurar', { description: 'Búscalo en Papelera.' })
            return
          }
          setRows((prev) => (prev ? [row, ...prev] : prev))
          toast.success('Producto restaurado')
        },
      },
    })
  }

  // Restaurar desde papelera
  async function restoreFromTrash(row) {
    const previous = trash.rows
    trash.setRows((prev) => prev?.filter((r) => r.id !== row.id))
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ deleted_at: null })
      .eq('id', row.id)
    if (error) {
      trash.setRows(previous)
      toast.error('No se pudo restaurar', { description: error.message })
      return
    }
    toast.success(`"${row.title}" restaurado al inventario`)
    setReloadKey((k) => k + 1)
  }

  // Hard delete desde papelera (incluye limpiar imagen del storage)
  async function purgeForever(row) {
    setBusy(true)
    const previous = trash.rows
    trash.setRows((prev) => prev?.filter((r) => r.id !== row.id))
    const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq('id', row.id)
    if (error) {
      trash.setRows(previous)
      setBusy(false)
      toast.error('No se pudo eliminar', { description: error.message })
      return
    }
    if (row.image_url) {
      deleteStorageObjectByPublicUrl(row.image_url).catch(() => {})
    }
    setBusy(false)
    setConfirmPurge(null)
    toast.success('Producto eliminado para siempre')
  }

  // Cambio rápido de estado desde la pill
  async function handleStatusChange(row, nextStatus) {
    const previous = rows
    setRows((prev) =>
      prev?.map((r) => (r.id === row.id ? { ...r, status: nextStatus, updated_at: new Date().toISOString() } : r)),
    )
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ status: nextStatus })
      .eq('id', row.id)
    if (error) {
      setRows(previous)
      toast.error('No se pudo actualizar el estado', { description: error.message })
      return
    }
    toast.success(`"${row.title}" → ${labelForStatus(nextStatus)}`)
  }

  // Bulk: marcar varios con un estado
  async function bulkStatusChange(nextStatus) {
    const ids = Array.from(selected)
    if (ids.length === 0) return
    const previous = rows
    setRows((prev) =>
      prev?.map((r) =>
        ids.includes(r.id) ? { ...r, status: nextStatus, updated_at: new Date().toISOString() } : r,
      ),
    )
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ status: nextStatus })
      .in('id', ids)
    if (error) {
      setRows(previous)
      toast.error('No se pudo actualizar', { description: error.message })
      return
    }
    setSelected(new Set())
    toast.success(`${ids.length} producto${ids.length === 1 ? '' : 's'} → ${labelForStatus(nextStatus)}`)
  }

  // Bulk: soft delete
  async function bulkSoftDelete() {
    const ids = Array.from(selected)
    if (ids.length === 0) return
    setBusy(true)
    const previous = rows
    const deletedRows = previous?.filter((r) => ids.includes(r.id)) || []
    setRows((prev) => prev?.filter((r) => !ids.includes(r.id)))
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .in('id', ids)
    setBusy(false)
    setConfirmDelete(null)
    if (error) {
      setRows(previous)
      toast.error('No se pudieron borrar', { description: error.message })
      return
    }
    setSelected(new Set())
    toast.success(`${ids.length} producto${ids.length === 1 ? '' : 's'} movido${ids.length === 1 ? '' : 's'} a la papelera`, {
      duration: 6000,
      action: {
        label: 'Deshacer',
        onClick: async () => {
          await supabase.from(PRODUCTS_TABLE).update({ deleted_at: null }).in('id', ids)
          setRows((prev) => (prev ? [...deletedRows, ...prev] : prev))
          toast.success('Productos restaurados')
        },
      },
    })
  }

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  function toggleSelectAll(all) {
    setSelected(all ? new Set(filtered.map((r) => r.id)) : new Set())
  }

  function exportCsv() {
    if (!rows || rows.length === 0) {
      toast.info('No hay productos para exportar')
      return
    }
    downloadCsv(rows)
    toast.success('Inventario descargado en CSV')
  }

  const showFiltersChip = statusFilter !== 'all' || categoryFilter !== 'all' || search.trim() !== ''

  return (
    <AdminLayout title={view === 'trash' ? 'Papelera' : 'Inventario'}>
      {/* Header de la página + acciones globales */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-brand-ink">
            {view === 'trash' ? 'Papelera' : 'Productos'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {view === 'trash'
              ? trash.loading
                ? 'Cargando…'
                : `${trash.rows?.length || 0} producto${(trash.rows?.length || 0) === 1 ? '' : 's'} en papelera`
              : loading
                ? 'Cargando…'
                : `${counters.all} producto${counters.all === 1 ? '' : 's'} en total`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {view === 'inventory' ? (
            <>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg ring-1 ring-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
              <button
                type="button"
                onClick={() => setView('trash')}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg ring-1 ring-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                <Archive className="w-4 h-4" />
                <span className="hidden sm:inline">Papelera</span>
              </button>
              <button
                type="button"
                onClick={openNew}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-brand-accent text-brand-ink font-semibold text-sm shadow-soft hover:bg-brand-accent-dark hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                <Plus className="w-4 h-4" />
                Añadir producto
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setView('inventory')}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg ring-1 ring-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              ← Volver al inventario
            </button>
          )}
        </div>
      </div>

      {view === 'inventory' && !loading && counters.all > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Boxes} label="Total" value={counters.all} tone="ink" />
          <StatCard icon={CheckCircle2} label="Disponibles" value={counters.disponible} tone="emerald" />
          <StatCard icon={Clock3} label="Agotados" value={counters.agotado} tone="amber" />
          <StatCard icon={XCircle} label="Vendidos" value={counters.vendido} tone="rose" />
        </div>
      )}

      {view === 'inventory' && !loading && (todayStats.added + todayStats.edited + todayStats.sold) > 0 && (
        <div className="rounded-card bg-brand-ink text-white p-5 mb-6 flex items-center gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
            <Activity className="w-5 h-5" />
          </span>
          <div className="flex-1 text-sm">
            <p className="font-semibold">Movimiento de hoy</p>
            <p className="text-slate-300 mt-0.5">
              {[
                todayStats.added > 0 && `${todayStats.added} añadido${todayStats.added === 1 ? '' : 's'}`,
                todayStats.edited > 0 && `${todayStats.edited} editado${todayStats.edited === 1 ? '' : 's'}`,
                todayStats.sold > 0 && `${todayStats.sold} marcado${todayStats.sold === 1 ? '' : 's'} como vendido${todayStats.sold === 1 ? '' : 's'}`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>
      )}

      {view === 'inventory' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                inputMode="search"
                placeholder="Buscar por nombre, marca o categoría… (presiona /)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none text-sm"
                style={{ fontSize: '16px' }}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="min-h-[44px] px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-brand-accent focus:outline-none"
              style={{ fontSize: '16px' }}
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

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
                  aria-pressed={statusFilter === f.value}
                  className={[
                    'inline-flex items-center gap-1.5 px-3 min-h-[36px] rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
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

          {showFiltersChip && (
            <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              Filtros activos · {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setCategoryFilter('all')
                }}
                className="inline-flex items-center gap-1 text-brand-accent-dark font-semibold hover:underline"
              >
                <X className="w-3 h-3" />
                Limpiar
              </button>
            </div>
          )}

          {selected.size > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2 p-3 rounded-lg bg-amber-50 ring-1 ring-amber-200">
              <span className="text-sm font-semibold text-amber-900">
                {selected.size} seleccionado{selected.size === 1 ? '' : 's'}
              </span>
              <div className="flex flex-wrap gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => bulkStatusChange('disponible')}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-50"
                >
                  Marcar disponibles
                </button>
                <button
                  type="button"
                  onClick={() => bulkStatusChange('vendido')}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50"
                >
                  Marcar vendidos
                </button>
                <button
                  type="button"
                  onClick={() => bulkStatusChange('agotado')}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-50"
                >
                  Marcar agotados
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete({ bulk: true })}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-white ring-1 ring-rose-300 text-rose-700 text-xs font-semibold hover:bg-rose-50"
                >
                  <Trash className="w-3.5 h-3.5" />
                  Borrar seleccionados
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="rounded-card bg-white ring-1 ring-slate-200 p-10 flex items-center justify-center gap-2 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              Cargando productos…
            </div>
          ) : (
            <ProductList
              rows={filtered}
              onEdit={openEdit}
              onDelete={(row) => setConfirmDelete({ row })}
              onDuplicate={openDuplicate}
              onStatusChange={handleStatusChange}
              selected={selected}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={toggleSelectAll}
              emptyMessage={
                showFiltersChip
                  ? {
                      title: 'Sin resultados',
                      body: `No encontramos productos con esos filtros. Prueba a limpiarlos.`,
                    }
                  : undefined
              }
            />
          )}
        </>
      )}

      {view === 'trash' && (
        <TrashView
          loading={trash.loading}
          rows={trash.rows}
          onRestore={restoreFromTrash}
          onPurge={(row) => setConfirmPurge({ row })}
        />
      )}

      {formOpen && (
        <ProductForm
          product={editing}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        loading={busy}
        title={
          confirmDelete?.bulk
            ? `¿Mover ${selected.size} producto${selected.size === 1 ? '' : 's'} a la papelera?`
            : `¿Mover "${confirmDelete?.row?.title}" a la papelera?`
        }
        description="Podrás restaurarlo desde Papelera mientras no lo elimines para siempre."
        confirmLabel={confirmDelete?.bulk ? `Sí, mover ${selected.size}` : 'Sí, mover a papelera'}
        tone="danger"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={async () => {
          if (confirmDelete?.bulk) await bulkSoftDelete()
          else if (confirmDelete?.row) {
            await performSoftDelete(confirmDelete.row)
            setConfirmDelete(null)
          }
        }}
      />

      <ConfirmDialog
        open={!!confirmPurge}
        loading={busy}
        title={`¿Eliminar "${confirmPurge?.row?.title}" para siempre?`}
        description="Esta acción no se puede deshacer. También se borrará la foto del almacenamiento."
        confirmLabel="Sí, eliminar para siempre"
        tone="danger"
        onCancel={() => setConfirmPurge(null)}
        onConfirm={() => confirmPurge?.row && purgeForever(confirmPurge.row)}
      />
    </AdminLayout>
  )
}

function labelForStatus(s) {
  return s === 'disponible' ? 'Disponible' : s === 'vendido' ? 'Vendido' : 'Agotado'
}

const TONE_STYLES = {
  ink: 'bg-brand-ink text-white',
  emerald: 'bg-white ring-1 ring-emerald-200 text-emerald-700',
  amber: 'bg-white ring-1 ring-amber-200 text-amber-800',
  rose: 'bg-white ring-1 ring-rose-200 text-rose-700',
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className={`rounded-card p-4 flex items-center gap-3 ${TONE_STYLES[tone] || ''}`}>
      <Icon className="w-5 h-5 opacity-80" />
      <div>
        <p className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">{label}</p>
        <p className="text-xl font-display font-semibold tabular-nums leading-tight">{value}</p>
      </div>
    </div>
  )
}

function TrashView({ loading, rows, onRestore, onPurge }) {
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
                <img src={row.image_url} alt={row.title} className="w-full h-full object-cover" loading="lazy" />
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
