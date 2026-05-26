import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogOut, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../supabase/AuthContext.jsx'
import { brand, business } from '../../data/content.js'
import { useToast } from '../lib/toast.jsx'

function maskEmail(email) {
  if (!email) return ''
  const [name, domain] = email.split('@')
  if (!domain) return email
  const head = name.slice(0, 1)
  const tail = name.length > 2 ? name.slice(-1) : ''
  return `${head}${'•'.repeat(Math.max(name.length - 2, 1))}${tail}@${domain}`
}

export default function AdminLayout({ children, title = 'Inventario' }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [revealEmail, setRevealEmail] = useState(false)

  async function handleLogout() {
    await signOut()
    toast.info('Sesión cerrada')
    navigate('/admin/login', { replace: true })
  }

  const displayEmail = user?.email ? (revealEmail ? user.email : maskEmail(user.email)) : ''

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 h-16 md:h-24 flex items-center justify-between gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 group min-w-0"
            aria-label={`Panel Admin · ${business.name}`}
          >
            <img
              src={brand.assets.logo}
              alt={business.name}
              width="220"
              height="64"
              className="h-[44px] md:h-[64px] w-auto max-w-[160px] md:max-w-[220px] object-contain"
            />
            <span className="hidden sm:inline-block w-px h-10 bg-slate-200" />
            <div className="hidden sm:block leading-tight min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Panel Admin
              </p>
              <p className="font-display font-semibold text-sm text-brand-ink mt-0.5 truncate">
                {title}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver web
            </Link>

            {user?.email && (
              <button
                type="button"
                onClick={() => setRevealEmail((v) => !v)}
                aria-label={revealEmail ? 'Ocultar email' : 'Mostrar email'}
                title={revealEmail ? 'Ocultar email' : 'Mostrar email'}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 px-2 py-1 rounded hover:bg-slate-100"
              >
                <span className="truncate max-w-[180px] tabular-nums">{displayEmail}</span>
                {revealEmail ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 py-6 md:py-12">
        {children}
      </main>
    </div>
  )
}
