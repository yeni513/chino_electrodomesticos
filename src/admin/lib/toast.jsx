import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X, Undo2 } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
}

const STYLES = {
  success: 'bg-emerald-600 text-white ring-emerald-700',
  error: 'bg-rose-600 text-white ring-rose-700',
  info: 'bg-brand-ink text-white ring-slate-700',
}

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const push = useCallback(
    ({ type = 'info', title, description, action, duration = 4000 }) => {
      const id = nextId++
      setToasts((prev) => [...prev, { id, type, title, description, action }])
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration)
        timersRef.current.set(id, timer)
      }
      return id
    },
    [dismiss],
  )

  const value = {
    success: (title, opts) => push({ type: 'success', title, ...opts }),
    error: (title, opts) => push({ type: 'error', title, ...opts }),
    info: (title, opts) => push({ type: 'info', title, ...opts }),
    dismiss,
  }

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((t) => clearTimeout(t))
      timers.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function Toaster({ toasts, dismiss }) {
  return (
    <div
      className="fixed z-[100] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => {
        const Icon = ICONS[t.type]
        return (
          <div
            key={t.id}
            role="status"
            className={[
              'pointer-events-auto inline-flex items-center gap-3 px-4 py-3 rounded-lg shadow-lift ring-1 ring-inset min-w-[260px] max-w-[420px]',
              STYLES[t.type],
            ].join(' ')}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">{t.title}</p>
              {t.description && (
                <p className="text-xs leading-relaxed opacity-90 mt-0.5">{t.description}</p>
              )}
            </div>
            {t.action && (
              <button
                type="button"
                onClick={() => {
                  t.action.onClick()
                  dismiss(t.id)
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/15 hover:bg-white/25 text-xs font-semibold transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                {t.action.label}
              </button>
            )}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Cerrar notificación"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/15 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
