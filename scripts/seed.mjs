// ============================================================
// Siembra el catálogo de ejemplo en Supabase (tabla products +
// bucket product-images). Convierte los productos demo del código
// en productos REALES y editables desde el panel admin.
//
// Uso (desde la raíz del proyecto):
//   SEED_EMAIL="admin@tucorreo.com" SEED_PASSWORD="tuclave" node scripts/seed.mjs
//
// Lee VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY de .env.local
// automáticamente. Es idempotente: si un producto ya existe (mismo
// título), no lo duplica. Las fotos se suben desde public/products/.
// ============================================================
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUCKET = 'product-images'

// --- Cargar credenciales de Supabase desde .env.local ---
function loadEnvLocal() {
  const env = {}
  try {
    const raw = readFileSync(join(ROOT, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  } catch {
    /* sin .env.local: usamos process.env */
  }
  return env
}

const fileEnv = loadEnvLocal()
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || fileEnv.VITE_SUPABASE_URL
const SUPABASE_ANON = process.env.VITE_SUPABASE_ANON_KEY || fileEnv.VITE_SUPABASE_ANON_KEY
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.error('❌ Falta VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (.env.local o env).')
  process.exit(1)
}
if (!EMAIL || !PASSWORD) {
  console.error('❌ Falta SEED_EMAIL y/o SEED_PASSWORD.\n   Uso: SEED_EMAIL="..." SEED_PASSWORD="..." node scripts/seed.mjs')
  process.exit(1)
}

// --- Catálogo a sembrar (espejo de demoProducts, con columnas reales) ---
const PRODUCTS = [
  { file: 'refrigerador.webp',     title: 'Refrigerador French Door',     category: 'refrigerador', price: 690, color: 'Acero inoxidable', condition: 'Seminuevo',     featured: true,  short_description: 'Doble puerta con cajón freezer inferior. Amplia capacidad para la familia.' },
  { file: 'refrigerador-sxs.webp', title: 'Refrigerador Side by Side',    category: 'refrigerador', price: 890, color: 'Acero inoxidable', condition: 'Como nuevo',    featured: false, short_description: 'Dos puertas verticales con dispensador de hielo y agua.' },
  { file: 'lavadora.webp',         title: 'Lavadora carga frontal',       category: 'lavadora',     price: 430, color: 'Blanco',            condition: 'Seminuevo',     featured: false, short_description: 'Carga frontal de alta eficiencia, varios ciclos de lavado.' },
  { file: 'lavadora-top.webp',     title: 'Lavadora carga superior',      category: 'lavadora',     price: 380, color: 'Blanco',            condition: 'Usado revisado', featured: false, short_description: 'Carga superior amplia, fácil de usar y muy resistente.' },
  { file: 'secadora.webp',         title: 'Secadora eléctrica',           category: 'secadora',     price: 360, color: 'Acero inoxidable', condition: 'Seminuevo',     featured: false, short_description: 'Secado por calor con varios niveles y sensor de humedad.' },
  { file: 'estufa.webp',           title: 'Estufa a gas 5 quemadores',    category: 'estufa',       price: 540, color: 'Acero inoxidable', condition: 'Como nuevo',    featured: true,  short_description: 'Cocina a gas con horno y cinco quemadores de distinta potencia.' },
  { file: 'estufa-electrica.webp', title: 'Estufa eléctrica con horno',   category: 'estufa',       price: 480, color: 'Blanco',            condition: 'Seminuevo',     featured: false, short_description: 'Tope de vitrocerámica y horno eléctrico de gran capacidad.' },
  { file: 'freezer.webp',          title: 'Freezer vertical',             category: 'freezer',      price: 410, color: 'Blanco',            condition: 'Usado revisado', featured: false, short_description: 'Congelador vertical con estantes, ideal para almacenar más.' },
  { file: 'combo.webp',            title: 'Combo torre apilable',         category: 'combo',        price: 820, color: 'Acero inoxidable', condition: 'Como nuevo',    featured: false, short_description: 'Lavadora y secadora apilables, perfectas para espacios pequeños.' },
]

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  console.log('→ Iniciando sesión como', EMAIL)
  const { error: authErr } = await supabase.auth.signInWithPassword({ email: EMAIL, password: PASSWORD })
  if (authErr) {
    console.error('❌ Login falló:', authErr.message)
    process.exit(1)
  }
  console.log('✓ Autenticado')

  // Títulos ya existentes (para no duplicar)
  const { data: existing } = await supabase.from('products').select('title').is('deleted_at', null)
  const have = new Set((existing || []).map((r) => r.title))

  let created = 0
  let skipped = 0
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    if (have.has(p.title)) {
      console.log('• ya existe, saltando:', p.title)
      skipped++
      continue
    }

    // Subir foto
    const buf = readFileSync(join(ROOT, 'public', 'products', p.file))
    const path = `seed/${p.file}`
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, buf, { contentType: 'image/webp', upsert: true })
    if (upErr) {
      console.error('  ⚠️ subida falló para', p.file, '→', upErr.message)
    }
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
    const image_url = pub?.publicUrl || null

    const { error: insErr } = await supabase.from('products').insert({
      title: p.title,
      category: p.category,
      price: p.price,
      status: 'disponible',
      color: p.color,
      condition: p.condition,
      short_description: p.short_description,
      image_url,
      featured: p.featured,
      delivery_available: true,
      sort_order: 10 + i,
    })
    if (insErr) {
      console.error('  ❌ insert falló para', p.title, '→', insErr.message)
    } else {
      console.log('✓ creado:', p.title, image_url ? '(con foto)' : '(sin foto)')
      created++
    }
  }

  console.log(`\nListo. Creados: ${created} · Saltados: ${skipped}`)
  process.exit(0)
}

main().catch((e) => {
  console.error('❌ Error:', e.message)
  process.exit(1)
})
