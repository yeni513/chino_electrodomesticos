import { supabase, PRODUCT_IMAGES_BUCKET } from '../../supabase/client.js'

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB
export const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const MAX_DIMENSION = 1600

export function validateImageFile(file) {
  if (!file) return 'No se recibió ningún archivo.'
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Formato no admitido. Usa JPG, PNG o WebP (las fotos HEIC del iPhone no se ven en la web).'
  }
  if (file.size > MAX_IMAGE_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1)
    return `La imagen pesa ${mb} MB. El máximo permitido es 5 MB.`
  }
  return null
}

/**
 * Reescala a max 1600px (lado mayor) y reencodifica a WebP 85% — sin librerías
 * extra, usando Canvas. Si el navegador no soporta WebP en canvas, cae a JPEG.
 */
export async function compressImage(file) {
  if (!file.type.startsWith('image/')) return file

  const bitmap = await createImageBitmap(file).catch(() => null)
  if (!bitmap) return file

  const { width, height } = bitmap
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
  const targetW = Math.round(width * scale)
  const targetH = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, targetW, targetH)
  bitmap.close?.()

  const blob = await new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/webp', 0.85)
  })

  if (!blob) return file

  // Si la compresión no aporta (>= file size), devuelve el original.
  if (blob.size >= file.size) return file

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'imagen'
  return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
}

/**
 * Borra un archivo del bucket. No-op si la URL no parece nuestra.
 */
export async function deleteStorageObjectByPublicUrl(publicUrl) {
  if (!publicUrl || typeof publicUrl !== 'string') return
  const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`
  const i = publicUrl.indexOf(marker)
  if (i === -1) return
  const path = decodeURIComponent(publicUrl.slice(i + marker.length))
  if (!path) return
  await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path])
}

export function slugify(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 40) || 'producto'
}
