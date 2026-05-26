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
 * Excluye los soft-deleted (deleted_at is null).
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
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(200)

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
 * Productos activos del admin (excluye papelera).
 */
export function useAdminProducts(reloadKey) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setError(null)

    supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(500)
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

  return { rows, setRows, loading: rows === null, error }
}

/**
 * Productos en papelera (soft-deleted). Ordenados por deleted_at descendente.
 */
export function useTrashProducts(reloadKey) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setError(null)

    supabase
      .from(PRODUCTS_TABLE)
      .select('*')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false })
      .limit(200)
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

  return { rows, setRows, loading: rows === null, error }
}
