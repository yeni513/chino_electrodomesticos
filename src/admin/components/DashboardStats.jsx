import { Boxes, CheckCircle2, Clock3, XCircle } from 'lucide-react'

const TONE_STYLES = {
  ink: 'bg-brand-ink text-white',
  emerald: 'bg-white ring-1 ring-emerald-200 text-emerald-700',
  amber: 'bg-white ring-1 ring-amber-200 text-amber-800',
  rose: 'bg-white ring-1 ring-rose-200 text-rose-700',
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className={`rounded-card p-4 flex items-center gap-3 ${TONE_STYLES[tone] || ''}`}>
      <Icon className="w-5 h-5 opacity-80" />
      <div>
        <p className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">{label}</p>
        <p className="text-xl font-display font-semibold tabular-nums leading-tight">{value}</p>
      </div>
    </div>
  )
}

export default function DashboardStats({ counters }) {
  if (!counters || counters.all === 0) return null
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <StatCard icon={Boxes} label="Total" value={counters.all} tone="ink" />
      <StatCard icon={CheckCircle2} label="Disponibles" value={counters.disponible} tone="emerald" />
      <StatCard icon={Clock3} label="Agotados" value={counters.agotado} tone="amber" />
      <StatCard icon={XCircle} label="Vendidos" value={counters.vendido} tone="rose" />
    </div>
  )
}
