# Chino Electrodomésticos — Landing Page

Landing premium para tienda de electrodomésticos. React 19 + Vite + Tailwind CSS v3.4.

---

## 🚀 Levantar el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## 🏗 Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve `dist/` localmente para revisarlo antes del deploy |

## 🌐 Deploy

El proyecto ya está configurado para desplegarse en Vercel sin tocar nada. Cada push a la rama conectada genera un build automático.

---

## ✏️ Editar el contenido (sin tocar código)

**Todo el texto, productos, contactos y preguntas viven en un solo archivo:**

```
src/data/content.js
```

Abre ese archivo en cualquier editor de texto. Tiene un comentario al principio explicando cada sección. Lo que edites ahí aparece automáticamente en toda la web.

### 1. Datos de contacto

En la sección `business`:

```js
export const business = {
  name: 'Chino Electrodomésticos',
  tagline: 'Tu tienda de electrodomésticos del barrio',
  phone: '',      // ← tu número visible, ej. "+34 600 123 456"
  whatsapp: '',   // ← número internacional sin "+", ej. "34600123456"
  email: '',      // ← correo opcional
  address: '...',
  hours: '...',
}
```

Cuando completes `phone`, `whatsapp` y `email`, las filas correspondientes aparecen en el footer. Si los dejas vacíos, no se muestran.

### 2. Productos destacados

En el array `destacados`. Cada producto es un objeto:

```js
{
  id: 1,
  name: 'Refrigerador No Frost 320 L',
  spec: 'Doble puerta · 320 L · clase A',
  detail: '220 V · dispensador interior · congelador superior',
  price: 'Consultar precio',       // o un precio real: '$ 1.250.000'
  badge: 'Más consultado',
  image: null,                     // o una ruta: '/products/refri-320l.webp'
  chips: [
    { icon: 'CheckCircle2', label: 'Disponible', tone: 'success' },
    { icon: 'PackageCheck', label: 'Revisado', tone: 'neutral' },
    { icon: 'Truck', label: 'Entrega coordinada', tone: 'neutral' },
  ],
}
```

Tonos disponibles para `chips`: `success` (verde), `neutral` (gris), `warning` (ámbar).

Para añadir o quitar productos, simplemente añade o borra objetos del array.

### 3. Fotos de productos

1. Coloca la foto en `public/products/` con un nombre claro (`refri-320l.webp`).
2. En `content.js`, cambia `image: null` por `image: '/products/refri-320l.webp'`.
3. La web la mostrará automáticamente en lugar del placeholder con icono.

Ver `public/products/README.md` para detalles de formato y tamaño recomendado.

### 4. Testimonios

En `testimonios`. Cuando tengas nombres reales aprobados por los clientes, rellena el campo `name`. Mientras esté vacío, se muestra solo el rol con un avatar neutro — sin nombres inventados.

### 5. Categorías, marcas y preguntas frecuentes

Cada array (`categorias`, `marcas`, `faqs`) se edita igual: añade, modifica o quita entradas del array.

---

## 📁 Estructura

```
chino_electrodomesticos/
├── public/
│   ├── favicon.svg
│   └── products/                ← fotos reales de productos
├── src/
│   ├── data/
│   │   └── content.js           ← TODO el contenido editable
│   ├── components/
│   │   ├── layout/              Header, Footer, Container
│   │   ├── ui/                  Button, Badge, FloatingWhatsApp
│   │   └── sections/            Hero, Categorias, Destacados, etc.
│   ├── lib/
│   │   └── whatsapp.js          helper de enlaces WhatsApp / teléfono
│   ├── App.jsx                  compone las secciones
│   ├── main.jsx                 entry point
│   └── index.css                Tailwind + tipografía + tokens
├── design-system.md             tokens visuales y reglas de marca
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Sistema de diseño

Si quieres cambiar colores, tipografía o radios:

- Tokens en `tailwind.config.js` (sección `theme.extend`)
- Documentación en `design-system.md`

---

## ❓ Soporte

Si tienes dudas técnicas o necesitas un cambio mayor (nuevas secciones, lógica de carrito, integración con base de datos…), contacta al desarrollador.
