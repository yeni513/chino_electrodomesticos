// Único punto de edición de contenido para el cliente.
//
// Antes de publicar, reemplaza los siguientes campos con datos reales:
//   business.phone        — número de teléfono visible (texto)
//   business.whatsapp     — número internacional sin "+" para wa.me (solo dígitos)
//   business.email        — correo de contacto
//   business.address      — dirección física de la tienda
//   business.hours        — horario real
//   destacados[i].price   — precio real de cada producto
//   testimonios[i].name   — nombre real del cliente (opcional)
//   faqs[4].a             — dirección dentro de la respuesta

export const business = {
  name: 'Chino Electrodomésticos',
  tagline: 'Tu tienda de electrodomésticos del barrio',
  phone: '',
  whatsapp: '',
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
  eyebrow: 'Tienda local · Atención personalizada',
  headline: 'Refrigeradores, lavadoras, secadoras y estufas para tu hogar',
  subhead:
    'Equipos revisados antes de entregártelos, asesoría directa por WhatsApp y precios claros. La atención de la tienda del barrio, sin call center.',
  primaryCta: { label: 'Ver electrodomésticos', href: '#destacados' },
  secondaryCta: { label: 'Ver opciones por WhatsApp', href: 'whatsapp-direct' },
  microcopy:
    'Pídenos fotos, precios y stock real por WhatsApp — te respondemos en minutos.',
  categoryChips: [
    { icon: 'Refrigerator', label: 'Refrigeradores' },
    { icon: 'WashingMachine', label: 'Lavadoras' },
    { icon: 'Shirt', label: 'Secadoras' },
    { icon: 'Flame', label: 'Estufas' },
  ],
  trustBullets: [
    'Equipos revisados antes de salir',
    'Entrega a domicilio coordinada',
    'Atención directa por WhatsApp',
  ],
  applianceCards: [
    {
      icon: 'Refrigerator',
      label: 'Refrigeradores',
      detail: 'No frost · doble puerta',
      priceLabel: 'Consultar precio',
      featured: false,
    },
    {
      icon: 'WashingMachine',
      label: 'Lavadoras',
      detail: 'Carga frontal y superior',
      priceLabel: 'Consultar precio',
      featured: true,
    },
    {
      icon: 'Shirt',
      label: 'Secadoras',
      detail: 'Bomba de calor',
      priceLabel: 'Consultar precio',
      featured: false,
    },
    {
      icon: 'Flame',
      label: 'Estufas',
      detail: 'Gas e inducción',
      priceLabel: 'Consultar precio',
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
    description: 'Carga frontal y superior, de 7 a 20 kg.',
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
    description: 'Split, portátil e inverter para tu metraje.',
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
  '¿No ves el modelo exacto? Pídenos fotos y precios por WhatsApp — te enviamos opciones reales según tu presupuesto.'

export const porQue = [
  {
    icon: 'Handshake',
    title: 'Te atendemos nosotros, no un call center',
    body: 'Hablas con la misma persona que te vende, te entrega y te ayuda si algo no funciona. Sin tickets ni esperas.',
  },
  {
    icon: 'CheckCircle2',
    title: 'Probamos el equipo antes de entregártelo',
    body: 'Revisamos cada electrodoméstico en tienda. Si tiene un golpe, una abolladura o no enciende, no sale por la puerta.',
  },
  {
    icon: 'Truck',
    title: 'Te lo llevamos hasta tu casa',
    body: 'Coordinamos la entrega contigo según tu zona y horario. Llegamos cuando dijimos que íbamos a llegar.',
  },
  {
    icon: 'BadgeDollarSign',
    title: 'Precios competitivos, sin sorpresas',
    body: 'El precio que ves es el precio final. Sin cargos ocultos, sin garantías “premium” que en realidad ya vienen de fábrica.',
  },
]

export const destacadosIntro = {
  eyebrow: 'Destacados',
  headline: 'Los modelos que más nos consultan esta semana',
  subhead:
    'Una muestra de lo que tenemos hoy en tienda. Pídenos fotos, vídeo o el precio actualizado por WhatsApp antes de venir.',
}

export const destacados = [
  {
    id: 1,
    name: 'Refrigerador No Frost 320 L',
    spec: 'Doble puerta · 320 L · clase A',
    detail: '220 V · dispensador interior · congelador superior',
    price: 'Consultar precio',
    badge: 'Más consultado',
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Listo para entrega', tone: 'neutral' },
    ],
  },
  {
    id: 2,
    name: 'Lavadora carga frontal 9 kg',
    spec: '9 kg · 1.400 rpm · 14 programas',
    detail: 'Motor inverter · vapor · clase A',
    price: 'Consultar precio',
    badge: 'Recomendado',
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Listo para entrega', tone: 'neutral' },
    ],
  },
  {
    id: 3,
    name: 'Secadora de ropa 8 kg',
    spec: '8 kg · bomba de calor · clase A++',
    detail: 'Antiarrugas · sensor de humedad · panel táctil',
    price: 'Consultar precio',
    badge: 'Nuevo modelo',
    chips: [
      { icon: 'Clock3', label: 'Consultar stock', tone: 'warning' },
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
    chips: [
      { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
      { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
      { icon: 'Truck', label: 'Listo para entrega', tone: 'neutral' },
    ],
  },
]

export const marcas = [
  'Mabe',
  'Samsung',
  'LG',
  'Whirlpool',
  'Bosch',
  'Indurama',
  'Haceb',
  'Electrolux',
]

export const testimonios = [
  {
    quote:
      'Llegué buscando una lavadora y me explicaron las diferencias sin presión. Acabé llevándome la que de verdad encajaba con mi familia, no la más cara.',
    name: '',
    role: 'Cliente del barrio',
  },
  {
    quote:
      'Pregunté por WhatsApp y me respondieron en minutos. Cuando llegó el refrigerador, lo probaron delante de mí antes de irse. Esa tranquilidad no la encuentras en una cadena grande.',
    name: '',
    role: 'Compra reciente',
  },
  {
    quote:
      'Llevo años comprándoles. Si algo se daña, los conozco, sé dónde están y me ayudan. Para mí eso vale más que cualquier descuento agresivo.',
    name: '',
    role: 'Cliente frecuente',
  },
]

export const faqs = [
  {
    q: '¿Puedo pedir fotos y precios antes de ir a la tienda?',
    a: 'Sí. Escríbenos por WhatsApp diciéndonos qué buscas y te enviamos fotos reales del equipo en stock, precio final y opciones similares para que decidas con calma.',
  },
  {
    q: '¿Hacen entrega a domicilio?',
    a: 'Sí, coordinamos la entrega contigo según tu zona y horario. Te confirmamos por WhatsApp el día y la franja antes de salir.',
  },
  {
    q: '¿Los electrodomésticos son nuevos y con garantía?',
    a: 'Sí, todos los equipos son nuevos y vienen con la garantía oficial de fábrica. Antes de entregarlos los revisamos en tienda para evitarte sorpresas.',
  },
  {
    q: '¿Qué pasa si el equipo presenta una falla?',
    a: 'Te ayudamos con la gestión del servicio técnico oficial de la marca. Si la falla es de fábrica al recibirlo, lo cambiamos.',
  },
  {
    q: '¿Cómo puedo pagar?',
    a: 'Aceptamos efectivo, tarjeta y transferencia. Pregúntanos por las opciones de pago en cuotas disponibles según el equipo.',
  },
  {
    q: '¿Tienen tienda física donde pueda ver los equipos?',
    a: 'Sí. Escríbenos por WhatsApp y te enviamos la dirección y cómo llegar. Puedes venir a ver los equipos en exposición antes de decidir, sin compromiso.',
  },
]

export const ctaFinal = {
  eyebrow: 'Atención directa, sin formularios',
  headline: '¿Buscas lavadora, secadora, estufa o refrigerador?',
  subhead:
    'Escríbenos y te mostramos las opciones disponibles hoy. Fotos, precios y stock real por WhatsApp — sin compromiso.',
  primaryCta: { label: 'Preguntar por WhatsApp', href: 'whatsapp-direct' },
  secondaryCta: { label: 'Llamar a la tienda', href: 'phone-direct' },
  reassurance: [
    'Respondemos en horario de tienda',
    'Te enviamos fotos y precios reales',
    'Sin call center ni respuestas automáticas',
  ],
  reassuranceUnderCta: 'Respuesta en minutos · sin compromiso',
}
