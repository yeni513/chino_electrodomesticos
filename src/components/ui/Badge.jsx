const TONES = {
  accent: 'bg-brand-accent/15 text-brand-accent-dark ring-brand-accent/30',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  ink: 'bg-brand-ink text-white ring-brand-ink',
}

export default function Badge({ tone = 'accent', className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full',
        'text-xs font-semibold ring-1 ring-inset',
        TONES[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
