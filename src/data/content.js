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
  // Tienda física
  street: '9640 Lorain Ave',
  zip: '44102',
  address: '9640 Lorain Ave, Cleveland, OH 44102',
  hours: 'Lun–Sáb · Escríbenos para confirmar el horario de hoy',
  // Google Maps (sin API key): búsqueda, cómo llegar y embed para iframe
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=9640+Lorain+Ave+Cleveland+OH+44102',
  mapsDirUrl:
    'https://www.google.com/maps/dir/?api=1&destination=9640+Lorain+Ave+Cleveland+OH+44102',
  mapEmbedUrl:
    'https://www.google.com/maps?q=9640+Lorain+Ave,+Cleveland,+OH+44102&output=embed',
}

export const nav = [
  { label: 'Catálogo', href: '#destacados' },
  { label: 'Por qué nosotros', href: '#por-que' },
  { label: 'Opiniones', href: '#testimonios' },
  { label: 'Tienda', href: '#visitanos' },
  { label: 'Preguntas', href: '#faq' },
]

export const hero = {
  eyebrow: 'Cleveland, OH · Atención directa por WhatsApp',
  headline: 'Refrigeradores, lavadoras y estufas — entregados en Cleveland',
  subhead:
    'Equipos revisados y entregados a tu casa por la misma persona que te asesora. Precio final por WhatsApp, sin call center ni cargos sorpresa.',
  primaryCta: { label: 'Ver lo disponible esta semana', href: '#destacados' },
  secondaryCta: { label: 'Ver opciones para mi presupuesto', href: 'whatsapp-direct' },
  microcopy:
    'Te respondemos en horario de tienda con fotos, precio final y disponibilidad real — sin formularios ni esperas.',
  categoryChips: [
    { icon: 'Refrigerator', label: 'Refrigeradores' },
    { icon: 'WashingMachine', label: 'Lavadoras' },
    { icon: 'Shirt', label: 'Secadoras' },
    { icon: 'Flame', label: 'Estufas' },
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
    long:
      'Refrigeradores para cada cocina: desde compactos hasta side by side de gran capacidad. Te asesoramos según el espacio disponible y tu presupuesto.',
    cta: 'Ver detalles',
    image: '/products/refrigerador.webp',
    imageAngle: '/products/refrigerador-angle.webp',
    subtypes: ['No frost', 'Side by side', 'French door', 'Doble puerta', 'Bajo mesón', 'Con dispensador'],
    finishes: ['Acero inoxidable', 'Blanco', 'Negro'],
  },
  {
    id: 'lavadora',
    icon: 'WashingMachine',
    label: 'Lavadoras',
    description: 'Carga frontal y superior, distintas capacidades.',
    long:
      'Lavadoras de carga frontal y superior en distintas capacidades. Te ayudamos a elegir según cuánta ropa lavas y el espacio de tu lavadero.',
    cta: 'Ver detalles',
    image: '/products/lavadora.webp',
    imageAngle: '/products/lavadora-angle.webp',
    subtypes: ['Carga frontal', 'Carga superior', 'Alta capacidad', 'Compactas'],
    finishes: ['Blanco', 'Acero inoxidable'],
  },
  {
    id: 'secadora',
    icon: 'Shirt',
    label: 'Secadoras',
    description: 'Bomba de calor, ventilación y eléctricas.',
    long:
      'Secadoras eléctricas, a gas y de bomba de calor. Te explicamos qué conexión necesitas y cuál rinde mejor para tu caso.',
    cta: 'Ver detalles',
    image: '/products/secadora.webp',
    imageAngle: '/products/secadora-angle.webp',
    subtypes: ['Eléctricas', 'A gas', 'Bomba de calor', 'Ventiladas'],
    finishes: ['Acero inoxidable', 'Blanco'],
  },
  {
    id: 'estufa',
    icon: 'Flame',
    label: 'Estufas y cocinas',
    description: 'A gas, eléctricas e inducción con horno.',
    long:
      'Estufas y cocinas a gas, eléctricas e inducción, con horno. Te orientamos según tu instalación (gas o 220V) y el tamaño que necesitas.',
    cta: 'Ver detalles',
    image: '/products/estufa.webp',
    imageAngle: '/products/estufa-angle.webp',
    subtypes: ['A gas', 'Eléctricas', 'Inducción', 'Horno de convección'],
    finishes: ['Acero inoxidable', 'Blanco', 'Negro'],
  },
  {
    id: 'freezer',
    icon: 'Snowflake',
    label: 'Freezers',
    description: 'Verticales y horizontales, distintas capacidades.',
    long:
      'Freezers verticales y horizontales en varias capacidades, ideales para almacenar más. Te decimos cuál entra mejor en tu espacio.',
    cta: 'Ver detalles',
    image: '/products/freezer.webp',
    imageAngle: '/products/freezer-angle.webp',
    subtypes: ['Verticales', 'Horizontales', 'Compactos', 'Alta capacidad'],
    finishes: ['Blanco', 'Acero inoxidable'],
  },
  {
    id: 'combo',
    icon: 'Layers',
    label: 'Combos lavadora/secadora',
    description: 'Stack o all-in-one para espacios pequeños.',
    long:
      'Torres apilables (stack) y equipos all-in-one que lavan y secan en una sola máquina. Perfectos para apartamentos y espacios reducidos.',
    cta: 'Ver detalles',
    image: '/products/combo.webp',
    imageAngle: '/products/combo-angle.webp',
    subtypes: ['Apilable (stack)', 'All-in-one', 'Para espacios pequeños'],
    finishes: ['Acero inoxidable', 'Blanco'],
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

// Empty state honesto que se muestra si la tabla de productos en Supabase
// está vacía. Sin badges fake ni precios inventados.
export const destacadosEmptyState = {
  title: 'Estamos actualizando el inventario',
  body:
    'Escríbenos por WhatsApp y te enviamos lo disponible hoy con fotos y precio final. Solemos responder en minutos durante el horario de tienda.',
  ctaLabel: 'Pedir lo disponible por WhatsApp',
  ctaMessage:
    'Hola, ¿qué tienen disponible esta semana? Busco principalmente: ___',
}

// ─────────────────────────────────────────────────────────────────────────────
//  Catálogo de ejemplo (demo)
//  Se muestra en la sección Destacados SOLO cuando aún no hay productos reales
//  cargados en el admin (Supabase). En cuanto el cliente carga su inventario
//  real desde /admin/dashboard, estos productos de ejemplo desaparecen y se
//  muestran los reales. Precios y modelos son representativos y editables.
// ─────────────────────────────────────────────────────────────────────────────
const demoChips = (condition) => [
  { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
  { icon: 'PackageCheck', label: condition, tone: 'neutral' },
  { icon: 'Truck', label: 'Entrega disponible', tone: 'neutral' },
]

export const demoProducts = [
  {
    id: 'demo-ref-1',
    name: 'Refrigerador French Door',
    category: 'refrigerador',
    spec: 'Acero inoxidable · No frost',
    detail: 'Doble puerta con cajón freezer inferior. Amplia capacidad para la familia.',
    price: '$690',
    status: 'disponible',
    badge: { label: 'Destacado', tone: 'ink' },
    featured: true,
    images: ['/products/refrigerador.webp', '/products/refrigerador-angle.webp'],
    chips: demoChips('Seminuevo'),
  },
  {
    id: 'demo-ref-2',
    name: 'Refrigerador Side by Side',
    category: 'refrigerador',
    spec: 'Acero inoxidable · Dispensador',
    detail: 'Dos puertas verticales con dispensador de hielo y agua.',
    price: '$890',
    status: 'disponible',
    badge: { label: 'Refrigerador', tone: 'ink' },
    images: ['/products/refrigerador-sxs.webp'],
    chips: demoChips('Como nuevo'),
  },
  {
    id: 'demo-lav-1',
    name: 'Lavadora carga frontal',
    category: 'lavadora',
    spec: 'Blanco · 18 lb',
    detail: 'Carga frontal de alta eficiencia, varios ciclos de lavado.',
    price: '$430',
    status: 'disponible',
    badge: { label: 'Lavadora', tone: 'ink' },
    images: ['/products/lavadora.webp', '/products/lavadora-angle.webp'],
    chips: demoChips('Seminuevo'),
  },
  {
    id: 'demo-lav-2',
    name: 'Lavadora carga superior',
    category: 'lavadora',
    spec: 'Blanco · 20 lb',
    detail: 'Carga superior amplia, fácil de usar y muy resistente.',
    price: '$380',
    status: 'disponible',
    badge: { label: 'Lavadora', tone: 'ink' },
    images: ['/products/lavadora-top.webp'],
    chips: demoChips('Usado revisado'),
  },
  {
    id: 'demo-sec-1',
    name: 'Secadora eléctrica',
    category: 'secadora',
    spec: 'Acero inoxidable · Eléctrica',
    detail: 'Secado por calor con varios niveles y sensor de humedad.',
    price: '$360',
    status: 'disponible',
    badge: { label: 'Secadora', tone: 'ink' },
    images: ['/products/secadora.webp', '/products/secadora-angle.webp'],
    chips: demoChips('Seminuevo'),
  },
  {
    id: 'demo-est-1',
    name: 'Estufa a gas 5 quemadores',
    category: 'estufa',
    spec: 'Acero inoxidable · Gas',
    detail: 'Cocina a gas con horno y cinco quemadores de distinta potencia.',
    price: '$540',
    status: 'disponible',
    badge: { label: 'Destacado', tone: 'ink' },
    featured: true,
    images: ['/products/estufa.webp', '/products/estufa-angle.webp'],
    chips: demoChips('Como nuevo'),
  },
  {
    id: 'demo-est-2',
    name: 'Estufa eléctrica con horno',
    category: 'estufa',
    spec: 'Blanco · Eléctrica',
    detail: 'Tope de vitrocerámica y horno eléctrico de gran capacidad.',
    price: '$480',
    status: 'disponible',
    badge: { label: 'Estufa', tone: 'ink' },
    images: ['/products/estufa-electrica.webp'],
    chips: demoChips('Seminuevo'),
  },
  {
    id: 'demo-fre-1',
    name: 'Freezer vertical',
    category: 'freezer',
    spec: 'Blanco · Vertical',
    detail: 'Congelador vertical con estantes, ideal para almacenar más.',
    price: '$410',
    status: 'disponible',
    badge: { label: 'Freezer', tone: 'ink' },
    images: ['/products/freezer.webp', '/products/freezer-angle.webp'],
    chips: demoChips('Usado revisado'),
  },
  {
    id: 'demo-com-1',
    name: 'Combo torre apilable',
    category: 'combo',
    spec: 'Acero inoxidable · Stack',
    detail: 'Lavadora y secadora apilables, perfectas para espacios pequeños.',
    price: '$820',
    status: 'disponible',
    badge: { label: 'Combo', tone: 'ink' },
    images: ['/products/combo.webp', '/products/combo-angle.webp'],
    chips: demoChips('Como nuevo'),
  },
].map((p) => ({
  ...p,
  image: p.images[0],
  deliveryAvailable: true,
}))

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

// Testimonios de clientes. EJEMPLOS para la demo — reemplázalos por reseñas
// reales (puedes pedirlas por WhatsApp). La sección se oculta sola si queda vacío.
export const testimonios = [
  {
    name: 'María G.',
    city: 'Cleveland, OH',
    rating: 5,
    quote:
      'Compré una lavadora y me la entregaron el mismo día. Todo por WhatsApp, súper fácil y el precio fue justo. ¡Recomendados!',
  },
  {
    name: 'Carlos R.',
    city: 'Lakewood, OH',
    rating: 5,
    quote:
      'Me mandaron fotos y video del refrigerador antes de comprarlo. Llegó impecable y a la hora que coordinamos.',
  },
  {
    name: 'Jennifer M.',
    city: 'Parma, OH',
    rating: 5,
    quote:
      'Me ayudaron a elegir la estufa correcta para mi cocina. Muy honestos, sin presionar. Excelente atención.',
  },
  {
    name: 'Luis A.',
    city: 'Cleveland, OH',
    rating: 5,
    quote:
      'Revisaron el equipo delante de mí al entregarlo. Se nota que les importa que el cliente quede contento.',
  },
  {
    name: 'Robert T.',
    city: 'Euclid, OH',
    rating: 5,
    quote:
      'Fast delivery and great prices. They answered all my questions on WhatsApp. Highly recommend these guys.',
  },
  {
    name: 'Ana P.',
    city: 'Cleveland Hts, OH',
    rating: 5,
    quote:
      'Precios mejores que las tiendas grandes y el trato es personal. Ya les compré dos veces, todo perfecto.',
  },
  {
    name: 'Sofía V.',
    city: 'Cleveland, OH',
    rating: 5,
    quote:
      'La secadora funciona perfecta y me la coordinaron a la hora que pedí. Gracias por el buen servicio.',
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
