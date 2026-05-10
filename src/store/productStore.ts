import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'

import { exportProducts as buildProductExportXlsx } from '../lib/excel/exportProducts'
import type { AuditLog, Product, ProductStatus } from '../types/product'

const PERSIST_KEY = 'labeling-storage'

const memoryKeyValue: Record<string, string> = {}

const memoryStorage: StateStorage = {
  getItem: (name): string | null => memoryKeyValue[name] ?? null,
  setItem: (name, value): void => {
    memoryKeyValue[name] = value
  },
  removeItem: (name): void => {
    delete memoryKeyValue[name]
  },
}

function getWebStorage(): StateStorage {
  if (typeof window !== 'undefined' && window.localStorage !== undefined) {
    return window.localStorage
  }
  return memoryStorage
}

function newLogId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `log-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function fieldValueAsString(product: Product, field: keyof Product): string {
  const v = product[field]
  if (typeof v === 'string') {
    return v
  }
  return String(v)
}

function withFieldUpdated(product: Product, field: keyof Product, newValue: string): Product {
  switch (field) {
    case 'id':
      return { ...product, id: newValue }
    case 'raw_name':
      return { ...product, raw_name: newValue }
    case 'category':
      return { ...product, category: newValue }
    case 'brand':
      return { ...product, brand: newValue }
    case 'material':
      return { ...product, material: newValue }
    case 'color':
      return { ...product, color: newValue }
    case 'unit':
      return { ...product, unit: newValue }
    case 'status':
      return { ...product, status: newValue as ProductStatus }
    case 'updated_at':
      return { ...product, updated_at: newValue }
    case 'updated_by':
      return { ...product, updated_by: newValue }
    default: {
      const _exhaustive: never = field
      return _exhaustive
    }
  }
}

/** Entrada manual para `addAuditLog` (completa `id` y `timestamp` si faltan). */
export type AuditLogInput = Omit<AuditLog, 'id' | 'timestamp'> & {
  id?: string
  timestamp?: string
}

export type ProductStoreState = {
  products: Product[]
  auditLogs: AuditLog[]
}

export type ProductStoreActions = {
  setProducts: (products: Product[]) => void
  updateProductField: (productId: string, field: keyof Product, newValue: string) => void
  addAuditLog: (entry: AuditLogInput) => void
  exportProducts: () => Blob
  clearProducts: () => void
}

export type ProductStore = ProductStoreState & ProductStoreActions

type ProductStorePersistedSlice = Pick<ProductStore, 'products' | 'auditLogs'>

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      auditLogs: [],

      setProducts: (products) =>
        set(() => ({
          products: products.map((p) => ({ ...p })),
        })),

      updateProductField: (productId, field, newValue) =>
        set((state) => {
          const index = state.products.findIndex((p) => p.id === productId)
          if (index === -1) {
            return state
          }
          const current = state.products[index]
          if (current === undefined) {
            return state
          }

          const oldValue = fieldValueAsString(current, field)
          if (oldValue === newValue) {
            return state
          }

          const updatedProduct = withFieldUpdated(current, field, newValue)

          const nextProducts = state.products.map((p, i) => (i === index ? updatedProduct : p))

          const entry: AuditLog = {
            id: newLogId(),
            product_id: productId,
            field: String(field),
            old_value: oldValue,
            new_value: newValue,
            user: '',
            timestamp: new Date().toISOString(),
          }

          return {
            products: nextProducts,
            auditLogs: [...state.auditLogs, entry],
          }
        }),

      addAuditLog: (input) =>
        set((state) => {
          const entry: AuditLog = {
            id: input.id ?? newLogId(),
            product_id: input.product_id,
            field: input.field,
            old_value: input.old_value,
            new_value: input.new_value,
            user: input.user,
            timestamp: input.timestamp ?? new Date().toISOString(),
          }
          return {
            auditLogs: [...state.auditLogs, entry],
          }
        }),

      exportProducts: () => buildProductExportXlsx(get().products, get().auditLogs),

      clearProducts: () =>
        set(() => ({
          products: [],
        })),
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(getWebStorage),
      partialize: (state): ProductStorePersistedSlice => ({
        products: state.products,
        auditLogs: state.auditLogs,
      }),
    },
  ),
)
