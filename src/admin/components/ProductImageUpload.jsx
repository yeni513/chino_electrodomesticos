import { useRef, useState } from 'react'
import { Image as ImageIcon, Upload, Loader2, Trash2, Star } from 'lucide-react'
import { supabase, PRODUCT_IMAGES_BUCKET } from '../../supabase/client.js'
import {
  compressImage,
  deleteStorageObjectByPublicUrl,
  slugify,
  validateImageFile,
  ACCEPTED_TYPES,
} from '../lib/imageUtils.js'
import { useToast } from '../lib/toast.jsx'
import { srcAt } from '../../lib/imgUrl.js'

const MAX_IMAGES = 8

// Galería de fotos del producto. `value` es un array de URLs; la primera es la
// portada. Permite subir varias, elegir portada y quitar.
export default function ProductImageUpload({ value, onChange, productName }) {
  const images = Array.isArray(value) ? value : value ? [value] : []
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

  async function uploadOne(rawFile) {
    const validationError = validateImageFile(rawFile)
    if (validationError) {
      throw new Error(validationError)
    }
    const file = await compressImage(rawFile)
    const ext = (file.name.split('.').pop() || 'webp').toLowerCase()
    const id = crypto.randomUUID()
    const path = `products/${slugify(productName) || 'producto'}-${id}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type })
    if (uploadError) throw new Error(uploadError.message || 'No se pudo subir la imagen.')
    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  async function handleFiles(fileList) {
    const files = Array.from(fileList || [])
    if (files.length === 0) return
    setError(null)

    const room = MAX_IMAGES - images.length
    if (room <= 0) {
      toast.info(`Máximo ${MAX_IMAGES} fotos por producto`)
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    const toUpload = files.slice(0, room)

    setUploading(true)
    const uploaded = []
    for (const f of toUpload) {
      try {
        uploaded.push(await uploadOne(f))
      } catch (e) {
        setError(e.message)
        toast.error('Imagen no subida', { description: e.message })
      }
    }
    setUploading(false)
    if (uploaded.length) {
      onChange([...images, ...uploaded])
      toast.success(uploaded.length === 1 ? 'Foto agregada' : `${uploaded.length} fotos agregadas`)
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeAt(url) {
    onChange(images.filter((u) => u !== url))
    deleteStorageObjectByPublicUrl(url).catch(() => {})
  }

  function makeCover(url) {
    onChange([url, ...images.filter((u) => u !== url)])
  }

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Fotos del producto{' '}
        <span className="text-slate-400 normal-case font-normal">
          ({images.length}/{MAX_IMAGES} · la primera es la portada)
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div
            key={url}
            className="relative w-28 h-28 rounded-lg overflow-hidden ring-1 ring-slate-200 bg-slate-100 group"
          >
            <img
              src={srcAt(url, { width: 256 })}
              alt={`Foto ${i + 1}`}
              className="w-full h-full object-cover"
              decoding="async"
            />
            {i === 0 ? (
              <span className="absolute top-1 left-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-brand-ink text-white text-[10px] font-semibold">
                <Star className="w-2.5 h-2.5 fill-current" />
                Portada
              </span>
            ) : (
              <button
                type="button"
                onClick={() => makeCover(url)}
                title="Usar como portada"
                className="absolute top-1 left-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/90 text-brand-ink text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Star className="w-2.5 h-2.5" />
                Portada
              </button>
            )}
            <button
              type="button"
              onClick={() => removeAt(url)}
              title="Quitar foto"
              className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Quitar foto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-28 h-28 rounded-lg ring-1 ring-dashed ring-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:bg-slate-100 hover:ring-brand-ink transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : images.length === 0 ? (
              <ImageIcon className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Upload className="w-6 h-6" strokeWidth={1.5} />
            )}
            <span className="text-[11px] font-semibold">
              {uploading ? 'Subiendo…' : images.length === 0 ? 'Subir fotos' : 'Agregar'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <p className="mt-3 text-xs text-slate-500 leading-relaxed">
        JPG, PNG o WebP · máx 5 MB c/u. Se comprimen a 1600 px. Puedes subir varias a la vez;
        arrastra el ratón sobre una foto para elegir portada o quitarla.
      </p>

      {error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
    </div>
  )
}
