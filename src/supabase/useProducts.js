import { useEffect, useState } from 'react'
import { supabase, PRODUCTS_TABLE } from './client.js'
import { mapSupabaseProduct, sortPublicProducts } from './mapProduct.js'

/**
 * Lee productos para la web pública. Orden:
 *  1. status disponible primero
 *  2. featured primero
 *  3. sort_order ascendente
 *  4. created_at descendente (desempate)
 *
 * Devuelve productos ya mapeados al shape que espera la UI.
 */
export function useProducts({ onlyAvailable = false } = {}) {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      let query = supabase
        .from(PRODUCTS_TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (onlyAvailable) {
        query = query.eq('status', 'disponible')
      }

      const { data, error: err } = await query

      if (cancelled) return

      if (err) {
        setError(err)
        setProducts([])
        return
      }

      const rows = data || []
      const sorted = sortPublicProducts(rows)
      setProducts(sorted.map(mapSupabaseProduct))
    }

    fetchProducts().catch((err) => {
      if (!cancelled) {
        setError(err)
        setProducts([])
      }
    })

    return () => {
      cancelled = true
    }
  }, [onlyAvailable])

  return { products, loading: products === null, error }
}

/**
 * Lee productos para el panel admin (sin transformar). Orden por
 * created_at descendente para que lo nuevo aparezca arriba.
 */
export function useAdminProducts(reloadKey) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err)
          setRows([])
          return
        }
        setRows(data || [])
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  return { rows, loading: rows === null, error }
}
