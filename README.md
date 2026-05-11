# Chino Electrodomésticos — Landing Page

Landing premium para tienda de electrodomésticos. Construida con React 19, Vite y Tailwind CSS v3.4.

## Setup

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Scripts

- `npm run dev` — servidor de desarrollo con HMR
- `npm run build` — build de producción en `dist/`
- `npm run preview` — sirve el build local para verificar antes de deploy

## Estructura

```
src/
  components/
    layout/      Header, Footer, Container
    ui/          Button, Badge (primitivos reutilizables)
    sections/    Hero, Categorias, PorQueNosotros, Destacados,
                 Marcas, Testimonios, FAQ, CTAFinal
  data/
    content.js   Todo el copy y datos editables en un solo archivo
  App.jsx        Compone las secciones
  main.jsx       Entry
  index.css      Tailwind + fuentes + estilos base
```

## Editar contenido

Todo el texto, productos, testimonios, FAQ y datos de contacto viven en `src/data/content.js`. El cliente no necesita tocar JSX para cambiar copy.

## Pendientes marcados con `[CONFIRM: ...]`

Buscar en el repo `[CONFIRM` para encontrar los datos que el cliente debe rellenar:
- Teléfono y WhatsApp reales
- Dirección física
- Testimonios reales (con foto)
- Logos de marcas (cuando estén disponibles)
- Imagen del hero (por ahora hay una composición de iconos sobre gradiente)

## Sistema de diseño

Ver [design-system.md](./design-system.md) para tokens, tipografía y reglas visuales.
