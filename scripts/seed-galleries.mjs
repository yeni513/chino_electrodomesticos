// ============================================================
// Puebla la galería (columna images) de los productos sembrados:
// sube la foto de ángulo y deja images = [portada, ángulo].
// Requiere la migración 2026-06-add-product-images.sql ya corrida.
//
// Uso:
//   SEED_EMAIL="..." SEED_PASSWORD="..." node scripts/seed-galleries.mjs
// ============================================================
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUCKET = 'product-images'

function loadEnvLocal() {
  const env = {}
  try {
    for (const line of readFileSync(join(ROOT, '.env.local'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  } catch {}
  return env
}
const e = loadEnvLocal()
const URL = process.env.VITE_SUPABASE_URL || e.VITE_SUPABASE_URL
const KEY = process.env.VITE_SUPABASE_ANON_KEY || e.VITE_SUPABASE_ANON_KEY
const EMAIL = process.env.SEED_EMAIL
const PASSWORD = process.env.SEED_PASSWORD
if (!URL || !KEY || !EMAIL || !PASSWORD) {
  console.error('❌ Falta URL/KEY (.env.local) o SEED_EMAIL/SEED_PASSWORD.')
  process.exit(1)
}

// Producto (por título) → archivo de foto de ángulo a añadir a la galería.
const ANGLE = {
  'Refrigerador French Door': 'refrigerador-angle.webp',
  'Lavadora carga frontal': 'lavadora-angle.webp',
  'Secadora eléctrica': 'secadora-angle.webp',
  'Estufa a gas 5 quemadores': 'estufa-angle.webp',
  'Freezer vertical': 'freezer-angle.webp',
  'Combo torre apilable': 'combo-angle.webp',
}

const sb = createClient(URL, KEY, { auth: { persistSession: false } })

async function main() {
  const { error: authErr } = await sb.auth.signInWithPassword({ email: EMAIL, password: PASSWORD })
  if (authErr) { console.error('❌ Login:', authErr.message); process.exit(1) }
  console.log('✓ Autenticado')

  const { data: products, error } = await sb
    .from('products')
    .select('id,title,image_url,images')
    .is('deleted_at', null)
  if (error) {
    console.error('❌ No pude leer products:', error.message)
    if (/images/i.test(error.message)) console.error('   → ¿Corriste la migración 2026-06-add-product-images.sql?')
    process.exit(1)
  }

  let updated = 0
  for (const p of products) {
    const angleFile = ANGLE[p.title]
    const gallery = []
    if (p.image_url) gallery.push(p.image_url)

    if (angleFile) {
      const buf = readFileSync(join(ROOT, 'public', 'products', angleFile))
      const path = `seed/${angleFile}`
      await sb.storage.from(BUCKET).upload(path, buf, { contentType: 'image/webp', upsert: true })
      const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(path)
      if (pub?.publicUrl && !gallery.includes(pub.publicUrl)) gallery.push(pub.publicUrl)
    }

    if (gallery.length === 0) continue
    const { error: upErr } = await sb.from('products').update({ images: gallery }).eq('id', p.id)
    if (upErr) {
      console.error('  ❌', p.title, '→', upErr.message)
    } else {
      console.log(`✓ ${p.title} → ${gallery.length} foto(s)`)
      updated++
    }
  }
  console.log(`\nListo. Galerías actualizadas: ${updated}`)
  process.exit(0)
}
main().catch((err) => { console.error('❌', err.message); process.exit(1) })
