import { Activity } from 'lucide-react'

export default function TodayWidget({ stats }) {
  const total = (stats?.added || 0) + (stats?.edited || 0) + (stats?.sold || 0)
  if (total === 0) return null

  const parts = [
    stats.added > 0 && `${stats.added} añadido${stats.added === 1 ? '' : 's'}`,
    stats.edited > 0 && `${stats.edited} editado${stats.edited === 1 ? '' : 's'}`,
    stats.sold > 0 && `${stats.sold} marcado${stats.sold === 1 ? '' : 's'} como vendido${stats.sold === 1 ? '' : 's'}`,
  ].filter(Boolean)

  return (
    <div className="rounded-card bg-brand-ink text-white p-5 mb-6 flex items-center gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
        <Activity className="w-5 h-5" />
      </span>
      <div className="flex-1 text-sm">
        <p className="font-semibold">Movimiento de hoy</p>
        <p className="text-slate-300 mt-0.5">{parts.join(' · ')}</p>
      </div>
    </div>
  )
}
