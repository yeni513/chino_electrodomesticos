import { createClient } from '@supabase/supabase-js'

const RAW_URL = import.meta.env.VITE_SUPABASE_URL
const RAW_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const SUPABASE_URL = typeof RAW_URL === 'string' ? RAW_URL.trim() : ''
const SUPABASE_ANON_KEY = typeof RAW_KEY === 'string' ? RAW_KEY.trim() : ''

function describeConfig() {
  const problems = []

  if (!SUPABASE_URL) {
    problems.push('Falta la variable VITE_SUPABASE_URL.')
  } else if (
    !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(SUPABASE_URL)
  ) {
    problems.push(
      `VITE_SUPABASE_URL no tiene un formato válido: "${SUPABASE_URL}". ` +
        'Debe ser algo como https://xxxxx.supabase.co',
    )
  }

  if (!SUPABASE_ANON_KEY) {
    problems.push('Falta la variable VITE_SUPABASE_ANON_KEY.')
  } else if (SUPABASE_ANON_KEY.length < 20) {
    problems.push(
      'VITE_SUPABASE_ANON_KEY parece demasiado corta. Asegúrate de pegar la clave publicable completa.',
    )
  }

  return problems
}

const configProblems = describeConfig()
export const isSupabaseConfigured = configProblems.length === 0
export const supabaseConfigError = configProblems.join(' ')

if (!isSupabaseConfigured) {
  // Mensaje visible en consola del navegador para ayudar al desarrollador.
  // eslint-disable-next-line no-console
  console.error(
    '[Supabase] Configuración inválida:\n  ' +
      configProblems.join('\n  ') +
      '\n\n' +
      '→ LOCAL: crea/edita .env.local en la raíz del proyecto con\n' +
      '    VITE_SUPABASE_URL=https://TU-PROJECT-REF.supabase.co\n' +
      '    VITE_SUPABASE_ANON_KEY=tu_anon_key_publicable\n' +
      '  y reinicia el dev server (Ctrl+C y "npm run dev" otra vez).\n\n' +
      '→ VERCEL: ve a Settings → Environment Variables, añade las dos\n' +
      '  variables para Production, Preview y Development, y redeploya.',
  )
}

// Si la config es inválida, usamos placeholders para que createClient no
// lance al importar. Las llamadas reales fallarán y la UI muestra el error
// claro al usuario (ver isSupabaseConfigured / supabaseConfigError).
const safeUrl = SUPABASE_URL || 'https://placeholder.supabase.co'
const safeKey = SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const PRODUCTS_TABLE = 'products'
export const PRODUCT_IMAGES_BUCKET = 'product-images'
