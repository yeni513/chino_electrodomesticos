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
    logo: '/logo-trusted-appliances-cropped.png',
    // Versión original con whitespace alrededor. Útil para OG image y social previews.
    logoFull: '/logo-trusted-appliances.png',
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

export const seo = {
  title: 'Trusted Appliances · Refrigeradores, lavadoras, secadoras y estufas',
  description:
    'Trusted Appliances ofrece refrigeradores, lavadoras, secadoras, estufas y más. Consulta inventario disponible y precios actuales por WhatsApp.',
  ogTitle: 'Trusted Appliances · Electrodomésticos confiables para tu hogar',
  ogDescription:
    'Refrigeradores, lavadoras, secadoras, estufas y más. Pregúntanos por inventario disponible, fotos y precios por WhatsApp.',
  locale: 'es_US',
  siteName: 'Trusted Appliances',
}

export const business = {
  name: brand.name,
  tagline: brand.tagline,
  phone: '+1 (216) 278-4775',
  whatsapp: '12162784775',
  email: '',
  address: 'Pregúntanos la dirección por WhatsApp',
  hours: 'Horario de tienda — consulta por WhatsApp',
}

export const nav = [
  { label: 'Catálogo', href: '#categorias' },
  { label: 'Destacados', href: '#destacados' },
  { label: 'Por qué nosotros', href: '#por-que' },
  { label: 'Preguntas', href: '#faq' },
]

export const hero = {
  eyebrow: 'Trusted Appliances · Atención personalizada',
  headline: 'Electrodomésticos confiables para tu hogar',
  subhead:
    'Refrigeradores, lavadoras, secadoras y estufas revisados antes de entregarte. Asesoría directa por WhatsApp y precios claros — sin call center.',
  primaryCta: { label: 'Ver electrodomésticos', href: '#destacados' },
  secondaryCta: { label: 'Ver opciones por WhatsApp', href: 'whatsapp-direct' },
  microcopy:
    'Pídenos fotos, precios y disponibilidad por WhatsApp — te respondemos lo antes posible.',
  categoryChips: [
    { icon: 'Refrigerator', label: 'Refrigeradores' },
    { icon: 'WashingMachine', label: 'Lavadoras' },
    { icon: 'Shirt', label: 'Secadoras' },
    { icon: 'Flame', label: 'Estufas' },
  ],
  trustBullets: [
    'Atención directa por WhatsApp',
    'Opciones según inventario',
    'Asesoría sin compromiso',
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

export const categorias = [
  {
    id: 'refrigeradores',
    icon: 'Refrigerator',
    label: 'Refrigeradores',
    description: 'No frost, side by side y bajo mesón.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'lavadoras',
    icon: 'WashingMachine',
    label: 'Lavadoras',
    description: 'Carga frontal y superior, distintas capacidades.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'secadoras',
    icon: 'Shirt',
    label: 'Secadoras',
    description: 'Bomba de calor, ventilación y combos lavasecas.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'estufas',
    icon: 'Flame',
    label: 'Estufas y cocinas',
    description: 'A gas, eléctricas e inducción con horno.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'climatizacion',
    icon: 'Wind',
    label: 'Aire acondicionado',
    description: 'Split, portátil e inverter según tu metraje.',
    cta: 'Preguntar disponibilidad',
  },
  {
    id: 'pae',
    icon: 'Coffee',
    label: 'Pequeño electrodoméstico',
    description: 'Microondas, licuadoras, cafeteras y más.',
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
  eyebrow: 'Destacados',
  headline: 'Algunos de los modelos que más nos consultan',
  subhead:
    'Una muestra del catálogo. Pídenos fotos, vídeo o el precio actualizado por WhatsApp antes de venir — el inventario cambia.',
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

export const testimonios = [
  {
    quote:
      'Llegué buscando una lavadora y me explicaron las diferencias sin presión. Me llevé la que de verdad encajaba con mi familia, no la más cara.',
    name: '',
    role: 'Cliente del barrio',
  },
  {
    quote:
      'Pregunté por WhatsApp y me respondieron rápido. Cuando llegó el refrigerador, lo revisaron delante de mí. Esa cercanía no la encuentras en una cadena grande.',
    name: '',
    role: 'Compra reciente',
  },
  {
    quote:
      'Llevo tiempo comprándoles. Si algo necesita atención, sé dónde están y me ayudan. Eso vale más que cualquier descuento agresivo.',
    name: '',
    role: 'Cliente frecuente',
  },
]

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
    q: '¿Los electrodomésticos son nuevos?',
    a: 'Sí, todos los equipos son nuevos y traen la garantía oficial de fábrica del fabricante. Antes de entregarlos pasamos una revisión visual y de encendido.',
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
