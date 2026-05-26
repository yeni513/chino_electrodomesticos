import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, Loader2, KeyRound, CheckCircle2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../supabase/client.js'
import { brand, business } from '../../data/content.js'
import { useAuth } from '../../supabase/AuthContext.jsx'

// Soporta dos modos:
// 1. Solicitar email (usuario en login → "Olvidé mi contraseña").
// 2. Establecer nueva contraseña (usuario llega via link de Supabase con sesión recovery).
export default function ResetPassword() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [mode, setMode] = useState('request') // 'request' | 'update' | 'sent' | 'done'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Si Supabase emitió un evento PASSWORD_RECOVERY o el usuario tiene sesión recovery,
  // mostramos el formulario para fijar contraseña nueva.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setMode('update')
    })
    return () => data?.subscription?.unsubscribe()
  }, [])

  useEffect(() => {
    if (session && mode === 'request') {
      // Si el usuario abrió esta página con sesión activa (no via link recovery),
      // probablemente quiere cambiar contraseña directamente.
      setMode('update')
    }
  }, [session, mode])

  async function handleRequest(e) {
    e.preventDefault()
    setError(null)
    if (!isSupabaseConfigured) {
      setError('Configuración incompleta. Contacta a tu desarrollador.')
      return
    }
    setSubmitting(true)
    const redirectTo = `${window.location.origin}/admin/reset`
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    })
    setSubmitting(false)
    if (err) {
      setError(err.message || 'No se pudo enviar el correo.')
      return
    }
    setMode('sent')
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (password !== password2) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setSubmitting(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setSubmitting(false)
    if (err) {
      setError(err.message || 'No se pudo actualizar la contraseña.')
      return
    }
    setMode('done')
    setTimeout(() => navigate('/admin/dashboard', { replace: true }), 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al login
        </Link>

        <div className="bg-white rounded-card ring-1 ring-slate-200 shadow-lift p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <img
              src={brand.assets.logo}
              alt={business.name}
              className="h-[80px] w-auto max-w-[280px] object-contain"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-dark">
              {mode === 'update' || mode === 'done' ? 'Nueva contraseña' : 'Recuperar contraseña'}
            </p>
          </div>

          {mode === 'request' && (
            <>
              <p className="mt-6 text-sm text-slate-600 leading-relaxed">
                Te enviamos un enlace a tu correo para restablecer la contraseña.
              </p>
              <form onSubmit={handleRequest} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Correo
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="email"
                      type="email"
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

                {error && (
                  <div className="rounded-lg bg-rose-50 ring-1 ring-rose-200 px-3.5 py-2.5 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-brand-ink text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Enviar enlace
                </button>
              </form>
            </>
          )}

          {mode === 'sent' && (
            <div className="mt-7 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                Si <strong>{email}</strong> está registrado, recibirás un enlace en los próximos minutos. Revisa también la carpeta de spam.
              </p>
            </div>
          )}

          {mode === 'update' && (
            <>
              <p className="mt-6 text-sm text-slate-600 leading-relaxed">
                Elige una contraseña nueva. Mínimo 8 caracteres.
              </p>
              <form onSubmit={handleUpdate} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="pw" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="pw"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none bg-white text-brand-ink"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pw2" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Repetir contraseña
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="pw2"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-accent focus:outline-none bg-white text-brand-ink"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg bg-rose-50 ring-1 ring-rose-200 px-3.5 py-2.5 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-lg bg-brand-ink text-white font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Guardar contraseña
                </button>
              </form>
            </>
          )}

          {mode === 'done' && (
            <div className="mt-7 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="mt-4 text-sm text-slate-700">
                Contraseña actualizada. Te llevamos al panel…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
