import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicSite from './PublicSite.jsx'

const AdminShell = lazy(() => import('./admin/AdminShell.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sm text-slate-500">Cargando…</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <AdminShell />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}
