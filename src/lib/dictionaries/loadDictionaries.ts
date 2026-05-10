import type { DictionaryOption } from '../../types/product'

import brandsJson from '../../data/dictionaries/brands.json'
import categoriasJson from '../../data/dictionaries/categorias.json'
import colorsJson from '../../data/dictionaries/colors.json'
import materialJson from '../../data/dictionaries/material.json'
import unitiesJson from '../../data/dictionaries/unities.json'

function isDictionaryKind(value: unknown): value is DictionaryOption['type'] {
  return (
    value === 'category' ||
    value === 'brand' ||
    value === 'material' ||
    value === 'color' ||
    value === 'unit'
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDictionaryOption(value: unknown): value is DictionaryOption {
  if (!isRecord(value)) {
    return false
  }
  const id = value['id']
  const type = value['type']
  const v = value['value']
  const nv = value['normalized_value']
  return (
    typeof id === 'string' &&
    isDictionaryKind(type) &&
    typeof v === 'string' &&
    typeof nv === 'string'
  )
}

function parseDictionaryFile(
  raw: unknown,
  expectedType: DictionaryOption['type'],
): DictionaryOption[] {
  if (!Array.isArray(raw)) {
    throw new Error(`Diccionario ${expectedType}: se esperaba un array JSON en la raíz`)
  }
  const list = raw as readonly unknown[]
  const out: DictionaryOption[] = []
  for (let i = 0; i < list.length; i++) {
    const item: unknown = list[i]
    if (!isDictionaryOption(item)) {
      throw new Error(`Diccionario ${expectedType}: entrada inválida en índice ${i}`)
    }
    if (item.type !== expectedType) {
      throw new Error(`Diccionario ${expectedType}: tipo incorrecto en índice ${i} (${item.type})`)
    }
    out.push({
      id: item.id,
      type: item.type,
      value: item.value,
      normalized_value: item.normalized_value,
    })
  }
  return out
}

let categoriesCache: DictionaryOption[] | null = null
let brandsCache: DictionaryOption[] | null = null
let materialsCache: DictionaryOption[] | null = null
let colorsCache: DictionaryOption[] | null = null
let unitsCache: DictionaryOption[] | null = null

export function getCategories(): Promise<DictionaryOption[]> {
  if (categoriesCache === null) {
    categoriesCache = parseDictionaryFile(categoriasJson, 'category')
  }
  return Promise.resolve(categoriesCache.map((o) => ({ ...o })))
}

export function getBrands(): Promise<DictionaryOption[]> {
  if (brandsCache === null) {
    brandsCache = parseDictionaryFile(brandsJson, 'brand')
  }
  return Promise.resolve(brandsCache.map((o) => ({ ...o })))
}

export function getMaterials(): Promise<DictionaryOption[]> {
  if (materialsCache === null) {
    materialsCache = parseDictionaryFile(materialJson, 'material')
  }
  return Promise.resolve(materialsCache.map((o) => ({ ...o })))
}

export function getColors(): Promise<DictionaryOption[]> {
  if (colorsCache === null) {
    colorsCache = parseDictionaryFile(colorsJson, 'color')
  }
  return Promise.resolve(colorsCache.map((o) => ({ ...o })))
}

export function getUnits(): Promise<DictionaryOption[]> {
  if (unitsCache === null) {
    unitsCache = parseDictionaryFile(unitiesJson, 'unit')
  }
  return Promise.resolve(unitsCache.map((o) => ({ ...o })))
}
