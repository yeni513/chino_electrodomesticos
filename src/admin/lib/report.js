// Genera un reporte de inventario PREMIUM como HTML auto-contenido (CSS + SVG
// inline, sin dependencias). Se descarga como .html y se abre en cualquier
// navegador: KPIs, gráficos y grid de productos con fotos. Imprimible a PDF.
import { business } from '../../data/content.js'

const CATEGORY_LABEL = {
  lavadora: 'Lavadoras',
  secadora: 'Secadoras',
  estufa: 'Estufas',
  refrigerador: 'Refrigeradores',
  freezer: 'Freezers',
  combo: 'Combos',
  otro: 'Otros',
}
const STATUS_LABEL = { disponible: 'Disponible', vendido: 'Vendido', agotado: 'Agotado' }
const STATUS_COLOR = { disponible: '#10b981', agotado: '#f59e0b', vendido: '#e11d48' }

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const money = (n) =>
  n == null || Number.isNaN(Number(n))
    ? '—'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n))

function groupBy(rows, key) {
  const map = new Map()
  for (const r of rows) {
    const k = r[key] || 'otro'
    map.set(k, (map.get(k) || 0) + 1)
  }
  return map
}

// Gráfico de dona (SVG) para estados.
function donut(segments) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  const r = 70
  const c = 2 * Math.PI * r
  let offset = 0
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const frac = s.value / total
      const dash = frac * c
      const el = `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${s.color}" stroke-width="34"
        stroke-dasharray="${dash.toFixed(2)} ${(c - dash).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}"
        transform="rotate(-90 100 100)" stroke-linecap="butt"/>`
      offset += dash
      return el
    })
    .join('')
  return `<svg viewBox="0 0 200 200" class="donut">${arcs}
    <text x="100" y="94" text-anchor="middle" class="donut-num">${total}</text>
    <text x="100" y="116" text-anchor="middle" class="donut-lbl">productos</text>
  </svg>`
}

// Barras horizontales (SVG) genéricas.
function bars(items, { color = '#1F3D63', fmt = (v) => v } = {}) {
  const max = Math.max(1, ...items.map((i) => i.value))
  const rowH = 40
  const h = items.length * rowH
  const labelW = 150
  const barW = 520
  return `<svg viewBox="0 0 ${labelW + barW + 70} ${h}" class="bars" style="width:100%;height:${h}px">
    ${items
      .map((it, i) => {
        const y = i * rowH
        const w = (it.value / max) * barW
        return `
        <text x="0" y="${y + rowH / 2 + 5}" class="bar-label">${esc(it.label)}</text>
        <rect x="${labelW}" y="${y + 7}" width="${barW}" height="${rowH - 16}" rx="7" fill="#eef1f5"/>
        <rect x="${labelW}" y="${y + 7}" width="${Math.max(w, 2)}" height="${rowH - 16}" rx="7" fill="${color}"/>
        <text x="${labelW + Math.max(w, 2) + 10}" y="${y + rowH / 2 + 5}" class="bar-value">${esc(fmt(it.value))}</text>`
      })
      .join('')}
  </svg>`
}

