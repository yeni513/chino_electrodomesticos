import { useEffect, useState } from 'react'
import { X, Loader2, Save } from 'lucide-react'
import { supabase, PRODUCTS_TABLE } from '../../supabase/client.js'
import ProductImageUpload from './ProductImageUpload.jsx'

const CATEGORIES = [
  { value: 'lavadora', label: 'Lavadora' },
  { value: 'secadora', label: 'Secadora' },
  { value: 'estufa', label: 'Estufa' },
  { value: 'refrigerador', label: 'Refrigerador' },
  { value: 'freezer', label: 'Freezer' },
  { value: 'combo', label: 'Combo lavadora/secadora' },
  { value: 'otro', label: 'Otro' },
]

const STATUSES = [
  { value: 'disponible', label: 'Disponible' },
  { value: 'vendido', label: 'Vendido' },
  { value: 'agotado', label: 'Agotado' },
]

const EMPTY = {
  title: '',
  category: 'lavadora',
  price: '',
  status: 'disponible',
  brand: '',
  color: '',
  condition: '',
  short_description: '',
  image_url: '',
  featured: false,
  delivery_available: true,
  sort_order: '',
}

export default function ProductForm({ product, onClose, onSaved }) {
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const isEditing = !!product?.id

  useEffect(() => {
    if (product) {
      setValues({
        title: product.title || '',
        category: product.category || 'lavadora',
        price: product.price ?? '',
        status: product.status || 'disponible',
        brand: product.brand || '',
        color: product.color || '',
        condition: product.condition || '',
        short_description: product.short_description || '',
        image_url: product.image_url || '',
        featured: !!product.featured,
        delivery_available: product.delivery_available !== false,
        sort_order: product.sort_order ?? '',
      })
    } else {
      setValues(EMPTY)
    }
  }, [product])

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const payload = {
      title: values.title.trim(),
      category: values.category,
      price: values.price === '' || values.price == null ? null : Number(values.price),
      status: values.status,
      brand: values.brand.trim() || null,
      color: values.color.trim() || null,
      condition: values.condition.trim() || null,
      short_description: values.short_description.trim() || null,
      image_url: values.image_url || null,
      featured: !!values.featured,
      delivery_available: !!values.delivery_available,
      sort_order: values.sort_order === '' || values.sort_order == null ? null : Number(values.sort_order),
    }

    if (!payload.title) {
      setSaving(false)
      setError('El nombre del producto es obligatorio.')
      return
    }

    let response
    if (isEditing) {
      response = await supabase
        .from(PRODUCTS_TABLE)
        .update(payload)
        .eq('id', product.id)
        .select()
        .single()
    } else {
      response = await supabase
        .from(PRODUCTS_TABLE)
        .insert(payload)
        .select()
        .single()
    }

    setSaving(false)

    if (response.error) {
      setError(response.error.message || 'No se pudo guardar el producto.')
      return
    }

    onSaved?.(response.data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-brand-ink/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full md:max-w-3xl bg-white md:rounded-card md:my-8 shadow-lift flex flex-col">
        <header className="sticky top-0 bg-white border-b border-slate-200 px-5 md:px-7 py-4 flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-brand-ink">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="px-5 md:px-7 py-6 space-y-6">
          <Field label="Nombre del producto" required>
            <input
              type="text"
              required
              value={values.title}
              onChange={(e) => update('title', e.target.value)}
              className="input"
              placeholder="Lavadora LG carga frontal 9 kg"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Categoría">
              <select
                value={values.category}
                onChange={(e) => update('category', e.target.value)}
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Estado">
              <select
                value={values.status}
                onChange={(e) => update('status', e.target.value)}
                className="input"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Precio (USD)" hint="Déjalo vacío para mostrar “Consultar precio”.">
              <input
                type="number"
                step="0.01"
                min="0"
                value={values.price}
                onChange={(e) => update('price', e.target.value)}
                className="input"
                placeholder="599"
              />
            </Field>

            <Field label="Orden manual" hint="Menor número = aparece antes.">
              <input
                type="number"
                value={values.sort_order}
                onChange={(e) => update('sort_order', e.target.value)}
                className="input"
                placeholder="100"
              />
            </Field>

            <Field label="Marca">
              <input
                type="text"
                value={values.brand}
                onChange={(e) => update('brand', e.target.value)}
                className="input"
                placeholder="LG"
              />
            </Field>

            <Field label="Color">
              <input
                type="text"
                value={values.color}
                onChange={(e) => update('color', e.target.value)}
                className="input"
                placeholder="Blanco"
              />
            </Field>

            <Field label="Condición" hint="Ej: Nuevo en caja, Seminuevo, Usado revisado.">
              <input
                type="text"
                value={values.condition}
                onChange={(e) => update('condition', e.target.value)}
                className="input"
                placeholder="Nuevo en caja"
              />
            </Field>
          </div>

          <Field label="Descripción corta" hint="1-2 líneas. Aparece bajo el nombre en la web.">
            <textarea
              rows={3}
              maxLength={280}
              value={values.short_description}
              onChange={(e) => update('short_description', e.target.value)}
              className="input resize-none"
              placeholder="9 kg · 1.400 rpm · 14 programas · motor inverter"
            />
          </Field>

          <ProductImageUpload
            value={values.image_url}
            onChange={(url) => update('image_url', url)}
            productName={values.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Toggle
              label="Destacado"
              hint="Aparece primero en la sección de productos."
              checked={values.featured}
              onChange={(v) => update('featured', v)}
            />
            <Toggle
              label="Entrega disponible"
              hint="Muestra la pill “Entrega disponible” en la card."
              checked={values.delivery_available}
              onChange={(v) => update('delivery_available', v)}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-rose-50 ring-1 ring-rose-200 px-3.5 py-2.5 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2 sticky bottom-0 bg-white">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-brand-ink text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Crear producto'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg ring-1 ring-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border-radius: 0.5rem;
          background: white;
          box-shadow: inset 0 0 0 1px rgb(226 232 240);
          font-size: 0.9rem;
          color: rgb(15 23 42);
          transition: box-shadow 150ms;
        }
        .input:focus {
          outline: none;
          box-shadow: inset 0 0 0 2px rgb(245 158 11);
        }
      `}</style>
    </div>
  )
}

function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        {label}
        {required && <span className="text-rose-600 ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1.5 text-xs text-slate-400">{hint}</span>}
    </label>
  )
}

function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 p-4 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
      <span className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="inline-block w-10 h-6 rounded-full bg-slate-200 peer-checked:bg-emerald-500 transition-colors" />
        <span className="absolute left-0.5 top-0.5 inline-block w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-brand-ink">{label}</span>
        {hint && <span className="block text-xs text-slate-500 mt-0.5">{hint}</span>}
      </span>
    </label>
  )
}
