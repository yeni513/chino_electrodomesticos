// ─────────────────────────────────────────────────────────────────────────────
//  Trusted Appliances · Configuración central de la web
// ─────────────────────────────────────────────────────────────────────────────
//
//  Este archivo es la fuente única de marca, contacto y copy. Cambiando algo
//  aquí, se actualiza toda la web (header, footer, panel admin, SEO, etc.).
//
//  Áreas:
//   · brand     → identidad visual y SEO
//   · business  → datos de contacto (en su mayoría vienen también de Supabase
//                 a través del panel admin)
//   · hero / categorias / porQue / destacados / ctaFinal / faqs / testimonios
//                 → copy de cada sección de la web pública
//
//  Los productos del catálogo NO viven aquí: se gestionan desde el panel
//  admin (/admin/dashboard) y se guardan en Supabase. Los productos del
//  bloque "Destacados" son solo un fallback visual mientras el inventario
//  esté vacío.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'Trusted Appliances',
  shortName: 'Trusted Appliances',
  tagline: 'Electrodomésticos confiables para tu hogar',
  assets: {
    // Logo oficial recortado (sin whitespace). Se usa en header, footer, login y admin.
    logo: '/logo-trusted-appliances-cropped.webp',
    logoPng: '/logo-trusted-appliances-cropped.png',
    // Versión original con whitespace alrededor. Útil para OG image y social previews.
    logoFull: '/logo-trusted-appliances.webp',
    logoFullPng: '/logo-trusted-appliances.png',
    // Favicon simplificado (32×32 para la pestaña del navegador).
    favicon: '/favicon.svg',
  },
  // Estos valores son de referencia. Los HEX reales viven en tailwind.config.js.
  colors: {
    navy: '#1F3D63',
    navySoft: '#2B5184',
    accent: '#C9A227',
    cream: '#F8FAFC',
  },
}

// URL de producción. Cambiar al deployar al dominio final.
export const siteUrl = 'https://trusted-appliances.vercel.app'

export const seo = {
  title: 'Trusted Appliances · Refrigeradores, lavadoras y estufas en Cleveland, OH',
  description:
    'Refrigeradores, lavadoras, secadoras y estufas con entrega coordinada en Cleveland y el área de Ohio. Precios por WhatsApp, equipos revisados antes de salir.',
  ogTitle: 'Trusted Appliances · Electrodomésticos confiables en Cleveland, OH',
  ogDescription:
    'Refrigeradores, lavadoras, secadoras, estufas y más. Entrega coordinada en Cleveland. Pregúntanos por fotos, precios y disponibilidad por WhatsApp.',
  ogImage: `${siteUrl}/og-image.jpg`,
  locale: 'es_419',
  siteName: 'Trusted Appliances',
}

export const business = {
  name: brand.name,
  tagline: brand.tagline,
  phone: '+1 (216) 278-4775',
  whatsapp: '12162784775',
  email: '',
  city: 'Cleveland',
  region: 'OH',
  country: 'US',
  serviceArea: 'Cleveland y área metropolitana, OH',
  address: 'Atención por WhatsApp · visitas con cita previa',
  hours: 'Lun–Sáb · Respuesta por WhatsApp en horario de tienda',
}

export const nav = [
  { label: 'Catálogo', href: '#categorias' },
  { label: 'Destacados', href: '#destacados' },
  { label: 'Por qué nosotros', href: '#por-que' },
  { label: 'Preguntas', href: '#faq' },
]

