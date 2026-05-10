export type ProductStatus = 'RAW' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'EXPORTED'

export interface Product {
  id: string
  raw_name: string
  category: string
  brand: string
  material: string
  color: string
  unit: string
  status: ProductStatus
  updated_at: string
  updated_by: string
}

export interface AuditLog {
  id: string
  product_id: string
  field: string
  old_value: string
  new_value: string
  user: string
  timestamp: string
}

export interface DictionaryOption {
  id: string
  type: 'category' | 'brand' | 'material' | 'color' | 'unit'
  value: string
  normalized_value: string
}
