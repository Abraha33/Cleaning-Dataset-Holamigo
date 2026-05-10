import type { DictionaryOption, Product, ProductStatus } from '../../types/product'

export type Dictionaries = {
  categories: DictionaryOption[]
  brands: DictionaryOption[]
  materials: DictionaryOption[]
  colors: DictionaryOption[]
  units: DictionaryOption[]
}

function stripCombiningMarks(input: string): string {
  return input.normalize('NFD').replace(/\p{M}/gu, '')
}

function normalizeComparable(input: string): string {
  return stripCombiningMarks(input.trim().toLowerCase()).replace(/\s+/g, ' ').replace(/_/g, ' ')
}

type DictionaryBackedField = 'category' | 'brand' | 'material' | 'color' | 'unit'

const FIELD_CONFIG: readonly {
  field: DictionaryBackedField
  optionsKey: keyof Dictionaries
}[] = [
  { field: 'category', optionsKey: 'categories' },
  { field: 'brand', optionsKey: 'brands' },
  { field: 'material', optionsKey: 'materials' },
  { field: 'color', optionsKey: 'colors' },
  { field: 'unit', optionsKey: 'units' },
] as const

function resolveDictionaryValue(
  raw: string,
  options: DictionaryOption[],
): { value: string; matched: boolean } {
  if (raw === '') {
    return { value: '', matched: true }
  }

  const exact = options.find((o) => o.value === raw)
  if (exact !== undefined) {
    return { value: exact.value, matched: true }
  }

  const comparable = normalizeComparable(raw)
  const fuzzy = options.find(
    (o) =>
      normalizeComparable(o.normalized_value) === comparable ||
      normalizeComparable(o.value) === comparable,
  )
  if (fuzzy !== undefined) {
    return { value: fuzzy.value, matched: true }
  }

  return { value: raw, matched: false }
}

/**
 * Alinea category, brand, material, color y unit con los diccionarios.
 * Regla de negocio pedida: solo **brand** sin coincidencia (ni exacta ni normalizada) fuerza `status: 'RAW'`.
 * Si hay coincidencia por normalización (mayúsculas/acentos), se sustituye por el `value` oficial del diccionario.
 */
export function normalizeProduct(product: Product, dictionaries: Dictionaries): Product {
  let next: Product = { ...product }
  let brandInvalid = false

  for (const { field, optionsKey } of FIELD_CONFIG) {
    const options = dictionaries[optionsKey]
    const current = next[field]
    const { value, matched } = resolveDictionaryValue(current, options)

    if (field === 'brand' && !matched) {
      brandInvalid = true
    }

    if (value !== current) {
      next = { ...next, [field]: value }
    }
  }

  if (brandInvalid) {
    const rawStatus: ProductStatus = 'RAW'
    if (next.status !== rawStatus) {
      next = { ...next, status: rawStatus }
    }
  }

  return next
}
