# Chino Electrodomésticos — Design System

> Mood: confiable · cercano · honesto · calidad sin pretensiones.
> No es Apple Store, es la tienda de barrio en la que tu vecino confió hace 20 años, ahora con presentación premium.

## Color

| Token Tailwind | HEX | Uso |
|---|---|---|
| `brand-ink` | `#0F172A` | Texto principal, fondos oscuros, header sólido al scroll |
| `brand-accent` | `#F59E0B` | CTAs primarios, hover, subrayados, badges |
| `brand-accent-dark` | `#B45309` | Hover del CTA primario, texto sobre cream |
| `brand-cream` | `#FAF7F2` | Fondo cálido para secciones intermedias |
| `slate-50 → 900` | — | Escala neutral completa de Tailwind |

Reglas:
- Máximo 1 acento (amber) por viewport visible.
- Texto sobre fondos claros: `slate-900` para body, `slate-600` para soporte.
- Texto sobre `brand-ink`: `white` o `slate-200`.

## Tipografía

- **Display** — `Fraunces` (serif variable, opsz 9–144). Pesos 500/600/700.
- **Body** — `Inter` (sans). Pesos 400/500/600.
- Solo 2 familias, máximo 3 pesos por página.

Escala (clamp para titulares grandes, fija para body):

| Uso | Tamaño |
|---|---|
| Hero H1 | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` — Fraunces 600 |
| Section H2 | `clamp(1.875rem, 3vw + 1rem, 3rem)` — Fraunces 600 |
| H3 / Card title | `1.25rem` — Inter 600 |
| Body | `1rem` (16px) — Inter 400, line-height 1.6 |
| Small / Caption | `0.875rem` — Inter 500 |

## Espaciado

Base 4px (Tailwind default). Patrón de sección: `py-20 md:py-28` con `Container` (max-w 1280px, px responsive).

## Radius

- Cards: `rounded-card` (12px)
- Botones: `rounded-lg` (8px)
- Inputs: `rounded-lg`
- Imágenes/avatares: `rounded-full` solo en avatares

## Sombras

- `shadow-soft` — cards estáticas, badge bars
- `shadow-lift` — cards hover, modales, header al scroll
- Nada de drop-shadow negro duro. Siempre con base slate translúcida.

## Motion

- Duración: 200–300ms
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (alias `ease-smooth` en Tailwind config)
- Sin springs ni rebotes. Es retail, no juguete.

## Layout

- Container `max-w-container` (1280px), padding `px-6 md:px-8 lg:px-12`.
- Grid de productos/categorías: `1 → 2 (md) → 3 (lg)` o `1 → 2 → 4` para destacados.
- Hero: editorial split — texto a la izquierda (col-span-7), visual a la derecha (col-span-5), apila en mobile.

## Anti-patterns

- Gradientes arcoíris, neón.
- Más de 2 CTAs primarios visibles a la vez.
- Stock fotos genéricas (mujer riendo con auriculares). Si no hay foto real, usar gradient mesh o composición de iconos.
- Carruseles para contenido primario.
