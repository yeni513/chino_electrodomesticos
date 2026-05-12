import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicSite from './PublicSite.jsx'
import ProtectedRoute from './admin/components/ProtectedRoute.jsx'

const Login = lazy(() => import('./admin/pages/Login.jsx'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard.jsx'))

function AdminLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sm text-slate-500">Cargando panel…</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={<AdminLoader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
