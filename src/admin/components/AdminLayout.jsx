import { useNavigate, Link } from 'react-router-dom'
import { LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '../../supabase/AuthContext.jsx'
import { brand, business } from '../../data/content.js'

export default function AdminLayout({ children, title = 'Inventario' }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3.5 group"
            aria-label={`Panel Admin · ${business.name}`}
          >
            <img
              src={brand.assets.logo}
              alt={business.name}
              className="h-[64px] w-auto max-w-[220px] object-contain"
            />
            <span className="hidden sm:inline-block w-px h-10 bg-slate-200" />
            <div className="hidden sm:block leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Panel Admin
              </p>
              <p className="font-display font-semibold text-sm text-brand-ink mt-0.5">
                {title}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
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
              <span className="hidden sm:block text-xs text-slate-500 px-2 truncate max-w-[160px]">
                {user.email}
              </span>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-container px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
    </div>
  )
}
