// Wrapper para usar Supabase Image Transformation cuando aplique.
// Si la URL no es de Supabase, se devuelve sin tocar.

export function srcAt(url, { width, quality = 80 } = {}) {
  if (!url) return url
  if (typeof url !== 'string') return url
  if (!url.includes('/storage/v1/object/public/')) return url

  // Convierte /object/public/ → /render/image/public/ (Image Transformation)
  const rendered = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
  const u = new URL(rendered)
  if (width) u.searchParams.set('width', String(width))
  u.searchParams.set('quality', String(quality))
  u.searchParams.set('resize', 'cover')
  return u.toString()
}

export function srcSetFor(url, widths = [320, 640, 960, 1280]) {
  if (!url) return undefined
  if (!url.includes('/storage/v1/object/public/')) return undefined
  return widths.map((w) => `${srcAt(url, { width: w })} ${w}w`).join(', ')
}
