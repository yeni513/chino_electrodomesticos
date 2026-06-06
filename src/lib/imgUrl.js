// Helpers de imagen.
//
// NOTA: la Image Transformation de Supabase (`/render/image/...`) es una función
// de PAGO (Pro+). En el plan Free devuelve 403, lo que rompía TODAS las fotos de
// producto. Por eso servimos la URL ORIGINAL (`/object/public/...`) tal cual.
// Las fotos sembradas ya son webp pequeñas y las que se suben por el admin se
// comprimen/reescalan a 1600px en el navegador antes de subir, así que no
// necesitamos transformación del servidor.
//
// Si algún día se sube el proyecto a un plan Pro, se puede reactivar el
// transform aquí sin tocar el resto del código.

export function srcAt(url) {
  if (!url || typeof url !== 'string') return url
  return url
}

// Sin transformación no podemos generar variantes de tamaño server-side.
// Devolvemos undefined para que el navegador use solo `src`.
export function srcSetFor() {
  return undefined
}