export const hero = {
  eyebrow: 'Cleveland, OH · Atención directa por WhatsApp',
  headline: 'Refrigeradores, lavadoras y estufas — entregados en Cleveland',
  subhead:
    'Equipos revisados y entregados a tu casa por la misma persona que te asesora. Precio final por WhatsApp, sin call center ni cargos sorpresa.',
  primaryCta: { label: 'Ver lo disponible esta semana', href: '#destacados' },
  secondaryCta: { label: 'Preguntar por WhatsApp', href: 'whatsapp-direct' },
  microcopy:
    'Te respondemos en horario de tienda con fotos, precio final y disponibilidad real — sin formularios ni esperas.',
  categoryChips: [
    { icon: 'Refrigerator', label: 'Refrigeradores' },
    { icon: 'WashingMachine', label: 'Lavadoras' },
    { icon: 'Shirt', label: 'Secadoras' },
    { icon: 'Flame', label: 'Estufas' },
  ],
  trustBullets: [
    'Entrega coordinada en Cleveland',
    'Equipos revisados antes de salir',
    'Precio final por WhatsApp',
  ],
  applianceCards: [
    {
      icon: 'Refrigerator',
      label: 'Refrigeradores',
      detail: 'No frost · doble puerta',
      priceLabel: 'Ver precio por WhatsApp',
      featured: false,
    },
    {
      icon: 'WashingMachine',
      label: 'Lavadoras',
      detail: 'Carga frontal y superior',
      priceLabel: 'Ver precio por WhatsApp',
      featured: true,
    },
    {
      icon: 'Shirt',
      label: 'Secadoras',
      detail: 'Bomba de calor',
      priceLabel: 'Ver precio por WhatsApp',
      featured: false,
    },
    {
      icon: 'Flame',
      label: 'Estufas',
      detail: 'Gas e inducción',
      priceLabel: 'Ver precio por WhatsApp',
      featured: false,
    },
  ],
}

// Mantener IDs alineados con el `category` del admin Supabase
// (lavadora, secadora, estufa, refrigerador, freezer, combo, otro).
export const categorias = [
  {
    id: 'refrigerador',
    icon: 'Refrigerator',
    label: 'Refrigeradores',
    description: 'No frost, side by side y bajo mesón.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'lavadora',
    icon: 'WashingMachine',
    label: 'Lavadoras',
    description: 'Carga frontal y superior, distintas capacidades.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'secadora',
    icon: 'Shirt',
    label: 'Secadoras',
    description: 'Bomba de calor, ventilación y eléctricas.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'estufa',
    icon: 'Flame',
    label: 'Estufas y cocinas',
    description: 'A gas, eléctricas e inducción con horno.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'freezer',
    icon: 'Snowflake',
    label: 'Freezers',
    description: 'Verticales y horizontales, distintas capacidades.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'combo',
    icon: 'Layers',
    label: 'Combos lavadora/secadora',
    description: 'Stack o all-in-one para espacios pequeños.',
    cta: 'Preguntar disponibilidad',
  },
]

export const categoriasFootnote =
  '¿No ves el modelo exacto? Pídenos fotos y precios por WhatsApp — te enviamos opciones según inventario y tu presupuesto.'

export const porQue = [
  {
    icon: 'Handshake',
    title: 'Te atendemos nosotros, no un call center',
    body: 'Hablas con la misma persona que te asesora y te entrega. Sin tickets ni esperas, sin guiones automáticos.',
  },
  {
    icon: 'CheckCircle2',
    title: 'Revisamos el equipo antes de entregártelo',
    body: 'Cada electrodoméstico pasa por una revisión visual y de encendido antes de salir. Si detectamos un defecto, no se entrega.',
  },
  {
    icon: 'Truck',
    title: 'Entrega coordinada hasta tu casa',
    body: 'Coordinamos contigo la zona, el día y la franja horaria. Te confirmamos por WhatsApp antes de salir.',
  },
  {
    icon: 'BadgeDollarSign',
    title: 'Precios claros, sin cargos ocultos',
    body: 'El precio que te pasamos por WhatsApp es el precio final del equipo. Sin extras escondidos.',
  },
]

export const destacadosIntro = {
  eyebrow: 'Disponibles ahora',
  headline: 'Lo que tenemos esta semana',
  subhead:
    'Muestra del inventario actual. Pídenos fotos extra, video o el precio final por WhatsApp — el stock cambia rápido.',
}

