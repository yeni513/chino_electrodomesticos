import { useRef, useState } from 'react'
import { Image as ImageIcon, Upload, Loader2, Trash2 } from 'lucide-react'
import { supabase, PRODUCT_IMAGES_BUCKET } from '../../supabase/client.js'
import {
  compressImage,
  deleteStorageObjectByPublicUrl,
  slugify,
  validateImageFile,
  ACCEPTED_TYPES,
} from '../lib/imageUtils.js'
import { useToast } from '../lib/toast.jsx'

export default function ProductImageUpload({ value, onChange, productName }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

  async function handleFile(rawFile) {
    if (!rawFile) return
    setError(null)

    const validationError = validateImageFile(rawFile)
    if (validationError) {
      setError(validationError)
      toast.error('Imagen no válida', { description: validationError })
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    setUploading(true)

    const previousUrl = value
    const file = await compressImage(rawFile)
    const ext = (file.name.split('.').pop() || 'webp').toLowerCase()
    const id = crypto.randomUUID()
    const path = `products/${slugify(productName)}-${id}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type })

    if (uploadError) {
      setUploading(false)
      const msg = uploadError.message || 'No se pudo subir la imagen.'
      setError(msg)
      toast.error('Error al subir la imagen', { description: msg })
      return
    }

    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)

    // Best-effort cleanup de la imagen previa para evitar storage bloat.
    if (previousUrl) {
      deleteStorageObjectByPublicUrl(previousUrl).catch(() => {})
    }

    setUploading(false)
    onChange(data.publicUrl)
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleRemove() {
    const previousUrl = value
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
    if (previousUrl) {
      deleteStorageObjectByPublicUrl(previousUrl).catch(() => {})
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Foto del producto
      </label>

      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 shrink-0">
            <img src={value} alt="Vista previa" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg ring-1 ring-dashed ring-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-ink text-white text-xs font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60 min-h-[44px]"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? 'Subiendo…' : value ? 'Reemplazar' : 'Subir foto'}
            </button>

            {value && !uploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-rose-700 text-xs font-semibold hover:bg-rose-50 transition-colors min-h-[44px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Quitar
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            JPG, PNG o WebP · máximo 5 MB. Se comprime y reescala automáticamente a 1600 px.
          </p>

          {error && (
            <p className="mt-2 text-xs text-rose-700">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
