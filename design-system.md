# Trusted Appliances — Design System

> Mood: profesional · confiable · establecido · moderno sin estridencias.
> Look de marca de electrodomésticos seria: navy clásico, dorado discreto, off-white limpio. Nada de neón, nada de fluorescente, nada de gradientes arcoíris.

## Color

| Token Tailwind | HEX | Uso |
|---|---|---|
| `brand-ink` | `#0B2545` | Navy principal: texto, fondos oscuros, header al scroll |
| `brand-ink-soft` | `#13315C` | Navy más claro para variaciones y gradientes |
| `brand-accent` | `#C9A227` | Dorado discreto: CTAs primarios, detalles, badges |
| `brand-accent-dark` | `#8E7320` | Hover del CTA primario |
| `brand-cream` | `#F8FAFC` | Off-white para fondos de sección |
| `brand-line` | `#E2E8F0` | Gris suave para bordes y separadores |
| WhatsApp | `emerald-500/600` | Solo para CTAs que abren WhatsApp |
| `slate-50 → 900` | — | Escala neutral complementaria |

Reglas:
- Máximo 1 acento (dorado) por viewport visible.
- Texto sobre fondos claros: `brand-ink` para body, `slate-600` para soporte.
- Texto sobre `brand-ink`: `white` o `slate-200`.
- El verde de WhatsApp **siempre** es emerald, nunca el dorado de marca — evita confundir "marca" con "acción".

## Tipografía

- **Display** — `Fraunces` (serif variable). Pesos 500/600/700. Para titulares y el nombre de marca.
- **Body** — `Inter` (sans). Pesos 400/500/600. Para todo lo demás.
- Solo 2 familias, máximo 3 pesos por página.

Escala (clamp en titulares para fluidez):

| Uso | Tamaño |
|---|---|
| Hero H1 | `clamp(2.5rem, 5.5vw + 1rem, 5.75rem)` — Fraunces 600 |
| Section H2 | `clamp(1.875rem, 3.2vw + 1rem, 3.75rem)` — Fraunces 600 |
| CTA H2 | `clamp(2rem, 4vw + 1rem, 4.25rem)` — Fraunces 600 |
| H3 / Card title | `1.25–1.5rem` — Inter/Fraunces 600 |
| Body | `1rem` (16px) — Inter 400, line-height 1.6 |
| Small / Caption | `0.875rem` — Inter 500 |

## Espaciado

Base 4px. Patrón de sección: `section-y` = `py-16 md:py-20 lg:py-24`. Container `max-w-container` (1440px), padding `px-6 md:px-8 lg:px-12 xl:px-16`.

## Radius

- Cards: `rounded-card` (12px)
- Botones: `rounded-lg` (8px)
- Inputs: `rounded-lg`
- Logo mark: `rounded-lg` (mantener consistencia con cards)

## Sombras

- `shadow-soft` — cards estáticas
- `shadow-lift` — cards hover, modales, header al scroll
- Sombras siempre con base navy translúcida, no negro puro.

## Motion

- Duración: 200–300ms
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (alias `ease-smooth`)
- Sin springs ni rebotes. Es marca de confianza, no juguete.

## Logo

Archivos en `public/`:

| Archivo | Cuándo se usa |
|---|---|
| `logo-trusted-appliances.png` | **Logo oficial**. Único activo de marca. Se usa en header, footer (sobre caja blanca), login y panel admin. |
| `favicon.svg` | Versión simplificada para la pestaña del navegador (un favicon de 32×32 no puede mostrar el logo completo legible). |

El logo oficial es navy sobre transparente. Sobre fondos oscuros (footer, secciones dark) se monta dentro de una caja blanca de padding cómodo. **Nunca** se redibuja, recolora ni recrea — solo se usa el archivo PNG oficial.

Para reemplazar el logo, basta sustituir `public/logo-trusted-appliances.png` por el nuevo archivo (mismo nombre).

## Anti-patterns

- Gradientes arcoíris, neón, colores demasiado vibrantes.
- Más de 2 CTAs primarios visibles a la vez.
- Stock fotos genéricas. Si no hay foto real, usar gradient mesh + icono.
- Carruseles para contenido primario.
- Verde para algo que no abre WhatsApp.
- Mezclar el dorado de marca con CTAs de acción (que van en navy o emerald).
