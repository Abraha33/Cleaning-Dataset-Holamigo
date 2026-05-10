import * as XLSX from 'xlsx'

import type { AuditLog, Product } from '../../types/product'

const EXPORTABLE_STATUSES = new Set<Product['status']>(['DONE', 'REVIEW'])

function countAuditEntriesForProduct(auditLogs: readonly AuditLog[], productId: string): number {
  let n = 0
  for (const log of auditLogs) {
    if (log.product_id === productId) {
      n += 1
    }
  }
  return n
}

export type ProductExportRow = {
  id: string
  Nombre: string
  Categoria: string
  Marca: string
  Material: string
  Color: string
  Unidad: string
  Status: string
  updated_at: string
  updated_by: string
  AUDIT_COUNT: number
}

function toExportRow(product: Product, auditLogs: readonly AuditLog[]): ProductExportRow {
  return {
    id: product.id,
    Nombre: product.raw_name,
    Categoria: product.category,
    Marca: product.brand,
    Material: product.material,
    Color: product.color,
    Unidad: product.unit,
    Status: product.status,
    updated_at: product.updated_at,
    updated_by: product.updated_by,
    AUDIT_COUNT: countAuditEntriesForProduct(auditLogs, product.id),
  }
}

/**
 * Construye un libro Excel con productos en estado `DONE` o `REVIEW` y columna `AUDIT_COUNT`.
 */
export function exportProducts(products: readonly Product[], auditLogs: readonly AuditLog[]): Blob {
  const rows = products
    .filter((p) => EXPORTABLE_STATUSES.has(p.status))
    .map((p) => toExportRow(p, auditLogs))

  const worksheet = XLSX.utils.json_to_sheet(rows)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos')

  const buffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  }) as ArrayBuffer

  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
}
