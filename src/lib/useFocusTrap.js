import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Focus trap mínimo sin dependencias.
 * Atrapa Tab dentro del nodo, restaura el focus al cerrar.
 */
export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active) return
    const node = containerRef?.current
    if (!node) return

    const previouslyFocused = document.activeElement

    function focusables() {
      return Array.from(node.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('inert') && el.offsetParent !== null,
      )
    }

    function onKeyDown(e) {
      if (e.key !== 'Tab') return
      const list = focusables()
      if (list.length === 0) {
        e.preventDefault()
        return
      }
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => {
      node.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused && previouslyFocused.focus) {
        try {
          previouslyFocused.focus()
        } catch {
          /* noop */
        }
      }
    }
  }, [active, containerRef])
}
