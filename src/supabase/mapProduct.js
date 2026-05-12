const CATEGORY_LABEL = {
  lavadora: 'Lavadora',
  secadora: 'Secadora',
  estufa: 'Estufa',
  refrigerador: 'Refrigerador',
  freezer: 'Freezer',
  combo: 'Combo lavadora/secadora',
  otro: 'Electrodoméstico',
}

function formatPrice(price) {
  if (price == null || price === '' || Number.isNaN(Number(price))) {
    return 'Consultar precio'
  }
  const value = Number(price)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function buildBadge(row) {
  if (row.status === 'vendido') return { label: 'Vendido', tone: 'sold' }
  if (row.status === 'agotado') return { label: 'Agotado', tone: 'soldout' }
  if (row.featured) return { label: 'Destacado', tone: 'ink' }
  return { label: CATEGORY_LABEL[row.category] || 'Disponible', tone: 'ink' }
}

function buildChips(row) {
  const chips = []
  if (row.status === 'disponible') {
    chips.push({ icon: 'CheckCircle2', label: 'Disponible', tone: 'success' })
  } else if (row.status === 'vendido') {
    chips.push({ icon: 'XCircle', label: 'Vendido', tone: 'warning' })
  } else if (row.status === 'agotado') {
    chips.push({ icon: 'Clock3', label: 'Agotado', tone: 'warning' })
  }
  if (row.condition) {
    chips.push({ icon: 'PackageCheck', label: row.condition, tone: 'neutral' })
  }
  if (row.delivery_available) {
    chips.push({ icon: 'Truck', label: 'Entrega disponible', tone: 'neutral' })
  }
  return chips
}

function buildSpec(row) {
  return [row.brand, row.color].filter(Boolean).join(' · ')
}

export function mapSupabaseProduct(row) {
  return {
    id: row.id,
    name: row.title,
    category: row.category,
    spec: buildSpec(row),
    detail: row.short_description || '',
    price: formatPrice(row.price),
    status: row.status,
    badge: buildBadge(row),
    image: row.image_url || null,
    featured: !!row.featured,
    deliveryAvailable: !!row.delivery_available,
    chips: buildChips(row),
  }
}

export function normalizeFallbackProduct(p) {
  return {
    id: p.id,
    name: p.name,
    category: null,
    spec: p.spec,
    detail: p.detail,
    price: p.price,
    status: 'disponible',
    badge: { label: p.badge, tone: 'ink' },
    image: p.image || null,
    featured: false,
    deliveryAvailable: false,
    chips: p.chips || [],
  }
}

// Orden público: disponibles primero, destacados primero, sort_order ascendente.
export function sortPublicProducts(list) {
  const statusRank = { disponible: 0, agotado: 1, vendido: 2 }
  return [...list].sort((a, b) => {
    const sa = statusRank[a.status] ?? 3
    const sb = statusRank[b.status] ?? 3
    if (sa !== sb) return sa - sb
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return (a.sort_order ?? 999) - (b.sort_order ?? 999)
  })
}