export function buildInventoryReportHTML(rows) {
  const active = rows.filter((r) => !r.deleted_at)
  const total = active.length
  const byStatus = groupBy(active, 'status')
  const disponibles = byStatus.get('disponible') || 0
  const vendidos = byStatus.get('vendido') || 0
  const agotados = byStatus.get('agotado') || 0
  const destacados = active.filter((r) => r.featured).length
  const cats = groupBy(active, 'category')

  const valorDisponible = active
    .filter((r) => r.status === 'disponible')
    .reduce((a, r) => a + (Number(r.price) || 0), 0)
  const valorTotal = active.reduce((a, r) => a + (Number(r.price) || 0), 0)
  const conPrecio = active.filter((r) => Number(r.price) > 0)
  const precioProm = conPrecio.length ? valorTotal / conPrecio.length : 0

  const catItems = [...cats.entries()]
    .map(([k, v]) => ({ label: CATEGORY_LABEL[k] || k, value: v, key: k }))
    .sort((a, b) => b.value - a.value)

  const valueByCat = [...cats.keys()]
    .map((k) => ({
      label: CATEGORY_LABEL[k] || k,
      value: active.filter((r) => r.category === k).reduce((a, r) => a + (Number(r.price) || 0), 0),
    }))
    .filter((i) => i.value > 0)
    .sort((a, b) => b.value - a.value)

  const statusSegs = [
    { label: 'Disponibles', value: disponibles, color: STATUS_COLOR.disponible },
    { label: 'Agotados', value: agotados, color: STATUS_COLOR.agotado },
    { label: 'Vendidos', value: vendidos, color: STATUS_COLOR.vendido },
  ]

  const now = new Date()
  const fecha = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

  const kpi = (label, value, sub = '') => `
    <div class="kpi">
      <div class="kpi-val">${esc(value)}</div>
      <div class="kpi-lbl">${esc(label)}</div>
      ${sub ? `<div class="kpi-sub">${esc(sub)}</div>` : ''}
    </div>`

  const legend = statusSegs
    .map((s) => `<span class="leg"><span class="dot" style="background:${s.color}"></span>${esc(s.label)} · <b>${s.value}</b></span>`)
    .join('')

  const productRows = active
    .slice()
    .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
    .map((r) => {
      const img = r.image_url
        ? `<img src="${esc(r.image_url)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="ph" style="display:none">${esc((CATEGORY_LABEL[r.category] || '·')[0])}</div>`
        : `<div class="ph">${esc((CATEGORY_LABEL[r.category] || '·')[0])}</div>`
      return `
      <div class="card">
        <div class="card-img">${img}${r.featured ? '<span class="star">★ Destacado</span>' : ''}</div>
        <div class="card-body">
          <div class="card-cat">${esc(CATEGORY_LABEL[r.category] || r.category || '')}</div>
          <div class="card-title">${esc(r.title)}</div>
          <div class="card-meta">${esc([r.brand, r.color, r.condition].filter(Boolean).join(' · ') || '—')}</div>
          <div class="card-foot">
            <span class="price">${money(r.price)}</span>
            <span class="badge" style="--c:${STATUS_COLOR[r.status] || '#64748b'}">${esc(STATUS_LABEL[r.status] || r.status)}</span>
          </div>
        </div>
      </div>`
    })
    .join('')

  return `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Reporte de Inventario · ${esc(business.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{--ink:#1F3D63;--ink2:#2B5184;--gold:#C9A227;--cream:#F8FAFC;--line:#e2e8f0;--slate:#64748b}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#eef1f5;line-height:1.5;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1040px;margin:0 auto;padding:32px 20px 80px}
  h1,h2,h3{font-family:Fraunces,Georgia,serif;letter-spacing:-.01em}
  .hero{background:linear-gradient(135deg,var(--ink),var(--ink2));color:#fff;border-radius:22px;padding:38px 40px;position:relative;overflow:hidden;box-shadow:0 24px 48px rgba(31,61,99,.18)}
  .hero::after{content:"";position:absolute;right:-60px;top:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(201,162,39,.35),transparent 70%)}
  .hero .eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:700}
  .hero h1{font-size:38px;font-weight:700;margin-top:10px}
  .hero .sub{margin-top:10px;color:#cbd5e1;font-size:15px;max-width:560px}
  .hero .meta{margin-top:18px;display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:#e2e8f0}
  .hero .meta b{color:#fff}
  .toolbar{display:flex;justify-content:flex-end;margin:14px 0 0}
  .btn{appearance:none;border:0;cursor:pointer;background:var(--ink);color:#fff;font-weight:600;font-size:13px;padding:10px 18px;border-radius:10px;display:inline-flex;gap:8px;align-items:center;font-family:inherit}
  .btn:hover{background:#16314f}
  .grid-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}
  .kpi{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px 22px;box-shadow:0 1px 2px rgba(31,61,99,.04)}
  .kpi-val{font-family:Fraunces,serif;font-size:30px;font-weight:700;color:var(--ink);line-height:1}
  .kpi-lbl{margin-top:8px;font-size:13px;color:var(--slate);font-weight:600}
  .kpi-sub{margin-top:3px;font-size:12px;color:#94a3b8}
  .panels{display:grid;grid-template-columns:1.1fr .9fr;gap:14px;margin-top:14px}
  .panel{background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px 24px;box-shadow:0 1px 2px rgba(31,61,99,.04)}
  .panel h3{font-size:16px;color:var(--ink);margin-bottom:14px}
  .donut-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
  .donut{width:170px;height:170px;flex:0 0 auto}
  .donut-num{font-family:Fraunces,serif;font-size:40px;font-weight:700;fill:var(--ink)}
  .donut-lbl{font-size:12px;fill:var(--slate)}
  .legends{display:flex;flex-direction:column;gap:8px}
  .leg{font-size:13px;color:#334155;display:flex;align-items:center;gap:8px}
  .dot{width:11px;height:11px;border-radius:3px;display:inline-block}
  .bar-label{font-size:13px;fill:#334155;font-weight:500}
  .bar-value{font-size:13px;fill:var(--ink);font-weight:700}
  .section-title{margin:30px 0 14px;font-size:20px;color:var(--ink)}
  .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .card{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(31,61,99,.04);break-inside:avoid}
  .card-img{position:relative;aspect-ratio:4/3;background:linear-gradient(180deg,#f8fafc,#eef1f5);display:flex;align-items:center;justify-content:center}
  .card-img img{width:100%;height:100%;object-fit:cover}
  .ph{width:100%;height:100%;align-items:center;justify-content:center;display:flex;font-family:Fraunces,serif;font-size:44px;color:#cbd5e1}
  .star{position:absolute;top:10px;left:10px;background:var(--ink);color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:20px}
  .card-body{padding:14px 16px}
  .card-cat{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--gold);font-weight:700}
  .card-title{font-family:Fraunces,serif;font-size:16px;font-weight:600;color:var(--ink);margin-top:3px;line-height:1.25}
  .card-meta{font-size:12px;color:var(--slate);margin-top:4px}
  .card-foot{display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
  .price{font-family:Fraunces,serif;font-size:20px;font-weight:700;color:var(--ink)}
  .badge{font-size:11px;font-weight:700;color:var(--c);background:color-mix(in srgb,var(--c) 14%,#fff);padding:4px 10px;border-radius:20px}
  .foot{margin-top:42px;text-align:center;color:#94a3b8;font-size:12px;line-height:1.7}
  .foot b{color:var(--ink)}
  @media(max-width:760px){.grid-kpi,.cards{grid-template-columns:1fr 1fr}.panels{grid-template-columns:1fr}.hero h1{font-size:28px}}
  @media print{
    body{background:#fff}.wrap{padding:0;max-width:none}.toolbar{display:none}
    .hero{box-shadow:none;border-radius:0}.kpi,.panel,.card{box-shadow:none}
    .cards{grid-template-columns:repeat(3,1fr)}
  }
</style></head>
<body>
<div class="wrap">
  <div class="toolbar"><button class="btn" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button></div>

  <header class="hero">
    <div class="eyebrow">Reporte de Inventario</div>
    <h1>${esc(business.name)}</h1>
    <p class="sub">Resumen del inventario actual con valor, disponibilidad y catálogo completo.</p>
    <div class="meta">
      <span>📅 <b>${esc(fecha)}</b></span>
      <span>📍 <b>${esc(business.address)}</b></span>
      <span>📞 <b>${esc(business.phone)}</b></span>
    </div>
  </header>

  <div class="grid-kpi">
    ${kpi('Productos en total', total)}
    ${kpi('Disponibles ahora', disponibles, `${vendidos} vendidos · ${agotados} agotados`)}
    ${kpi('Valor disponible', money(valorDisponible), `${money(valorTotal)} valor total`)}
    ${kpi('Precio promedio', money(precioProm))}
    ${kpi('Destacados', destacados)}
    ${kpi('Categorías', cats.size)}
  </div>

  <div class="panels">
    <div class="panel">
      <h3>Productos por categoría</h3>
      ${bars(catItems, { color: '#1F3D63' })}
    </div>
    <div class="panel">
      <h3>Por estado</h3>
      <div class="donut-wrap">
        ${donut(statusSegs)}
        <div class="legends">${legend}</div>
      </div>
    </div>
  </div>

  ${valueByCat.length ? `<div class="panel" style="margin-top:14px"><h3>Valor del inventario por categoría</h3>${bars(valueByCat, { color: '#C9A227', fmt: money })}</div>` : ''}

  <h2 class="section-title">Catálogo (${total})</h2>
  <div class="cards">${productRows}</div>

  <div class="foot">
    <p>Generado el ${esc(fecha)} · <b>${esc(business.name)}</b></p>
    <p>Reporte creado por <b>Leyva Web Studio</b></p>
  </div>
</div>
</body></html>`
}

export function downloadInventoryReport(rows, filename = `reporte-inventario-${new Date().toISOString().slice(0, 10)}.html`) {
  const html = buildInventoryReportHTML(rows || [])
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}
