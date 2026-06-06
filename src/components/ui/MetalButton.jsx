import { useEffect, useRef, useState } from 'react'

// MetalButton — adaptación a React + Vite (sin cva/TS) del botón metálico.
// Botón táctil con gradientes (sin dependencias). Soporta `href` (render <a>)
// o `onClick` (render <button>). Variante por defecto: gold (marca).
const COLORS = {
  gold: {
    outer: 'bg-gradient-to-b from-[#917100] to-[#EAD98F]',
    inner: 'bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]',
    button: 'bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]',
    text: 'text-[#3a2e05]',
  },
  ink: {
    outer: 'bg-gradient-to-b from-[#0b1b30] to-[#3c5b86]',
    inner: 'bg-gradient-to-b from-[#dbe6f5] via-[#16314f] to-[#cfe0f2]',
    button: 'bg-gradient-to-b from-[#2b5184] to-[#16314f]',
    text: 'text-white',
  },
  success: {
    outer: 'bg-gradient-to-b from-[#005A43] to-[#7CCB9B]',
    inner: 'bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]',
    button: 'bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]',
    text: 'text-white',
  },
}

const join = (...c) => c.filter(Boolean).join(' ')

export default function MetalButton({
  children,
  variant = 'gold',
  href,
  className = '',
  ...props
}) {
  const colors = COLORS[variant] || COLORS.gold
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const touch = useRef(false)

  useEffect(() => {
    touch.current =
      'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0
  }, [])

  const transition = 'all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)'
  const wrapperStyle = {
    transform: pressed ? 'translateY(2px) scale(0.99)' : 'translateY(0) scale(1)',
    boxShadow: pressed
      ? '0 1px 2px rgba(0,0,0,0.15)'
      : hovered && !touch.current
        ? '0 6px 18px rgba(31,61,99,0.18)'
        : '0 3px 10px rgba(31,61,99,0.12)',
    transition,
  }
  const buttonStyle = {
    transform: pressed ? 'scale(0.97)' : 'scale(1)',
    transition,
    filter: hovered && !pressed && !touch.current ? 'brightness(1.04)' : 'none',
  }

  const handlers = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseEnter: () => !touch.current && setHovered(true),
    onMouseLeave: () => {
      setPressed(false)
      setHovered(false)
    },
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
    onTouchCancel: () => setPressed(false),
  }

  const innerClasses = join(
    'relative z-10 m-[1px] inline-flex h-12 transform-gpu cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[10px] px-7 text-sm md:text-base leading-none font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
    colors.button,
    colors.text,
    className,
  )

  const Inner = href ? 'a' : 'button'
  const innerProps = href
    ? { href, ...props }
    : { type: 'button', ...props }

  return (
    <div
      className={join('relative inline-flex transform-gpu rounded-xl p-[1.25px]', colors.outer)}
      style={wrapperStyle}
    >
      <div className={join('absolute inset-[1px] rounded-[11px]', colors.inner)} />
      <Inner className={innerClasses} style={buttonStyle} {...handlers} {...innerProps}>
        {children}
      </Inner>
    </div>
  )
}
