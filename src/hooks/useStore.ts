import { useEffect, useState } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'

/**
 * Evita mismatch de hidratación con `persist` en Next.js: el primer paint en cliente
 * usa el mismo valor que el servidor (`getServerSnapshot`); tras montar, usa el store vivo.
 *
 * @param getServerSnapshot Debe coincidir con lo renderizado en el servidor (p. ej. estado inicial vacío).
 */
export function useHydratedStore<State, Selected>(
  useBoundStore: UseBoundStore<StoreApi<State>>,
  selector: (state: State) => Selected,
  getServerSnapshot: () => Selected,
): Selected {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const selected = useBoundStore(selector)

  return hasMounted ? selected : getServerSnapshot()
}
