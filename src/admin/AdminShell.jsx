import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../supabase/AuthContext.jsx'
import { ToastProvider } from './lib/toast.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

// Todo lo del admin (incluido el cliente Supabase) vive aquí.
// AdminShell se carga lazily desde App.jsx, así que la landing pública
// no descarga @supabase/supabase-js a menos que el usuario entre a /admin.
export default function AdminShell() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  )
}
