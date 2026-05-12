# Trusted Appliances — Landing + Panel admin

Web pública de catálogo + panel admin para gestionar inventario. React 19 + Vite + Tailwind CSS v3.4 + Supabase.

---

## 🚀 Levantar el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (web pública) o `/admin` (panel admin).

## 🏗 Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |

## 🌐 Deploy en Vercel

El proyecto incluye `vercel.json` para SPA routing. Variables de entorno necesarias en **Vercel → Settings → Environment Variables**:

| Variable | Valor |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave publicable (`sb_publishable_…`) |

---

## ✏️ Editar marca y contenido

**Todo el branding y copy vive en un único archivo:**

```
src/data/content.js
```

Contiene:

| Bloque | Para qué |
|---|---|
| `brand` | Nombre, tagline, rutas de logo, colores de referencia |
| `seo` | Title, meta description, Open Graph |
| `business` | Teléfono, WhatsApp, email, dirección, horario |
| `hero` / `categorias` / `porQue` / etc. | Copy de cada sección de la web pública |

### Cambiar el logo

El logo oficial vive en un único archivo:

- `public/logo-trusted-appliances.png` — logo oficial (navy sobre transparente)
- `public/favicon.svg` — versión simplificada para la pestaña del navegador

Para cambiar el logo, reemplaza ese PNG manteniendo el mismo nombre de archivo. El sitio entero recoge el nuevo logo al recargar (header, footer, login, panel admin, OG image).

### Cambiar la paleta de colores

Edita `tailwind.config.js`:

```js
colors: {
  brand: {
    ink: '#0B2545',      // navy principal
    accent: '#C9A227',   // dorado discreto
    cream: '#F8FAFC',    // off-white
    // ...
  }
}
```

---

## 📦 Productos del catálogo

Los productos NO se editan en código. Se gestionan desde el panel admin (`/admin`) y se guardan en Supabase. Ver [README-ADMIN.md](./README-ADMIN.md).

### Configurar Supabase (primera vez)

1. En tu proyecto Supabase, abre **SQL Editor** y ejecuta `supabase-schema.sql` (crea tabla `products`, bucket `product-images` y políticas RLS).
2. Crea el primer usuario admin en **Authentication → Users → Add user** (con "Auto Confirm User" activado).
3. Desactiva **"Enable Sign Ups"** en Authentication → Providers → Email.

---

## 📁 Estructura

```
trusted-appliances/
├── public/
│   ├── logo-trusted-appliances.png, favicon.svg
│   └── products/                ← fotos (también pueden subirse desde el admin)
├── src/
│   ├── data/content.js          ← branding, SEO, copy
│   ├── components/
│   │   ├── layout/              Header, Footer, Container
│   │   ├── ui/                  Button, Badge, FloatingWhatsApp
│   │   └── sections/            Hero, Categorias, Destacados, etc.
│   ├── admin/
│   │   ├── pages/               Login, Dashboard
│   │   └── components/          ProductList, ProductForm, ProductImageUpload
│   ├── supabase/
│   │   ├── client.js            cliente + validación de config
│   │   ├── AuthContext.jsx      sesión
│   │   └── useProducts.js       hooks de productos
│   ├── lib/whatsapp.js          helper de enlaces
│   ├── App.jsx                  router
│   ├── PublicSite.jsx           landing pública
│   └── main.jsx                 entry
├── supabase-schema.sql          esquema Supabase
├── README.md                    este archivo
├── README-ADMIN.md              guía del panel para el cliente final
└── design-system.md             tokens y reglas visuales
```

---

## 🎨 Sistema de diseño

Ver [design-system.md](./design-system.md) para tokens, tipografía y reglas visuales.

---

## ❓ Soporte

Si tienes dudas técnicas o necesitas un cambio mayor, contacta al desarrollador.
