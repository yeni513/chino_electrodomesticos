const VARIANTS = {
  primary:
    'bg-brand-accent text-brand-ink hover:bg-brand-accent-dark hover:text-white shadow-soft hover:shadow-lift',
  secondary:
    'bg-brand-ink text-white hover:bg-slate-800',
  ghost:
    'bg-transparent text-brand-ink hover:bg-slate-100 border border-slate-200',
}

const SIZES = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base md:px-7 md:py-4',
  xl: 'px-7 py-4 text-base md:px-8 md:py-[1.125rem] md:text-lg',
}

export default function Button({
  as: Tag = 'a',
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
        'transition-all duration-200 ease-smooth',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2',
        'min-h-[44px]',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
