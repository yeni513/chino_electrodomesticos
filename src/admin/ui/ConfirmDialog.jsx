import { useEffect, useRef } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'

const TONES = {
  danger: {
    icon: 'text-rose-600 bg-rose-50',
    button: 'bg-rose-600 hover:bg-rose-700 text-white focus-visible:ring-rose-400',
  },
  warn: {
    icon: 'text-amber-700 bg-amber-50',
    button: 'bg-amber-600 hover:bg-amber-700 text-white focus-visible:ring-amber-400',
  },
  info: {
    icon: 'text-brand-ink bg-slate-100',
    button: 'bg-brand-ink hover:bg-slate-800 text-white focus-visible:ring-brand-accent',
  },
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onCancel?.()
    }
    window.addEventListener('keydown', onKey)
    confirmRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  const palette = TONES[tone] || TONES.danger

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-ink/50 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-md bg-white rounded-card shadow-lift ring-1 ring-slate-200 p-6 md:p-7">
        <div className="flex items-start gap-4">
          <span
            className={[
              'inline-flex h-11 w-11 items-center justify-center rounded-full shrink-0',
              palette.icon,
            ].join(' ')}
          >
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <h2 id="confirm-title" className="font-display font-semibold text-lg text-brand-ink leading-snug">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg ring-1 ring-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={[
              'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60',
              palette.button,
            ].join(' ')}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
