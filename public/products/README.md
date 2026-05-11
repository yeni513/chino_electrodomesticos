# Fotos de productos

Coloca aquí las fotos reales de los electrodomésticos.

## Recomendaciones

- Formato: `.jpg` o `.webp` (preferible `.webp` por peso)
- Tamaño recomendado: 1200 × 900 px (ratio 4:3)
- Peso: idealmente menos de 200 KB por imagen
- Nombre del archivo en minúsculas, sin tildes ni espacios:
  - `refrigerador-no-frost-320l.webp`
  - `lavadora-frontal-9kg.webp`

## Cómo enlazarla

En `src/data/content.js`, dentro del producto en `destacados`, cambia:

```js
image: null,
```

por:

```js
image: '/products/refrigerador-no-frost-320l.webp',
```

La web detecta automáticamente que hay imagen y la muestra en lugar del placeholder con icono.
