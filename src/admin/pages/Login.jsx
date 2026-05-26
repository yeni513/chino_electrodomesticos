import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, Loader2, ArrowLeft, AlertTriangle } from 'lucide-react'
import {
  supabase,
  isSupabaseConfigured,
  supabaseConfigError,
} from '../../supabase/client.js'
import { useAuth } from '../../supabase/AuthContext.jsx'
import { brand, business } from '../../data/content.js'

const IS_DEV = import.meta.env.DEV

function humanizeError(message) {
  if (!message) return 'No se pudo iniciar sesión.'
  const m = message.toLowerCase()
  if (m.includes('failed to fetch') || m.includes('networkerror')) {
    return IS_DEV
      ? 'No se pudo contactar con Supabase. Revisa VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en .env.local y reinicia el dev server.'
      : 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.'
  }
  if (m.includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos.'
  }
  if (m.includes('email not confirmed')) {
    return 'Tu usuario aún no está confirmado. Pídele a tu desarrollador que lo active en Supabase.'
  }
  return IS_DEV ? message : 'No se pudo iniciar sesión. Inténtalo de nuevo.'
}

export default function Login() {
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!authLoading && session) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [session, authLoading, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!isSupabaseConfigured) {
      setError(supabaseConfigError)
      return
    }

    setSubmitting(true)
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      setSubmitting(false)
      if (err) {
        setError(humanizeError(err.message))
        return
      }
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setSubmitting(false)
      setError(humanizeError(err?.message))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la web
        </Link>

        <div className="bg-white rounded-card ring-1 ring-slate-200 shadow-lift p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <img
              src={brand.assets.logo}
              alt={business.name}
              className="h-[110px] w-auto max-w-[320px] object-contain"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-dark">
              Panel Admin
            </p>
          </div>

          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            Accede con tu correo y contraseña para administrar el inventario.
          </p>

          {!isSupabaseConfigured && (
            <div className="mt-6 rounded-lg bg-amber-50 ring-1 ring-amber-200 px-4 py-3.5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700 shrink-0" />
                <div className="text-sm text-amber-900">
                  <p className="font-semibold">Servicio no disponible</p>
                  {IS_DEV ? (
                    <>
                      <p className="mt-1 text-xs leading-relaxed">{supabaseConfigError}</p>
                      <ul className="mt-2 text-xs list-disc pl-4 space-y-1 leading-relaxed">
                        <li>
                          <strong>Local:</strong> añade las variables a{' '}
                          <code className="px-1 py-0.5 rounded bg-amber-100">.env.local</code>{' '}
                          y reinicia <code className="px-1 py-0.5 rounded bg-amber-100">npm run dev</code>.
                        </li>
                        <li>
                          <strong>Vercel:</strong> añádelas en Settings → Environment
                          Variables (Production + Preview + Development) y haz un Redeploy.
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p className="mt-1 text-xs leading-relaxed">
                      El panel está temporalmente fuera de servicio. Contacta a tu desarrollador.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Correo
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none bg-white text-brand-ink"
                  style={{ fontSize: '16px' }}
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none bg-white text-brand-ink"
                  style={{ fontSize: '16px' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-rose-50 ring-1 ring-rose-200 px-3.5 py-2.5 text-sm text-rose-700 leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !isSupabaseConfigured}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-brand-ink text-white font-semibold text-sm hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Entrando…' : 'Entrar al panel'}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 text-xs text-slate-500 leading-relaxed">
            <Link
              to="/admin/reset"
              className="text-brand-accent-dark font-semibold hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <span className="text-slate-400">
              ¿No tienes acceso? Pídele al desarrollador que te cree un usuario.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
