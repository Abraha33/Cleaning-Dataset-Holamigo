import * as XLSX from 'xlsx'

import type { Product, ProductStatus } from '../../types/product'

const DEFAULT_STATUS: ProductStatus = 'RAW'

type ExcelRow = Record<string, unknown>

function stripCombiningMarks(input: string): string {
  return input.normalize('NFD').replace(/\p{M}/gu, '')
}

function normalizeHeaderKey(raw: string): string {
  return stripCombiningMarks(raw.trim().toLowerCase()).replace(/\s+/g, ' ').replace(/_/g, ' ')
}

function cellToString(value: unknown): string {
  if (value == null) {
    return ''
  }
  if (typeof value === 'string') {
    return value.trim()
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  if (typeof value === 'bigint') {
    return value.toString()
  }
  if (typeof value === 'object') {
    return ''
  }
  return ''
}

function rowHasAnyValue(row: ExcelRow): boolean {
  return Object.values(row).some((cell) => cellToString(cell) !== '')
}

/**
 * Obtiene el valor de la primera columna cuya cabecera coincide con algún alias (tras normalizar).
 */
function pickByAliases(row: ExcelRow, aliases: readonly string[]): string {
  const aliasSet = new Set(aliases.map((a) => normalizeHeaderKey(a)))
  for (const [header, cell] of Object.entries(row)) {
    if (aliasSet.has(normalizeHeaderKey(header))) {
      return cellToString(cell)
    }
  }
  return ''
}

function newProductId(): string {
  if (typeof crypto === 'undefined' || !('randomUUID' in crypto)) {
    throw new Error('crypto.randomUUID no está disponible en este entorno')
  }
  return crypto.randomUUID()
}

function mapRowToProduct(row: ExcelRow, updatedAtIso: string): Product {
  const raw_name = pickByAliases(row, ['Nombre'])
  const brand = pickByAliases(row, ['Marca'])
  const category = pickByAliases(row, ['Categoria', 'Categoría'])
  const unit = pickByAliases(row, ['Unidad'])
  const material = pickByAliases(row, ['Material'])
  const color = pickByAliases(row, ['Color'])

  return {
    id: newProductId(),
    raw_name,
    category,
    brand,
    material,
    color,
    unit,
    status: DEFAULT_STATUS,
    updated_at: updatedAtIso,
    updated_by: '',
  }
}

/**
 * Lee la primera hoja de un Excel y devuelve productos del dominio.
 * Columnas esperadas (cabeceras en español): Nombre, Marca, Categoria, Unidad;
 * opcionales: Material, Color. Valores vacíos → ''.
 */
export async function importProductsFromExcel(file: File): Promise<Product[]> {
  try {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    if (firstSheetName === undefined || firstSheetName === '') {
      throw new Error('El archivo Excel no contiene ninguna hoja')
    }

    const sheet = workbook.Sheets[firstSheetName]
    if (sheet === undefined) {
      throw new Error('No se pudo acceder a la primera hoja del libro')
    }

    const rows: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
      defval: '',
      raw: false,
    })

    const updatedAtIso = new Date().toISOString()
    const products: Product[] = []

    for (const row of rows) {
      if (row === null || typeof row !== 'object' || Array.isArray(row)) {
        continue
      }
      if (!rowHasAnyValue(row)) {
        continue
      }
      products.push(mapRowToProduct(row, updatedAtIso))
    }

    return products
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`importProductsFromExcel: ${error.message}`, {
        cause: error,
      })
    }
    throw new Error('importProductsFromExcel: error desconocido', {
      cause: error,
    })
  }
}
