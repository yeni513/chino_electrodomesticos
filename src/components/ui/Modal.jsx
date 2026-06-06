import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useFocusTrap } from '../../lib/useFocusTrap.js'

// Modal accesible y on-brand. Portal a <body>, focus trap, cierre con Escape,
// bloqueo de scroll del fondo y cierre al hacer clic en el backdrop.
// En mobile aparece como bottom-sheet; en desktop centrado.
export default function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  maxWidth = 'max-w-3xl',
  children,
}) {
  const panelRef = useRef(null)
  useFocusTrap(open, panelRef)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  // Enfoca el panel al abrir.
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus({ preventScroll: true })
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm motion-safe:animate-menu-in"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={[
          'relative w-full overflow-hidden bg-white shadow-lift outline-none',
          'rounded-t-2xl sm:rounded-card',
          'max-h-[92vh] sm:max-h-[88vh] flex flex-col',
          'motion-safe:animate-menu-in',
          maxWidth,
        ].join(' ')}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3.5 right-3.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-ink ring-1 ring-slate-200 shadow-soft hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