// Fallback mostrado solo si la tabla de productos en Supabase está vacía.
export const destacados = [
  {
    id: 1,
    name: 'Refrigerador No Frost 320 L',
    spec: 'Doble puerta · 320 L · clase A',
    detail: '220 V · dispensador interior · congelador superior',
    price: 'Consultar precio',
    badge: 'Más consultado',
    image: null,
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Entrega coordinada', tone: 'neutral' },
    ],
  },
  {
    id: 2,
    name: 'Lavadora carga frontal 9 kg',
    spec: '9 kg · 1.400 rpm · 14 programas',
    detail: 'Motor inverter · vapor · clase A',
    price: 'Consultar precio',
    badge: 'Recomendado',
    image: null,
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Entrega coordinada', tone: 'neutral' },
    ],
  },
  {
    id: 3,
    name: 'Secadora de ropa 8 kg',
    spec: '8 kg · bomba de calor · clase A++',
    detail: 'Antiarrugas · sensor de humedad · panel táctil',
    price: 'Consultar precio',
    badge: 'Nuevo modelo',
    image: null,
    chips: [
      { icon: 'Clock3', label: 'Consultar disponibilidad', tone: 'warning' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
    ],
  },
  {
    id: 4,
    name: 'Estufa 4 quemadores con horno',
    spec: 'Gas natural / GLP · 4 quemadores',
    detail: 'Horno 65 L · encendido eléctrico · acero inoxidable',
    price: 'Consultar precio',
    badge: 'Más vendido',
    image: null,
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Entrega coordinada', tone: 'neutral' },
    ],
  },
]

export const marcas = [
  'Whirlpool',
  'Samsung',
  'LG',
  'GE',
  'Frigidaire',
  'Maytag',
  'Bosch',
  'KitchenAid',
]

// Vacío hasta tener testimonios reales con nombre y ciudad. La sección
// se oculta automáticamente cuando el array está vacío.
export const testimonios = []

export const faqs = [
  {
    q: '¿Puedo pedir fotos y precios antes de ir a la tienda?',
    a: 'Sí. Escríbenos por WhatsApp diciéndonos qué buscas y te enviamos fotos del equipo, precio actualizado y opciones similares según disponibilidad.',
  },
  {
    q: '¿Hacen entrega a domicilio?',
    a: 'Tenemos entrega coordinada según tu zona y horario. Te confirmamos por WhatsApp el día y la franja antes de salir. Consúltanos para tu caso.',
  },
  {
    q: '¿Los electrodomésticos son nuevos o usados?',
    a: 'Trabajamos equipos nuevos en caja, seminuevos y usados revisados. Cada ficha de producto indica la condición. Antes de entregar, todos pasan una revisión visual y de encendido — si detectamos un defecto, no se entrega.',
  },
  {
    q: '¿Qué pasa si el equipo presenta una falla?',
    a: 'Te ayudamos con la gestión del servicio técnico oficial de la marca. Pregúntanos por WhatsApp y te indicamos cómo procedemos según el caso.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Aceptamos efectivo, tarjeta y transferencia. Pregúntanos por las opciones de pago disponibles para cada equipo.',
  },
  {
    q: '¿Tienen tienda física donde pueda ver los equipos?',
    a: 'Sí. Escríbenos por WhatsApp y te enviamos la dirección y cómo llegar. Puedes ver los equipos en exposición antes de decidir, sin compromiso.',
  },
]

export const ctaFinal = {
  eyebrow: 'Atención directa, sin formularios',
  headline: '¿Buscas lavadora, secadora, estufa o refrigerador?',
  subhead:
    'Escríbenos y te mostramos las opciones según inventario. Fotos, precios y disponibilidad por WhatsApp — sin compromiso.',
  primaryCta: { label: 'Preguntar por WhatsApp', href: 'whatsapp-direct' },
  secondaryCta: { label: 'Llamar a la tienda', href: 'phone-direct' },
  reassurance: [
    'Te respondemos en horario de tienda',
    'Te enviamos fotos y precios reales',
    'Sin call center ni respuestas automáticas',
  ],
  reassuranceUnderCta: 'Respuesta rápida · sin compromiso',
}
