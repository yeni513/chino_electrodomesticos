// Mapa central de iconos de Lucide usados en secciones de la web pública y
// admin. Evita duplicar `const ICONS = { ... }` en cada componente y centraliza
// el subset que tree-shakes al bundle.
import {
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  Snowflake,
  Layers,
  Wind,
  Coffee,
  Package,
  Handshake,
  CheckCircle2,
  Truck,
  BadgeDollarSign,
  PackageCheck,
  Clock3,
  XCircle,
  MessageCircle,
  Camera,
  Tag,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react'

export const ICONS = {
  Refrigerator,
  WashingMachine,
  Shirt,
  Flame,
  Snowflake,
  Layers,
  Wind,
  Coffee,
  Package,
  Handshake,
  CheckCircle2,
  Truck,
  BadgeDollarSign,
  PackageCheck,
  Clock3,
  XCircle,
  MessageCircle,
  Camera,
  Tag,
  ClipboardCheck,
  Sparkles,
}

export function getIcon(name, fallback = Package) {
  return ICONS[name] || fallback
}

export const CATEGORY_ICON = {
  lavadora: WashingMachine,
  secadora: Shirt,
  estufa: Flame,
  refrigerador: Refrigerator,
  freezer: Snowflake,
  combo: Layers,
  otro: Package,
}
